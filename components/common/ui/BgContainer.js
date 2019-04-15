import React from 'react';

const BgContainer = ({ color, image, ...props }) => (
  <div {...props} style={{ backgroundColor: color, backgroundImage: `url(${image})` }} />
);

export default BgContainer;
