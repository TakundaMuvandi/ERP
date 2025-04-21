const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName: { type: String, required: true }, // Name of the construction project
    description: { type: String, required: true }, // Details about the project
    location: { type: String, required: true }, // Where the project is being carried out
    projectType: {
        type: String,
        required: true
    },
    startDate: { type: Date, required: true }, // When the project starts
    isActive: { type: Boolean, default: true }, // Whether the project is currently active
    completionDate: { type: Date }, // When the project is completed (optional)
    status: { type: String, enum: ['planned', 'in progress', 'completed'], default: 'planned' }, // Progress tracking
    budget: { type: Number, required: true }, // Estimated project cost
    amountSpent: { type: Number, default: 0 }, // Funds spent so far
    projectManager: { type: String, required: true }, // Who is managing the project
    materials: [{ type: String }], // List of materials used
    attachments: [{ type: String }], // Documents, images, reports
}, { timestamps: true }); // Auto-adds createdAt & updatedAt fields

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;