import CardMenu from '../../components/CardMenu';
import configProject from '../../../configProject.json';
import BtnActionsMenu from './BtnActionsMenu';

export default function ListMenu({ ...props }) {
	return (
		<div className=" row row-cols-2 justify-content-md-center mt-3">
			{props.listMenu.map((obj, index) => {
				return (
					<CardMenu
						key={index + '' + obj.id_menu}
						cardTitle={obj.title}
						cardDescription={obj.description}
						urlImage={
							configProject.dir_url +
							configProject.img_urls.getImgMenu +
							'?img=' +
							obj.url_image
						}
						price={obj.price}
						onError={() => {}}
					>
						<BtnActionsMenu
							id={'action' + obj.id_menu}
							onClick={(input) => {
								let dishObject = {...obj}
								dishObject.acount=input
								props.getAcountDish(dishObject);
							}}
						/>
					</CardMenu>
				);
			})}
		</div>
	);
}
