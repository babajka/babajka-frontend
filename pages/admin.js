import React from 'react';
import dynamic from 'next/dynamic';

import AdminLoading from 'components/admin/loading';

const AdminNoSSR = dynamic(async () => import('components/admin'), {
  ssr: false,
  loading: () => <AdminLoading />,
});

const AdminPage = () => <AdminNoSSR />;

AdminPage.getLayoutProps = () => ({
  adminPage: true,
});

export default AdminPage;
