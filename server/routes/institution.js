const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router();
const InstitutionController = require('../controllers/institution');

const Institution = require('../models/institution');
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
    Institution.find((err, docs)=>{
        res.json(docs)
    })
})

router.get('/deal', (req, res)=>{
    Institution.remove({},(err, docs)=>{
        res.json(docs)
    })
})


router.get('/checkauth', (req, res)=>{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, "ajlkhfkuthernqlfkvieo213109284312094j12!3240214");
    console.log(decoded, 'this is decoded')

    Institution.findById(decoded.id, ['institution_name', 'institution_contact', 'role', 'uniqueId', 'payment_completed', 'status'], (err, doc)=>{
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

router.post('/registerinstitution', InstitutionController.registerInstitution);
router.get('/:id', InstitutionController.getdetails);
router.post('/submit-confirmation-code', InstitutionController.registerSubmitConfirmation);
router.post('/login', InstitutionController.login);
router.post('/recoveraccount', InstitutionController.recoveryPassword);
router.post('/resetverificationsubmit', InstitutionController.recoveryPassVerificationSubmit);
router.post('/changepassword', InstitutionController.changePassword);
router.post('/sendpayment',Auth, InstitutionController.sendPayment);


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
