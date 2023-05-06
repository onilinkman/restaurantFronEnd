import { Container, Row } from "react-bootstrap";
import {TfiHandStop} from 'react-icons/tfi'
import './Denied.css'

export default function Denied(props) {
	return <Container>
        <Row className="justify-content-md-center">
            <p className="errorNumber">403</p>
            <div className="float-animation text-center mt-5 mx-auto align-items-center row">
                <TfiHandStop color="white" size={'6em'}/>
                <p className="messageDenied text-capitalize fs-1">Acceso denegado</p>
            </div>
        </Row>
    </Container>;
}
