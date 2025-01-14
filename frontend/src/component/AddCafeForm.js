import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function AddCafeForm(props) {
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mb: 2 }}>
        Basic Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Café Name"
            fullWidth
            variant="outlined"
            required
            value={props.cafeName}
            onChange={(e) => props.setCafeName(e.target.value)}
            sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={props.phoneNum}
            onChange={(e) => props.setPhoneNum(e.target.value)}
            sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            fullWidth
            variant="outlined"
            value={props.city}
            onChange={(e) => props.setCity(e.target.value)}
            sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="District"
            fullWidth
            variant="outlined"
            value={props.district}
            onChange={(e) => props.setDistrict(e.target.value)}
            sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Address"
            fullWidth
            variant="outlined"
            required
            value={props.address}
            onChange={(e) => props.setAddress(e.target.value)}
            sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default AddCafeForm;