const Job = require('../models/job.model');

// create a new job
exports.createJob = async (req, res) => {
    const { company, position, contract, location, description, skills } = req.body;

    try {
        const job = await Job.create({ 
            company, 
            position, 
            contract, 
            location, 
            description, 
            skills: Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim()),
            postedBy: req.user.id 
        });
        res.json(job);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ error: 'Error creating job', details: error.message });
    }
};

// get all jobs
exports.getJobs = async (req, res) => {
    try {
      let jobs;
      if (req.user.role === 'admin') {
        jobs = await Job.find({ postedBy: req.user.id });
      } else {
        jobs = await Job.find();
      }
      const user = await User.findById(req.user.id);
      res.json({ jobs, appliedJobs: user.appliedJobs });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching jobs' });
    }
  };
  

// update a job
exports.updateJob = async (req, res) => {
    const { company, position, contract, location, description, skills } = req.body;

    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id, 
            { 
                company, 
                position, 
                contract, 
                location, 
                description, 
                skills: skills.split(',').map(skill => skill.trim())
            }, 
            { new: true }
        );
        res.json(job);
    } catch (error) {
        res.status(500).json({ error: 'Error updating job' });
    }
};

// delete a job
exports.deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting job' });
    }
};

const User = require('../models/user.model');

// apply for a job
exports.applyForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        
        const user = await User.findById(req.user.id);
        if (user.appliedJobs.includes(job._id)) {
            return res.status(400).json({ message: 'Already applied for this job' });
        }
        
        user.appliedJobs.push(job._id);
        await user.save();
        
        res.json({ message: 'Successfully applied for the job' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

