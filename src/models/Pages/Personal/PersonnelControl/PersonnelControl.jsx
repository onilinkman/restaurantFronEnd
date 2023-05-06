import { Button, Col, Container, Row } from 'react-bootstrap';
import TablePersonnel from './TablePersonnel';
import { AiOutlineReload } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import configProject from '../../../../configProject.json';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalInput from '../../../components/ModalInput';

const PersonnelControl = (props) => {
	const [personnel, setPerssonel] = useState([]);

	const getAllPersonnel = async () => {
		await fetch(
			configProject.dir_url + configProject.api_urls.getAllPersonnel,
			{
				method: 'GET',
				headers: {
					Accept: '*/*',
					'Content-Type': 'application/json',
					'x-token': localStorage.getItem('x-token'),
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data?.data) {
					setPerssonel(data.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const updatePersonnelIsActive = async (idUser, isActive) => {
		await fetch(
			configProject.dir_url +
				configProject.api_urls.updatePersonnelIsActive,
			{
				method: 'POST',
				headers: {
					Accept: '*/*',
					'Content-Type': 'application/json',
					'x-token': localStorage.getItem('x-token'),
				},
				body: JSON.stringify({
					idUser,
					isActive: isActive === 1 ? 0 : 1,
				}),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.then((err) => console.log(err));
	};

	useEffect(() => {
		getAllPersonnel();
	}, []);

	return (
		<Container>
			<Row className="mx-auto text-center">
				<Col md={4}>
					<Button as={Link} to={'/Personal'} variant="danger">
						<BiArrowBack />
						Volver
					</Button>
				</Col>
				<Col md={{ span: 4, offset: 4 }}>
					<ModalInput iconOnClick={(f)=>{
						return <Button variant='info' onClick={f}> Agregar rol</Button>
					}} title={'Agregar rol'}>

					</ModalInput>
				</Col>
			</Row>
			<Button onClick={getAllPersonnel}>
				<AiOutlineReload />
			</Button>
			<Row className="justify-content-md-center">
				<TablePersonnel
					key={Math.random() * 1000}
					data={personnel}
					onClickTr={(id, username) => {}}
					onClickDelete={(id, isActive) => {
						updatePersonnelIsActive(id, isActive);
					}}
				/>
			</Row>
		</Container>
	);
};

export default PersonnelControl;
