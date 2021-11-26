const jwt = require('jsonwebtoken');
const Institution = require('../models/institution')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, "ajlkhfkuthernqlfkvieo213109284312094j12!3240214");
        req.userdata = decoded;
        console.log(req.userdata, 'userdata')
        // next();

        Institution.findById(req.userdata.id, (err, ins) => {
            if (ins.role != 'insadmin' && ins.payment_completed != 'completed' ) {
                console.log('auth failed')
                return res.json({
                    message: "Auth Failed",
                    success: false,
                })
            }

            else{
                next();
            }
        })

    } catch (error) {
        return res.json({
            message: "Auth Failed",
            success: false,
        })
    }
} 