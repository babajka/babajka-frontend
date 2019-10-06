import React from 'react';

const BgContainer = ({ color, image, ...props }) => {
  const style = {};
  if (color) {
    style.backgroundColor = color;
  }
  if (image) {
    style.backgroundImage = `url(${image})`;
  }

  return <div {...props} style={style} />;
};

export default BgContainer;
