import { useRef, useState } from 'react';
import {
	Button,
	Form,
	Toast,
	ToastContainer,
	ToastHeader,
} from 'react-bootstrap';

const BtnActionsMenu = (props) => {
	const [validated, setValidated] = useState(false);
	const [showMessage, setShowMessage] = useState(false);

	const toggleShow = () => setShowMessage(!showMessage);
	const refInput = useRef(null);

	return (
		<>
			<Form.Floating>
				<Form.Control
					ref={refInput}
					id={props.id}
					type="number"
					placeholder="Cantidad"
					className="bg-dark text-white"
					isInvalid={validated}
					required
				/>
				<label className="text-secondary" htmlFor={props.id}>
					Cantidad a pedir
				</label>
			</Form.Floating>
			<Button
				variant="outline-primary"
				onClick={() => {
					let input = refInput.current.value.trim();
					setValidated(input.trim() === '');
					if (input !== '') {
						props.onClick(input)
						toggleShow();
					}
				}}
			>
				Agregar
			</Button>
			<ToastContainer className="p-3" position="bottom-center">
				<Toast show={showMessage} onClose={toggleShow}>
					<ToastHeader closeButton={true}>
						<strong className="me-auto">Pedido agregado</strong>
						{/* <small>11 mins atras</small> */}
					</ToastHeader>
					<Toast.Body className="text-black">
						Se agrego correctamente
					</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
};

export default BtnActionsMenu;
