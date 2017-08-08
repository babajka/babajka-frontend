import React from 'react';
import PropTypes from 'prop-types';

const ArticlePreview = ({...props}) => (
	<div className={`tile is-parent ${props.articleClassName}`}>
		<article className="card tile is-child">
			<div className="card-image">
				<figure className={`image ${props.imageClassName}`}>
					<img src={props.imagePath}/>
				</figure>
			</div>
			<div className="card-content">
				<span className="title is-spaced">
					<a href={props.articlePath}>
						{props.title}
					</a>
				</span>
				<p className="subtitle">{props.subtitle}</p>
				<p className="subtitle author is-4">{props.author}</p>
			</div>
		</article>
	</div>
);

ArticlePreview.propTypes = {
	articleClassName: PropTypes.string,
	articlePath: PropTypes.string.isRequired,
	author: PropTypes.string,
	imageClassName: PropTypes.string,
	imagePath: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	title: PropTypes.string.isRequired,
};

ArticlePreview.defaultProps = {
	articleClassName: 'is-5',
	imageClassName: 'is-16by9'
};

export default ArticlePreview;