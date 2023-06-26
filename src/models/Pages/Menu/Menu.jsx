import React, { useEffect, useState } from 'react';
import {
	Button,
	Container,
	OverlayTrigger,
	Popover,
	Row,
} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FloatBtn from '../../components/FloatBtn/FloatBtn';
import Section from './Section';

import configProject from '../../../configProject.json';
import ListMenu from './ListMenu';
import { useNavigate } from 'react-router-dom';

export default function Menu({ ...props }) {
	const [show, setShow] = useState(false);

	const navigate = useNavigate();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [sections, setSection] = useState([]);
	const [title, setTitle] = useState('Todas las Categorias:');
	const [arrayReceta, setArrayReceta] = useState([]);
	let auxArrayReceta = [];
	let arrayOrders = []; // in here save orders

	const itemsFloatBtn = [
		{
			name: 'CATEGORIAS',
			onClick: handleShow,
		},
		{
			name: 'Realizar Pedido!!!',
			url: '/Menu/Orders',
		},
		{
			name: 'Ver cuentas',
			url: '/Menu/Bill',
		},
	];

	const getSections = () => {
		fetch(configProject.dir_url + configProject.api_urls.getSections, {
			method: 'GET',
			headers: configProject.headersList,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					let sec = [];
					sec.push(
						<Section
							onClick={() => {
								window.scrollTo(0, 0);
								getAllIngredients();
								setTitle('Todas las Categorias:');
								handleClose();
							}}
							name="Todas las Categorias:"
							description="Ver todos los platillos"
							key={'allDish'}
						/>
					);
					for (let i = 0; i < data.length; i++) {
						if (data[i].is_deleted === 1) {
							sec.push(
								<Section
									onClick={() => {
										window.scrollTo(0, 0);
										getIdsMenuBySection(
											data[i]?.id_section
										);
										setTitle(data[i].name);
										handleClose();
									}}
									name={data[i].name}
									description={data[i].description}
									key={i}
								/>
							);
						}
					}
					setSection(sec);
				}
			});
	};

	const getAllIngredients = () => {
		fetch(configProject.dir_url + configProject.api_urls.recetas, {
			method: 'GET',
			headers: configProject.headersList,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					setArrayReceta(data);
					auxArrayReceta = data;
				}
			})
			.catch((err) => {
				console.log('error getAllIngredients', err);
			});
	};

	const getIdsMenuBySection = async (id_section) => {
		await fetch(
			configProject.dir_url +
				configProject.api_urls.getIdsMenuBySection +
				'?id_section=' +
				id_section,
			{
				method: 'GET',
				headers: configProject.headersList,
			}
		)
			.then((res) => res.json())
			.then((data) => {
				let mapData = new Map(
					data.map((obj) => {
						return [obj.id_menu, true];
					})
				);
				setArrayReceta(
					auxArrayReceta.filter((obj) => mapData.has(obj.id_menu))
				);
			})
			.catch((err) => {
				console.log('error getIdsMenuBySection', err);
			});
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		getSections();
		getAllIngredients();
	}, []);

	return (
		<>
			<div
				className="d-grid gap-2"
				style={{
					position: 'fixed',
					zIndex: 2,
					bottom: 0,
					width: '100%',
					display: 'grid',
					justifyContent: 'center',
					justifyItems: 'center',
				}}
			>
				<OverlayTrigger
					trigger={'click'}
					/* show={false} */
					placement="top"
					overlay={
						<Popover id="popover-top-menu">
							<Popover.Body>
								<strong>Primero agrege algo</strong>
							</Popover.Body>
						</Popover>
					}
				>
					<Button
						className="border "
						variant="info"
						size="lg"
						onClick={() => {
							console.log(arrayOrders.length);
							if (arrayOrders.length > 0) {
								navigate('/Menu/Orders', {
									state: {
										data: arrayOrders,
									},
								});
							}
						}}
					>
						Ver Pedidos
					</Button>
				</OverlayTrigger>
			</div>
			<FloatBtn items={itemsFloatBtn}></FloatBtn>
			<div className="container-fluid justify-content-md-center">
				<Offcanvas
					show={show}
					onHide={handleClose}
					className="bs-secondary-bg bg-dark"
				>
					<Offcanvas.Header closeButton closeVariant="white">
						<Offcanvas.Title className="text-light fs-1 text">
							Categorias
						</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<p className="text-white-50">
							Seleccione el tipo de comida que desea ordenar:
						</p>
						<Container>
							<Row className="justify-content-md-center">
								{sections}
							</Row>
						</Container>
					</Offcanvas.Body>
				</Offcanvas>

				<div className="container-fluid text-white text-center fs-2 text-decoration-underline fst-italic fw-bold">
					{title}
				</div>
				<ListMenu
					listMenu={arrayReceta}
					getAcountDish={(dishObject) => {
						arrayOrders.push(dishObject);
						console.log(arrayOrders);
					}}
				/>
			</div>
		</>
	);
}
