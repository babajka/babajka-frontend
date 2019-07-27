import React from 'react';

import AdminLayout from 'components/admin/AdminLayout';

const withAdmin = ComposedComponent => {
  const { permissions = [], getLayoutProps = () => ({}) } = ComposedComponent;

  const AdminWrapper = (...props) => (
    <AdminLayout>
      <ComposedComponent {...props} />
    </AdminLayout>
  );

  AdminWrapper.getInitialProps = ComposedComponent.getInitialProps;

  AdminWrapper.permissions = permissions.concat(['adminAccess']);

  AdminWrapper.getLayoutProps = (...params) => {
    const lProps = getLayoutProps(...params);
    return { hideSidebar: true, ...lProps };
  };

  AdminWrapper.disableSidebarFetch = true;

  return AdminWrapper;
};

export default withAdmin;
