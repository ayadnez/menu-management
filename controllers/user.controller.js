const mongoose = require('mongoose') 
const Category = require('../models/category.model')

const createCategory = async (req, res) => {
    
    const {name,image,description,taxApplicable,tax,taxType} = req.body

    if(!name || !image || !description || !taxApplicable || !tax || !taxType) {
        console.error('missing category information')
        return res.status(400).json({message: 'missing category information'})
    }

    const category = new Category({
        name,
        description,
        image,
        tax,
        taxType,
        taxApplicable
    })

    await category.save()

    res.status(200).json({message:"category created successfully"})
}

const createSubCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { name, image, description, taxApplicable, tax } = req.body;
    
        const category = await Category.findById(categoryId);
    
        if (!category) {
          return res.status(404).json({ message: 'Category not found' });
        }
    
        const subCategory = {
          name,
          image,
          description,
          taxApplicable: taxApplicable !== undefined ? taxApplicable : category.taxApplicable,
          tax: tax !== undefined ? tax : category.tax
        };
    
        category.subCategories.push(subCategory);
        await category.save();
    
        // Get the newly added sub-category (it will be the last one in the array)
        const newSubCategory = category.subCategories[category.subCategories.length - 1];
    
        res.status(201).json({
          message: 'Sub-category created successfully',
          subCategory: newSubCategory
        });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
}



const createItem = async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.params;
        const { name, image, description, taxApplicable, tax, baseAmount, discount } = req.body;

       // console.log('Received subCategoryId:', subCategoryId);

        

        // Find the category by its ID
        const category = await Category.findById(categoryId);

      //  console.log(category)

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

         // Find the sub-category using the ObjectId
         const subCategory = category.subCategories.id(subCategoryId);
         if (!subCategory) {
             console.log('Sub-category not found:', subCategoryId); // Log if sub-category is not found
             return res.status(404).json({ message: 'Sub-category not found' });
         }

        const totalAmount = baseAmount - (discount || 0);

        // Create the new item object
        const item = {
            name,
            image,
            description,
            taxApplicable: taxApplicable !== undefined ? taxApplicable : subCategory.taxApplicable,
            tax: tax !== undefined ? tax : subCategory.tax,
            baseAmount,
            discount: discount || 0,
            totalAmount
        };

        // Push the new item into the sub-category's items array
        subCategory.items.push(item);
        await category.save();

        // Get the newly added item
        const newItem = subCategory.items[subCategory.items.length - 1];

        // Respond with a success message and the new item
        res.status(201).json({
            message: 'Item created successfully',
            item: newItem
        });
    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ message: 'Server error', error });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch(error) {
        console.error('error while fetching categoreis',error)
        res.status(500).json({message :"server error ",error})
    }
}

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params; // Access the id from req.params
        const category = await Category.findById(id); // Use findById to fetch a single document

        if (!category) {
            return res.status(404).json({ message: 'Category not found' }); // Handle case where category is not found
        }

    } catch(error) {
        console.error('error while fetching category ',error)
        res.status(500).json({message:"server error ",error})
    }
}


module.exports = {
    createCategory,
    createSubCategory,
    createItem,
    getAllCategories,
    getCategoryById
}