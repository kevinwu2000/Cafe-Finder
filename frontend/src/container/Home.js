import { Typography } from 'antd';
import styled from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';
import home2 from '../picture/home2.jpg'
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const HomeBackground = styled.div`
	width : 100vw;
	height : 100vh;
	// background-color : #F5DEB3;
`

function Home() {
    const navigate = useNavigate();

    const LoginButton = {
        position : 'absolute',
        width : '8%',
        height : '6%',
        top : '5%',
        right : '5%',
        backgroundColor : 'gray',

    }

    const SignUpButton = {
        position : 'absolute',
        width : '8%',
        height : '6%',
        top : '5%',
        right : '15%',
        backgroundColor : 'gray'
    
    }

	return(
        <HomeBackground>
            <CssBaseline/>
            <Button variant="contained" size='large' color="primary" style={SignUpButton}
                onClick={() => {navigate('/register')}}
            > Sign Up </Button>
            <Button variant="contained" size='large' color="primary" style={LoginButton}
                onClick={() => {navigate('/login')}}
            > Log In </Button>

            <img src={home2} style={{width:'100%', height:'100%'}}>
            
                
            </img>

            
        </HomeBackground>
    )
}

export default Home;