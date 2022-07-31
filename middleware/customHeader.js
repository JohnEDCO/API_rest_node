const customHeader = (req, res, next)=>{
    try {
        const api_key = req.headers.api_key;
        if(api_key == "john-123"){
            next();
        }else{
            res.status(403);
            res.send({error:"api key no es correcta"})
        }
    } catch (err) {
        res.status(403);
        res.send({error:"algo ocurrio en el custom header"})
    }
}

module.exports = customHeader