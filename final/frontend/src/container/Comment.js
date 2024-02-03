import { useParams } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from '../component/MainFeaturedPost';
import Comment_component from '../component/Comment_component';
import NavBar from '../component/NavBar';
import Coffee_cup_half from '../picture/coffee_cup_half.jpg';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {GET_RESTAURANT_BY_ID_QUERY, CREATE_COMMENT_MUTATION} from '../graphql/index';
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { message } from "antd";

const theme = createTheme();

const mainFeaturedPost = {
    title: 'Comments',
    description:
        "See what everyone thinks about the cafe, give us some thoughts yourself !",
    image: Coffee_cup_half,
    imageText: 'main image description',
};


function Comments(){
    const { id, name, userid } = useParams()
    const [cafename, setCafeName] = useState('cafe name');
    const [rate, setRate] = useState(0);
    const [text, setText] = useState('');
    const [comment, setComment] = useState([]);
    const [average_star, setAverage_star] = useState(3);

    const displayMessage = (status, msg) => {
        const content = {
            content: msg,
            duration: 1.5,
        };
        if(status === 'error') message.error(content);
        else message.success(content)
    }

    const { data: fetchRestaurantData, error: fetchRestaurantError, loading: fetchRestaurantLoading} = useQuery(GET_RESTAURANT_BY_ID_QUERY, {
        variables: {id: id}
    });
    const [createComment, createCommentData] = useMutation(CREATE_COMMENT_MUTATION);

    useEffect(()=>{//console.log(createCommentData)
        if(createCommentData?.data?.createComment !== undefined){
            //console.log(createCommentData?.data?.createComment)
            setComment(createCommentData?.data?.createComment)
            let tmp = 0.0;
            for(let i=0;i<createCommentData?.data?.createComment.length;i++)tmp += createCommentData?.data?.createComment[i].star
            tmp /= createCommentData?.data?.createComment.length
            tmp = tmp.toFixed(2);
            setAverage_star(tmp)
        }
    },[createCommentData])

    useEffect((RestaurantLoading)=>{//console.log(fetchRestaurantLoading,fetchRestaurantData?.GetRestaurantById,fetchRestaurantError);
        setCafeName(fetchRestaurantData?.GetRestaurantById?.name);
        if(fetchRestaurantData?.GetRestaurantById !== undefined){
            //console.log(fetchRestaurantData?.GetRestaurantById?.comments)
            setComment(fetchRestaurantData?.GetRestaurantById?.comments)
            let tmp = 0.0;
            for(let i=0;i<fetchRestaurantData?.GetRestaurantById?.comments?.length;i++)tmp += fetchRestaurantData?.GetRestaurantById?.comments[i].star
            //console.log(fetchRestaurantData?.GetRestaurantById?.comments?.length, tmp)
            tmp /= fetchRestaurantData?.GetRestaurantById?.comments?.length
            tmp = tmp.toFixed(2);
            setAverage_star(tmp)
        }
    },[fetchRestaurantLoading])

    const handleonClick = () => {
        const currentTime = new Date();
        const timeString = currentTime.toLocaleDateString() + ' ' + currentTime.toTimeString().split(' ').slice(0, 8)[0];
        console.log(timeString)
        //console.log({name:name, userid:userid, restaurantid:id, body:text, star:Number(rate), time:timeString})
        if(text === '' || rate === 0){
            displayMessage('error', 'Please leave some comments and star');
        }
        else{
            createComment({
                variables:{name:name, userid:userid, restaurantid:id, body:text, star:Number(rate), time:timeString},
            })
            setText('')
            setRate(0)
        }

    }

    return(
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg">
                    <NavBar id = {id} cafename = {cafename} name={name} userid={userid}></NavBar>
                    <main>
                        <MainFeaturedPost post={mainFeaturedPost} />
                    </main>
                </Container>
                <Container maxWidth="lg">
                    {/*<Typography component="legend">Leave a comment about the cafe!</Typography>*/}
                    <Rating name="no-value" value={rate} onChange={(e)=>{setRate(e.target.value);}} sx={{ padding:1 }}/>
                    <br/>
                    <TextField
                        id="outlined-multiline-static"
                        label="What is your opinion for this Cafe?"
                        multiline
                        fullWidth 
                        rows={4}
                        sx={{ padding:1 }}
                        onChange={(e)=>{setText(e.target.value)}}
                        value = {text}
                    />
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" onClick={handleonClick}>Summit</Button>
                    </Box>
                </Container>
                <br/>
                <Container maxWidth="lg">
                    <Typography variant="h5">
                        Average Star: {average_star}
                        <Rating name="read-only" value={average_star} precision={0.1} readOnly sx={{padding:1}}/>
                    </Typography>
                </Container>
                {
                    comment.map((item)=>{
                        return (
                            <Container maxWidth="lg">
                                <Comment_component name={item.name} body={item.body} star={item.star} time={item.time}/>
                            </Container>
                        )
                    })
                }

            </ThemeProvider>
            
        </>
    )
}

export default Comments

