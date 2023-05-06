import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import Paginator from '../../../components/Paginator';
import { BiSelectMultiple } from 'react-icons/bi';
import ButtonStatusPersonnel from './ButtonStatusPersonnel';
import ModalInput from '../../../components/ModalInput';
import TableAccess from './PersonnelComponents/TableAccess';

const TablePersonnel = (props) => {
	const [tableSection, setTableSection] = useState(<></>);
	const [paginatorSection, setPaginatorSection] = useState(null);
	const SIZE_TABLE = 5;

	const makeTableSection = (numPg, data) => {
		let arrTr = [];
		for (
			let i = numPg === 1 ? 0 : SIZE_TABLE * (numPg - 1);
			i < data.length && i < SIZE_TABLE * (numPg - 1) + SIZE_TABLE;
			i++
		) {
			arrTr.push(
				<tr
					key={data[i].id_user}
					onClick={() => {
						//console.log(data[i].id_section);
						props.onClickTr(data[i].id_user, data[i].username);
					}}
				>
					<td>{i + 1}</td>
					<td>{data[i].username}</td>
					<td>{data[i].first_names}</td>
					<td>{data[i].p_lastname}</td>
					<td>{data[i].m_lastname}</td>
					<td>{data[i].ci}</td>
					<td>{data[i].email}</td>
					<td>{data[i].date_register}</td>
					<td className="mx-auto">
						<ModalInput
							iconOnClick={(f) => {
								return (
									<Button
										onClick={() => {
											f();
										}}
									>
										<BiSelectMultiple size={'1.7rem'} />
									</Button>
								);
							}}
							title={`Dar Accesos a ${data[i].username}`}
							isActiveAcceptBtn={false}
						>
							<TableAccess id_user={data[i].id_user}></TableAccess>
						</ModalInput>
					</td>
					<td className="text-center">
						<ButtonStatusPersonnel
							idUser={data[i]?.id_user}
							isActive={data[i]?.is_active}
							callback={(is_active) => {
								data[i].is_active = is_active;
							}}
						/>
					</td>
				</tr>
			);
		}
		return arrTr;
	};

	useEffect(() => {
		let data = props.data ? props.data : [];
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
			<Table striped bordered hover variant="dark" responsive>
				<thead>
					<tr>
						<th>#</th>
						<th>Usuario</th>
						<th>Nombres</th>
						<th>Ap. Paterno</th>
						<th>Ap. Materno</th>
						<th>CI/NIT</th>
						<th>EMAIL</th>
						<th>Fecha de Registro</th>
						<th className="text-center">Accesos</th>
						<th>Estado</th>
					</tr>
				</thead>
				<tbody>{tableSection}</tbody>
			</Table>
			{paginatorSection}
		</>
	);
};

export default TablePersonnel;
