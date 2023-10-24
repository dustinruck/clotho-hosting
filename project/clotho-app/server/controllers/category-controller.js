/*

first section: controllers for category finders (may use as helper methods for search and/or new listing form)

second section: controllers for admin routes only to CRUD available listing attributes (categories, gender, size)
later: could use to get stats for listings/orders (most popular category by number of purchases, eg)

*/

const { Category } = require("../models");


/* 
Get full list of Categories
*/
exports.findAll = async (req, res) => {

    try {

        const categoryList = await Category.findAll({
            where: {
                isDeleted: false
            }
        });
        res.json(categoryList);

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Get category by id
*/
exports.findById = async (req, res) => {

    try {

        var category = await Category.findOne(
          
            {
                where: {
                    id:   req.params.id,
                    isDeleted: false
                }
            });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(category);

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};


/* 
Admin only beyond this point
TODO: authorization
*/


/* 
Create new category
Form must include category name only -- should validate in front that category doesn't already exist (cache?)
*/
exports.create = async (req, res) => {

    // name cannot be null
    if (!req.body.name) {
        return res.status(400).json({ message: "Category name cannot be null" });
    }
    // name cannot be greater than 50 characters
    if (req.body.name.length > 50) {
        return res.status(400).json({ message: "Category name cannot exceed 50 characters" });
    }
    try {

        // name cannot already exist
        var category = await Category.findOne({
            where: {
                name: req.body.name
            }
        });

        if (category) {

            return res.status(400).json({ message: "Category with this name already exists (may include deleted records)" });
        }

        //save new category
        var category = await Category.create({
            name: req.body.name
        });

        res.status(201).json({ message: "Successfully added category", category: category });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Get full list of categories include deleted results
*/
exports.findAllInclDeleted = async (req, res) => {

    try {

        const categoryList = await Category.findAll();
        res.json(categoryList);

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Get category by id include deleted results
*/
exports.findByIdInclDeleted = async (req, res) => {

    try {

        var category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(category);

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Edit category name
Form must include category name only -- should maybe also validate in front that category doesn't already exist
*/
exports.updateById = async (req, res) => {

    // request must include id and new name (<=50 char)
    if (!req.body.name) {
        return res.status(400).json({ message: "Category name cannot be null" });
    }
    if (req.body.name.length > 50) {
        return res.status(400).json({ message: "Category name cannot exceed 50 characters" });
    }
    if (!req.params.id) {
        return res.status(400).json({ message: "Category id cannot be null" });
    }
    try {

        // check that new name doesn't exist
        var category = await Category.findOne({
            where: {
                name: req.body.name
            }
        });

        if (category) {
            return res.status(400).json({ message: "Category with this name already exists" });
        }

        // check that id exists
        var category = await Category.findByPk(req.params.id);

        if (!category) {
            return res.status(400).json({ message: "Invalid category id" });
        }

        category = await Category.update(
            {
                name: req.body.name
            },
            {
                where: {
                    id: req.params.id
                }
            });

        category = await Category.findByPk(req.params.id);

        res.status(200).json({ message: "Successful update", category: category });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Delete category by id
No request body -- delete by param id in route
*/
exports.deleteById = async (req, res) => {

    // request must include id
    if (!req.params.id) {
        return res.status(400).json({ message: "Category id cannot be null" });
    }
    try {

        // check that category with id exists
        var category = await Category.findOne(
            {
                where: {
                    id: req.params.id,
                    isDeleted: false
                }
            });

        if (!category) {
            return res.status(400).json({ message: "Category does not exist or is already deleted" });
        }

        category = await Category.update(
            {
                isDeleted: true
            },
            {
                where: {
                    id: req.params.id
                }
            });

        category = await Category.findByPk(req.params.id);

        res.status(200).json({ message: "Successful delete", category: category });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Undelete category by id
No request body -- delete by param id in route
*/
exports.unDeleteById = async (req, res) => {

    // request must include id
    if (!req.params.id) {
        return res.status(400).json({ message: "Category id cannot be null" });
    }
    try {

        // check that category with id exists
        var category = await Category.findOne(
            {
                where: {
                    id: req.params.id,
                    isDeleted: true
                }
            });

        if (!category) {
            return res.status(400).json({ message: "Category does not exist or is not deleted" });
        }

        category = await Category.update(
            {
                isDeleted: false
            },
            {
                where: {
                    id: req.params.id
                }
            });

        category = await Category.findByPk(req.params.id);

        res.status(200).json({ message: "Successful un-delete", category: category });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};