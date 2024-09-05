import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createJob,
  updateJob,
  deleteJob,
  getJobs,
} from "../redux/jobs/jobActions";

import {
  Paper,
  Typography,
  Grid,
  Dialog,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import JobForm from "../components/JobForm";
import JobCard from "../components/JobCard";
import ConfirmationPopup from '../components/ConfirmationPopup';

// admin page component

const AdminPage = ({ showOnlyJobs = false }) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);


  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  // handle create job
  const handleCreateJob = (jobData) => {
    dispatch(createJob(jobData));
  };

  // handle update job
  const handleUpdateJob = (jobId, updatedData) => {
    dispatch(updateJob(jobId, updatedData));
    setOpenEditDialog(false);
  };

  // handle delete click
  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setDeleteConfirmOpen(true);
  };

  // handle delete job confirmation
  const handleDeleteConfirm = () => {
    if (jobToDelete) {
      handleDeleteJob(jobToDelete._id);
    }
    setDeleteConfirmOpen(false);
    setJobToDelete(null);
  };

  // handle delete job
  const handleDeleteJob = (jobId) => {
    dispatch(deleteJob(jobId));
  };

  // handle open pop up for edit and update
  const handleOpenEditDialog = (job) => {
    setEditingJob(job);
    setOpenEditDialog(true);
  };

  return (
    <>
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        maxHeight: "calc(100vh - 32px)",
        overflow: "auto",
      }}
    >
      {!showOnlyJobs && (
        <>
          <Typography
          sx={{ display: "flex", justifyContent: "center"  }}
            variant="h4"
            gutterBottom
            style={{
              itemAlign: "center",
              color: "#682c94",
              fontWeight: "bold"
            }}
          >
            Admin Dashboard
          </Typography>
          <JobForm onSubmit={handleCreateJob} />
        </>
      )}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        {showOnlyJobs ? "Listed Jobs" : "Posted Jobs"}
      </Typography>
      {jobs.length === 0 ? (
        <Typography>No jobs posted yet.</Typography>
      ) : (
        <Grid container spacing={3}>
        {[...jobs].reverse().map(job => (
              <Grid item xs={12} sm={6} key={job._id}>
                <JobCard
                  job={job}
                  onEdit={() => handleOpenEditDialog(job)}
                  onDelete={() => handleDeleteClick(job)}
                />
              </Grid>
            ))}
        </Grid>
      )}

      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: { padding: "20px" },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={() => setOpenEditDialog(false)}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <JobForm
          job={editingJob}
          onSubmit={(updatedData) =>
            handleUpdateJob(editingJob._id, updatedData)
          }
          isEditing
        />
      </Dialog>
    </Paper>
    <ConfirmationPopup
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Job"
        message="Are you sure you want to delete this job? This action cannot be undone."
      />
    </>
  );
};

export default AdminPage;
