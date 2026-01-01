import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import { Routes } from 'common';
import 'vrMall.css';


const App = () => (
    <Routes />
);

render(<App />, document.getElementById('root'));
