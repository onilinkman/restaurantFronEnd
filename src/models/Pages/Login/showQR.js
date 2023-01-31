import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QRCode from 'qrcode.react';

export default function ShowQR(args) {
	const values = [
		'md-down',
	];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	return (
		<>
			{values.map((v, idx) => (
				<Button
					key={idx}
					className="me-2 mb-2"
					onClick={() => handleShow(v)}
				>
					Mostrar QR
				</Button>
			))}
			<Modal
				show={show}
				fullscreen={fullscreen}
				onHide={() => setShow(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>QR Para ir a la pagina de inicio</Modal.Title>
				</Modal.Header>
				<Modal.Body>
                    <QRCode value='http://192.168.0.123:8000/'/>
                </Modal.Body>
			</Modal>
		</>
	);
}
