import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import configProject from '../../../../configProject.json';
import CardMenu from '../../../components/CardMenu';
import {
	Button,
	ButtonGroup,
	Container,
	FloatingLabel,
	Form,
	Row,
} from 'react-bootstrap';
import OrdersActions from './OrdersActions';

import OrdersDB from '../../../indexdDB/ordersDB';
import ModalVerticalCenter from '../../../components/ModalVerticalCenter';

const ShowOrders = ({ ...props }) => {
	const [data, setData] = useState([]);
	const [db] = useState(new OrdersDB());
	const [modalShow, setModalShow] = useState(false);
	const [token, setToken] = useState(localStorage.getItem('x-token'));

	var navigate = useNavigate();
	// db

	const btnSale = () => {
		if (token) {
		} else {
			console.log('no existe token');
			setModalShow(true);
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		db.openDB()
			.then((result) => {
				//console.log(result);
				return db.getAllObjects();
			})
			.then((result) => {
				//console.log(result);
				setData(result);
				if (result.length < 1) {
					navigate('/Menu');
				}
			})
			.catch((err) => {
				console.error(err);
			});
	}, [navigate]);
	return (
		<div className=" row row-cols-2 justify-content-md-center mt-3">
			{data.map((obj, index) => {
				return (
					<CardMenu
						key={index + '' + obj.id_menu}
						cardTitle={obj.title}
						cardDescription={obj.description}
						urlImage={
							configProject.dir_url +
							configProject.img_urls.getImgMenu +
							'?img=' +
							obj.url_image
						}
						price={obj.price}
						onError={() => {}}
					>
						<Container>
							<Row>
								<p className="text-start">
									Cantidad: {obj.acount}
								</p>
							</Row>
							<Row>
								<p className="text-start">
									Total:{' '}
									{parseFloat(obj.acount * obj.price).toFixed(
										2
									)}{' '}
									Bs
								</p>
							</Row>
							<Row>
								<OrdersActions
									title={obj.title}
									onClickDelete={() => {
										db.deleteObjectByIdMenu(obj.id_menu)
											.then((result) => {
												console.log(result);
												return db.getAllObjects();
											})
											.then((result) => {
												setData(result);
											})
											.catch((err) => console.log(err));
									}}
								/>
							</Row>
						</Container>
					</CardMenu>
				);
			})}
			<Container
				className="fixed-bottom text-center"
				fluid={true | 'xxl'}
			>
				<ButtonGroup size="lg">
					<Button className="btn-danger" as={Link} to={'/Menu'}>
						Atras
					</Button>
					<Button className="btn-success" onClick={btnSale}>
						Realizar pedido!!
					</Button>
				</ButtonGroup>
			</Container>
			<ModalVerticalCenter
				show={modalShow}
				onHide={() => setModalShow(false)}
				btnAccept={() => {console.log('acpetar')}}
				title={'Realizar Pedido'}
				textAccept={'Aceptar'}
			>
				<p className="fst-normal text-white">Seleccionar Mesa</p>
				<datalist>
					<option >One</option>
					<option >Two</option>
					<option >Three</option>
				</datalist>
				<Form.Select className="mb-3">
					<option>
						Seleccione mesa
					</option>
					<option value="1">One</option>
					<option value="2">Two</option>
					<option value="3">Three</option>
				</Form.Select>
				<p className="fst-normal text-white">Agregar Nota</p>
				<FloatingLabel controlId="floatingTextarea2" label="Nota">
					<Form.Control
						as="textarea"
						placeholder="Agregar Nota"
						style={{ height: '100px' }}
					/>
				</FloatingLabel>
			</ModalVerticalCenter>
		</div>
	);
};

export default ShowOrders;
