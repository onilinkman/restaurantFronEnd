
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './models/Layout/Layout';
import Login from './models/Pages/Login/Login';
import Main from './models/Pages/main/Main';

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route exact path='/login' element={<Login/>}/>
					<Route exact path='/' element={<Main/>}/>
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
