import { Card } from 'react-bootstrap';

export default function Section({ ...props }) {
	return (
		<Card className="text-center bg-secondary text-white cursor-pointer mb-3" onClick={props.onClick}>
			<Card.Header className='fw-bolder'>{props.name}</Card.Header>
			<Card.Body >
				<Card.Text>
					{props.description}
				</Card.Text>
			</Card.Body>
			<Card.Footer className="text-white fst-italic">Seleccionar</Card.Footer>
		</Card>
	);
}
