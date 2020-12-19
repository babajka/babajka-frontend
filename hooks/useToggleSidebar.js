import React, { useContext } from 'react';

export const ToggleSidebarContext = React.createContext(null);

const useToggleSidebar = () => useContext(ToggleSidebarContext);

export default useToggleSidebar;
