import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {
	MdMenuBook,
	MdOutlinePointOfSale,
	MdManageAccounts,
	MdBuild,
} from 'react-icons/md';
import { SiAirtable } from 'react-icons/si';
import { TbToolsKitchen2 } from 'react-icons/tb';
import React from 'react';

export default function Main(props) {
	return (
		<React.Fragment>
			<div className="container-fluid  ">
				<div className="align-items-center mx-auto mt-5 text-center row">
					<div className="col">
						<Link to="/Menu">
							<Button
								variant="outline-secondary"
								className="p-5 m-3"
							>
								<MdMenuBook size={75} />
								<p className="fs-3">Menu</p>
							</Button>
						</Link>
					</div>
					<div className="col">
						<Link to="/Mesas">
							<Button
								variant="outline-secondary"
								className="p-5 m-3"
							>
								<SiAirtable size={75} />
								<p className="fs-3">Mesas</p>
							</Button>
						</Link>
					</div>
					<div className="col">
						<Link to="/Cocina">
							<Button
								variant="outline-secondary"
								className="p-5 m-3"
							>
								<TbToolsKitchen2 size={75} />
								<p className="fs-3">Cocina</p>
							</Button>
						</Link>
					</div>
				</div>
				<div className="align-items-center mx-auto mt-5 text-center row">
					<div className="col">
						<Link to="/Tienda">
							<Button
								variant="outline-secondary"
								className="p-5 m-3"
							>
								<MdOutlinePointOfSale size={75} />
								<p className="fs-3">Tienda</p>
							</Button>
						</Link>
					</div>
					<div className="col">
						<Link to="/Personal">
							<Button
								variant="outline-secondary"
								className="p-5 m-3"
							>
								<MdManageAccounts size={75} />
								<p className="fs-3">Personal</p>
							</Button>
						</Link>
					</div>
					<div className="col">
						<Link to="/conf">
							<Button
								variant="outline-secondary"
								className="p-5 m-3"
							>
								<MdBuild size={75} />
								<p className="fs-3">Configuracion</p>
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}
