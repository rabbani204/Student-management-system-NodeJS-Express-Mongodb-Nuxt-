const bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
const fs = require('fs');
const { json } = require('body-parser');
const e = require('express');

// const Institution = require('../models/institution');
const Batch = require('../models/batch');
const Student = require('../models/student');
const Parent = require('../models/parent');
const studentBatch = require('../models/student-batch');
const { Model } = require('mongoose');


//batch add
exports.addBatch = (req, res) => {
    var body = req.body;
    if (!body.batch_name) {
        res.json({
            success: false,
            message: 'Please check all input fields.',
            error: "There have some required fields"
        })
    }

    else {
        body.created_by = req.userdata.id
        body.institution = req.userdata.id
        console.log(body, 'thgi is body')
        Batch.create({
            ...body
        }).then(batch => {
            res.json({
                success: true,
                message: 'Successfully added batch',
                data: batch
            })
        })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'Something went wrong please see logs.',
                    error: err
                })
            })
    }
}


//get all batch
exports.getAll = (req, res) => {
    Batch.find({}, ['batch_name', 'batch_description'], (err, batch) => {
        if (err) {
            res.json({
                success: false,
                message: 'Failed to get data',
                error: err
            })
        }

        else {
            res.json({
                success: true,
                message: 'Batch get successfully',
                data: batch
            })
        }
    })
}

///get details ro getByID
exports.getdetails = (req, res) => {
    Batch.findById(req.params.id, (err, ins) => {
        if (err) {
            res.json({
                error: err
            })
        }
        else {
            res.json({
                data: ins
            })
        }
    })
}


//get By InstitutionID
exports.getByInstitutionId = (req, res) => {
    Batch.find({ institution: req.params.id }, (err, student) => {
        if (err) {
            res.json({
                success: false,
                error: err
            })
        }

        else {
            res.json({
                data: student
            })
        }
    })
}

exports.updateBatch = (req, res) => {
    Batch.findById(req.params.id, (err, batch) => {
        if (err) {
            res.json({
                success: false,
                message: 'Something went wrong!!',
                error: err
            })
        }

        else {
            if (req.body.batch_name) {
                batch.batch_name = req.body.batch_name;
            }

            if (req.body.batch_description) {
                batch.batch_description = req.body.batch_description;
            }

            batch.save().then(batch => {
                res.json({
                    success: true,
                    message: 'Successfully updated batch!!',
                    data: { batch_name: batch.batch_name, batch_description: batch.batch_description }
                })
            })
                .catch(error => {
                    res.json({
                        success: false,
                        message: 'Failed to update!!',
                        error: error
                    })
                })
        }
    })
}

exports.deleteBatch = (req, res) => {
    Batch.findByIdAndDelete(req.params.id, (err, success) => {
        if (err) {
            res.json({
                success: false,
                message: 'Something went wrong!'
            })
        }

        else {
            res.json({
                success: true,
                message: 'Successfully deleted!'
            })
        }
    })
}

exports.addStudent = (req, res) => {
    var body = req.body;
    if (!body.student_contact || !body.parent_contact || !body.batch) {
        res.json({
            success: false,
            message: 'There have some required fields.'
        })
    }
    var student_batch = {};

    function createbatch(studentid) {
        console.log(studentid)
        student_batch.student_id = studentid;
        student_batch.batch_id = body.batch._id;
        student_batch.about_student = body.about_student;
        student_batch.created_by = req.userdata.id;

        let studentbatch = new studentBatch({
            ...student_batch
        })

        studentbatch.save().then(stdnBtch => {
            console.log(stdnBtch)
            if (stdnBtch) {
                res.json({
                    success: true,
                    data: stdnBtch
                })
            }

            else {
                console.log('wn')
                res.json({
                    success: false,
                    message: "Went wrong!"
                })
            }
        }).catch(err => {
            console.log(err, 'error happens')
            res.json({
                success: false,
                error: err
            })
        })
    }
    if (!body._id) {
        bcrypt.hash(body.student_contact, 10, (err, hash) => {
            console.log(hash, 'student pass')
            if (err) {
                return res.json({
                    error: err,
                    message: "Password couldn't be saved"
                })
            }

            else {
                var student = new Student({
                    student_name: body.student_name,
                    student_contact: body.student_contact,
                    parent_contact: body.parent_contact,
                    role: 'student',
                    password: hash,
                    uniqueId: Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7)
                })

                student.save().then(stdnt => {
                    if (stdnt) {
                        console.log(stdnt)
                        createbatch(stdnt._id)
                        // student_batch.student_id = ;
                    }
                }).catch(err => {
                    console.log('student create error', err);
                })
            }
        })
    }

    else {
        createbatch(body._id)
    }

    console.log('student id is completed', student_batch);


    if (!body.parent_contact._id) {
        bcrypt.hash(body.parent_contact, 10, (err, hash) => {
            if (err) {
                return res.json({
                    error: err,
                    message: "Password couldn't be saved"
                })
            }

            else {
                var parent = new Parent({
                    parent_name: "please enter",
                    parent_contact: body.parent_contact,
                    role: 'parent',
                    password: hash,
                    uniqueId: Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7)
                })

                parent.save().then(prnt => {
                    if (prnt) {
                        console.log('sccess parent')
                    }
                }).catch(err => {
                    console.log(err, 'this is error!s p')
                })
                console.log(hash, 'parent pass')
            }
        })
    }

    console.log('parent pass')

}

exports.sendMessage = (req, res) => {
    console.log('Mwssage sending!!')
}

exports.allStudent = (req, res) => {
    console.log('Here all student')
    // Student.find()
    Student.find({}, (err, students) => {
        if (err) {
            res.json({
                success: false,
                message: 'Failed to get data',
                error: err
            })
        }

        else {
            res.json({
                success: true,
                message: 'Batch get successfully',
                data: students
            })
        }
    })
}

