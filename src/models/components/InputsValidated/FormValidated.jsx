import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Col, Form } from 'react-bootstrap';

const FormValidated = forwardRef((props, ref) => {
	const refInput = useRef(null);
	const getValueInput = () => {
		return refInput.current.value;
	};
	useImperativeHandle(ref, () => ({
		getValueInput,
	}));
	return (
		<Form.Group
			controlId={props.controlId}
			as={Col}
			aria-describedby="inputGroupPrepend"
			className="mb-3"
		>
			<Form.Label className="text-white fs-5 fst-normal">
				{props.label}
			</Form.Label>

			<Form.Control
				style={{ backgroundColor: '#ffffff2e', color: 'white' }}
				ref={refInput}
				type={props.type}
				isInvalid={!!props.isInvalid}
				placeholder={props.placeholder}
				required={props.isRequired}
			/>
			<Form.Control.Feedback type="invalid">
				{props.feedback}
			</Form.Control.Feedback>
		</Form.Group>
	);
});

export default FormValidated;
