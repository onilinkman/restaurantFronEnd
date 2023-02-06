import ListGroup from 'react-bootstrap/ListGroup';

export default function CardMenu(props) {
	var cardTitle =
		props.cardTitle === '' || props.cardTitle === undefined
			? 'Titulo de la Card'
			: props.cardTitle;
	var cardDescription =
		props.cardDescription === '' || props.cardDescription === undefined
			? ''
			: props.cardDescription;

	var url_image = props.urlImage
		? props.urlImage
		: 'http://dummyimage.com/170x100.png/cc0000/ffffff';

	const darkTheme = 'bg-dark text-white';
	const lightTheme = 'bg-light text-black';

	const theme = props.theme !== 'light' ? darkTheme : lightTheme;

	const listConstructor = () => {
		let arr = [];
		if (props.listIngredients) {
			for (let i = 0; i < props.listIngredients?.length; i++) {
				let listGroup = (
					<ListGroup.Item key={i} className={theme}>
						{props.listIngredients[i]?.description}
					</ListGroup.Item>
				);
				arr.push(listGroup);
			}
		}
		return arr;
	};

	return (
		<div
			className="container col justify-content-md-center"
			style={{ width: '100%', maxWidth: '604px' }}
		>
			<div className={'card mb-3 ' + theme}>
				<div className=" row row g-0">
					<div className="col-md-4 ">
						<img
							src={url_image}
							className="img-thumbnai mb-4"
							alt="imagen"
							width="100%"
							height="200px"
						></img>
					</div>
					<div className="col">
						<div className="card-body ">
							<h5 className="card-title">{cardTitle}</h5>
							<p className="card-text text-white">
								{cardDescription}
							</p>
							<h5 className="card-title">Ingredientes:</h5>
							<ListGroup
								className={
									'list-group-flush ' +
									theme +
									' overflow-auto'
								}
								style={{ maxHeight: '100px' }}
							>
								{listConstructor()}
							</ListGroup>
							<p className="card-text">
								<small className="text-muted">
									{'Precio: ' +
										(props.price
											? props.price
											: 'Sin precio ') +
										' Bs.'}
								</small>
							</p>
						</div>
					</div>
				</div>
				<div className='d-flex justify-content-evenly'>
					{props.children}
				</div>
			</div>
		</div>
	);
}
