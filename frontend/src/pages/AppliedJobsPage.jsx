import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getJobs } from "../redux/jobs/jobActions";
import JobCard from "../components/JobCard";
import { Paper, Grid, Typography } from "@mui/material";

// applied job page component dor users to see applied jobs
const AppliedJobsPage = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const user = useSelector((state) => state.auth.user);
  const appliedJobs = useSelector((state) => state.jobs.appliedJobs);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const appliedJobsData = jobs.filter((job) => appliedJobs.includes(job._id));

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        maxHeight: "calc(100vh - 32px)",
        overflow: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Applied Jobs
      </Typography>
      {appliedJobs.length === 0 ? (
        <Typography>You haven't applied to any jobs yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {appliedJobsData.map((job) => (
            <Grid item xs={12} sm={6} key={job._id}>
              <JobCard key={job._id} job={job} isUser={true} isApplied={true} />
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
};

export default AppliedJobsPage;
