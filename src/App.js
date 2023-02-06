
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './models/Layout/Layout';
import Login from './models/Pages/Login/Login';
import Main from './models/Pages/main/Main';
import Cocina from './models/Pages/Cocina/Cocina';
import AddIngredient from './models/Pages/Cocina/AddIngredient/AddIngredient';

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route exact path='/login' element={<Login/>}/>
					<Route exact path='/' element={<Main/>}/>
					<Route exact path='/Cocina' element={<Cocina/>}/>
					<Route exact path='/Cocina/add' element={<AddIngredient/>}/>
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
