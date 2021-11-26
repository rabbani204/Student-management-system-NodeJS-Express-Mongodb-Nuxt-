const express = require('express')
const router = express.Router();

const BatchController = require('../controllers/batch');

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



// for deve purpose clean collection
router.get('/deal', (req, res)=>{
    Admin.remove({},(err, docs)=>{
        res.json(docs)
    })
})

// add new batch
router.post('/', Auth, BatchController.addBatch);

router.post('/addstudent',Auth, BatchController.addStudent);
router.get('/getallstudent', BatchController.allStudent)

// get all batch
router.get('/', Auth, BatchController.getAll);
//get byId
router.get('/:id', Auth, BatchController.getdetails);

//get by institution id
router.get('/institution/:id', Auth, BatchController.getByInstitutionId);
// getDetails
//need to emplement after student section complete

// update batch
router.post('/:id', Auth, BatchController.updateBatch);
// delete batch
router.delete('/:id', Auth, BatchController.deleteBatch);

//send message
router.post('/send-message:id', Auth, BatchController.sendMessage);


module.exports = router
