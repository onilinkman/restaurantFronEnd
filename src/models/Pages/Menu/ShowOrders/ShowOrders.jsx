import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ShowOrders = ({ ...props }) => {
	const location = useLocation();
	const data = location.state?.data;
	console.log(data,location);
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
	return <div>hola</div>;
};

export default ShowOrders;
