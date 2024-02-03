import Header from './Header';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useHooks} from '../container/hooks/Hooks'
import { useEffect, useState } from 'react';

const theme = createTheme();

function NavBar({cafename, name, id, userid}){
    const {user, setUser, restaurant, setRestaurant} = useHooks();

    //console.log(user)
    //console.log(restaurant)

    const sections = [
        { title: 'About', url: `/search/${name}/${userid}/cafe/${id}` },
        { title: 'Review', url: `/search/${name}/${userid}/cafe/${id}/review` },
        { title: 'Comments', url: `/search/${name}/${userid}/cafe/${id}/comments` },
        { title: 'Plane Figure', url: `/search/${name}/${userid}/cafe/${id}/plane` },
        
    ];

    return(
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Container maxWidth="lg">
                    <Header title={cafename} sections={sections} name={name} userid={userid}></Header>
                </Container>
        </ThemeProvider>
    )
}

export default NavBar;

