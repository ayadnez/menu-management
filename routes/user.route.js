const router = require('express').Router()
const { createCategory, 
    createSubCategory ,
    createItem,
    getAllCategories,
    getCategoryById,
    getAllSubCategories,
    subCategories,
    getSubCategoryById,
    getAllItems,
    getAllItemsByCategoryId,
    getAllItemsOfSubCategory,
    getItemById,
    editCategory,
    editSubCategory,
    editItem

} = require('../controllers/user.controller')


router.post('/createCategory',createCategory)
router.post('/subcategory/:categoryId',createSubCategory)
router.post('/createItem/:categoryId/:subCategoryId',createItem)

// get categories routes
router.get('/categories',getAllCategories)
router.get('/categories/:id',getCategoryById)

// get subcategories routes
router.get('/subcategories',getAllSubCategories)
router.get('/categories/:categoryId/subcategories',subCategories)
router.get('/subcategory/:id',getSubCategoryById)

// get items routes 
router.get('/items',getAllItems)
router.get('/items/:id', getAllItemsByCategoryId)
router.get('/items/:categoryId/:subCategoryId',getAllItemsOfSubCategory)
router.get('/item/:id',getItemById)

// edit routes 
router.put('/edit/:categoryId',editCategory)
router.put('/edit/subcategory/:subCategoryId',editSubCategory)
router.put('/edit/item/:itemId',editItem)


module.exports = router;