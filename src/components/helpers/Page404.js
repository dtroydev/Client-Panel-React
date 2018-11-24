import React from 'react';

const Page404 = ({ location }) => (
  <div className="pt-5">
    <h1>404</h1>
    <h3>No match found for <code>{location.pathname}</code></h3>
  </div>
);
export default Page404;
