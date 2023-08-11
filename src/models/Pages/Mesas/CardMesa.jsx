import { useEffect, useRef, useState } from 'react';
import { Card } from 'react-bootstrap';

const CardMesa = ({ ...props }) => {
	const coordinates = { x: 0, y: 0 };
	const localCoord = { x: 0, y: 0 };
	let isPressing = false;
	const [coordStyle, setCoordStyle] = useState({
		width: '18rem',
		display: 'none',
		zIndex: 4,
		top: '55px',
		left: '35px',
	});

	const titleRef = useRef(null);
	const originalRef = useRef(null);

	const handleMouseDownOriginal = (event) => {
		const { pageX, pageY } = event;
		const originalCardRect = originalRef.current; //.getBoundingClientRect();
		isPressing = true;
		setCoordStyle({
			width: '18rem',
			display: 'block',
			zIndex: 4,
			top: originalCardRect.offsetTop,
			left: originalRef.current.getBoundingClientRect().x,
		});
		//const titleRect = titleRef.current.getBoundingClientRect();
		localCoord.x = pageX - originalRef.current.getBoundingClientRect().x;
		localCoord.y = pageY - originalCardRect.offsetTop;
	};

	const handleMouseUp = () => {
		isPressing = false;
		setCoordStyle({
			width: '18rem',
			display: 'none',
			zIndex: 4,
			top: 0,
			left: 0,
		});
	};

	const handleMouseMove = (event) => {
		if (isPressing) {
			const { pageX, pageY } = event;

			coordinates.x = pageX;
			coordinates.y = pageY;
			setCoordStyle({
				width: '18rem',
				zIndex: 4,
				top: coordinates.y - localCoord.y + 'px',
				left: coordinates.x - localCoord.x + 'px',
			});
		}
	};

	const handleMouseDownCapture = () => {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
	};

	const handleMouseUpCapture = () => {
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
	};

	useEffect(() => {
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, []);

	return (
		<>
			<Card style={{ width: '18rem', zIndex: 0 }} ref={originalRef}>
				<Card.Header
					style={{ userSelect: 'none' }}
					onMouseDown={handleMouseDownOriginal}
					onMouseDownCapture={handleMouseDownCapture} // Usamos 'onMouseDownCapture' en lugar de 'onMouseDown'
					onMouseUpCapture={handleMouseUpCapture}
					onTouchStart={handleMouseDownOriginal}
				>
					{props.title}
				</Card.Header>
				<Card.Body>
					<Card.Text>{props.description}</Card.Text>
					<Card.Link href="#">Card Link</Card.Link>
					<Card.Link href="#">Another Link</Card.Link>
				</Card.Body>
			</Card>
			<Card
				ref={titleRef}
				className={`position-absolute `}
				style={{ ...coordStyle, pointerEvents: 'none' }}
				bg="secondary"
			>
				<Card.Header
					style={{ userSelect: 'none' }}
					onMouseUp={handleMouseUp}
				>
					{props.title}
				</Card.Header>
				<Card.Body>
					<Card.Text>{props.description}</Card.Text>
					<Card.Link href="#">Card Link</Card.Link>
					<Card.Link href="#">Another Link</Card.Link>
				</Card.Body>
			</Card>
		</>
	);
};

export default CardMesa;
