// models/Contact.js
const mongoose = require('mongoose');

// The Schema section defines the structure, data types, and validation rules.
const contactSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: 100,
    },
    customerEmail: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        // Basic email format validation
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    messageBody: {
        type: String,
        required: [true, 'Message is required'],
        minlength: 10,
    },
    // Automatically adds 'createdAt' and 'updatedAt' timestamps
}, { timestamps: true });

// Create the model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;