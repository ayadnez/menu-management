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
    editItem,
    register,
    login,
    logout

} = require('../controllers/user.controller')
const {authUser} = require('../middleware/auth')

router.post('/register',register)
router.post('/login',login)
router.post('/createCategory',authUser,createCategory)
router.post('/subcategory/:categoryId',authUser,createSubCategory)
router.post('/createItem/:categoryId/:subCategoryId',authUser,createItem)
router.post('/logout',authUser,logout)

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
router.put('/edit/:categoryId',authUser,editCategory)
router.put('/edit/subcategory/:subCategoryId',authUser,editSubCategory)
router.put('/edit/item/:itemId',authUser,editItem)



module.exports = router;