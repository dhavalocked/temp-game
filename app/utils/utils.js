module.exports.formatErrorResponce = (err, response)=> {
    if (err){
        return {success : 0, response : err.message}
    }
    return {success : 1, response : response}
}