import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Rate from '../picture/rate.png'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import { message } from "antd";

const Styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '8vh',
};

function RateButtonCard({rates, setRates}) {
    const navigate = useNavigate();
    const { id } = useParams()
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [rate, setRate] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);

    const displayMessage = (status, msg) => {
        const content = {
            content: msg,
            duration: 1.5,
        };
        if(status === 'error') message.error(content);
        else message.success(content)
    }

    const handleClickOpen = () => {
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const handleAlertClose = () => {
        setAlertOpen(false)
    }

    const handleAdd = () => {
        for(let i=0;i<rates.length;i++){
            if(rates[i].name == title){
                displayMessage('error', 'already exist')  
                return
            }
        }
        if(title === '') setAlertOpen(true);
        else{
            setOpen(false);
            displayMessage('success', 'added successfully')  
            setRates([...rates, {name:title, body:0}])
        }   
    }

    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a">
            <Card sx={{ display: 'flex', height: '15vh', backgroundColor: '#F4F3F1'}}>
                <CardContent sx={{ flex: 1 }}>
                <div style = { {height: '2vh'} }/>
                <div style = {Styles}>
                    <Button variant="contained" size='large' onClick={handleClickOpen} >
                        What else do you want to rate ?
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add new rating</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Fill out the item you want to rate and the score of the item.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Title"
                                type="email"
                                fullWidth
                                variant="standard"
                                value = {title}
                                onChange = {(e) => setTitle(e.target.value)}
                            />
                            <div style={{height: '2vh'}}/>
                            
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleAdd}>Add</Button>
                            <Dialog
                                open={alertOpen}
                                onClose={handleAlertClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    Invalid submit
                                </DialogTitle>
                                <DialogActions>
                                <Button onClick={handleAlertClose} autoFocus>
                                    Close
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </DialogActions>
                    </Dialog>
                </div>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                    image={Rate}
                    alt = 'Image Text'
                />
            </Card>
            </CardActionArea>
        </Grid>
    );
}


export default RateButtonCard;

/*<Rating
                                name = "simple-controlled"
                                value = {rate}
                                onChange = {(e) => { setRate(e.target.value) }}
                            />*/