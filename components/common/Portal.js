import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Portal = ({ id, children }) => {
  if (typeof window === 'undefined' || !children) {
    return null;
  }
  return ReactDOM.createPortal(children, document.getElementById(id));
};

Portal.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Portal;
