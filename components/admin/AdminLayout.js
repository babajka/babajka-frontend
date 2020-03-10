import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-css-modules';
import styles from './admin.module.scss';

import AdminSidebar from './AdminSidebar';

const b = block(styles);

const AdminLayout = ({ children }) => (
  <div className={b()}>
    <div className={b('grid')}>
      <div className={b('grid-aside')}>
        <AdminSidebar />
      </div>
      <div className={b('grid-main')}>{children}</div>
    </div>
  </div>
);

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
