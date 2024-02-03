import { useParams } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from '../component/MainFeaturedPost';
import NavBar from '../component/NavBar';
import Coffee_table from '../picture/coffee_table.jpg';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import {GET_RESTAURANT_BY_ID_QUERY, CREATE_COMMENT_MUTATION} from '../graphql/index';
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

const theme = createTheme();

const mainFeaturedPost = {
    title: 'Plane Figure',
    description:
        "Want to know the distribution of the cafe? scroll down !",
    image: Coffee_table,
    imageText: 'main image description',
    //linkText: "test linktext"
};

const cards = [['Floor','White'], ['Seat','Red'], ['Socket','Green'], ['Toilet','Blue'], ['Not Available(wall, counter......)','Black'],];
const cardcolor = ['#F0F0F0','#FF5151','#79FF79','#66B3FF','#7B7B7B']

function Plane(){
    const { id, name, userid } = useParams();
    const [cafename, setCafeName] = useState('cafe name');
    const colors = new Array(24);
    for (let j = 0; j < colors.length; j++) {
        colors[j] = new Array(24);
        for(let i = 0;i < colors[j].length;i++)colors[j][i] = '#7B7B7B';
    }
    //const testgraph = [colors,/*colors,colors,colors,colors,colors,colors,colors,colors,colors,colors,*/];
    const [maingraph, setMaingraph] = useState(colors);
    const [tmphook,setTmphook] = useState(true);
    useEffect((maingraph)=>{setTmphook(!tmphook)},[maingraph])
    const containerRef = useRef(null);
    const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
    const navigate = useNavigate();

    const { data: fetchRestaurantData, error: fetchRestaurantError, loading: fetchRestaurantLoading} = useQuery(GET_RESTAURANT_BY_ID_QUERY, {
        variables: {id: id}
    });

    useEffect((fetchRestaurantLoading)=>{//console.log(fetchRestaurantLoading,fetchRestaurantData,fetchRestaurantError);
        //console.log(fetchRestaurantData?.GetRestaurantById?.graph.at(-1))
        if(fetchRestaurantData?.GetRestaurantById !== undefined){
            //console.log(fetchRestaurantData?.GetRestaurantById?.graph)
            setCafeName(fetchRestaurantData?.GetRestaurantById?.name);
            if(fetchRestaurantData?.GetRestaurantById?.graph?.length > 0){
                //console.log('//')
                setMaingraph(fetchRestaurantData?.GetRestaurantById?.graph[Math.floor(Math.random() * fetchRestaurantData?.GetRestaurantById?.graph.length)])
                setCafeName(fetchRestaurantData?.GetRestaurantById?.name);
            }
            setTmphook(!tmphook);
        }
    },[fetchRestaurantLoading])

    return(
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg" ref={containerRef}>
                    <NavBar id = {id} cafename = {cafename} name={name} userid={userid}></NavBar>
                    <main>
                        <MainFeaturedPost post={mainFeaturedPost} />
                    </main>
                    
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Grid container spacing={1}>
                        {cards.map((i,index) => (
                            <Grid item key={i} xs={2} sm={2} md={index === 4 ? 4 : 2}>
                                <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: cardcolor[index] }}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {i[1]}
                                        </Typography>
                                        <Typography >
                                            {i[0]}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                        </Grid>
                    </Container>

                    <Grid container spacing={0} sx={{ width: `${containerWidth/3*2}px` , height:`${containerWidth/3*2}px` }}>
                        {/*console.log(maingraph)*/}
                        {
                        maingraph?.map((block,i) => {
                            return block.map((item,j)=>{
                                return<Grid item key={[i, j].join('_')} xs={0.5}>
                                    <Box
                                        sx={{ width: `${containerWidth/36 - 1}px` , height:`${containerWidth/36-1}px` }}
                                        style={{ backgroundColor: item, outline: '0.05px solid white' }}
                                    />
                                </Grid>
                            })}
                            
                        )}
                    </Grid>
                    <br></br>
                    <Button variant="outlined" style={{ margin: '2px' }} onClick={()=>{
                        if(fetchRestaurantData?.GetRestaurantById?.graph?.length > 0){
                            setMaingraph(fetchRestaurantData?.GetRestaurantById?.graph[Math.floor(Math.random() * fetchRestaurantData?.GetRestaurantById?.graph.length)])
                        }
                    }} >Want to see another graph?</Button>
                    <Button variant="outlined" style={{ margin: '2px' }} onClick={()=>{navigate('/search/'+name+'/'+userid+'/cafe/'+id+'/plane/create');}}>Create your own graph</Button>

                    <br></br>
                    <br></br>
                    <br></br>
                    
                </Container>
            </ThemeProvider>
               

            
        </>
    )
}

export default Plane
//<Button variant="outlined" onClick={()=>{setTmphook(!tmphook)}}>Create your own graph</Button>
/*
                    <Grid container spacing={1} sx={{ width: `${containerWidth}px` , height:`${containerWidth}px` }}>
                        
                        {
                        testgraph.map((graph,k)=>{
                            return <Grid item key={k} xs={0.5}>
                                {graph.map((block,i) => {
                                    //console.log(block);
                                    return block.map((item,j)=>{
                                        return<Grid item key={[i, j].join('_')} xs={0.5}>
                                            <Box
                                                sx={{ width: `${containerWidth/180 - 1}px` , height:`${containerWidth/180-1}px` }}
                                                style={{ backgroundColor: item, outline: '0.05px solid white' }}
                                            />
                                        </Grid>
                                    })}
                                    
                                )}
                            </Grid>
                        })}
                        
                    </Grid>
*/ 

                /*<AppBar position="fixed" sx={{ bg: 'black', color: 'white',top: 'auto', bottom: 0 }}>
                        <Box sx={{ fontSize: 5, fontWeight: 'bold' }}>Title</Box>
                    </AppBar> */