import { useSearchParams, Link, useLocation } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
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

export default function EditIngredient(props) {
	const [searchParams] = useSearchParams();
	const id = searchParams.get('id');

	const [validatedPrice, setValidatedPrice] = useState(false);
	const { pathname } = useLocation();

	const [description, setDescription] =
		useState(`Lorem ipsum dolor sit amet consectetur, adipisicing
		elit. Quo ad, maiores aliquid quas perferendis quam
		omnis. Sint saepe, excepturi aut debitis ab aliquam
		quo odit suscipit, corporis nostrum corrupti magnam.`);
	const [items, setItems] = useState([]);
	const [title, setTitle] = useState('Titulo');
	const [urlImage, setUrlImage] = useState('');

	const refDescription = useRef(null);
	const refIngredient = useRef(null);
	const refInputImage = useRef(null);
	const refImgPreview = useRef(null);
	const refInputPrice = useRef(null);
	const refForm = useRef(null);

	var file;

	const onSelectImg = (e) => {
		file = e.target.files[0];
		if (file) {
			const objectUrl = URL.createObjectURL(file);
			refImgPreview.current.src = objectUrl;
		}
		e.target.value = '';
		updateImage(file);
	};

	const updateImage = (file) => {
		let formData = new FormData();
		formData.append('url_image', urlImage);
		formData.append('id_menu', id);
		formData.append('image', file);
		fetch(configProject.dir_url + configProject.api_urls.updateImage, {
			method: 'PUT',
			headers: configProject.headersData,
			body: formData,
		})
			.then((res) => {
				if (res.status === 200) {
					res.json();
				} else if (res.status === 406) {
					refImgPreview.current.src = '';
				}
			})
			.then((data) => {
				if (data?.newUrl_img) {
					setUrlImage(data.newUrl_img);
				}
			})
			.catch((err) => {
				console.log('error updateImage', err);
			});
	};

	const saveDescription = () => {
		if (refDescription.current?.value) {
			fetch(
				configProject.dir_url + configProject.api_urls.putIngredient,
				{
					method: 'PUT',
					headers: configProject.headersList,
					body: JSON.stringify({
						id_menu: id,
						description: refDescription.current.value,
					}),
				}
			)
				.then((res) => {
					if (res.status === 200) {
						setDescription(refDescription.current?.value);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const deleteIngredient = (id_ingredient) => {
		fetch(configProject.dir_url + configProject.api_urls.deleteIngredient, {
			method: 'DELETE',
			headers: configProject.headersList,
			body: JSON.stringify({
				id_ingredient: id_ingredient,
				id_menu: id,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setItems(makeListItem(data));
			})
			.catch((err) => {
				console.log('deleteIngredient', err);
			});
	};

	const makeListItem = (data) => {
		let elements = [];
		if (data.length > 0 && data[0].id_ingredient !== null) {
			for (let i = 0; i < data.length; i++) {
				elements.push(
					<ListGroup.Item variant="dark" key={i}>
						{data[i].ingredient}
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
								deleteIngredient(data[i].id_ingredient);
							}}
							acceptBtn={'Eliminar Ingrediente'}
						>
							{data[i].ingredient} ,Desea Eliminar el Ingrediente?
						</ModalInput>
					</ListGroup.Item>
				);
			}
		}

		return elements;
	};

	const addIngredient = () => {
		postIngredient(id, refIngredient.current.value, () => {
			refIngredient.current.value = '';
		});
	};

	const putPriceIngredient = () => {
		if(refInputPrice.current.value.trim()===''){
			setValidatedPrice(true)
			return
		}
		fetch(
			configProject.dir_url + configProject.api_urls.putPriceIngredient,
			{
				method: 'PUT',
				headers: configProject.headersList,
				body: JSON.stringify({
					id_menu: id,
					price: refInputPrice.current.value,
				}),
			}
		)
			.then((res) => {
				if (res.status === 200) {
					console.log('Se guardo correctamente');
				} else {
					console.log('hubo error al guardar el precio');
				}
			})
			.catch((err) => {
				console.log('Error putPriceIngredient', err);
			});
	};

	const postIngredient = (id_menu, description, callback) => {
		fetch(configProject.dir_url + configProject.api_urls.postIngredient, {
			method: 'POST',
			headers: configProject.headersList,
			body: JSON.stringify({
				id_menu: id_menu,
				description: description,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				setItems(makeListItem(data));
				callback();
			})
			.catch((err) => {
				console.log('PostIngredients', err);
			});
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		fetch(
			configProject.dir_url +
				configProject.api_urls.getMenuById +
				'?id_menu=' +
				id,
			{
				method: 'GET',
				headers: configProject.headersList,
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					setTitle(data[0].title);
					setDescription(data[0].description);
					refInputPrice.current.value = data[0].price;
					refImgPreview.current.src =
						configProject.dir_url +
						configProject.img_urls.getImgMenu +
						'?img=' +
						data[0].url_image;
					setItems(makeListItem(data));
					setUrlImage(data[0].url_image);
				}
			})
			.catch((err) => {
				console.log('Error::', err);
			});
	}, [pathname, id]);

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
					<p className="fs-1 fw-bold text-white">{title}</p>
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
									<Button
										variant="primary"
										onClick={putPriceIngredient}
									>
										Guardar Monto
									</Button>
								</InputGroup>
							</Row>
						</Form>
					</div>
				</div>
			</div>
			<div className="row justify-content-md-center mt-4">
				<div className="col-md-auto"></div>

				<div className="col-md-auto">
					<Link to="/Cocina">
						<Button variant="danger">Volver</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
