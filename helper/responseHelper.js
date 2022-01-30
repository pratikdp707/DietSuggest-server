var container = {
    "error" : (res, error) => {
        res.json({
            "status" : "failed",
            "data" : error
        })
    } , 

    "success" : (res, data) => {
        res.json({
            "status" : "success",
            "data" : data
        })
    }
}

module.exports = container