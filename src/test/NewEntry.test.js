import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import NewEntry from '../components/NewEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><NewEntry /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});