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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { message } from "antd";

const Styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '8vh',
};


const TFStyles = {
    display: 'flex',
    position: 'relative',
    top: '50%'
};

function TFRateButtonCard({setTFRates, TFrates}) {
    const navigate = useNavigate();
    const { id } = useParams()
    const [open, setOpen] = useState(false);
    const [ans, setRate] = useState(null);
    const [title, setTitle] = useState('');
    const [Truechecked, setTrueChecked] = useState(false);
    const [Falsechecked, setFalseChecked] = useState(false);
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
        for(let i=0;i<TFrates.length;i++){
            //console.log(TFrates[i].name)
            if(TFrates[i].name == title){
                displayMessage('error', 'already exist')  
                return
            }
        }
        if(title === '') setAlertOpen(true);
        else{
            setOpen(false);
            //console.log(TFrates)
            setTFRates([...TFrates, {name:title, Tnum:0, Fnum:0}])
            displayMessage('success', 'added successfully')  
        }   
    }

    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a">
            <Card sx={{ display: 'flex', height: '15vh', backgroundColor: '#F4F3F1'}}>
                <CardContent sx={{ flex: 1 }}>
                <div style = { {height: '2vh'} }/>
                <div style = {Styles}>
                    <Button variant="contained" size='large' onClick={handleClickOpen}>
                        What else do you want to add?
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add new rating</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Fill out the item you want to add and add true or false to the answer.
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


export default TFRateButtonCard;
/*<div style = {TFStyles}>
                                <FormControlLabel
                                    label = 'True'
                                    control={
                                        <Checkbox
                                            checked={Truechecked}
                                            onChange={ () => {setTrueChecked(!Truechecked)}}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    } 
                                />
                                <div style = {{width: '3vw'}}/>
                                <FormControlLabel
                                    label = 'False'
                                    control={
                                        <Checkbox
                                            checked={Falsechecked}
                                            onChange={ () => {setFalseChecked(!Falsechecked)}}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    } 
                                />
                            </div>*/