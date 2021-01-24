import React from 'react';
import Home from '../home/home';

export default function Newest({ history }) {
  return <Home history={history} isNewest={true} />;
}
