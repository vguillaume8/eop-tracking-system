function getStatus(req, res){
    res.json({status: 'UP'});
};

module.exports = {
    getStatus: getStatus
}