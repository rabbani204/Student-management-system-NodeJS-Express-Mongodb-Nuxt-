const Institution = require('../models/institution')
const bcrypt = require('bcrypt')
const token = require('jsonwebtoken')
var nodemailer = require('nodemailer');
const fs = require('fs');
const { request } = require('http');
const { json } = require('body-parser');

exports.getdetails = (req, res) => {
    Institution.findById(req.params.id, (err, ins)=>{
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

exports.registerInstitution = (req, res) => {
    req.body.role = "insadmin";
    // req.checkBody('email', 'Password should be at least 6 characters long').trim().isEmail();
    // req.checkBody('password', 'Password should be at least 6 characters long').trim().isLength({ min: 6 });
    Institution.find({ institution_contract: req.body.institution_contract }, (err, ins) => {
        if (ins.length) {
            res.json({
                error: ins,
                message: "Institution already exis!"
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

                    var institution = new Institution({
                        ...req.body
                    })

                    const output = `
							<p>This mail is from careerline.io</p>
							<h3>5 digit Account Activation Code</h3>
							<ul>  
							<li>Username: ${req.body.institution_name}</li>
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

                    institution.save()
                        .then(institution => {
                            res.status(201).json({
                                success: true,
                                message: "Admin added successful",
                                institution: institution,
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
    Institution.find({ institution_contract: req.body.institution_contract }, (err, ins) => {
        console.log(err, ins, 'errins')
        if (err) {
            res.json({
                success: false,
                message: err
            })
        }

        else {
            if (ins[0].sendKey == req.body.confirmation_code) {
                ins[0].sendKey = 'completed'

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
                    message: "Code Not Match!!"
                })
            }
        }

    })
}

// exports.alluser = (req, res)=>{
// 	User.find({}).then(result => {
// 		res.status(201).json({
// 			message: "Allergies Get Successful",
// 			data: result,
// 			count: result.length,
// 		})
// 	})
// }

exports.login = (req, res) => {
    console.log(req.body, 'this is body!!')
    // req.checkBody('email', 'Password should be at least 6 characters long').trim().isEmail();
    // req.checkBody('password', 'Password should be at least 6 characters long').trim().isLength({ min: 6 });

    Institution.find({ institution_contract: req.body.institution_contract }, (err, ins) => {
        console.log(ins, err, 'user form contr')
        if (!ins.length) {
            return res.json({
                message: "Auth Failed",
                success: false,
            })
        } else {
            bcrypt.compare(req.body.password, ins[0].password, (err, result) => {
                if (err) {
                    return res.json({
                        message: "Auth Failed",
                        success: false,
                    })
                }
                if (result) {
                    const jwtTkoen = token.sign({
                        id: ins[0].id,
                        institution_contract: ins[0].institution_contract,
                        uniqueId: ins[0].uniqueId
                    }, "ajlkhfkuthernqlfkvieo213109284312094j12!3240214", {
                        expiresIn: "30d",
                    })
                    return res.json({
                        message: "Auth Successful",
                        success: true,
                        token: jwtTkoen,
                        data: ins[0],
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
    Institution.find({ institution_contract: req.body.institution_contract }, (err, ins) => {
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
    Institution.find({ institution_contract: req.body.institution_contract }, (err, ins) => {
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
    Institution.find({ institution_contract: req.body.institution_contract }, (err, ins) => {
        console.log(err, ins, 'errins')
        if (err) {
            res.json({
                success: false,
                message: err
            })
        }

        else {
            if (ins[0].reset_verification_code == 'completed') {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    ins[0].password = hash;
                    ins[0].save()
                        .then(institution => {
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

exports.sendPayment = (req, res) => {
    Institution.findById(req.userdata.id, (err, ins) => {
        ins.payment_sender_name = req.body.name;
        ins.payment_bkash_number = req.body.bkash_number;
        ins.payment_key = req.body.transcation_id;
        ins.payment_date = Date.now()

        ins.save().then(result => {
            if (result) {
                res.json({
                    success: true,
                    message: 'Payment recived admin will check and confirm within 24 hour.',
                    data: result
                })
            }
        })
            .catch(err => {
                res.json({
                    success: false,
                    message: 'Payment recived error.',
                    error: err
                })
            })
    })
}


// admin own registration 
exports.addAdmin = (req, res) => {
    // req.checkBody('email', 'Password should be at least 6 characters long').trim().isEmail();
    // req.checkBody('password', 'Password should be at least 6 characters long').trim().isLength({ min: 6 });


    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.json({
                error: err,
                message: "Password couldn't be saved"
            })
        } else {
            User.create({
                email: req.body.email,
                password: hash,
                role: req.body.role,
            }).then(user => {
                res.status(201).json({
                    success: true,
                    message: "Add Admin Post Successful",
                    // id: user.id,
                    user: user
                })
            }).catch(err => {
                console.log(err);
                res.json({
                    success: false,
                    message: "Add Admin Post Failed",
                    message: err,
                })
            })
        }
    });
}


//super admin update admin

exports.updateAdmin = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        User.findById(req.id, { password: 0 }, (err, user) => {
            if (err) {
                console.log(err)
                res.status(500).json({
                    error: err,
                    success: false
                })
            } else {
                var user = new User({
                    email: req.body.email,
                    password: hash,
                    user_first_name: req.body.user_first_name,
                    user_last_name: req.body.user_last_name,
                    user_gender: req.body.user_gender,
                    user_semister: req.body.user_semister,
                    user_department: req.body.user_department,
                    // image: image,
                    user_birth: req.body.user_birth,
                    user_address: req.body.user_address,
                    user_contract: req.body.user_contract,
                    status: req.body.status,
                    created_by: req.body.created_by,
                    updated_at: req.body.created_by
                })
                User.findByIdAndUpdate(req.params.id, {
                    email: req.body.email,
                    password: hash,
                    user_first_name: req.body.user_first_name,
                    user_last_name: req.body.user_last_name,
                    user_gender: req.body.user_gender,
                    user_semister: req.body.user_semister,
                    user_department: req.body.user_department,
                    // image: image,
                    user_birth: req.body.user_birth,
                    user_address: req.body.user_address,
                    user_contract: req.body.user_contract,
                    status: req.body.status,
                    created_by: req.body.created_by,
                    updated_at: req.body.created_by
                }, user, (err, user) => {
                    if (err) return res.status(500).send("There is problem fo getting")
                    else return res.status(200).json({ user: user })
                })
            }
        })
    });
}


// super admin delete admin

exports.deleteAdmin = (req, res) => {
    User.findById(req.params.id, { password: 0 }, (err, user) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        else {
            User.findByIdAndRemove(req.params.id, (err, user) => {
                if (err) return res.status(500).send("There is problem fo getting")
                else return res.status(200).json({ user: user })
            })
        }
    })
}




// all user update profile 

exports.updateProfile = (req, res) => {
    // req.checkBody('first_name', 'Please Fill Up First Name').trim().notEmpty();
    // req.checkBody('last_name', 'Please Fill Up Last Name').trim().notEmpty();
    // req.checkBody('contact', 'Please Fill Up Contact Number').trim().notEmpty();
    // req.checkBody('unit_apartment', 'Please Fill Up Apartment or Unit Number').trim().notEmpty();
    // req.checkBody('street_address', 'Please Fill Up Street Address').trim().notEmpty();
    // req.checkBody('suburb', 'Please Fill Up Suburb').trim().notEmpty();
    // req.checkBody('city', 'Please Fill Up City').trim().notEmpty();

    var body = req.body
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        User.findById(req.params.id, (err, user) => {
            if (err) {
                // if (req.file) {
                //     fs.unlink(req.file.path, (err) => {
                //         if (err) console.log(err);
                //         console.log(req.file.path + ' was deleted');
                //     });
                // }
                return res.status(500).json({
                    error: err,
                    success: false
                })
            }
            if (!user) {
                return res.status(500).json({
                    message: "NO user found",
                    success: false
                })
            }
            else {
                // let image = "";
                // if(req.file){
                //     image = req.file.path
                // }
                var user = new User({
                    email: body.email,
                    password: hash,
                    user_first_name: body.user_first_name,
                    user_last_name: body.user_last_name,
                    user_gender: body.user_gender,
                    user_semister: body.user_semister,
                    user_department: body.user_department,
                    image: image,
                    user_birth: body.user_birth,
                    user_address: body.user_address,
                    user_contract: body.user_contract,
                    status: body.status,
                    created_by: body.created_by
                })
                User.findByIdAndUpdate(req.params.id, {
                    email: body.email,
                    password: hash,
                    user_first_name: body.user_first_name,
                    user_last_name: body.user_last_name,
                    user_gender: body.user_gender,
                    user_semister: body.user_semister,
                    user_department: body.user_department,
                    image: image,
                    user_birth: body.user_birth,
                    user_address: body.user_address,
                    user_contract: body.user_contract,
                    status: body.status,
                    created_by: body.created_by
                }, user, (err, user) => {
                    if (err) {
                        return res.status(500).json({
                            error: err,
                            success: false
                        })
                    } else {
                        return res.status(200).json({
                            message: "Update Profile successful",
                            success: true,
                            data: user
                        })
                    }
                })
            }
        })
    })
}