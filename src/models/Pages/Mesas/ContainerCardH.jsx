import { Row } from 'react-bootstrap';
import '../../assets/styles/effects.css';
import CardMesa from './CardMesa';

const ContainerCardH = ({ ...props }) => {
	
	const handleMouseUp = (event) => {
			console.log('clic up');
	};

	return (
		<Row
			style={{ overflowX: 'auto', flexWrap: 'nowrap' }}
			className="p-3 selectedFloor scrollable-element"
			onMouseUpCapture={handleMouseUp}
		>
			{props.arrayCard.map((obj) => (
				<CardMesa
					key={obj.id}
					title={obj.title}
					description={obj.description}
				/>
			))}
		</Row>
	);
};

export default ContainerCardH;
