const handleHttpError = (res, message='Default mess', code = 403) => {
    res.status(code);
    res.send({error: message})
}

module.exports = {handleHttpError}
