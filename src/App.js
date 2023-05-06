
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './models/Layout/Layout';
import Login from './models/Pages/Login/Login';
import Main from './models/Pages/main/Main';
import Cocina from './models/Pages/Cocina/Cocina';
import AddIngredient from './models/Pages/Cocina/AddIngredient/AddIngredient';
import AddSection from './models/Pages/Cocina/AddSection/addSection';
import Relation from './models/Pages/Cocina/Relation/Relation';
import EditIngredient from './models/Pages/Cocina/EditIngredient/EditIngredient';
import Menu from './models/Pages/Menu/Menu';
import Personal from './models/Pages/Personal/Personal';
import jwt_decode from 'jwt-decode'
import {  useEffect, useState } from 'react';
import AddPersonal from './models/Pages/Personal/AddPersonal/AddPersonal';
import PersonnelControl from './models/Pages/Personal/PersonnelControl/PersonnelControl';
import Denied from './models/Pages/Denied/Denied';

function App() {
	const [token,setToken]=useState(localStorage.getItem('x-token'))
	const [isLogin,setIsLogin]=useState(false)
	const authentificator=(component)=>{
		let rol=0
		if(token){
			rol= jwt_decode(token)?.uuid?.id_rol?jwt_decode(token)?.uuid?.id_rol:0
		}
		return rol === 1 ?component:<Navigate to={'/login'} replace={true}/>
	}

	
	
	useEffect(() => {

		const handleStorageChange = () => {
			const newToken = localStorage.getItem('x-token');
			if(newToken){
				let exp=jwt_decode(newToken)?.exp
				if(Date.now()>=exp*1000){
					localStorage.removeItem('x-token')
					setIsLogin(false)
					setToken(null)
					return
				}
			}
			
			setIsLogin(token!==null)
			setToken(newToken);
		};
		handleStorageChange()
		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, [isLogin,token]);

	return (
		<BrowserRouter>
			<Layout isLogin={isLogin} logout={()=>{
				localStorage.removeItem('x-token')
				setIsLogin(false)
				setToken(null)
			}}>
				<Routes>
					<Route exact path='/login' element={<Login updateToken={(token)=>{
						setIsLogin(token!==null)
						setToken(token)
					}}/>}/>
					<Route exact path='/' element={<Main/>} />
					<Route exact path='/Cocina' element={authentificator(<Cocina/>)} />
					<Route exact path='/Cocina/add' element={authentificator(<AddIngredient />)} />
					<Route exact path='/Cocina/sections' element={authentificator(<AddSection />)} />
					<Route exact path='/Cocina/relation' element={authentificator(<Relation />)} />
					<Route path='/Cocina/edit' element={authentificator(<EditIngredient />)} />
					<Route exact path='/Personal' element={authentificator(<Personal />)} />
					<Route exact path='/Personal/AddPersonal' element={authentificator(<AddPersonal/>)} />
					<Route exact path='/Personal/Control' element={authentificator(<PersonnelControl />)} />
					<Route exact path='/Menu' element={<Menu />} />
					<Route exact path='/Denied' element={<Denied />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
