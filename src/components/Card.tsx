import { Link } from 'react-router-dom';
import { getLink } from '../services/api';
import useUrl from '../services/useUrl';

type Props = {
	image?: string;
	title: string;
	subtitle?: string;
	text?: string;
	link: string;
	label?: string;
	badge?: string;
}

const Card = (props: Props) => {
	const {
		image, title, subtitle, text, link, label, badge
	} = props;

	const imgSrc = useUrl({w: 1000}, image)
	
	return (<Link className='card card--image-top card--white card--shadow card--hover card--primary' to={getLink(link)}>
		<div className='card__image'>
			{ badge && <b className='card__badge'>{badge}</b> }
			{ image && 
			<img src={imgSrc} /> }
			{ !image && <div className='card__image--replace'></div>}	
		</div>
		<div className='card__content'>
			<div className='card__label'>{label}</div>
			<div className='card__title'>
				{title}
			</div>
			<div className='card__subtitle'>
				{subtitle}
			</div>
			<div className='card__text'>
				{text}
			</div>
		</div>
	</Link>)
}

export default Card