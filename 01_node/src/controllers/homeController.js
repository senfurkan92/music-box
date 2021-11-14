const index = (req, resp, next) => {
    resp.json({name:"furkan"});
};

module.exports = {
    index,    
};
