import React from 'react';
import CoreLayout from 'components/common/CoreLayout';
import LoginForm from 'components/auth/LoginForm';

export default () => (
  <CoreLayout title="Login">
    <div className="login-page page-container">
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="column is-4 is-offset-4">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  </CoreLayout>
);
