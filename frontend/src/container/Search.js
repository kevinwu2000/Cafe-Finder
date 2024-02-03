import * as React from 'react';
import styled from 'styled-components'
import { Input} from 'antd';
import { ShopOutlined, PlusOutlined, LogoutOutlined } from "@ant-design/icons";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import SearchIcon from '@mui/icons-material/Search';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../component/SearchInput';
import {useHooks} from './hooks/Hooks'
import {SEARCH_RESTAURANT_BY_NAME_QUERY, GET_RESTAURANT_BY_ID_QUERY} from '../graphql/index';
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
// import {ScrollView, ImageBackground } from 'react-native-web';
import { useParams } from 'react-router-dom'
import { useWindowSize } from 'react-use';
import searchCafe from '../picture/searchCafe.jpg'
import Rating from '@mui/material/Rating';


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

function Search() {
	const navigate = useNavigate();
	const {name, userid } = useParams()
	const [searchValue, setSearchValue] = React.useState('');
	const [restaurantlist, setRestaurantlist] = React.useState([]);
	const {user, setUser, restaurant, setRestaurant} = useHooks();
	const { width, height } = useWindowSize();
	// console.log(width,height)

	const AddButton = {
		position : 'absolute',
		// width : `${width / 165}%`,
		// height : `${height / 120}%`,
		// fontSize : `${ 1.9 * height / width }rem`,
		top : '5%',
		right : '15%',
		backgroundColor:'#DB8F00'
	}
	
	const LogoutButton = {
		position : 'absolute',
		// width : `${width / 165}%`,
		// height : `${height / 120}%`,
		// fontSize : `${ 1.9 * height / width }rem`,
		top : '5%',
		right : '5%',
		backgroundColor:'#DB8F00',
	}

	//const [createuser] = useMutation(CREATE_USER_MUTATION);
	const [
		SearchRestaurant,
		{ data: SearchRestaurantData, error: SearchRestaurantError, loading: SearchRestaurantLoading},
	] = useLazyQuery(SEARCH_RESTAURANT_BY_NAME_QUERY);

	const [
		GetRestaurant,
		{ data: GetRestaurantData, error: GetRestaurantError, loading: GetRestaurantLoading},
	] = useLazyQuery(GET_RESTAURANT_BY_ID_QUERY);

	React.useEffect((SearchRestaurantLoading)=>{
		//console.log(SearchRestaurantLoading,SearchRestaurantData,SearchRestaurantError);
        if(SearchRestaurantData !== undefined){
			//console.log(SearchRestaurantData.SearchRestaurantByName)
			setRestaurantlist(SearchRestaurantData.SearchRestaurantByName)
		}
    },[SearchRestaurantLoading])

	React.useEffect((GetRestaurantLoading)=>{
		//console.log(GetRestaurantLoading,GetRestaurantData,GetRestaurantError);
        if(GetRestaurantData !== undefined && GetRestaurantData.GetRestaurantById !== undefined){
			console.log(GetRestaurantData.GetRestaurantById)
			setRestaurant(GetRestaurantData.GetRestaurantById)
			navigate('/search/'+name+'/'+userid+'/cafe/' + GetRestaurantData.GetRestaurantById.id)
		}
    },[GetRestaurantLoading])

	const handleChange = (event) => {
		setSearchValue(event.target.value);
	};

	const handleonClick = () => {
		SearchRestaurant({
			variables:{
				name: searchValue
			},
		})
	}

	const handleCardonClick = (id) => {
		GetRestaurant({
			variables:{
				id: id
			},
		})
	}


	return (
		// <Box
		// sx={{
			// bgcolor: 'background.paper',
		// 	bgcolor: 'gray',
		// 	pt: width,
		// 	pb: height,
		// }}
		
		// >
		<ThemeProvider theme={theme}>
			<CssBaseline />
			
			<AppBar position="relative">
				<Toolbar style={{backgroundColor:"#FFBD45", height:'15vh'}}>
					<LocalCafeIcon sx={{ mr: 2 }} />
					<Typography variant="h4" color="inherit" noWrap>
						Café Finder
					</Typography>

					
				</Toolbar>
			</AppBar>

			
			<main>
			<Box
				sx={{
					// bgcolor: 'background.paper',
					// bgcolor: 'gray',
					pt: 8,
					pb: 6,
				}}
				// style={{backgroundColor:'gray'}}
			>
			<Container maxWidth="sm">

				<SearchInput
					// style={SearchBox}
					value={searchValue}
					onChange={handleChange}
					onClick={handleonClick}
				/>

				<Button variant="contained" size='large'
					style={AddButton}
					onClick={() => {navigate('/addcafe/'+name+'/'+userid)}}
				>
							Add Café
				</Button>
				
				
				<Button variant="contained" size='large' 
					style={LogoutButton}
					onClick={() => {navigate('/')}}
				>
					Log Out
				</Button>

				<Stack
					sx={{ pt: 4 }}
					direction="row"
					spacing={2}
					justifyContent="center"
					// style={{backgroundColor:'gray'}}
				>
				</Stack>

			</Container>
			</Box>

			<Container sx={{ py: 8 }} maxWidth="md">
			{/* End hero unit */}
				<Grid container spacing={4}>
				{restaurantlist.map((rest) => {
					let tmp = 0.0;
					for(let i=0;i<rest.comments.length;i++)tmp += rest.comments[i].star
					tmp /= rest.comments.length
					tmp = tmp.toFixed(2);
					if(tmp == NaN)tmp = 0
					return<Grid item key={rest.id} xs={12} sm={6} md={4} onClick={()=>{handleCardonClick(rest.id)}}>
					<Card
					sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
					>
						<CardMedia
							component="img"
							sx={{
							// 16:9
							pt: '56.25%',
							}}
							image={searchCafe}
							alt="random"
						/>
						<CardContent sx={{ flexGrow: 1 }}>
							<Typography gutterBottom variant="h5" component="h2">
								{rest.name}
							</Typography>

							<Rating name="read-only" value={tmp} precision={0.1} readOnly sx={{padding:1}}/>
						</CardContent>
						<CardActions>
							{/* <Button size="small">View</Button> */}
							{/* <Button size="small">Edit</Button> */}
						</CardActions>
					</Card>
				</Grid>
				})}
				</Grid>
			</Container>
			{/* </Box> */}
			</main>
			
		</ThemeProvider>
		// </Box>
	);
}

export default Search;

