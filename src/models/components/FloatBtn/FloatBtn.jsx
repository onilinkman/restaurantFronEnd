import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

import './FloatBtn.css';

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function FloatBtn({ ...props }) {
	let items = props?.items ? props.items : [];

	return (
		<div className="btn-float zindex-3">
			<Dropdown>
				<Dropdown.Toggle
					variant="info"
					id="dropdown-basic"
				></Dropdown.Toggle>

				<Dropdown.Menu>
					{items.map((obj, index) => {
						let item;
						if (obj?.url) {
							item = (
								<Dropdown.Item key={index}	as={Link} to={obj.url}>
									{obj.name}
								</Dropdown.Item>
							);
						} else {
							item = (
								<Dropdown.Item	key={index}	onClick={obj.onClick}>
									{obj.name}
								</Dropdown.Item>
							);
						}
						return item;
					})}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
}
