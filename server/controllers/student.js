const Student = require('../models/student')
const bcrypt = require('bcrypt')
const token = require('jsonwebtoken')
var nodemailer = require('nodemailer');
const fs = require('fs');
const { request } = require('http');
const { json } = require('body-parser');
const { stderr } = require('process');
const { STATES } = require('mongoose');

exports.getdetails = (req, res) => {
    Student.findById(req.params.id, (err, ins)=>{
        if(err){
            res.json({
                error: err
            })
        }

        else{
            res.json({
                data: ins
            })
        }
    })
}

exports.getBycontact = (req, res) => {
    Student.findOne({student_contact:req.params.id}, (err, student)=>{
        if(err){
            res.json({
                success: false,
                error: err
            })
        }

        else{
            res.json({
                data: student
            })
        }
    })
}


exports.registerStudent = (req, res) => {
    req.body.role = "student";
    // req.checkBody('email', 'Password should be at least 6 characters long').trim().isEmail();
    // req.checkBody('password', 'Password should be at least 6 characters long').trim().isLength({ min: 6 });
    Student.find({ student_contact: req.body.student_contact }, (err, student) => {
        if (student.length) {
            res.json({
                error: err,
                message: "Student already exis!"
            })
        }
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.json({
                        error: err,
                        message: "Password couldn't be saved"
                    })
                } else {
                    req.body.password = hash
                    req.body.sendKey = Math.floor(Math.random() * 90000) + 10000;

                    var student = new Student({
                        ...req.body
                    })

                    const output = `
							<p>This mail is from careerline.io</p>
							<h3>5 digit Account Activation Code</h3>
							<ul>  
							<li>Username: ${req.body.student_name}</li>
							<li>Email: ${req.body.email}</li>
							<li>Activatin Code: ${req.body.sendKey}</li>
							</ul>
							<h3>Stay With careerline.io to build your career</h3>
							<p>If you are not accpect this message just ignore.</p>
						`;

                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        secure: false,
                        // true for 465, false for other ports
                        auth: {
                            user: 'rabbani15204@gmail.com', // generated ethereal user
                            pass: 'programming' // generated ethereal password
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });

                    // setup email data with unicode symbols
                    let mailOptions = {
                        from: '"careerline.io" <rabbani15204@gmail.com>', // sender address
                        to: req.body.email, // list of receivers
                        subject: 'Account Activation Code', // Subject line
                        text: 'Active Your Account?', // plain text body
                        html: output // html body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        // console.log('Message sent: %s', info.messageId);
                        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    });

                    student.save()
                        .then(student => {
                            res.status(201).json({
                                success: true,
                                message: "Admin added successful",
                                data: student,
                            })
                        }).catch(err => {
                            res.json({
                                success: false,
                                message: "Please Check Data Again",
                                message: err,
                            })
                        })
                }
            })
        }
    })
}

exports.registerSubmitConfirmation = (req, res) => {
    Student.find({ student_contact: req.body.student_contact }, (err, student) => {
        console.log(err, student, 'st')
        if (err) {
            res.json({
                success: false,
                message: err
            })
        }

        else {
            if (student[0].sendKey == req.body.confirmation_code) {
                student[0].sendKey = 'completed'

                student[0].save().then(docs => {
                    res.json({
                        success: true,
                        data: docs
                    })
                })
            }

            else {
                res.json({
                    success: false,
                    message: "Code Not Match!!"
                })
            }
        }

    })
}

//login

