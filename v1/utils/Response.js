exports.success = (res, data, message) => {
    res
        .status(200)
        .send({
            success : true,
            message : message,
            data : data
        })
}
exports.error = (res, status, message) => {
    res
        .status(status)
        .send({
            success : false,
            message : message
        })
}