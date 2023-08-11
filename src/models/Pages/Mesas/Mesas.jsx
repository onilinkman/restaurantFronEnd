
import BtnGroupMesa from './BtnGroupMesa';
import InsertBodyMesa from './InsertBodyMesa';

const Mesas = ({ ...props }) => {
	return (
		<>
			<p className="text-uppercase text-center fs-2">Administrar Mesas</p>
			<BtnGroupMesa/>
			<InsertBodyMesa />
		</>
	);
};

export default Mesas;