exports.login = (req, res) => {
    console.log(req.body, 'this is body!!')
    // req.checkBody('email', 'Password should be at least 6 characters long').trim().isEmail();
    // req.checkBody('password', 'Password should be at least 6 characters long').trim().isLength({ min: 6 });

    Student.find({ student_contact: req.body.student_contact }, (err, student) => {
        console.log(student, err, 'user form contr')
        if (!student.length) {
            return res.json({
                message: "Auth Failed",
                success: false,
            })
        } else {
            bcrypt.compare(req.body.password, student[0].password, (err, result) => {
                if (err) {
                    return res.json({
                        message: "Auth Failed",
                        success: false,
                    })
                }
                if (result) {
                    const jwtTkoen = token.sign({
                        id: student[0].id,
                        student_contract: student[0].student_contract,
                        uniqueId: student[0].uniqueId
                    }, "ajlkhfkuthernqlfkvieo213109284312094j12!3240214", {
                        expiresIn: "30d",
                    })
                    return res.json({
                        message: "Auth Successful",
                        success: true,
                        token: jwtTkoen,
                        data: student[0],
                    })
                }
                return res.json({
                    message: "Auth Failed",
                    success: false,
                })
            })
        }
    })
}

exports.recoveryPassword = (req, res) => {
    console.log(req.body, 'asd')
    Student.find({ student_contact: req.body.institution_contract }, (err, ins) => {
        console.log(ins, err, 'user form contr')
        if (!ins.length) {
            return res.json({
                message: "This number is not associated with any account!",
                success: false,
            })
        } else {
            ins[0].reset_verification_code = Math.floor(Math.random() * 90000) + 10000;

            const output = `
							<p>This mail is from careerline.io</p>
							<h3>5 digit Account Activation Code</h3>
							<ul>  
							<li>Username: ${req.body.institution_name}</li>
							<li>Email: ${req.body.email}</li>
							<li>Activatin Code: ${ins[0].reset_verification_code}</li>
							</ul>
							<h3>Stay With careerline.io to build your career</h3>
							<p>If you are not accpect this message just ignore.</p>
						`;

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                secure: false,
                // true for 465, false for other ports
                auth: {
                    user: 'rabbani15204@gmail.com', // generated ethereal user
                    pass: 'programming' // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"careerline.io" <rabbani15204@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: 'Account Activation Code', // Subject line
                text: 'Active Your Account?', // plain text body
                html: output // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                // console.log('Message sent: %s', info.messageId);
                // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });

            ins[0].save().then(institution => {
                res.json({
                    success: true,
                    message: "Please enter verification code !!",
                    institution: institution,
                })
            }).catch(err => {
                res.json({
                    success: false,
                    message: "Please check phone number now!",
                    message: err,
                })
            })

        }
    })
}


// ***************************************************************
// Need to generate a token to confirm not extrenal request
// ***************************************************************

exports.recoveryPassVerificationSubmit = (req, res) => {
    Student.find({ student_contact: req.body.student_contact }, (err, ins) => {
        console.log(err, ins, 'errins')
        if (err) {
            res.json({
                success: false,
                message: err
            })
        }

        else {
            if (ins[0].reset_verification_code == req.body.verification_code) {
                ins[0].reset_verification_code = 'completed'

                ins[0].save().then(docs => {
                    res.json({
                        success: true,
                        data: docs
                    })
                })
            }

            else {
                res.json({
                    success: false,
                    message: "Code not match!!"
                })
            }
        }

    })
}

exports.changePassword = (req, res) => {
    Student.find({ student_contact: req.body.student_contact }, (err, student) => {
        console.log(err, student, 'errstudent')
        if (err) {
            res.json({
                success: false,
                message: err
            })
        }

        else {
            if (student[0].reset_verification_code == 'completed') {
                console.log(req.body.password,'showing before hash')
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    console.log(hash, 'this is afte ash')
                    student[0].password = hash;
                    student[0].save()
                        .then(institution => {
                            console.log(institution, 'after save')
                            res.json({
                                success: true,
                                message: "Password changed successful",
                                institution: institution,
                            })
                        }).catch(err => {
                            res.json({
                                success: false,
                                message: "Please check password fields.",
                                message: err,
                            })
                        })
                })
            }
            else {
                res.json({
                    success: false,
                    message: 'Something went wrong please contact us.'
                })
            }
        }

    })
}