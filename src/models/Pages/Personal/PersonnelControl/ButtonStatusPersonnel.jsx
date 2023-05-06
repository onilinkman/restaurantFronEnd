import { forwardRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { MdOutlinePersonOff, MdOutlinePersonOutline } from 'react-icons/md';
import configProject from '../../../../configProject.json';

const ButtonStatusPersonnel = forwardRef((props, ref) => {
	const [status, setStatus] = useState(props.isActive === 0);

	const updatePersonnelIsActive = async (idUser, isActive) => {
		await fetch(
			configProject.dir_url +
				configProject.api_urls.updatePersonnelIsActive,
			{
				method: 'POST',
				headers: {
					Accept: '*/*',
					'Content-Type': 'application/json',
					'x-token': localStorage.getItem('x-token'),
				},
				body: JSON.stringify({
					idUser,
					isActive: isActive === 0 ? 1 : 0,
				}),
			}
		)
			.then((res) => {
                if(res.status===200){
                    setStatus(!status)
					props.callback(isActive === 0 ? 1 : 0)
                }
            })
			
			.catch((err) => console.log(err));
	};

	return (
		<Button
			onClick={() => {
				updatePersonnelIsActive(props.idUser,props.isActive)
			}}
			variant={status ? 'danger' : 'success'}
		>
			{status ? (
				<MdOutlinePersonOff size={'1.8rem'} />
				) : (
				<MdOutlinePersonOutline size={'1.8rem'} />
			)}
		</Button>
	);
});

export default ButtonStatusPersonnel;
