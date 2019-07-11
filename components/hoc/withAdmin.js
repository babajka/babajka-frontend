const withAdmin = ComposedComponent => {
  const { permissions = [], getLayoutProps = () => ({}) } = ComposedComponent;
  /* eslint-disable no-param-reassign */
  ComposedComponent.permissions = permissions.concat(['adminAccess']);
  ComposedComponent.getLayoutProps = (...params) => {
    const lProps = getLayoutProps(...params);
    return { hideSidebar: true, ...lProps };
  };
  /* eslint-enable */
  return ComposedComponent;
};

export default withAdmin;
