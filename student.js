const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    studentID: { type: String, unique: true, required: true }, // Unique student identifier
    email: { type: String, unique: true, required: true },
    dateOfBirthst : { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    phone: { type: String },
    course: {
        type: String,
        lowercase: true,
        enum: [
            'cosmetology', 
            'metal fabrication', 
            'plumbing and drain laying', 
            'brick laying', 
            'motor mechanics', 
            'clothing', 
            'information technology', 
            'carpentry', 
            'electrical engineering', 
            'tourism and hospitality'
        ],
        required: true
    },
    address: { 
        street: String,
        city: String,
        state: String,
        zip: String
    },
    isActive: { type: Boolean, default: true }, // Whether the student is currently active
    payments: [{ 
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        method: { type: String, enum: ['cash', 'bank transfer', 'mobile money', 'card'], required: true },
        status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
    }]
}, { timestamps: true });


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;