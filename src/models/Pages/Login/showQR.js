import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QRCode from 'qrcode.react';
import configProject from '../../../configProject.json';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';

export default function ShowQR(args) {
	const values = ['md-down'];
	const [fullscreen, setFullscreen] = useState(true);
	const [show, setShow] = useState(false);
	const [ipv4, setIpv4] = useState('ip no seleccionada');
	const [accordionIp, setAccordionIp] = useState();

	function handleShow(breakpoint) {
		setFullscreen(breakpoint);
		setShow(true);
	}

	const showSelectIP = (arr) => {
		let arrList = [];

		for (let i = 0; i < arr.length; i++) {
			arrList.push(
				<ListGroup.Item
					key={i}
					action
					variant="secondary"
					onClick={() => {
						setIpv4('http://' + arr[i] + ':8000/');
					}}
				>
					{arr[i]}
				</ListGroup.Item>
			);
		}

		return (
			<Accordion defaultActiveKey="0">
				<Accordion.Item eventKey="1">
					<Accordion.Header>
						Seleccionar ip que usara
					</Accordion.Header>
					<Accordion.Body>
						<ListGroup>{arrList}</ListGroup>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		);
	};

	useEffect(() => {
		const getIp = () => {
			fetch(configProject.dir_url + configProject.api_urls.getIp, {
				method: 'GET',
				headers: configProject.headersList,
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.ip.length > 1) {
						setAccordionIp(showSelectIP(data.ip));
					} else {
						setIpv4('http://' + data[0].ip + ':8000/');
						setAccordionIp(<div></div>);
					}
				})
				.catch((err) => {
					console.log('error: ', err);
				});
		};
		getIp();
	}, []);

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
					<Modal.Title>Con este QR podra darle a los clientes</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{accordionIp}
					<QRCode value={ipv4} />
				</Modal.Body>
			</Modal>
		</>
	);
}
