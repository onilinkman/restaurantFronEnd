import { useEffect, useRef, useState } from 'react';
import {
	Alert,
	Badge,
	Button,
	Container,
	Form,
	Row,
	Spinner,
} from 'react-bootstrap';
import FormValidated from '../../../components/InputsValidated/FormValidated';
import configProject from '../../../../configProject.json';
import { Link, useNavigate } from 'react-router-dom';

export default function AddPersonal(props) {
	const [validated, setValidated] = useState(false);
	const [invalidPassword, setInvalidPassword] = useState(false);
	const [isComplete, setIsComplete] = useState(true);
	const [infAlert, setInfAlert] = useState(<></>);

	const refForm = useRef(null);

	const refUsername = useRef(null);
	const refPassword = useRef(null);
	const refConfirmationPassword = useRef(null);
	const refFirst_names = useRef(null);
	const refP_lastname = useRef(null);
	const refM_lastname = useRef(null);
	const refCi = useRef(null);
	const refEmail = useRef(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		setValidated(true);
	};

	const navigate=useNavigate();

	const makeJson = async () => {
		setValidated(true);
		if (refForm.current.checkValidity()) {
			let confPassword =
				refPassword.current.getValueInput() ===
				refConfirmationPassword.current.getValueInput();
			if (confPassword) {
				let user = {
					username: refUsername.current.getValueInput().trim(),
					password: refPassword.current.getValueInput().trim(),
					first_names: refFirst_names.current.getValueInput().trim(),
					p_lastname: refP_lastname.current.getValueInput().trim(),
					m_lastname: refM_lastname.current.getValueInput().trim(),
					ci: refCi.current.getValueInput().trim(),
					email: refEmail.current.getValueInput().trim(),
				};
				setIsComplete(false);

				let apiUrl = props?.isClient
					? configProject.api_urls.addUserClient
					: configProject.api_urls.addUserPersonal;

				await fetch(configProject.dir_url + apiUrl, {
					method: 'POST',
					headers: {
						Accept: '*/*',
						'Content-Type': 'application/json',
						'x-token': localStorage.getItem('x-token'),
					},
					body: JSON.stringify(user),
				})
					.then((res) => res.json())
					.then((data) => {
						setIsComplete(true);
						if (data?.err) {
							switch (data?.err?.errno) {
								case 19:
									setInfAlert(
										<Alert key={'danger'} variant="danger">
											Este nombre de usuario "APODO" ya
											esta siendo usuado, elija otro
										</Alert>
									);

									break;

								default:
									setInfAlert(
										<Alert key={'danger'} variant="danger">
											Hubo algun error al guardar los
											datos
										</Alert>
									);
									break;
							}
						} else {
							if(props.isClient){
								navigate('/login?account=1')
							}else{
								setInfAlert(
									<Alert key={'success'} variant="success">
										Se agrego correctamente, Si necesita
										editarlo o asignarle algun rol vaya a{' '}
										<Link to="/Personal/ManagerPersonal">
											<Badge bg="info">
												Control del personal
											</Badge>
										</Link>{' '}
									</Alert>
								);
							}
						}
					})
					.catch((err) => {
						setIsComplete(true);
					});
			}
			setInvalidPassword(!confPassword);
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<Container>
			<div className="justify-content-md-center text-center">
				<p className="fs-1 text-white fw-bolder">
					{props.isClient
						? 'CREANDO CUENTA DE CLIENTE'
						: 'AGREGAR PERSONAL'}
				</p>
				<Form
					ref={refForm}
					noValidate
					validated={validated}
					onSubmit={handleSubmit}
				>
					<Row className="mb-3">
						<FormValidated
							contronId="validationCustom01"
							label="APODO"
							feedback="Ingrese apodo o nombre de usuario para este perfil"
							placeholder="Apodo"
							type="text"
							isRequired={true}
							ref={refUsername}
						/>
						<FormValidated
							contronId="validationCustom02"
							label="CONTRASEÑA"
							feedback={
								invalidPassword
									? 'Las contraseñas no son las mismas'
									: 'Debe agregar una contraseña'
							}
							placeholder="Ingrese contraseña"
							type="password"
							isRequired={true}
							isInvalid={invalidPassword}
							ref={refPassword}
						/>

						<FormValidated
							contronId="validationCustom03"
							label="CONFIRMAR CONTRASEÑA"
							feedback={
								invalidPassword
									? 'Las contraseñas no son las mismas'
									: 'Debe agregar una contraseña'
							}
							placeholder="confirme contraseña"
							type="password"
							isRequired={true}
							isInvalid={invalidPassword}
							ref={refConfirmationPassword}
						/>
					</Row>

					<Row className="mb-3">
						<FormValidated
							contronId="validationCustom04"
							label="Nombres"
							feedback="Este campo no debe estar vacio"
							placeholder="Ingrese Nombres"
							type="text"
							ref={refFirst_names}
						/>

						<FormValidated
							contronId="validationCustom05"
							label="Paterno"
							feedback="Este campo no debe estar vacio"
							placeholder="Apellido Paterno"
							type="text"
							ref={refP_lastname}
						/>

						<FormValidated
							contronId="validationCustom06"
							label="Materno"
							feedback="Este campo no debe estar vacio"
							placeholder="Apellido materno"
							type="text"
							ref={refM_lastname}
						/>
					</Row>

					<Row className="mb-2">
						<FormValidated
							contronId="validationCustom07"
							label="Carnet de Identidad"
							feedback="Este campo no debe estar vacio"
							placeholder="CI"
							type="text"
							ref={refCi}
						/>

						<FormValidated
							contronId="validationCustom08"
							label="Correo electronico"
							feedback="Ingrese un correo valido"
							placeholder="Ingrese Correo"
							type="email"
							ref={refEmail}
						/>
					</Row>
				</Form>
				{infAlert}
				{}
				<Button
					disabled={!isComplete}
					variant="success"
					onClick={makeJson}
				>
					Finalizar Registro{' '}
					{isComplete ? (
						<></>
					) : (
						<Spinner
							as={'span'}
							animation="border"
							size="sm"
							role="status"
							aria-hidden="true"
						/>
					)}
				</Button>
			</div>
		</Container>
	);
}
