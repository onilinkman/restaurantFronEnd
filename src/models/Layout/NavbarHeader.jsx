import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavbarHeader(props) {
	return (
		<Navbar collapseOnSelect  bg="dark" expand="lg" variant='dark' className='sticky-top'>
			<Container>
				<Navbar.Brand>ExultSoft</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Link className='nav-link' to="/">Home</Link>
						<Link className='nav-link' to="/">Link</Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
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
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
