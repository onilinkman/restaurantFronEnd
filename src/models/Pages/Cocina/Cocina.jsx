import { Link } from 'react-router-dom';
import CardMenu from '../../components/CardMenu';
import configProject from '../../../configProject.json';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';
import { IoMdAdd } from 'react-icons/io';
import { VscReferences } from 'react-icons/vsc';
import Alert from 'react-bootstrap/Alert';
import ModalInput from '../../components/ModalInput';

export default function Cocina(props) {
	const [listCard, setListCard] = useState([]);

	const [status, setStatus] = useState({ isLoading: true, isError: false });

	const callRecetas = async () => {
		await fetch(configProject.dir_url + configProject.api_urls.recetas, {
			method: 'GET',
			headers: configProject.headersList,
		})
			.then((response) => response.json())
			.then((data) => {
				if (data) {
					let arr = [];
					arr = makeCardArray(arr, data);
					setListCard(arr);
					setStatus({ isLoading: false, isError: false });
				} else {
					setStatus({ isLoading: false, isError: true });
				}
			})
			.catch((err) => {
				setStatus({ isLoading: false, isError: true });
				console.log('dd', err);
			});
	};

	const makeCardArray = (arr, data) => {
		if (data?.length > 0) {
			for (let i = 0; i < data.length; i++) {
				arr.push(
					<CardMenu
						key={i}
						listIngredients={data[i].ingredients}
						cardTitle={data[i].title}
						cardDescription={data[i].description}
						urlImage={
							configProject.dir_url +
							configProject.img_urls.getImgMenu +
							'?img=' +
							data[i].url_image
						}
						price={data[i].price}
						onError={() => {}}
					>
						<ModalInput
							title={'Desea eliminar ' + data[i].title + '?'}
							iconOnClick={(f) => {
								return (
									<Button
										variant="outline-danger"
										onClick={f}
									>
										Eliminar
									</Button>
								);
							}}
							saveChangeBtn={() => {
								fetch(
									configProject.dir_url +
										configProject.api_urls.deleteItem,
									{
										method: 'DELETE',
										headers: configProject.headersList,
										body: JSON.stringify({
											id_menu: data[i].id_menu,
										}),
									}
								)
									.then((res) => {
										if (res.status === 200) {
											callRecetas();
										}
									})
									.catch((err) => {
										console.error(
											'hubo un error al eliminar'
										);
									});
							}}
							acceptBtn={'Eliminar'}
						>
							{'Esta seguro de querer eliminar ' +
								data[i].title +
								'?. Las estadisticas y otras operaciones hechas con este platillo aun se podran ver en la analitica'}
						</ModalInput>

						<Link to={'/Cocina/edit?id=' + data[i].id_menu}>
							<Button variant="outline-info">Editar</Button>
						</Link>
					</CardMenu>
				);
			}
		}
		return arr;
	};

	const showBody = () => {
		if (status.isLoading && !status.isError) {
			return <Spinner size="sm-5" animation="grow" variant="light" />;
		} else if (!status.isLoading && !status.isError) {
			return listCard;
		}
		return (
			<Alert variant="danger">No se pudieron cargar los elementos</Alert>
		);
	};

	useEffect(() => {
		callRecetas();
	}, []);

	return (
		<div className="container">
			<div className="justify-content-md-center text-center">
				<Link to="/Cocina/add">
					<Button variant="info">
						<IoMdAdd />
						Agregar Platillo
					</Button>
				</Link>
				<Link to="/Cocina/sections">
					<Button variant="secondary">
						<IoMdAdd />
						Agregar Seccion
					</Button>
				</Link>

				<Link to="/Cocina/relation">
					<Button variant="secondary">
						<VscReferences />
						{'  '}
						Vincular platillo-Seccion
					</Button>
				</Link>
			</div>
			<div className=" row row-cols-2 justify-content-md-center mt-3">
				{showBody()}
			</div>
		</div>
	);
}
