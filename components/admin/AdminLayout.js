import './admin.scss';

import React from 'react';
import PropTypes from 'prop-types';

import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => (
  <div className="admin-panel">
    <div className="admin-panel-grid">
      <div className="admin-panel-grid__aside">
        <AdminSidebar />
      </div>
      <div className="admin-panel-grid__main">{children}</div>
    </div>
  </div>
);

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
