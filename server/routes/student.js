const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const StudentController = require('../controllers/student');

const Student = require('../models/student');
const Auth = require('../middleware/authMiddleware');
const multer = require('multer');

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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
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


router.get('/checkauth', (req, res) => {
    const token = req.headers.authorization;
    var decoded;
    try {
        decoded = jwt.verify(token, "ajlkhfkuthernqlfkvieo213109284312094j12!3240214");
    }
    catch {
        res.json({
            success: false,
            message: 'Something went worong with this user!!'
        })
    }
    console.log(decoded, 'this is decoded')

    Student.findById(decoded.id, ['student_name', 'student_contact', 'role', 'uniqueId', 'status'], (err, doc) => {
        if (!doc) {
            res.json({
                success: false,
                message: 'Something went worong with this user!!'
            })
        }

        else {
            res.json({
                success: true,
                data: doc
            })
        }
    })
})



router.get('/', (req, res) => {
    Student.find((err, docs) => {
        res.json(docs)
    })
})

router.get('/deal', (req, res) => {
    Student.remove({}, (err, docs) => {
        res.json(docs)
    })
})

router.post('/registerstudent', StudentController.registerStudent);
router.get('/:id', StudentController.getdetails);
router.get('/findbycontact/:id', StudentController.getBycontact);
router.post('/submit-confirmation-code', StudentController.registerSubmitConfirmation);
router.post('/login', StudentController.login);
router.post('/recoveraccount', StudentController.recoveryPassword);
router.post('/resetverificationsubmit', StudentController.recoveryPassVerificationSubmit);
router.post('/changepassword', StudentController.changePassword);

// router.post('/sendpayment',Auth, StudentController.sendPayment);

module.exports = router
