import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

/**
 * size : integer
 * onClick(num) : function
 *
 * @param {*} props
 * @returns
 */
export default function Paginator(props) {
	const fnPage = (selected) => {
		let length = props.size ? props.size : 0;
		let arr = [];
		arr.push(
			<Pagination.Prev
				className="pg-dark"
				key={'prev'}
				onClick={() => {
					setPages(fnPage(selected > 1 ? selected - 1 : 1));
					if (props.onClick) {
						props.onClick(selected > 1 ? selected - 1 : 1);
					}
				}}
			/>
		);
		for (let i = 1; i <= length; i++) {
			if (i < 2 || (i >= selected + 2 && i <= selected - 2)) {
				arr.push(
					<Pagination.Item
						className="pg-dark"
						active={selected === i}
						key={i + '' + props.size}
						onClick={() => {
							setPages(fnPage(i));
							if (props.onClick) {
								props.onClick(i);
							}
						}}
					>
						{i}
					</Pagination.Item>
				);
			} else if (i >= selected - 2 && i <= selected + 2 && i !== length) {
				if (i === selected - 2 && 2 !== selected - 2) {
					arr.push(
						<Pagination.Ellipsis
							className="pg-dark"
							key={i + 'ellipsis'}
						/>
					);
				}

				arr.push(
					<Pagination.Item
						className="pg-dark"
						active={selected === i}
						key={i}
						onClick={() => {
							setPages(fnPage(i));
							if (props.onClick) {
								props.onClick(i);
							}
						}}
					>
						{i}
					</Pagination.Item>
				);
			}
			if (i === selected + 3 && i !== length) {
				arr.push(
					<Pagination.Ellipsis
						className="pg-dark"
						key={i + 'ellipsis'}
					/>
				);
			}
			if (i === length && i !== 1) {
				arr.push(
					<Pagination.Item
						className="pg-dark"
						active={selected === i}
						key={i}
						onClick={() => {
							setPages(fnPage(i));
							if (props.onClick) {
								props.onClick(i);
							}
						}}
					>
						{i}
					</Pagination.Item>
				);
			}
		}
		arr.push(
			<Pagination.Next
				className="pg-dark"
				key={'next'}
				onClick={() => {
					setPages(
						fnPage(
							selected < props.size ? selected + 1 : props.size
						)
					);
					if (props.onClick) {
						props.onClick(
							selected < props.size ? selected + 1 : props.size
						);
					}
				}}
			/>
		);
		return arr;
	};
	const [pages, setPages] = useState(fnPage(1));

	return (
		<Pagination size="sm">
			<Pagination.First
				className="pg-dark"
				onClick={() => {
					setPages(fnPage(1));
					if (props.onClick) {
						props.onClick(1);
					}
				}}
			/>
			{pages}
			<Pagination.Last
				className="pg-dark"
				onClick={() => {
					setPages(fnPage(props?.size ? props.size : 0));
					if (props.onClick) {
						props.onClick(props?.size ? props.size : 0);
					}
				}}
			/>
		</Pagination>
	);
}
