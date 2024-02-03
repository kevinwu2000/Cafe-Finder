import * as React from 'react';
import dayjs from 'dayjs';
import {InputNumber, Space, Row} from 'antd';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function BusinessHourForm(props) {
	const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
	const handleChange = (newValue) => {
		setValue(newValue);
	};

	return (
		<React.Fragment>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<Typography variant="h6" gutterBottom>
					Business Hours
				</Typography>

				<Grid  item xs={12} md={6}>
					<Typography variant="h5" gutterBottom>
						Monday
					</Typography>
				</Grid>

				<Grid item xs={12} md={6}>
					<Space size="middle">
						<TextField
							id="time"
							label="Open TIme"
							type="time"
							defaultValue="07:30"
							InputLabelProps={{
							shrink: true,
							}}
							
							inputProps={{
							step: 300, // 5 min
							}}
							sx={{ width: 230 }}
							onChange={(e) => {
								let tmp = props.businessHour;
								tmp[0]['body'] = e.target.value;
								props.setBusinessHour(tmp)
								console.log(props.businessHour)
							}}
						/>
								to
						<TextField
							id="time"
							label="Close TIme"
							type="time"
							defaultValue="07:30"
							InputLabelProps={{
							shrink: true,
							}}
							
							inputProps={{
							step: 300, // 5 min
							}}
							sx={{ width: 230 }}
							onChange={(e) => {
								let tmp = props.businessHour;
								tmp[1]['body'] = e.target.value;
								props.setBusinessHour(tmp)
								console.log(props.businessHour)
							}}
						/>
					</Space>
				</Grid>

				<div style={{height:'3vh'}}></div>

				<Grid item xs={12} md={6}>
					<Typography variant="h5" gutterBottom>
						Tuesday
					</Typography>
				</Grid>

				<Grid item xs={12} md={6}>
					<Space size="middle">
						<TextField
							id="time"
							label="Open TIme"
							type="time"
							defaultValue="07:30"
							InputLabelProps={{
							shrink: true,
							}}
							
							inputProps={{
							step: 300, // 5 min
							}}
							sx={{ width: 230 }}
							onChange={(e) => {
								let tmp = props.businessHour;
								tmp[2]['body'] = e.target.value;
								props.setBusinessHour(tmp)
								console.log(props.businessHour)
							}}
						/>
								to
						<TextField
							id="time"
							label="Close TIme"
							type="time"
							defaultValue="07:30"
							InputLabelProps={{
							shrink: true,
							}}
							
							inputProps={{
							step: 300, // 5 min
							}}
							sx={{ width: 230 }}
							onChange={(e) => {
								let tmp = props.businessHour;
								tmp[3]['body'] = e.target.value;
								props.setBusinessHour(tmp)
								console.log(props.businessHour)
							}}
						/>
					</Space>
				</Grid>

				<div style={{height:'3vh'}}></div>

				<Grid item xs={12} md={6}>
					<Typography variant="h5" gutterBottom>
						Wednesday
					</Typography>
				</Grid>
				<Grid item xs={12} md={6}>
					<Space size="middle">
						<TextField
							id="time"
							label="Open TIme"
							type="time"
							defaultValue="07:30"
							InputLabelProps={{
							shrink: true,
							}}
							
							inputProps={{
							step: 300, // 5 min
							}}
							sx={{ width: 230 }}
							onChange={(e) => {
								let tmp = props.businessHour;
								tmp[4]['body'] = e.target.value;
								props.setBusinessHour(tmp)
								console.log(props.businessHour)
							}}
						/>
								to
						<TextField
							id="time"
							label="Close TIme"
							type="time"
							defaultValue="07:30"
							InputLabelProps={{
							shrink: true,
							}}
							
							inputProps={{
							step: 300, // 5 min
							}}
							sx={{ width: 230 }}
							onChange={(e) => {
								let tmp = props.businessHour;
								tmp[5]['body'] = e.target.value;
								props.setBusinessHour(tmp)
								console.log(props.businessHour)
							}}
						/>
					</Space>
				</Grid>

				<div style={{height:'3vh'}}></div>

				<Grid item xs={12} md={6}>
					<Typography variant="h5" gutterBottom>
						Thursday
					</Typography>
				</Grid>

				<Grid item xs={12} md={6}>
					<Space size="middle">
						<TextField
							id="time"
							label="Open TIme"
							type="time"
							defaultValue="07:30"
							InputLabelProps={{
							shrink: true,
							}}
							
							inputProps={{
							step: 300, // 5 min
							}}
							sx={{ width: 230 }}
							onChange={(e) => {
								let tmp = props.businessHour;
								tmp[6]['body'] = e.target.value;
								props.setBusinessHour(tmp)
								console.log(props.businessHour)
							}}
						/>
								to
						<TextField
							id="time"
							label="Close TIme"
							type="time"
							defaultValue="07:30"
							InputLabelProps={{
							shrink: true,
							}}
							
							inputProps={{
							step: 300, // 5 min
							}}
							sx={{ width: 230 }}
							onChange={(e) => {
								let tmp = props.businessHour;
								tmp[7]['body'] = e.target.value;
								props.setBusinessHour(tmp)
								console.log(props.businessHour)
							}}
						/>
					</Space>
				</Grid>

				<div style={{height:'3vh'}}></div>

				<Grid item xs={12} md={6}>
					<Typography variant="h5" gutterBottom>
						Friday
					</Typography>
				</Grid>

				<Grid item xs={12} md={6}>
					<Space size="middle">
						<TextField
							id="time"
							label="Open TIme"
							type="time"
							defaultValue="07:30"
							InputLabelProps={{
							shrink: true,
							}}
							
							inputProps={{
							step: 300, // 5 min
							}}
							sx={{ width: 230 }}
							onChange={(e) => {
								let tmp = props.businessHour;
								tmp[8]['body'] = e.target.value;
								props.setBusinessHour(tmp)
								console.log(props.businessHour)
							}}
						/>
								to
						<TextField
							id="time"
							label="Close TIme"
							type="time"
							defaultValue="07:30"
							InputLabelProps={{
							shrink: true,
							}}
							
							inputProps={{
							step: 300, // 5 min
							}}
							sx={{ width: 230 }}
							onChange={(e) => {
								let tmp = props.businessHour;
								tmp[9]['body'] = e.target.value;
								props.setBusinessHour(tmp)
								console.log(props.businessHour)
							}}
						/>
					</Space>
				</Grid>

				<div style={{height:'3vh'}}></div>

				<Grid item xs={12} md={6}>
					<Typography variant="h5" gutterBottom>
						Saturday
					</Typography>
				</Grid>

				<Grid item xs={12} md={6}>
					<Space size="middle">
						<TextField
							id="time"
							label="Open TIme"
							type="time"
							defaultValue="07:30"
							InputLabelProps={{
							shrink: true,
							}}
							
							inputProps={{
							step: 300, // 5 min
							}}
							sx={{ width: 230 }}
							onChange={(e) => {
								let tmp = props.businessHour;
								tmp[10]['body'] = e.target.value;
								props.setBusinessHour(tmp)
								console.log(props.businessHour)
							}}
						/>
								to
						<TextField
							id="time"
							label="Close TIme"
							type="time"
							defaultValue="07:30"
							InputLabelProps={{
							shrink: true,
							}}
							
							inputProps={{
							step: 300, // 5 min
							}}
							sx={{ width: 230 }}
							onChange={(e) => {
								let tmp = props.businessHour;
								tmp[11]['body'] = e.target.value;
								props.setBusinessHour(tmp)
								console.log(props.businessHour)
							}}
						/>
					</Space>
				</Grid>

				<div style={{height:'3vh'}}></div>

				<Grid item xs={12} md={6}>
					<Typography variant="h5" gutterBottom>
						Sunday
					</Typography>
				</Grid>

				<Grid item xs={12} md={6}>
					<Space size="middle">
						<TextField
							id="time"
							label="Open TIme"
							type="time"
							defaultValue="07:30"
							InputLabelProps={{
							shrink: true,
							}}
							
							inputProps={{
							step: 300, // 5 min
							}}
							sx={{ width: 230 }}
							onChange={(e) => {
								let tmp = props.businessHour;
								tmp[12]['body'] = e.target.value;
								props.setBusinessHour(tmp)
								console.log(props.businessHour)
							}}
						/>
								to
						<TextField
							id="time"
							label="Close TIme"
							type="time"
							defaultValue="07:30"
							InputLabelProps={{
							shrink: true,
							}}
							
							inputProps={{
							step: 300, // 5 min
							}}
							sx={{ width: 230 }}
							onChange={(e) => {
								let tmp = props.businessHour;
								tmp[13]['body'] = e.target.value;
								props.setBusinessHour(tmp)
								console.log(props.businessHour)
							}}
						/>
					</Space>
				</Grid>

			</LocalizationProvider>
			
		</React.Fragment>
	);
}

export default BusinessHourForm