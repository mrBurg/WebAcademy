import React from 'react';

import './Notification.scss';

export function TokenExpired() {
  return (
    <div className="notification">
      <div className="error">Token expired</div>
      <div className="decription">Login again</div>
    </div>
  );
}
