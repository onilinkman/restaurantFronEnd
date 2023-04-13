import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShowQR from './showQR';
import configProject from '../../../configProject.json';

export default function Login(args) {
	const refUsername = useRef();
	const refPassword = useRef();

	const navigate = useNavigate();

	const [isUnauthorized, setIsUnauthorized] = useState(false);

	let loginSession = async (username, password) => {
		await fetch(configProject.dir_url + configProject.api_urls.login, {
			method: 'POST',
			headers: configProject.headersList,
			body: JSON.stringify({
				username,
				password,
			}),
		})
			.then((response) => {
				if (response.status === 200) {
					return response.json('/');
				} else {
					setIsUnauthorized(true);
				}
			})
			.then((data) => {
				if (data) {
					localStorage.setItem('x-token', data.token);
					args.updateToken(data.token);
					navigate('/');
				} else {
					console.log('error');
				}
			})
			.catch((err) => console.log('Error loginSession:', err));
	};

	return (
		<React.Fragment>
			<div className="container translate-middl ">
				<ShowQR />
			</div>
			<section>
				<div className="container ">
					<div className="row d-flex justify-content-center align-items-center ">
						<div className="col-12 col-md-8 col-lg-6 col-xl-5">
							<div className="card bg-dark text-white">
								<div className="card-body p-5 text-center">
									<div className="mb-md-5 mt-md-4 pb-5">
										<h2 className="fw-bold mb-2 text-uppercase">
											Iniciar Sesion
										</h2>
										<p className="text-white-50 mb-5">
											Please enter your login and
											password!
										</p>

										<div className="form-outline form-white mb-4">
											<input
												type="email"
												id="typeEmailX"
												className="form-control form-control-lg"
												ref={refUsername}
											/>
											<label
												className="form-label"
												htmlFor="typeEmailX"
											>
												Username
											</label>
										</div>

										<div className="form-outline form-white mb-4">
											<input
												type="password"
												id="typePasswordX"
												className="form-control form-control-lg"
												ref={refPassword}
											/>
											<label
												className="form-label"
												htmlFor="typePasswordX"
											>
												Contraseña
											</label>
										</div>

										<p className="small mb-5 pb-lg-2">
											<Link
												className="text-white-50"
												to="/"
											>
												Olvido su contraseña?
											</Link>
										</p>

										{isUnauthorized ? (
											<p>
												No valido Verifique sus
												credenciales
											</p>
										) : (
											<></>
										)}
										<button
											className="btn btn-outline-light btn-lg px-5"
											type="submit"
											onClick={() => {
												let username =
													refUsername.current.value.trim();
												let password =
													refPassword.current.value;
												loginSession(
													username,
													password
												);
											}}
										>
											Iniciar Sesion
										</button>

										<div className="d-flex justify-content-center text-center mt-4 pt-1">
											<Link to="/" className="text-white">
												<i className="fab fa-facebook-f fa-lg"></i>
											</Link>
											<Link to="/" className="text-white">
												<i className="fab fa-twitter fa-lg mx-4 px-2"></i>
											</Link>
											<Link to="/" className="text-white">
												<i className="fab fa-google fa-lg"></i>
											</Link>
										</div>
									</div>

									<div>
										<p className="mb-0">
											No tiene una cuenta?{' '}
											<Link
												to="/"
												className="text-white-50 fw-bold"
											>
												Registrate!
											</Link>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</React.Fragment>
	);
}
