const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
    const token = req.get('token');
    jwt.verify(token, 'secret', (err, decoded) => {
        if(err){
            return res.status(401).json({
                message: 'User is not valid'
            })
        }
        req.user = decoded.data;
        next();
    })
}

const verifyAdmin = (req, res, next) => {
    const role = req.user.role;
    if(role === 'ADMIN'){
        next();
    }else{
        return res.status(401).json({
            message: 'User is not valid'
        })
    }
}

module.exports = { verifyAuth, verifyAdmin }