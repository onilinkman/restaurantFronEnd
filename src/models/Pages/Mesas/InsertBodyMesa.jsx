import { Col, Container, Row } from 'react-bootstrap';
import CardMesa from './CardMesa';
import { useState } from 'react';
import ContainerCardH from './ContainerCardH';

const InsertBodyMesa = ({ ...props }) => {
	const [tableSelected, setTableSelected] = useState(false);
	const dummie = [
		{
			id_room: 1,
			description: '1er piso',
			elements: [],
		},
		{
			id_room: 2,
			description: '2do piso',
			elements: [],
		},
		{
			id_room: 3,
			description: '3er piso',
			elements: [],
		},
	];

	const dummieCardH = [
		{
			id:1,
			title: 'Mesa 1',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!',
		},{
			id:2,
			title: 'Mesa 2',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!',
		},{
			id:3,
			title: 'Mesa 3',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!',
		},
	];

	/*  overflow-x: auto;
    flex-wrap: nowrap;
    box-shadow: 0px -6px 20px 0px #0071a3; */

	return (
		<>
			<Row>
				<Col xs="auto" className="border-end border-3">
					<CardMesa
						title="Mesa 2"
						description={
							'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!'
						}
					/>
					<CardMesa
						title="Mesa 3"
						description={
							'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!'
						}
					/>
					<CardMesa
						title="Mesa 1"
						description={
							'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!'
						}
					/>
				</Col>
				<Col sm={8}>
					<Row
						style={{ overflowX: 'auto', flexWrap: 'nowrap' }}
						className="p-3"
					>
						<CardMesa
							title="Mesa 1"
							description={
								'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!'
							}
						/>
						<CardMesa
							title="Mesa 1"
							description={
								'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!'
							}
						/>
						<CardMesa
							title="Mesa 1"
							description={
								'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!'
							}
						/>
						<CardMesa
							title="Mesa 1"
							description={
								'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!'
							}
						/>
					</Row>
					<ContainerCardH arrayCard={dummieCardH} />
					<Row>1</Row>
					<Row>1</Row>
				</Col>
			</Row>
		</>
	);
};

export default InsertBodyMesa;
