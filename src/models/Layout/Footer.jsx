import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsFacebook, BsWhatsapp } from 'react-icons/bs';

export default function Footer(props) {
	let companyName = 'Nombre de la compañia';
	return (
		<Container className='mt-5 pt-5 pb-5'>
			<Row>
				<Col>
					<div className="container">
						<p className="text-white fs-3 text text-center fw-bold">
							{companyName}
						</p>
						<p className="text-secondary fs-5 text">
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Quo ad, maiores aliquid quas perferendis quam
							omnis. Sint saepe, excepturi aut debitis ab aliquam
							quo odit suscipit, corporis nostrum corrupti magnam.
						</p>
					</div>
				</Col>
				<Col>
					<div className="container text-center">
						<p className="text-white fs-3 text text-center fw-bold">
							GUIA
						</p>
						<div>
							<ul>
								<li className='text-secondary'>
									Como Pedir un platillo
								</li>
								<li className='text-secondary'>
									Ver Que mesas hay
								</li>
								<li className='text-secondary'>
									Como llamar a un mesero
								</li>
								<li className='text-secondary'>
									Para que crear una cuenta?
								</li>
								<li className='text-secondary'>
									Pedir algo mientras espero?
								</li>
							</ul>
						</div>
					</div>
				</Col>
				<Col>
					<div className="container text-center">
						<p className="text-white text-center fs-3 text ">
							Nuestras Redes
						</p>
						<div>
							<a
								href="https://www.facebook.com/khrysmarban"
								className="text-secondary fst-normal text-center text-muted font-monospace "
							>
								<BsFacebook
									size="45"
									color="grey"
									className=" me-auto p-1"
								/>
								Facebook
							</a>
						</div>
						<div>
							<a
								href="https://www.facebook.com/khrysmarban"
								className="text-secondary fst-normal text-center text-muted font-monospace "
							>
								<BsWhatsapp
									size="45"
									color="grey"
									className=" me-auto p-1"
								/>
								Whatsapp
							</a>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<div className='container text-center p-5'>
					<p className='text-secondary'>
						Todos los derechos reservados @ExultSoft 2022
					</p>
				</div>
			</Row>
		</Container>
	);
}
