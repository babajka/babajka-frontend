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
						{props.articleTitle}
					</a>
				</span>
				<p className="subtitle">{props.articleSubtitle}</p>
				<p className="subtitle author is-4">{props.articleAuthor}</p>
			</div>
		</article>
	</div>
);

ArticlePreview.propTypes = {
	articleAuthor: PropTypes.string,
	articlePath: PropTypes.string.isRequired,
	articleSubtitle: PropTypes.string,
	articleClassName: PropTypes.string,
	articleTitle: PropTypes.string.isRequired,
	imagePath: PropTypes.string.isRequired,
	imageClassName: PropTypes.string,
};

ArticlePreview.defaultProps = {
	articleClassName: 'is-5',
	imageClassName: 'is-16by9'
};

export default ArticlePreview;