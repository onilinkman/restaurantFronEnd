import React from 'react';

import NavbarHeader from './NavbarHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';

class Layout extends React.Component {
	render() {
		const children = this.props.children;
		return (
			<div
				className="container-fluid bs-secondary-bg bg-dark bg-gradient "
			>
				<NavbarHeader />
				{children}
				<Footer/>
			</div>
		);
	}
}

export default Layout;
