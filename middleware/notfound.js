const notfound  = (req,res) => {
    res.status(404).send('Routes is not exists !!');
}

module.exports =  notfound;