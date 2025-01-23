import React from 'react';
import dayjs from 'dayjs';
import { Grid, Typography, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

function BusinessHourForm({ businessHour, setBusinessHour }) {
  const handleTimeChange = (dayIndex, timeType, value) => {
    const updatedHours = [...businessHour];
    updatedHours[dayIndex][timeType] = value;
    setBusinessHour(updatedHours);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Typography variant="h6" gutterBottom>
        Business Hours
      </Typography>
      <Grid container spacing={3}>
        {daysOfWeek.map((day, index) => (
          <React.Fragment key={day}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                {day}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Open Time"
                type="time"
                defaultValue="09:00"
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 300 }} // 5 min steps
                fullWidth
                onChange={(e) => handleTimeChange(index * 2, 'body', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Close Time"
                type="time"
                defaultValue="21:00"
                InputLabelProps={{ shrink: true }}
                inputProps={{ step: 300 }} // 5 min steps
                fullWidth
                onChange={(e) => handleTimeChange(index * 2 + 1, 'body', e.target.value)}
              />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </LocalizationProvider>
  );
}

export default BusinessHourForm;
