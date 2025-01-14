import { useParams } from 'react-router-dom';
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
import { CREATE_GRAPH_MUTATION } from '../graphql/index';
import { useMutation, useQuery } from "@apollo/client";
import { GET_RESTAURANT_BY_ID_QUERY } from '../graphql/index';

const theme = createTheme();

const mainFeaturedPost = {
    title: 'Plane Figure',
    description: "Want to know the distribution of the cafe? Scroll down!",
    image: Coffee_table,
    imageText: 'main image description',
};

const cards = [
    ['Floor', 'White'], ['Seat', 'Red'], ['Socket', 'Green'], ['Toilet', 'Blue'], 
    ['Not Available (wall, counter...)', 'Gray']
];
const cardcolor = ['#F0F0F0', '#FF5151', '#79FF79', '#66B3FF', '#7B7B7B'];

function Plane() {
    const { id, name, userid } = useParams();
    const [cafename, setCafeName] = useState('cafe name');
    const [maingraph, setMaingraph] = useState(Array.from({ length: 24 }, () => Array(24).fill('#7B7B7B')));
    const [color, setColor] = useState(['#7B7B7B', 0]);
    const containerRef = useRef(null);
    const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
    const navigate = useNavigate();

    const [createGraph] = useMutation(CREATE_GRAPH_MUTATION);

    const { data: fetchRestaurantData } = useQuery(GET_RESTAURANT_BY_ID_QUERY, {
        variables: { id: id }
    });
    useEffect(() => {
        if (fetchRestaurantData?.GetRestaurantById) {
            setCafeName(fetchRestaurantData.GetRestaurantById.name);
        }
    }, [fetchRestaurantData]);

    const handleSave = () => {
        createGraph({
            variables: { name, userid, restaurantid: id, graph: maingraph },
        });
        navigate(`/search/${name}/${userid}/cafe/${id}/plane`);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg" ref={containerRef}>
                <NavBar id={id} cafename={cafename} name={name} userid={userid} />
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
                </main>
                <Box textAlign="center" mt={4}>
                    <Typography variant="h5" gutterBottom>
                        Please try to draw according to the orientation of other maps!<br />
                        Please select the things (color) you want to draw:
                    </Typography>
                </Box>
                <Container maxWidth="md" sx={{ py: 4 }}>
                    <Grid container spacing={2} justifyContent="center">
                        {cards.map((card, index) => (
                            <Grid item key={index} xs={6} sm={4} md={2}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        backgroundColor: cardcolor[index],
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setColor([cardcolor[index], color[1] + 1])}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" align="center">
                                            {card[1]}
                                        </Typography>
                                        <Typography variant="body2" align="center">
                                            {card[0]}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Box textAlign="center" my={4}>
                    <Grid container justifyContent="center" spacing={0} sx={{
                        width: `${containerWidth / 1.5}px`,
                        height: `${containerWidth / 1.5}px`,
                        margin: 'auto',
                    }}>
                        {maingraph.map((row, i) => (
                            row.map((cell, j) => (
                                <Grid item key={`${i}-${j}`} xs={0.5}>
                                    <Box
                                        sx={{
                                            width: `${containerWidth / 36 - 1}px`,
                                            height: `${containerWidth / 36 - 1}px`,
                                            backgroundColor: cell,
                                            outline: '0.05px solid white',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => {
                                            const newGraph = maingraph.map(row => [...row]);
                                            newGraph[i][j] = color[0];
                                            setMaingraph(newGraph);
                                        }}
                                    />
                                </Grid>
                            ))
                        ))}
                    </Grid>
                </Box>
                <Box textAlign="center" mt={4}>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Finish drawing the map!
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Plane;
