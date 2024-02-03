import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useState} from 'react';

function AddCafeForm(props) {

  return (
    <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Basic Info
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                    // id="firstName"
                    // name="firstName"
                    label="Café Name"
                    fullWidth
                    variant="standard"
                    value={props.cafeName}
                    onChange={(e) => {props.setCafeName(e.target.value)}}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    // id="lastName"
                    // name="lastName"
                    label="Phone Number"
                    fullWidth
                    variant="standard"
                    value={props.phoneNum}
                    onChange={(e) => {props.setPhoneNum(e.target.value)}}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    // id="city"
                    // name="city"
                    label="City"
                    fullWidth
                    variant="standard"
                    value={props.city}
                    onChange={(e) => {props.setCity(e.target.value)}}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    // id="state"
                    // name="state"
                    label="District"
                    fullWidth
                    variant="standard"
                    value={props.district}
                    onChange={(e) => {props.setDistrict(e.target.value)}}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    // id="address1"
                    // name="address1"
                    label="Address"
                    fullWidth
                    variant="standard"
                    value={props.address}
                    onChange={(e) => {props.setAddress(e.target.value)}}
                />
            </Grid>
        </Grid>
    </React.Fragment>
  );
}
export default AddCafeForm;