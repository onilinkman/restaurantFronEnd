import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import configProject from '../../../../configProject.json';
import './accordion.css';

import TableSections from './TableSections';
import TablePlatillos from './TablePlatillos';
import TablePlatillosBySection from './TablePlatillosBySection';

export default function Relation(props) {
	const [tableSection, setTableSection] = useState(<></>);
	const [selectedIdSection, setSelectedIdSection] = useState(0);
	const [dataPlatillos, setDataPlatillos] = useState([]);
	const [dataPlatillosAdded, setDataPlatillosAdded] = useState([]);

	const getSection = async () => {
		await fetch(
			configProject.dir_url + configProject.api_urls.getSectionNotDeleted,
			{
				method: 'GET',
				headers: configProject.headersList,
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					let trClick = (idSection, name) => {
						getMenuSection(idSection);
					};
					setTableSection(
						<TableSections
							numPg={1}
							data={data}
							onClickTr={trClick}
						/>
					);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getMenuSection = async (id_section) => {
		await fetch(
			configProject.dir_url +
				configProject.api_urls.getMenuSection +
				'?id_section=' +
				id_section,
			{
				method: 'GET',
				headers: configProject.headersList,
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					setSelectedIdSection(id_section);
					makeArraysPlatillos(data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const makeArraysPlatillos = (data) => {
		let p = { platillos: [], platillosAdded: [] };
		data.forEach((obj) => {
			if (obj.id_section === 0) {
				p.platillos.push(obj);
			} else {
				p.platillosAdded.push(obj);
			}
			return;
		});
		setDataPlatillos(p.platillos);
		setDataPlatillosAdded(p.platillosAdded);
	};

	const postAddPlatillo = async (id_section, id_menu) => {
		await fetch(
			configProject.dir_url + configProject.api_urls.postMenuSection,
			{
				method: 'POST',
				headers: configProject.headersList,
				body: JSON.stringify({
					id_section: id_section,
					id_menu: id_menu,
				}),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				makeArraysPlatillos(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteMenuSection = async (id_section, id_menu) => {
		await fetch(
			configProject.dir_url + configProject.api_urls.deleteMenuSection,
			{
				method: 'DELETE',
				headers: configProject.headersList,
				body: JSON.stringify({
					id_menu: id_menu,
					id_section,
				}),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				makeArraysPlatillos(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getSection();
	}, []);
	return (
		<div className="container">
			<p className="text-white text-center fs-1">
				Vincular los Platillos con Secciones
			</p>
			<Accordion className="bg-dark">
				<Accordion.Item eventKey="0" className="bg-dark text-white-50">
					<Accordion.Header className="bg-dark text-white">
						Nota de este apartado
					</Accordion.Header>
					<Accordion.Body>
						En este apartado usted podra vincular los platillos que
						haya agregado con las secciones esto se refiere a que
						cuando el cliente vea el menu tendra mas orden y vera
						las secciones que usted haya agregado anteriormente, si
						usted no hubiese agregado ningun platillo a una seccion
						cuando el cliente haya elegido esa seccion no le
						aparecera ningun platillo para ordenar, es por eso que
						usted debe relacionarlos. Un platillo puede ser agregado
						a varias secciones. Espero pueda sacarle un gran
						beneficio a esta funcionalidad.
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
			<Row className="justify-content-md-center">
				<Col md="auto">
					<p className="text-white text-center fs-2">Secciones</p>
					{tableSection}
				</Col>
			</Row>
			<Row className="justify-content-md-center">
				<Col md="auto">
					<p className="text-white text-center fs-2">Platillos</p>
					<TablePlatillos
						key={
							selectedIdSection +
							' ' +
							dataPlatillos.length +
							'table2'
						}
						onClickTr={() => {}}
						data={dataPlatillos}
						onClickAdd={(id_menu) => {
							postAddPlatillo(selectedIdSection, id_menu);
						}}
					/>
				</Col>
				<Col md="auto">
					<p className="text-white text-center fs-2">
						Platillos Agregados
					</p>
					<TablePlatillosBySection
						key={
							selectedIdSection +
							' ' +
							dataPlatillosAdded.length +
							'table3'
						}
						onClickTr={() => {}}
						data={dataPlatillosAdded}
						numPg={1}
						onClickRemove={(id_menu) => {
							deleteMenuSection(selectedIdSection, id_menu);
						}}
					/>
				</Col>
			</Row>
		</div>
	);
}
