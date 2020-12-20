import React from 'react';
import '../componentcss/loader.css';
export const Loading = () => {
  return (
    <div className="loader">
      <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
      <p>Loading . . .</p>
    </div>
  );
};
