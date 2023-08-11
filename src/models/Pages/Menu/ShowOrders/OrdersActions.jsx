import { useState } from 'react';
import {
	Badge,
	Button,
	Col,
	Container,
	Row,
	Toast,
	ToastContainer,
} from 'react-bootstrap';

import OrdersDB from '../../../indexdDB/ordersDB';

const OrdersActions = ({ ...props }) => {
	const [show, setShow] = useState(false);


	return (
		<>
			<Button variant="outline-danger" onClick={() => setShow(true)}>
				QUITAR
			</Button>
			<ToastContainer className="p-3" position="bottom-center">
				<Toast onClose={() => setShow(false)} show={show}>
					<Toast.Header>
						<strong className="me-auto">
							Quitar {props.title}
						</strong>
					</Toast.Header>
					<Toast.Body>
						Desea quitar {props.title} de la lista de pedidos?.
						Puede presionar el boton{' '}
						<Badge pill bg="danger">
							ATRAS
						</Badge>{' '}
						para volver a agregarlo
					</Toast.Body>
					<Container>
						<Row className="justify-content-md-center">
							<Col>
								<Button variant="warning" onClick={()=>props.onClickDelete()}>
									Si, deseo quitar
								</Button>
							</Col>
							<Col>
								<Button
									variant="primary"
									onClick={() => setShow(false)}
								>
									No, cancelar accion
								</Button>
							</Col>
						</Row>
					</Container>
				</Toast>
			</ToastContainer>
		</>
	);
};

export default OrdersActions;
