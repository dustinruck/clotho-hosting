/*

first section: controllers for size finders (may use as helper methods for search and/or new listing form)

second section: controllers for admin routes only to CRUD available listing attributes (sizes, size, size)
later: could use to get stats for listings/orders (most popular size by number of purchases, eg)

*/

const { Size } = require("../models");


/* 
Get full list of sizes
*/
exports.findAll = async (req, res) => {

    try {

        const sizeList = await Size.findAll({
            where: {
                isDeleted: false
            }
        });
        res.json(sizeList);

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Get size by id
*/
exports.findById = async (req, res) => {

    try {

        var size = await Size.findByPk(
            {
                where: {
                    id:   req.params.id,
                    isDeleted: false
                }
            });

        if (!size) {
            return res.status(404).json({ message: "Size not found" });
        }

        res.json(size);

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
Create new size
Form must include size name only -- should maybe also validate in front that size doesn't already exist
*/
exports.create = async (req, res) => {

    // name cannot be null
    if (!req.body.name) {
        return res.status(400).json({ message: "Size name cannot be null" });
    }
    // name cannot be greater than 50 characters
    if (req.body.name.length > 50) {
        return res.status(400).json({ message: "Size name cannot exceed 50 characters" });
    }
    try {

        // name cannot already exist
        var size = await Size.findOne({
            where: {
                name: req.body.name
            }
        });

        if (size) {

            return res.status(400).json({ message: "Size with this name already exists (may include deleted records)" });
        }

        //save new size
        var size = await Size.create({
            name: req.body.name
        });

        res.status(201).json({ message: "Successfully added size", size: size });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Get full list of sizes include deleted results
*/
exports.findAllInclDeleted = async (req, res) => {

    try {

        const sizeList = await Size.findAll();
        res.json(sizeList);

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Get size by id include deleted results
*/
exports.findByIdInclDeleted = async (req, res) => {

    try {

        var size = await Size.findByPk(req.params.id);

        if (!size) {
            return res.status(404).json({ message: "Size not found" });
        }

        res.json(size);

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Edit size name
Form must include size name only -- should maybe also validate in front that size doesn't already exist
*/
exports.updateById = async (req, res) => {

    // request must include id and new name (<=50 char)
    if (!req.body.name) {
        return res.status(400).json({ message: "Size name cannot be null" });
    }
    if (req.body.name.length > 50) {
        return res.status(400).json({ message: "Size name cannot exceed 50 characters" });
    }
    if (!req.params.id) {
        return res.status(400).json({ message: "Size id cannot be null" });
    }
    try {

        // check that new name doesn't exist
        var size = await Size.findOne({
            where: {
                name: req.body.name
            }
        });

        if (size) {
            return res.status(400).json({ message: "Size with this name already exists" });
        }

        // check that id exists
        var size = await Size.findByPk(req.params.id);

        if (!size) {
            return res.status(400).json({ message: "Invalid size id" });
        }

        size = await Size.update(
            {
                name: req.body.name
            },
            {
                where: {
                    id: req.params.id
                }
            });

        size = await Size.findByPk(req.params.id);

        res.status(200).json({ message: "Successful update", size: size });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Delete size by id
No request body -- delete by param id in route
*/
exports.deleteById = async (req, res) => {

    // request must include id
    if (!req.params.id) {
        return res.status(400).json({ message: "Size id cannot be null" });
    }
    try {

        // check that size with id exists
        var size = await Size.findOne(
            {
                where: {
                    id: req.params.id,
                    isDeleted: false
                }
            });

        if (!size) {
            return res.status(400).json({ message: "Size does not exist or is already deleted" });
        }

        size = await Size.update(
            {
                isDeleted: true
            },
            {
                where: {
                    id: req.params.id
                }
            });

        size = await Size.findByPk(req.params.id);

        res.status(200).json({ message: "Successful delete", size: size });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Undelete size by id
No request body -- delete by param id in route
*/
exports.unDeleteById = async (req, res) => {

    // request must include id
    if (!req.params.id) {
        return res.status(400).json({ message: "Size id cannot be null" });
    }
    try {

        // check that size with id exists
        var size = await Size.findOne(
            {
                where: {
                    id: req.params.id,
                    isDeleted: true
                }
            });

        if (!size) {
            return res.status(400).json({ message: "Size does not exist or is not deleted" });
        }

        size = await Size.update(
            {
                isDeleted: false
            },
            {
                where: {
                    id: req.params.id
                }
            });

        size = await Size.findByPk(req.params.id);

        res.status(200).json({ message: "Successful un-delete", size: size });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};