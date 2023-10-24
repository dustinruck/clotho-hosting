/*

first section: controllers for gender finders (may use as helper methods for search and/or new listing form)

second section: controllers for admin routes only to CRUD available listing attributes (genders, gender, size)
later: could use to get stats for listings/orders (most popular gender by number of purchases, eg)

*/

const { Gender } = require("../models");


/* 
Get full list of genders
*/
exports.findAll = async (req, res) => {

    try {

        const genderList = await Gender.findAll({
            where: {
                isDeleted: false
            }
        });
        res.json(genderList);

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Get gender by id
*/
exports.findById = async (req, res) => {

    try {

        var gender = await Gender.findByPk(
            {
                where: {
                    id:   req.params.id,
                    isDeleted: false
                }
            });

        if (!gender) {
            return res.status(404).json({ message: "Gender not found" });
        }

        res.json(gender);

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
Create new gender
Form must include gender name only -- should maybe also validate in front that gender doesn't already exist
*/
exports.create = async (req, res) => {

    // name cannot be null
    if (!req.body.name) {
        return res.status(400).json({ message: "Gender name cannot be null" });
    }
    // name cannot be greater than 50 characters
    if (req.body.name.length > 50) {
        return res.status(400).json({ message: "Gender name cannot exceed 50 characters" });
    }
    try {

        // name cannot already exist
        var gender = await Gender.findOne({
            where: {
                name: req.body.name
            }
        });

        if (gender) {

            return res.status(400).json({ message: "Gender with this name already exists (may include deleted records)" });
        }

        //save new gender
        var gender = await Gender.create({
            name: req.body.name
        });

        res.status(201).json({ message: "Successfully added gender", gender: gender });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Get full list of genders include deleted results
*/
exports.findAllInclDeleted = async (req, res) => {

    try {

        const genderList = await Gender.findAll();
        res.json(genderList);

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Get gender by id include deleted results
*/
exports.findByIdInclDeleted = async (req, res) => {

    try {

        var gender = await Gender.findByPk(req.params.id);

        if (!gender) {
            return res.status(404).json({ message: "Gender not found" });
        }

        res.json(gender);

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Edit gender name
Form must include gender name only -- should maybe also validate in front that gender doesn't already exist
*/
exports.updateById = async (req, res) => {

    // request must include id and new name (<=50 char)
    if (!req.body.name) {
        return res.status(400).json({ message: "Gender name cannot be null" });
    }
    if (req.body.name.length > 50) {
        return res.status(400).json({ message: "Gender name cannot exceed 50 characters" });
    }
    if (!req.params.id) {
        return res.status(400).json({ message: "Gender id cannot be null" });
    }
    try {

        // check that new name doesn't exist
        var gender = await Gender.findOne({
            where: {
                name: req.body.name
            }
        });

        if (gender) {
            return res.status(400).json({ message: "Gender with this name already exists" });
        }

        // check that id exists
        var gender = await Gender.findByPk(req.params.id);

        if (!gender) {
            return res.status(400).json({ message: "Invalid gender id" });
        }

        gender = await Gender.update(
            {
                name: req.body.name
            },
            {
                where: {
                    id: req.params.id
                }
            });

        gender = await Gender.findByPk(req.params.id);

        res.status(200).json({ message: "Successful update", gender: gender });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Delete gender by id
No request body -- delete by param id in route
*/
exports.deleteById = async (req, res) => {

    // request must include id
    if (!req.params.id) {
        return res.status(400).json({ message: "Gender id cannot be null" });
    }
    try {

        // check that gender with id exists
        var gender = await Gender.findOne(
            {
                where: {
                    id: req.params.id,
                    isDeleted: false
                }
            });

        if (!gender) {
            return res.status(400).json({ message: "Gender does not exist or is already deleted" });
        }

        gender = await Gender.update(
            {
                isDeleted: true
            },
            {
                where: {
                    id: req.params.id
                }
            });

        gender = await Gender.findByPk(req.params.id);

        res.status(200).json({ message: "Successful delete", gender: gender });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};

/* 
Undelete gender by id
No request body -- delete by param id in route
*/
exports.unDeleteById = async (req, res) => {

    // request must include id
    if (!req.params.id) {
        return res.status(400).json({ message: "Gender id cannot be null" });
    }
    try {

        // check that gender with id exists
        var gender = await Gender.findOne(
            {
                where: {
                    id: req.params.id,
                    isDeleted: true
                }
            });

        if (!gender) {
            return res.status(400).json({ message: "Gender does not exist or is not deleted" });
        }

        gender = await Gender.update(
            {
                isDeleted: false
            },
            {
                where: {
                    id: req.params.id
                }
            });

        gender = await Gender.findByPk(req.params.id);

        res.status(200).json({ message: "Successful un-delete", gender: gender });

    } catch (err) {

        console.log(err.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};