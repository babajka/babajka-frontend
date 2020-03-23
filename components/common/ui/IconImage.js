import React from 'react';
import PropTypes from 'prop-types';

const IconImage = ({ className, name }) => (
  <>
    {name === 'molamola' && (
      <svg
        className={className}
        style={{ fill: 'currentColor' }}
        width="95"
        height="12"
        viewBox="0 0 95 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.4341 0.230771V11.7692H9.56044V1.51648L5.29122 8.60439H5.14286L0.873629 1.51648V11.7692H0V0.230771H1.08791L5.20879 7.05495L9.32967 0.230771H10.4341ZM19.2802 11.9506C15.9506 11.9506 13.3297 9.2967 13.3297 6C13.3297 2.7033 15.9506 0.0494522 19.2802 0.0494522C22.6099 0.0494522 25.2308 2.7033 25.2308 6C25.2308 9.2967 22.6099 11.9506 19.2802 11.9506ZM19.2802 11.1099C22.1319 11.1099 24.3571 8.83517 24.3571 6C24.3571 3.16484 22.1319 0.890111 19.2802 0.890111C16.4286 0.890111 14.2033 3.16484 14.2033 6C14.2033 8.83517 16.4286 11.1099 19.2802 11.1099ZM29 10.9451H34.4396V11.7692H28.1264V0.230771H29V10.9451ZM45.033 11.7692L43.9121 8.83517H38.1264L37.0055 11.7692H36.0824L40.5659 0.230771H41.489L45.956 11.7692H45.033ZM38.456 8.01099H43.5989L41.0275 1.3022L38.456 8.01099ZM59.4176 0.230771V11.7692H56.7802V5.06044L53.7967 9.95605H53.5L50.5165 5.06044V11.7692H47.8791V0.230771H50.5165L53.6484 5.35714L56.7802 0.230771H59.4176ZM67.5879 12C64.2747 12 61.5879 9.3956 61.5879 6C61.5879 2.6044 64.2747 0 67.5879 0C70.9011 0 73.5879 2.6044 73.5879 6C73.5879 9.3956 70.9011 12 67.5879 12ZM67.5879 9.42857C69.467 9.42857 70.9505 8.06044 70.9505 6C70.9505 3.93956 69.467 2.57143 67.5879 2.57143C65.7088 2.57143 64.2253 3.93956 64.2253 6C64.2253 8.06044 65.7088 9.42857 67.5879 9.42857ZM78.3956 9.23077H82.5165V11.7692H75.7582V0.230771H78.3956V9.23077ZM91.6923 11.7692L91.1154 9.95605H86.8297L86.2527 11.7692H83.3681L87.2912 0.230771H90.6538L94.5769 11.7692H91.6923ZM87.6209 7.48352H90.3242L88.9725 3.24725L87.6209 7.48352Z" />
      </svg>
    )}
  </>
);

IconImage.propTypes = {
  className: PropTypes.string,
  name: PropTypes.oneOf(['molamola']).isRequired,
};

IconImage.defaultProps = {
  className: '',
};

export default IconImage;
