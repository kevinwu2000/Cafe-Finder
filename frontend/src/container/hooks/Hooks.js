import { useState , createContext, useContext, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const HookContext = createContext({
	user: {},
	setUser: ()=>{},
	restaurant: {},
	setRestaurant: ()=>{},
});



const HookProvider = (props) => {
	const [user, setUser] = useState();
	const [restaurant, setRestaurant] = useState(); 
	//useEffect((restaurant)=>{console.log(restaurant)},[restaurant])


  	return (
    	<HookContext.Provider
    	value={{
			user, setUser, restaurant, setRestaurant
    	}}
    	{...props}
    	/>
  	);
};

const useHooks = () => useContext(HookContext);

export { HookProvider, useHooks };
