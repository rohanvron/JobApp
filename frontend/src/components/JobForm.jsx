import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// admin job posting form
const JobForm = ({ job, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    contract: "",
    location: "",
    description: "",
    skills: "",
  });

  useEffect(() => {
    if (job) {
      setFormData(job);
    }
  }, [job]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEditing) {
      setFormData({
        company: "",
        position: "",
        contract: "",
        location: "",
        description: "",
        skills: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {isEditing ? "Edit Job" : "Create New Job"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="contract-label">Contract Type</InputLabel>
            <Select
              labelId="contract-label"
              id="contract"
              name="contract"
              value={formData.contract}
              onChange={handleChange}
              required
              label="Contract Type"
            >
              <MenuItem value="Full Time">Full Time</MenuItem>
              <MenuItem value="Part Time">Part Time</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Skills (comma-separated)"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"  }}>
          <Button
            type="submit"
            variant="contained"
            style={{
              borderRadius: 35,
              backgroundColor: "#682c94",
              itemAlign: "center",
            }}
          >
            {isEditing ? "Update Job" : "Create Job"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default JobForm;
