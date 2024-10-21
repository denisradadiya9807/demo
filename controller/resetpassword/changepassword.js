const express = require('express');
const router = express.Router();
const mongoConection = require('../../utilities/connection');
const constants = require('../../utilities/constant');
const helper = require('../../utilities/helper');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
var http = require('http');
var url = require('url');
const crypto = require('crypto');
const userModel = require('../../models/reset.model'); // Import your User model
const { model } = require('mongoose');
require('dotenv').config();


const responseManager = {
    onSuccess: (message, data, res) => {
        res.status(200).json({ success: true, message, data });
    },
    onError: (error, res) => {
        res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
    }
};


// Create a transporter for Nodemailer
exports.reset =async (req, res) => {
    const { email } = req.body; // Extract email from request body
    let primary = mongoConection.useDb(constants.defaultDb);


    try {
      
        // const user = await User.findOne({ email });
        let userData = await primary.model(constants.Model.demo, userModel).findOne({ email}).lean();
        if (!userData) {
            return res.status(404).send('No user found with that email address.');
        }

        const transporter = nodemailer.createTransport({
            service :"gmail",
            port: 587,
            secure: true, // true for port 465, false for other ports
            auth: {
                user: 'denisradadiya71@gmail.com',
                pass: 'mrjg ofsl qfpc zbzn'
            },
            // logger: true,
            // debug: true
        });


        let mailDetails = {
            from: 'denisradadiya71@gmail.com',
            to: 'denisradadiya10@gmail.com',
            subject: 'test api',
            html: `Order MongoID : ${userData._id.toString()} - orderId : ${userData} - password reset link : ${email}`
            };
            transporter.sendMail(mailDetails, function (error, data) {
            if (error) {
            return responseManager.onError(error, res);
             } else {
            console.log("email sent success");    
            return responseManager.onSuccess('email link sent  successfully...', null, res);
            }
             });


        // async function main() {
        //     const info =await transporter.sendMail({
        //         from : transporter.auth.user   ,
        //         to : email,
        //         subject: "reseet password ",
        //         text: "hello word"});
        //     console.log("message sent :%s ", info.messageId);

        //     try {
        //         await main(info); // Call the send email function
        //     } catch (error) {
        //         console.error("Error sending email:", error);
        //         return res.status(500).send("Failed to send email.");
        //     }
            
        // }

        // const payload = { email: userData.email, userId: userData._id };
        // const resetToken = helper.generateAccessToken(payload);
        // // await userModel.passwordResetSchema({ email, resetToken });
        

        // let updateResult = await primary.model(constants.Model.demo, userModel).updateOne(
        //     { email },
        //     // { resetToken },
        //     { transporter}
        // );
        // console.log("Update Result:", updateResult);
        // console.log("Update Result:", email);
        // console.log("Update Result:", resetToken);
        // console.log("Update Result:", transporter);

        // Send the reset email
        // await sendResetEmail(userData.email, resetToken, transporter);
        // await transporter.sendMail(mailDetails);
        // console.log("Email sent successfully");

        // return responseManager.onSuccess('Reset link sent s your email!',null,res);
        
        } catch (error) {
            console.error(error);
            return responseManager.onError(error,res);
              }
};




