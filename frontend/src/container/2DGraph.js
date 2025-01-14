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
import { GET_RESTAURANT_BY_ID_QUERY } from '../graphql/index';
import { useQuery } from "@apollo/client";

const theme = createTheme();

const mainFeaturedPost = {
    title: 'Plane Figure',
    description: "Want to know the distribution of the cafe? Scroll down!",
    image: Coffee_table,
    imageText: 'main image description',
};

const cards = [['Door', 'White'], ['Seat', 'Red'], ['Socket', 'Green'], ['Toilet', 'Blue'], ['Not Available (wall, counter, etc.)', 'Gray']];
const cardColors = ['#F0F0F0','#FF5151','#79FF79','#66B3FF','#7B7B7B']

function Plane() {
    const { id, name, userid } = useParams();
    const [cafename, setCafeName] = useState('cafe name');
    const colors = new Array(24).fill(null).map(() => new Array(24).fill('#7B7B7B'));
    const [maingraph, setMaingraph] = useState(colors);
    const containerRef = useRef(null);
    const containerWidth = containerRef.current ? containerRef.current.offsetWidth : 0;
    const navigate = useNavigate();

    const { data: fetchRestaurantData } = useQuery(GET_RESTAURANT_BY_ID_QUERY, {
        variables: { id: id }
    });

    useEffect(() => {
        if (fetchRestaurantData?.GetRestaurantById) {
            setCafeName(fetchRestaurantData.GetRestaurantById.name);
            if (fetchRestaurantData.GetRestaurantById.graph?.length > 0) {
                setMaingraph(
                    fetchRestaurantData.GetRestaurantById.graph[
                        Math.floor(Math.random() * fetchRestaurantData.GetRestaurantById.graph.length)
                    ]
                );
            }
        }
    }, [fetchRestaurantData]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg" ref={containerRef}>
                    <NavBar id={id} cafename={cafename} name={name} userid={userid} />
                    <main>
                        <MainFeaturedPost post={mainFeaturedPost} />
                    </main>

                    <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={1}>
                        {cards.map((item, index) => (
                            <Grid item key={item[0]} xs={2} sm={2} md={index === 4 ? 4 : 2}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        backgroundColor: cardColors[item[1]], // Map to specific HEX code
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {item[1]}
                                        </Typography>
                                        <Typography>{item[0]}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    </Container>

                    {/* Centered 2D Plane */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            my: 4,
                        }}
                    >
                        <Grid
                            container
                            spacing={0}
                            sx={{
                                width: `${containerWidth / 3 * 2}px`,
                                height: `${containerWidth / 3 * 2}px`,
                            }}
                        >
                            {maingraph?.map((row, i) =>
                                row.map((color, j) => (
                                    <Grid item key={`${i}_${j}`} xs={0.5}>
                                        <Box
                                            sx={{
                                                width: `${containerWidth / 36 - 1}px`,
                                                height: `${containerWidth / 36 - 1}px`,
                                                backgroundColor: color,
                                                outline: '0.05px solid white',
                                            }}
                                        />
                                    </Grid>
                                ))
                            )}
                        </Grid>
                    </Box>

                    {/* Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, my: 2 }}>
                        <Button
                            variant="outlined"
                            sx={{ backgroundColor: cardColors[0], color: '#000', '&:hover': { backgroundColor: cardColors[0] } }}
                            onClick={() => {
                                if (fetchRestaurantData?.GetRestaurantById?.graph?.length > 0) {
                                    setMaingraph(
                                        fetchRestaurantData.GetRestaurantById.graph[
                                            Math.floor(Math.random() * fetchRestaurantData.GetRestaurantById.graph.length)
                                        ]
                                    );
                                }
                            }}
                        >
                            Want to see another graph?
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ backgroundColor: cardColors[1], color: '#fff', '&:hover': { backgroundColor: cardColors[1] } }}
                            onClick={() => {
                                navigate(`/search/${name}/${userid}/cafe/${id}/plane/create`);
                            }}
                        >
                            Create your own graph
                        </Button>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default Plane;
