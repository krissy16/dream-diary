import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import DiaryEntry from '../components/DiaryEntry';
import sampleData from '../sampleData';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><DiaryEntry data={sampleData[0]}/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});