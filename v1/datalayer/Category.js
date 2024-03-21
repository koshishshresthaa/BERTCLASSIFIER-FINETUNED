const {Category} = require("../model/Category")

exports.createCategory = async (data) => {
    await Category.create(data);
    return true;
}

exports.getCategory = async () => {
    let searchSchema = {status : "active"};
    const data = await Category.findAll({
        where : searchSchema
    })
    return data
}

exports.updateCategory = async (data) => {
    await Category.update(
        {
            name: data.name
        },
        {
            where : {id : data.change_id}
        }
    )
    return true;
}

exports.deleteCategory = async (data) => {
    await Category.update(
        {
            status: "deleted"
        },
        {
            where: { id: data.delete_id}
        }
    )
}

exports.findCateogryByQuery = async (dataObject) => {
    const data = await Category.findOne({
        where: dataObject
    });

    return data;
}