import React from 'react';
import { Link } from 'react-router-dom';
import ShowQR from './showQR';

export default function Login(args) {
	return (
		<React.Fragment>
            <div className='container translate-middl '>
			    <ShowQR />

            </div>
			<section>
				<div className="container ">
					<div className="row d-flex justify-content-center align-items-center ">
						<div className="col-12 col-md-8 col-lg-6 col-xl-5">
							<div
								className="card bg-dark text-white"
							>
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
											/>
											<label
												className="form-label"
												htmlFor="typeEmailX"
											>
												Email
											</label>
										</div>

										<div className="form-outline form-white mb-4">
											<input
												type="password"
												id="typePasswordX"
												className="form-control form-control-lg"
											/>
											<label
												className="form-label"
												htmlFor="typePasswordX"
											>
												Password
											</label>
										</div>

										<p className="small mb-5 pb-lg-2">
											<Link className="text-white-50" to="/">
												Forgot password?
											</Link>
										</p>

										<button
											className="btn btn-outline-light btn-lg px-5"
											type="submit"
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
											Don't have an account?{' '}
											<Link
												to="/"
												className="text-white-50 fw-bold"
											>
												Sign Up
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
