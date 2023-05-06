import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { BsFillPersonBadgeFill } from 'react-icons/bs';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IoIosPerson, IoIosPersonAdd } from 'react-icons/io';

export default function Personal(props) {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<React.Fragment>
			<div className="container-fluid  ">
				<div className="align-items-center mx-auto mt-5 text-center row">
					<div className="col">
						<Link to="/Personal/AddPersonal">
							<Button
								variant="outline-secondary"
								className="p-5 m-3"
							>
								<AiOutlineUserAdd size={75} />
								<p className="fs-3">Agregar Personal</p>
							</Button>
						</Link>
					</div>

					<div className="col">
						<Link to="/Personal/Control">
							<Button
								variant="outline-secondary"
								className="p-5 m-3"
							>
								<BsFillPersonBadgeFill size={75} />
								<p className="fs-3 text-center">
									Control del Personal
								</p>
							</Button>
						</Link>
					</div>

					<div className="col">
						<Link to="/conf">
							<Button
								variant="outline-secondary"
								className="p-5 m-3"
							>
								<IoIosPersonAdd size={75} />
								<p className="fs-3">Agregar Cliente</p>
							</Button>
						</Link>
					</div>

					<div className="col">
						<Link to="/conf">
							<Button
								variant="outline-secondary"
								className="p-5 m-3"
							>
								<IoIosPerson size={75} />
								<p className="fs-3">Control Clientes</p>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
