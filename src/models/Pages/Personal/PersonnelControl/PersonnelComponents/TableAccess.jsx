import { Alert, Button, Container, Row, Table } from 'react-bootstrap';
import configProject from '../../../../../configProject.json';
import { useEffect, useState } from 'react';

const TableAccess = (props) => {
	const [access, setAccess] = useState([]);

	const getAccessModulePersonnel = async (id_user) => {
		await fetch(
			configProject.dir_url +
				configProject.api_urls.getAccessModulePersonnel,
			{
				method: 'POST',
				headers: {
					Accept: '*/*',
					'Content-Type': 'application/json',
					'x-token': localStorage.getItem('x-token'),
				},
				body: JSON.stringify({
					id_user,
				}),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setAccess(data);
			})
			.catch((err) => console.log(err));
	};

	const addAccessModulePersonnel = async (id_user, nro_module) => {
		await fetch(
			configProject.dir_url +
				configProject.api_urls.addAccessModulePersonnel,
			{
				method: 'POST',
				headers: {
					Accept: '*/*',
					'Content-Type': 'application/json',
					'x-token': localStorage.getItem('x-token'),
				},
				body: JSON.stringify({
					id_user,
					nro_module,
				}),
			}
		)
			.then((res) => {
				if (res.status === 200) {
					getAccessModulePersonnel(id_user);
				}
			})
			.catch((err) => console.log(err));
	};

	const deleteAccessModulePersonnel = async (id_user, nro_module) => {
		await fetch(
			configProject.dir_url +
				configProject.api_urls.deleteAccessModulePersonnel,
			{
				method: 'DELETE',
				headers: {
					Accept: '*/*',
					'Content-Type': 'application/json',
					'x-token': localStorage.getItem('x-token'),
				},
				body: JSON.stringify({
					id_user,
					nro_module,
				}),
			}
		)
			.then((res) => {
				if (res.status === 200) {
					getAccessModulePersonnel(id_user);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		getAccessModulePersonnel(props.id_user);
	}, [props.id_user, props.data]);

	return (
		<Container>
			<Row className="justify-content-md-center">
				<Alert variant="info">
					<p>
						Aqui puede dar o quitar accesos a diferentes areas del
						sistema.
					</p>
				</Alert>
			</Row>
			<Row className="justify-content-md-center">
				<Table
					key={'access' + props.id_user}
					striped
					bordered
					hover
					variant="light"
					responsive
				>
					<thead>
						<tr>
							<th>#</th>
							<th>Modulo</th>
							<th>Acceso</th>
						</tr>
					</thead>
					<tbody>
						{configProject.ListModules.map((item, index) => {
							return (
								<tr key={`tr${index}`}>
									<td>{index + 1}</td>
									<td>{item}</td>
									<td>
										{access.some(
											(element) =>
												element.nro_module === index + 1
										) ? (
											<Button
												variant="success"
												onClick={() => {
													deleteAccessModulePersonnel(
														props.id_user,
														index + 1
													);
												}}
											>
												si
											</Button>
										) : (
											<Button
												variant="danger"
												onClick={() => {
													addAccessModulePersonnel(
														props.id_user,
														index + 1
													);
												}}
											>
												no
											</Button>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Row>
		</Container>
	);
};

export default TableAccess;
