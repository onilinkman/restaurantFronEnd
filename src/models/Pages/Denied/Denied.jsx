import { Alert, Container, Row } from 'react-bootstrap';
import { TfiHandStop } from 'react-icons/tfi';
import './Denied.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Denied(props) {
	useEffect(() => {
		window.scrollTo(0, 0);
	});
	return (
		<Container>
			<Row className="justify-content-md-center">
				<p className="errorNumber">403</p>
				<div className="float-animation text-center mt-5 mx-auto align-items-center row">
					<TfiHandStop color="white" size={'6em'} />
					<p className="messageDenied text-capitalize fs-1">
						Acceso denegado
					</p>
				</div>
				<Alert variant={'warning'} className="mt-5">
					Usted no tiene acceso a esta pagina,{' '}
					<Alert.Link as={Link} to="/">
						Click aqui{' '}
					</Alert.Link>{' '}
					para ir al menu principal
				</Alert>
			</Row>
		</Container>
	);
}
