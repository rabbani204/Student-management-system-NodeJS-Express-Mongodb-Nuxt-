const Admin = require('../models/admin')
const Institution = require('../models/institution')
const bcrypt = require('bcrypt')
const token = require('jsonwebtoken')
var nodemailer = require('nodemailer');
const fs = require('fs');
const { request } = require('http');
const { json } = require('body-parser');
const e = require('express');

// admin add
exports.addAdmin = (req, res) => {
    console.log("Hello controller!!")
    // req.checkBody('email', 'Password should be at least 6 characters long').trim().isEmail();
    // req.checkBody('password', 'Password should be at least 6 characters long').trim().isLength({ min: 6 });
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.json({
                error: err,
                message: "Password couldn't be saved"
            })
        } else {
            Admin.create({
                email: req.body.email,
                password: hash,
                role: req.body.role,
                admin_name: req.body.admin_name,
                admin_contract: req.body.admin_contract,
                admin_address: req.body.admin_address,
                image: req.body.image,
                status: true,
                register_ip: req.body.register_ip,
                created_by: req.body.created_by,
            }).then(admin => {
                res.status(201).json({
                    success: true,
                    message: "Admin added successfully!",
                    // id: user.id,
                    admin: admin
                })
            }).catch(err => {
                console.log(err);
                res.json({
                    success: false,
                    message: "Failed to add admin!",
                    message: err,
                })
            })
        }
    });
}


// admin login
exports.login = (req, res) => {
    console.log(req.body, 'this is body!!')
    // req.checkBody('email', 'Password should be at least 6 characters long').trim().isEmail();
    // req.checkBody('password', 'Password should be at least 6 characters long').trim().isLength({ min: 6 });

    Admin.find({ email: req.body.email }, (err, admin) => {
        console.log(admin, err, 'user form contr')
        if (!admin.length) {
            return res.json({
                message: "Auth Failed",
                success: false,
            })
        } else {
            bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
                if (err) {
                    return res.json({
                        message: "Auth Failed",
                        success: false,
                    })
                }
                if (result) {
                    const jwtTkoen = token.sign({
                        id: admin[0].id,
                        email: admin[0].email,
                        role: admin[0].role
                    }, "ajlkhfkuthernqlfkvieo213109284312094j12!3240214", {
                        expiresIn: "30d",
                    })
                    return res.json({
                        message: "Auth Successful",
                        success: true,
                        token: jwtTkoen,
                        data: admin[0],
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

//Found submitted payments
exports.submittedPayments = (req, res)=>{
    Institution.find({ payment_key: { $exists: true } } ,(err, payments)=>{
        console.log(err,payments)
        res.json({
            success: true,
            data: payments
        })
    })
}

//Accpet Payments
exports.accpetPayment = (req, res)=>{
    Institution.findById(req.body.id, (err, payments)=>{
        console.log(payments, 'po')
       if(err){
           res.json({
               success: false,
               message: 'Something went wrong!',
               error: err
           })
       }

       else{
           payments.payment_completed = 'completed'
           payments.save().then(pay=>{
               res.json({
                   success: true,
                   message: 'Successfully updated!!',
                   data: pay
               })
           }).catch(error=>{
               res.json({
                success: false,
                message: 'Something went worong!!',
                error: error
               })
           })
       }
    })
}
