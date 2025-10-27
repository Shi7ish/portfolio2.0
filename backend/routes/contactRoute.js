// routes/contactRoute.js
const express = require('express');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact'); // Import the Mongoose Model
const router = express.Router();

// 1. Initialize Nodemailer Transporter (same as before)
const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 2. Define the POST endpoint
router.post('/', async (req, res) => {
    const { customerName, customerEmail, messageBody } = req.body;

    // --- Data Validation and Saving to DB ---
    try {
        // Create a new Contact document based on the Mongoose Schema
        const newContact = new Contact({ customerName, customerEmail, messageBody });
        
        // Save the document to MongoDB
        await newContact.save();
        console.log('Contact form data saved to MongoDB successfully!');

        // --- Send Email Notification ---
        const mailContent = `
            New Portfolio Contact Form Submission

            Customer Details:
            --------------------------------------
            Name: ${customerName}
            Email: ${customerEmail}

            Message:
            --------------------------------------
            ${messageBody}

            (This message has also been saved to your MongoDB 'contacts' collection.)
        `;

        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: process.env.RECEIVING_EMAIL, 
            subject: `[Portfolio Inquiry] Message from ${customerName}`,
            text: mailContent,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email notification sent to ${process.env.RECEIVING_EMAIL}`);

        // Send a combined success response
        res.status(200).json({ 
            message: 'Message sent and saved successfully. I will respond within 24 hours.' 
        });

    } catch (error) {
        // Handle Mongoose validation errors or other server errors
        console.error('Submission error:', error.message);
        
        // Check for specific Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
    }
});

module.exports = router;