import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../components/JobCard";
import { getJobs, applyForJob } from "../redux/jobs/jobActions";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const UserPage = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const user = useSelector((state) => state.auth.user);
  const [filters, setFilters] = useState({
    company: "",
    location: "",
    contract: "",
  });

  const appliedJobs = useSelector((state) => state.jobs.appliedJobs);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.company.toLowerCase().includes(filters.company.toLowerCase()) &&
      job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      (filters.contract === "" || job.contract === filters.contract)
  );

  const handleApply = (jobId) => {
    dispatch(applyForJob(jobId));
  };

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
        Job Openings
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Search by company"
            name="company"
            value={filters.company}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Filter by location"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="contract-label">Filter by contract</InputLabel>
            <Select
              labelId="contract-label"
              id="contract-select"
              name="contract"
              value={filters.contract}
              label="Filter by contract"
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Full Time">Full Time</MenuItem>
              <MenuItem value="Part Time">Part Time</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {[...filteredJobs].reverse().map((job) => (
          <Grid item xs={12} sm={6} key={job._id}>
            <JobCard
              key={job._id}
              job={job}
              isUser={true}
              isApplied={appliedJobs.includes(job._id)}
              onApply={() => handleApply(job._id)}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default UserPage;
