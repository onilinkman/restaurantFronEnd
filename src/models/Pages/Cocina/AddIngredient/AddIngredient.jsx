import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ModalInput from '../../../components/ModalInput';
import { FiEdit2 } from 'react-icons/fi';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { TiDeleteOutline } from 'react-icons/ti';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import addPhoto from '../../../assets/add_photo.svg';
import configProject from '../../../../configProject.json';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

export default function AddIngredient(props) {
	const [validatedPrice, setValidatedPrice] = useState(false);

	const [description, setDescription] =
		useState(`Lorem ipsum dolor sit amet consectetur, adipisicing
		elit. Quo ad, maiores aliquid quas perferendis quam
		omnis. Sint saepe, excepturi aut debitis ab aliquam
		quo odit suscipit, corporis nostrum corrupti magnam.`);
	const [ingredientsArray, setIngredientsArray] = useState([]);
	const [items, setItems] = useState([]);
	const [title, setTitle] = useState('Titulo');
	const [selectedFile, setSelectedFile] = useState(null);
	const [isLoading, setIsloading] = useState(null);

	const refDescription = useRef(null);
	const refIngredient = useRef(null);
	const refInputImage = useRef(null);
	const refImgPreview = useRef(null);
	const refInputTitle = useRef(null);
	const refInputPrice = useRef(null);
	const refForm = useRef(null);

	var file;

	const saveDescription = () => {
		setDescription(refDescription.current?.value);
	};

	const changeTitle = () => {
		let title = refInputTitle.current.value.trim();
		if (title !== '' && title !== 'Titulo') {
			setTitle(title);
		}
	};

	const addIngredient = () => {
		ingredientsArray.push(refIngredient.current.value);
		setIngredientsArray(ingredientsArray);
		refIngredient.current.value = '';
		setItems(makeListItem());
	};

	const deleteIngredient = (index) => {
		ingredientsArray.splice(index, 1);
		setIngredientsArray(ingredientsArray);
		setItems(makeListItem);
	};

	const makeListItem = () => {
		let elements = [];
		for (let i = 0; i < ingredientsArray.length; i++) {
			elements.push(
				<ListGroup.Item variant="dark" key={i}>
					{ingredientsArray[i]}
					<ModalInput
						title={'Eliminar Ingrediente'}
						iconOnClick={(f) => {
							return (
								<TiDeleteOutline
									color="black"
									size="25px"
									onClick={f}
								/>
							);
						}}
						saveChangeBtn={() => {
							deleteIngredient(i);
						}}
						acceptBtn={'Eliminar Ingrediente'}
					>
						{ingredientsArray[i]} ,Desea Eliminar el Ingrediente?
					</ModalInput>
				</ListGroup.Item>
			);
		}

		return elements;
	};

	const onSelectImg = (e) => {
		file = e.target.files[0];
		if (file) {
			const objectUrl = URL.createObjectURL(file);
			refImgPreview.current.src = objectUrl;
			setSelectedFile(file);
			//reader.readAsDataURL(file);
		}
		e.target.value = '';
	};

	const uploadMsg = () => {
		if (!isLoading) {
			return <></>;
		}
		if (!isLoading.success && !isLoading.error) {
			return (
				<div className="row justify-content-md-center">
					<Spinner animation="grow" variant="warning" />
				</div>
			);
		} else if (isLoading.success && !isLoading.error) {
			return (
				<Alert variant={'success'}>
					Se subio correctamente los datos, haga click{' '}
					<Link to="/Cocina">AQUI</Link> Para volver al menu de la
					cocina o puede continuar subiendo mas platillos al menu
				</Alert>
			);
		} else if (isLoading.success && isLoading.error) {
			return (
				<Alert variant={'warning'}>
					Se subieron los datos Pero hubo un error al subir la imagen
					(o no selecciono una imagen), haga click{' '}
					<Link to="/Cocina">AQUI</Link> Para volver al menu de la
					cocina y editar los datos e intentar subir su imagen
				</Alert>
			);
		} else if (!isLoading.success && isLoading.error) {
			<Alert variant={'danger'}>
				Hubo un error al subir los datos. Compruebe su conexion a la
				red, o que la aplicacion de escritorio este ejecutandose.
			</Alert>;
		}
	};

	const postData = async (obj) => {
		//const body=JSON.stringify(obj)
		setIsloading({ success: false, error: false });
		await fetch(configProject.dir_url + configProject.api_urls.addItem, {
			method: 'POST',
			headers: configProject.headersData,
			body: obj,
		})
			.then((response) => {
				if (response.status === 200) {
					setIsloading({ success: true, error: false });
				} else {
					setIsloading({ success: true, error: true });
				}
			})
			.catch((err) => {
				console.log(err);
				setIsloading({ success: false, error: true });
			});
	};

	const makeJsonMenu = () => {
		setValidatedPrice(true);
		if (refForm.current.checkValidity() === true) {
			let formData = new FormData();
			formData.append('title', title);
			formData.append('image', selectedFile);
			formData.append('description', description);
			formData.append('ingredients', JSON.stringify(ingredientsArray));
			formData.append('price', refInputPrice.current.value);
			postData(formData);
		}
	};

	return (
		<div className="container mt-3">
			<div className="row justify-content-md-center">
				<div className="col-md-auto">
					<img
						src={addPhoto}
						className="img-thumbnai mb-4"
						ref={refImgPreview}
						alt="imagen"
						width="200px"
						height="200px"
					></img>
					<div className="row justify-content-md-center">
						<input
							ref={refInputImage}
							type="file"
							accept="image/*;capture=camera"
							className="d-none"
							onChange={onSelectImg}
						/>
						<Button
							variant="primary"
							onClick={() => {
								refInputImage.current.click();
							}}
						>
							Cargar imagen
						</Button>
					</div>
				</div>
				<div className="col align-self-start">
					<p className="fs-1 fw-bold text-white">
						{title}{' '}
						{
							<ModalInput
								title={'Ingrese Titulo'}
								iconOnClick={(f) => {
									return (
										<FiEdit2 color="white" onClick={f} />
									);
								}}
								saveChangeBtn={changeTitle}
							>
								<FloatingLabel
									controlId="floatingTextarea2"
									label="Titulo"
								>
									<Form.Control
										as="textarea"
										placeholder="Leave a comment here"
										style={{ height: '100px' }}
										ref={refInputTitle}
									/>
								</FloatingLabel>
							</ModalInput>
						}
					</p>
					<p className="fs-2 fw-bold text-white">
						Descripcion{' '}
						<ModalInput
							title={'Ingrese Descripcion'}
							iconOnClick={(f) => {
								return <FiEdit2 color="white" onClick={f} />;
							}}
							saveChangeBtn={saveDescription}
						>
							<FloatingLabel
								controlId="floatingTextarea2"
								label="Descripcion"
							>
								<Form.Control
									as="textarea"
									placeholder="Leave a comment here"
									style={{ height: '100px' }}
									ref={refDescription}
								/>
							</FloatingLabel>
						</ModalInput>
					</p>

					<p className="lh-sm text-white">{description}</p>

					<p className="fs-2 fw-bold text-white">
						Ingredientes{' '}
						<ModalInput
							title={'Agregar Ingrediente'}
							iconOnClick={(f) => {
								return (
									<IoMdAddCircleOutline
										color="white"
										onClick={f}
									/>
								);
							}}
							saveChangeBtn={addIngredient}
						>
							<FloatingLabel
								controlId="floatingInput"
								label="Ingrediente"
								className="mb-3"
							>
								<Form.Control
									type="text"
									placeholder="Ingrese Ingrediente"
									ref={refIngredient}
								/>
							</FloatingLabel>
						</ModalInput>
					</p>
					<ListGroup
						className="bg-dark overflow-auto"
						style={{ maxHeight: '150px' }}
					>
						{items}
					</ListGroup>
					<div className="row mt-4">
						<Form
							ref={refForm}
							noValidate
							validated={validatedPrice}
							onSubmit={(event) => event.preventDefault()}
						>
							<Row className="mb-3">
								<InputGroup className="mb-3">
									<InputGroup.Text>Bs</InputGroup.Text>
									<InputGroup.Text>0.00</InputGroup.Text>
									<Form.Control
										aria-label="Dollar amount (with dot and two decimal places)"
										ref={refInputPrice}
										aria-describedby="inputGroupPrepend"
										pattern="^\d+(\.\d{2})?$"
										required
									/>
									<Form.Control.Feedback type="invalid">
										INGRESE DATOS DEL TIPO NUMERICO Y CON 2
										DIGITOS DESPUES DEL "."
									</Form.Control.Feedback>
								</InputGroup>
							</Row>
						</Form>
					</div>
				</div>
			</div>
			{uploadMsg()}
			<div className="row justify-content-md-center mt-4">
				<div className="col-md-auto">
					<Button variant="success" onClick={makeJsonMenu}>
						Finalizar Registro
					</Button>
				</div>

				<div className="col-md-auto">
					<Link to="/Cocina">
						<Button variant="danger">Cancelar</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
