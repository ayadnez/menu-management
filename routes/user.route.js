const router = require('express').Router()
const { createCategory, createSubCategory ,createItem,
    getAllCategories,
    getCategoryById
} = require('../controllers/user.controller')


router.post('/createCategory',createCategory)
router.post('/subcategory/:categoryId',createSubCategory)
router.post('/createItem/:categoryId/:subCategoryId',createItem)

router.get('/categories',getAllCategories)
router.get('/categories/:id',getCategoryById)

module.exports = router;