import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/**
 *example for add icon iconOnClick={(f) => {return (<TiDeleteOutline color="black"	size="25px"	onClick={f}/>);}}
 * @param {iconOnClick,title,saveChangeBtn,acceptBtn,isActiveAcceptBtn} props
 * @returns
 */
export default function ModalInput(props) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	let iconBtn = props.iconOnClick(handleShow);
	let saveChange = () => {
        if(!!props.saveChangeBtn){
            props.saveChangeBtn();
        }
		handleClose();
	};
	const acceptBtn=props.acceptBtn==="" || props.acceptBtn===undefined?"Guardar cambios":props.acceptBtn
	return (
		<>
			{iconBtn}

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{props.children}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						{props.textCancel===undefined ? 'Cancelar' : props.textCancel}
					</Button>
					{props.isActiveAcceptBtn===undefined || props.isActiveAcceptBtn?<Button variant="primary" onClick={saveChange}>
						{acceptBtn}
					</Button>:<></>}
				</Modal.Footer>
			</Modal>
		</>
	);
}
