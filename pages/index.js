import React from 'react';

import CoreLayout from 'components/common/CoreLayout';
import Button from 'components/common/Button';

const check = () => (
  fetch('http://localhost:49160/api/users').then(response => alert(response))
);

export default () => (
  <CoreLayout title="Main Page">
    <p>Welcome to next.js!</p>
    <Button onClick={check}>Check connection</Button>
  </CoreLayout>
);
