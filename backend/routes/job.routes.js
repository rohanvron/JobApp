// routes for jobs

const express = require('express');
const { createJob, getJobs, updateJob, deleteJob, applyForJob } = require('../controllers/job.controller');
const { protect, adminOnly } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/', protect, adminOnly, createJob);
router.post('/:id/apply', protect, applyForJob);
router.get('/', protect, getJobs);
router.put('/:id', protect, adminOnly, updateJob);
router.delete('/:id', protect, adminOnly, deleteJob);

module.exports = router;
