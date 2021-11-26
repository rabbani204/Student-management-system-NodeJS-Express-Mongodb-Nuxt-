const express = require('express')
const router = express.Router();
const AdminController = require('../controllers/admin');

const Admin = require('../models/admin');
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
    Admin.find((err, docs)=>{
        res.json(docs)
    })
})

router.get('/deal', (req, res)=>{
    Admin.remove({},(err, docs)=>{
        res.json(docs)
    })
})

router.post('/', AdminController.addAdmin);
router.post('/login', AdminController.login);

router.get('/submittedpayments', AdminController.submittedPayments)
router.post('/accpetpayment', AdminController.accpetPayment)


// user profile update 
// router.post('/updateprofile/:id', upload.single('image'), Auth, UserController.updateProfile)

// add university details route for user 
// router.post('/universitydetails', Auth, UniversityDetails.universitydetails)
// add university details route for user 
// router.get('/getuniversitydetails', UniversityDetails.getuniversitydetails)

// features add for user background api
// router.post('/addfeatures', Auth, FeaturesController.addFeatures)
// all features get for user show
// router.get('/getfeatures', FeaturesController.getAllFeatures)
// features get by id for user show
// router.get('/getfeatures/:id', FeaturesController.getFeaturesById)

// course add for user background api
// router.post('/addcourse', Auth, CourseController.addcourse)
// all course get for user show
// router.get('/getcourse', CourseController.getAllCourse)
// course get by id for user show
// router.get('/getcourse/:id', CourseController.getCourseById)





module.exports = router
