const mongoose = require('mongoose');

// job schemas
const jobSchema = new mongoose.Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    contract: { type: String, enum: ['Full Time', 'Part Time'], required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    skills: { type: [String], required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Job', jobSchema);
