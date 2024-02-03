import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { message } from "antd";

function FeaturedPost(props) {

    const [information, setInformation] = useState('');
    const [open, setOpen] = useState(false);
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
        if(information === '') setAlertOpen(true);
        else{
            setOpen(false);
            displayMessage('success', 'renewed successfully')  
        }   
    }

    return (
            <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex', height: '18vh' }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                    {props.title}
                    </Typography>
                    <div style={{height: '2vh'}}/>
                    <Typography variant="h6" paragraph>
                    {props.description}
                    </Typography>
                    {/* <Button onClick = {handleClickOpen}>
                        Edit
                    </Button> */}
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add new information</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Fill out the new information of this title.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Information"
                                fullWidth
                                variant="standard"
                                value = {information}
                                onChange = {(e) => setInformation(e.target.value)}
                            />
                            <div style={{height: '2vh'}}/>
                        </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleAdd}>Renew</Button>
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
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                    image={props.image}
                    alt={props.imageLabel}
                />
                </Card>
            </CardActionArea>
            </Grid>
    );
}


export default FeaturedPost;