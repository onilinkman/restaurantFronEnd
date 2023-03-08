import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Paginator from '../../../components/Paginator';

export default function TableSections(props) {
	const [tableSection, setTableSection] = useState(<></>);
	const [paginatorSection, setPaginatorSection] = useState(null);
	const SIZE_TABLE = 3;

	const makeTableSection = (numPg, data) => {
		let arrTr = [];
		for (
			let i = numPg === 1 ? 0 : SIZE_TABLE*( numPg - 1);
			i < data.length &&
			i < SIZE_TABLE*( numPg - 1) + SIZE_TABLE ;
			i++
		) {
			arrTr.push(
				<tr
					key={i}
					onClick={() => {
						//console.log(data[i].id_section);
						props.onClickTr(data[i].id_section,data[i].name)
					}}
				>
					<td>{i + 1}</td>
					<td>{data[i].name}</td>
					<td>{data[i].description}</td>
				</tr>
			);
		}
		return arrTr;
	};

	useEffect(() => {
		let data = props.data;
		setTableSection(makeTableSection(1, data));
		setPaginatorSection(
			<Paginator
				size={Math.ceil(data.length / SIZE_TABLE)}
				onClick={(numPg) =>
					setTableSection(makeTableSection(numPg, data))
				}
			/>
		);
	}, []);

	return (
		<>
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#</th>
						<th>Seccion</th>
						<th>Descripcion</th>
					</tr>
				</thead>
				<tbody>{tableSection}</tbody>
			</Table>
			{paginatorSection}
		</>
	);
}
