import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import configProject from '../../../../configProject.json';

export default function AddSection(props) {
	const nameSection = useRef(null);
	const description = useRef(null);

	const [isLoading, setIsLoading] = useState(false);
	const [bodyTable, setBodyTable] = useState(false);

	const loadingAnimation = () => {
		if (isLoading) {
			return (
				<>
					<Spinner
						as="span"
						animation="grow"
						size="sm"
						role="status"
						aria-hidden="true"
					/>{' '}
					Cargando...
				</>
			);
		}
		return 'Agregar';
	};

	const postSection = async () => {
		let n = nameSection.current.value.trim();
		let desc = description.current.value.trim();
		if (n !== '' && desc !== '') {
			setIsLoading(true);
			await fetch(
				configProject.dir_url + configProject.api_urls.addSection,
				{
					method: 'POST',
					headers: configProject.headersList,
					body: JSON.stringify({
						name: n,
						description: desc,
					}),
				}
			)
				.then((response) => {
					if (response.status === 200) {
						clearInputs();
						setIsLoading(false);
						getSections();
					}
				})
				.catch((err) => {
					setIsLoading(false);
					console.log('error to post Section', err);
				});
		} else {
			console.log('Tiene que llenar todos los campos');
		}
	};

	const clearInputs = () => {
		nameSection.current.value = '';
		description.current.value = '';
	};

	const buttonsTable = (id_section,is_delete) => {
		if (is_delete === 1) {
			return (
				<Button
					variant="danger"
					onClick={() => console.log(id_section)}
				>
					Ocultar
				</Button>
			);
		} else if (is_delete === 0) {
			return (
				<Button
					variant="primary"
					onClick={() => console.log(id_section)}
				>
					Restaurar
				</Button>
			);
		}
	};

	const makeBodyTable = (data) => {
		if (data && data.length > 0) {
			let arrTr = [];
			for (let i = 0; i < data.length; i++) {
				let id_section = data[i].id_section;
				let newTr = (
					<tr key={i}>
						<td>{i + 1}</td>
						<td>{data[i].name}</td>
						<td>{data[i].description}</td>
						<td><Button variant='info'>Editar</Button></td>
						<td>{buttonsTable(id_section,data[i].is_deleted)}</td>
					</tr>
				);
				arrTr.push(newTr);
			}
			return arrTr;
		}
		return <p>no hay tabla</p>;
	};

	const getSections = async () => {
		await fetch(
			configProject.dir_url + configProject.api_urls.getSections,
			{
				method: 'GET',
				headers: configProject.headersList,
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setBodyTable(makeBodyTable(data));
			})
			.catch((err) => {
				console.log('error al obtener las secciobnes');
			});
	};

	useEffect(() => {
		getSections();
	}, []);

	return (
		<Container>
			<Row className="justify-content-md-center text-center mt-4">
				<p className="text-decoration-underline text-light fw-bolder fs-2">
					Agregar seccion
				</p>
			</Row>
			<Row className="justify-content-md-center">
				<Col md="auto">
					<div className="mb-3">
						<label className="form-label text-light">
							Ingrese nombre de la seccion:
						</label>
						<input
							type="email"
							className="form-control"
							ref={nameSection}
							placeholder="Ej: postres, sopas, bebidas, etc.."
						/>
					</div>
					<div className="mb-3">
						<label className="form-label text-light">
							Descripcion:
						</label>
						<textarea
							className="form-control"
							ref={description}
							rows="3"
						></textarea>
					</div>
				</Col>
			</Row>
			<Row className="justify-content-md-center text-center">
				<div className="col-md-auto mt-2">
					<Button
						variant="success"
						onClick={postSection}
						disabled={isLoading}
					>
						{loadingAnimation()}
					</Button>
				</div>
				<div className="col-md-auto mt-2">
					<Link to="/Cocina">
						<Button variant="danger">Cancelar</Button>
					</Link>
				</div>
			</Row>
			<Row className="justify-content-md-center text-center mt-4">
				<p className="text-decoration-underline text-light fw-bolder fs-3">
					Secciones registradas
				</p>
			</Row>
			<Row className="justify-content-md-center text-center mt-4">
				<Table responsive striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>#</th>
							<th>Seccion</th>
							<th>Descripcion</th>
							<th>Editar</th>
							<th>Ocultar/restaurar</th>
						</tr>
					</thead>
					<tbody>{bodyTable}</tbody>
				</Table>
			</Row>
		</Container>
	);
}
