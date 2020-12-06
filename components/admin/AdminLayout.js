import React from 'react';
import PropTypes from 'prop-types';
import bem from 'bem-css-modules';
import styles from './admin.module.scss';

const b = bem(styles);

const AdminLayout = ({ children }) => (
  <div className={b()}>
    {/* <div className={b('grid')}> */}
    {/*  <div className={b('grid-aside')}> */}
    {/* <AdminSidebar /> */}
    {/* </div> */}
    <div className={b('grid-main')}>{children}</div>
    {/* </div> */}
  </div>
);

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
