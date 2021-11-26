const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const ParentController = require('../controllers/parent');

const Parent = require('../models/parent');
const Auth = require('../middleware/authMiddleware');
const multer = require ('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '.../static/uploads/profilepic');
    },
    filename: function (req, file, cb) {
        file.originalname = file.originalname.split(" ").join("_");
        cb(null, new Date().getTime() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if ( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});

// create super admin
// router.post('/adduser', UserController.adduser);

router.get('/',(req, res)=>{
    Parent.find((err, docs)=>{
        res.json(docs)
    })
})

router.get('/deal', (req, res)=>{
    Parent.remove({},(err, docs)=>{
        res.json(docs)
    })
})


router.get('/checkauth', (req, res)=>{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "ajlkhfkuthernqlfkvieo213109284312094j12!3240214");
    console.log(decoded, 'this is decoded')

    Parent.findById(decoded.id, ['parent_name', 'parent_contact', 'role', 'uniqueId', 'status'], (err, doc)=>{
        if( !doc ){
            res.json({
                success:false,
                message:'Something went worong with this user!!'
            })
        }

        else{
            res.json({
                success : true,
                data: doc
            })
        }
    })
})




router.post('/registerparent', ParentController.registerParent);
router.get('/:id', ParentController.getdetails);
router.get('/findbycontact/:id', ParentController.getBycontact);
router.post('/submit-confirmation-code', ParentController.registerSubmitConfirmation);
router.post('/login', ParentController.login);
router.post('/recoveraccount', ParentController.recoveryPassword);
router.post('/resetverificationsubmit', ParentController.recoveryPassVerificationSubmit);
router.post('/changepassword', ParentController.changePassword);
// router.post('/sendpayment',Auth, InstitutionController.sendPayment);

module.exports = router
