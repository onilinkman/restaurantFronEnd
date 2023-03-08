import React, {  useState } from 'react';
import Table from 'react-bootstrap/Table';
import Paginator from '../../../components/Paginator';
import Button from 'react-bootstrap/Button';
import { GoDiffAdded } from 'react-icons/go';

export default function TablePlatillos(props) {
	const SIZE_TABLE = 3;
	const [numPg, setNumPg] = useState(1);

	const makeTableSection = (numPg) => {
		let arrTr = [];
		for (
			let i = numPg === 1 ? 0 : SIZE_TABLE * (numPg - 1);
			i < props.data.length && i < SIZE_TABLE * (numPg - 1) + SIZE_TABLE;
			i++
		) {
			arrTr.push(
				<tr
					key={i}
					onClick={() => {
						//console.log(data[i].id_section);
						props.onClickTr(props.data[i].id_section);
					}}
				>
					<td>{i + 1}</td>
					<td>{props.data[i].name}</td>
					<td className="text-center">
						<Button
							variant="success"
							size="sm"
							className="text-white fw-bolder"
							onClick={() => props.onClickAdd(props.data[i].id_menu)}
						>
							<GoDiffAdded size={'24px'} />
						</Button>
					</td>
				</tr>
			);
		}
		return arrTr;
	};

	

	return (
		<>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>Platillo</th>
						<th>Agregar</th>
					</tr>
				</thead>
				<tbody>
					{makeTableSection(numPg).map((obj) => {
						return obj;
					})}
				</tbody>
			</Table>
			<Paginator  key={props.data.length}
				size={Math.ceil(props.data.length / SIZE_TABLE)}
				onClick={(numPg1) => setNumPg(numPg1)}
			/>
		</>
	);
}
