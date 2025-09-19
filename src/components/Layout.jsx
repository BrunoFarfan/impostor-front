import React from 'react';
import '../styles/styles.css';

const Layout = ({ children, className = '' }) => {
  return (
    <div className={`layout ${className}`}>
      <div className="layout-container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
