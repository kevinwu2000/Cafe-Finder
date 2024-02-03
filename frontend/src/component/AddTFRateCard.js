import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import true_false from '../picture/true_false.jpg'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Person from '@mui/icons-material/Person'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { message } from "antd";
import { useState, useEffect } from 'react';
import {CREATE_TF_RATE_MUTATION} from '../graphql/index';
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { useParams } from 'react-router-dom'

const TFStyles = {
    position: 'relative',
    left: '1%',
};

const TStyle = {
    position: 'absolute',
    top: '50%',
    left: '0%'
}

const TpersonStyle = {
    position: 'absolute',
    top: '4vh',
    left: '7vh'
}

const TnumStyle = {
    position: 'absolute',
    top: '4vh',
    left: '10vh'
}

const FStyle = {
    position: 'absolute',
    top: '50%',
    left: '20vh'
}

const FpersonStyle = {
    position: 'absolute',
    top: '4vh',
    left: '27vh'
}

const FnumStyle = {
    position: 'absolute',
    top: '4vh',
    left: '30vh'
}

const EditStyles = {
    position: 'relative',
    left: '80%',
    top: '20%'
};

function AddTFRateCard({ title, Tnum, Fnum, TFrates, setTFRates }) {

    if(Tnum === undefined) Tnum = 0;
    if(Fnum === undefined) Fnum = 0;

    const [open, setOpen] = useState(false);
    const [Truechecked, setTrueChecked] = useState(false);
    const [Falsechecked, setFalseChecked] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const {name, userid, id } = useParams()
    const [createTFrate] = useMutation(CREATE_TF_RATE_MUTATION);

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

        if(Truechecked === true && Falsechecked === true){
            setAlertOpen(true);
        }
        else if(Truechecked === false && Falsechecked === false){
            setAlertOpen(true);
        }
        else{
            setOpen(false);
            displayMessage('success', 'added successfully')  
            createTFrate({
                variables:{
                    name:name,
                    userid:userid,
                    restaurantid:id,
                    ratewhat: title,
                    TF: Truechecked,
                }
            })
            /*let tmp = TFrates
            for(let i=0;i<tmp.length;i++){
                if(tmp[i].name == title && Truechecked){
                    tmp[i].Tnum.push({name, userid})
                }
                else if(tmp[i].name == title && !Truechecked){
                    console.log(tmp[i])
                    tmp[i].Fnum.push({name, userid})
                }
            }
            setTFRates(tmp)*/
        }   
    }

    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a">
                <Card sx={{ display: 'flex', height: '15vh', backgroundColor: '#F4F3F1'}}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                    {title}
                    </Typography>
                    <div style = { {height: '0.5vh'} }/>
                    <div style = {TFStyles}>
                        <div style = {TStyle}>
                            <CheckCircleOutlineIcon 
                                style = {{
                                    color: 'rgb(0, 128, 55)',
                                    fontSize: 60,
                                }}
                            /> 
                        </div>
                        <div style = {TpersonStyle}><Person/></div>
                        <div style = {TnumStyle}>
                            <Typography>{Tnum}</Typography>
                        </div>
                        <div style = {FStyle}>
                            <CancelOutlinedIcon
                                style = {{
                                    color: 'rgb(255, 0, 0)',
                                    fontSize: 60,
                                }}
                            /> 
                        </div>
                        <div style = {FpersonStyle}><Person/></div>
                        <div style = {FnumStyle}>
                            <Typography>{Fnum}</Typography>
                        </div>
                    </div>
                    <div style = {EditStyles}>
                        <Button size='large' onClick = {handleClickOpen}>Add your answer</Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Add new answer</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Add true or false to the question.
                                </DialogContentText>
                                <div style={{height: '2vh'}}/>                       
                                <div style = {TFStyles}>
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
                                </div>
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
                    image={true_false}
                    alt = 'Image Text'
                />
                </Card>
            </CardActionArea>
        </Grid>
    );
}


export default AddTFRateCard;