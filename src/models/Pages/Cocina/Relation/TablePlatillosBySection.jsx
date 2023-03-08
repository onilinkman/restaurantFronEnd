import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Paginator from '../../../components/Paginator';
import Button from 'react-bootstrap/Button';
import {CgRemove} from 'react-icons/cg'

export default function TablePlatillosBySection(props) {
	const [tableSection, setTableSection] = useState(<></>);
	const [paginatorSection, setPaginatorSection] = useState(null);
	const SIZE_TABLE = 3;

	const makeTableSection = (numPg, data) => {
		let arrTr = [];
		for (
			let i = numPg === 1 ? 0 : SIZE_TABLE * (numPg - 1);
			i < data.length && i < SIZE_TABLE * (numPg - 1) + SIZE_TABLE;
			i++
		) {
			arrTr.push(
				<tr
					key={i}
					onClick={() => {
						//console.log(data[i].id_section);
						props.onClickTr(data[i].id_section);
					}}
				>
					<td>{i + 1}</td>
					<td>{data[i].name}</td>
					<td className='text-center'>
						<Button
							variant="danger"
							size='sm'
                            className='text-white fw-bolder'
							onClick={()=>props.onClickRemove(data[i].id_menu)}
						>
							<CgRemove size={"24px"}/>
						</Button>
					</td>
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
						<th>Platillo</th>
						<th>Quitar</th>
					</tr>
				</thead>
				<tbody>{tableSection}</tbody>
			</Table>
			{paginatorSection}
		</>
	);
}
