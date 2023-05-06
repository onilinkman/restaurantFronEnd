import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavbarHeader(props) {
	const scrollTop=()=>window.scrollTo(0,0)
	return (
		<Navbar collapseOnSelect bg="dark" expand="lg" variant='dark' className='sticky-top'>
			<Container>
				<Navbar.Brand>ExultTec</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as={Link} className='nav-link' to="/" eventKey={"/"} onClick={scrollTop}>Home</Nav.Link>
						<Nav.Link as={Link} className='nav-link' to="/" eventKey={"/"} onClick={scrollTop}>Link</Nav.Link>
						<NavDropdown title="Acciones" id="collasible-nav-dropdown">
							<NavDropdown.Item >
								Action
							</NavDropdown.Item>
							<NavDropdown.Item >
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item >
								Something
							</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item >
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
						{props.isLogin?
						<Nav.Link as={Link} className='nav-link text-danger' to="/" eventKey={"/"} onClick={props.logout}>Cerrar Sesion</Nav.Link>:
						<Nav.Link as={Link} className='nav-link' to="/login" eventKey={"/login"} onClick={scrollTop}>Iniciar Sesion</Nav.Link>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
