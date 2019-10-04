import React from 'react';

const BgContainer = ({ color, image, border, ...props }) => {
  const style = {};
  if (color) {
    style.backgroundColor = color;
  }
  if (image) {
    style.backgroundImage = `url(${image})`;
  }
  if (border) {
    // style.border = '0.25px solid black';
  }

  return <div {...props} style={style} />;
};

export default BgContainer;
