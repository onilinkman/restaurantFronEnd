
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './models/Layout/Layout';
import Login from './models/Pages/Login/Login';
import Main from './models/Pages/main/Main';
import Cocina from './models/Pages/Cocina/Cocina';
import AddIngredient from './models/Pages/Cocina/AddIngredient/AddIngredient';
import AddSection from './models/Pages/Cocina/AddSection/addSection';
import Relation from './models/Pages/Cocina/Relation/Relation';

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route exact path='/login' element={<Login/>}/>
					<Route exact path='/' element={<Main/>}/>
					<Route exact path='/Cocina' element={<Cocina/>}/>
					<Route exact path='/Cocina/add' element={<AddIngredient />} />
					<Route exact path='/Cocina/sections' element={<AddSection />} />
					<Route exact path='/Cocina/relation' element={<Relation />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
