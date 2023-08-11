import {
	Button,
	ButtonGroup,
	Container,
	Form,
	InputGroup,
	Spinner,
	Toast,
} from 'react-bootstrap';
import ModalInput from '../../components/ModalInput';
import { MdTableRestaurant } from 'react-icons/md';
import { TbNewSection } from 'react-icons/tb';
import { BiGridVertical } from 'react-icons/bi';
import { useRef, useState } from 'react';

import configProject from '../../../configProject.json';

const BtnGroupMesa = ({ ...props }) => {
	const refInputMesa = useRef(null);
	const [isLoadingMesa, setIsLoadingMesa] = useState(false);
	const [showMsgMesa, setShowMsgMesa] = useState(false);
	const [msgMesa, setMsgMesa] = useState('');

	const addMesa = (name) => {
		let body = JSON.stringify({
			name,
		});
		setIsLoadingMesa(true);
		fetch(configProject.dir_url + configProject.api_urls.addMesa, {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
				'x-token': localStorage.getItem('x-token'),
			},
			body,
		})
			.then((res) => {
				setIsLoadingMesa(false);
                if(res.status===409){
                    setShowMsgMesa(true)
                    setMsgMesa('Error al Agregar '+name+'. Ese nombre de la Mesa ya fue agregado');
                }
			})
			.catch((err) => {
				setMsgMesa(err);
				setIsLoadingMesa(false);
                setShowMsgMesa(true)
			});
	};

	return (
		<Container className="text-center">
			<ButtonGroup size="sm" className="mb-2">
				<ModalInput
					title="Agregar Mesa"
					iconOnClick={(f) => {
						return (
							<Button onClick={() => f()}>
								<MdTableRestaurant size={'20px'} /> Agregar Mesa
							</Button>
						);
					}}
					isActiveAcceptBtn={false}
					textCancel={'Cerrar'}
				>
					<Form.Label htmlFor="inputMesa">
						Ingrese Nombre de la mesa
					</Form.Label>
					<InputGroup className="mb-3">
						<Form.Control
							ref={refInputMesa}
							type="text"
							id="inputMesa"
							aria-describedby="passwordHelpBlock"
							autoComplete="off"
						/>
						<Button
							variant="success"
							onClick={() => {
								addMesa(refInputMesa.current.value.trim());
							}}
							disabled={isLoadingMesa}
						>
							{isLoadingMesa ? (
								<>
									<Spinner
										as="span"
										animation="grow"
										size="sm"
										role="status"
										aria-hidden="true"
									/>
									<span>Guardando...</span>
								</>
							) : (
								'Agregar'
							)}
						</Button>
					</InputGroup>
					<Toast
						onClose={() => setShowMsgMesa(false)}
						show={showMsgMesa}
						delay={3000}
                        bg='danger'
                        className='text-center'
						autohide
					>
						<Toast.Body className='text-white'>{msgMesa}</Toast.Body>
					</Toast>
					<Form.Text muted>
						Ejemplo: Mesa 1, Mesa 2, Mesa de espera, etc. <br />
						Una vez creado la mesa no podrá eliminarlo, pero sí
						OCULTARLO, ya que la mesa guardara estadísticas de los
						clientes y ventas.
					</Form.Text>
				</ModalInput>
				<ModalInput
					title="Añadir Pisos/Secciones"
					iconOnClick={(f) => {
						return (
							<Button onClick={() => f()}>
								<TbNewSection size={'20px'} /> Añadir
								Pisos/Secciones
							</Button>
						);
					}}
					saveChangeBtn={() => {}}
					acceptBtn="Agregar Piso"
				>
					Agregar aqui
				</ModalInput>
				<Button>
					<BiGridVertical size={'20px'} /> Ver Estado de Mesas
				</Button>
			</ButtonGroup>
		</Container>
	);
};

export default BtnGroupMesa;
