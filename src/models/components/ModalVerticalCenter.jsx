import { Button, Modal } from 'react-bootstrap';

const ModalVerticalCenter = ({ ...props }) => {
	return (
		<Modal
            show={props.show}
            onHide={props.onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{props.title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{props.children}
			</Modal.Body>
			<Modal.Footer>
				<Button className='btn-danger' onClick={props.onHide}>Cancelar</Button>
                <Button className='btn-primary' onClick={props.btnAccept}>{props.textAccept}</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalVerticalCenter;
