import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import DiaryEntry from '../components/DiaryEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const sampleData = [
    {
        title: "Title of Entry 5",
        date: "2020-01-25",
        content: "Blessed is the man who doesn't walk in the counsel of the wicked, nor stand in the way of sinners, nor sit in the seat of scoffers; but his delight is in Yahweh's law. On his law he meditates day and night. He will be like a tree planted by the streams of water, that brings forth its fruit in its season, whose leaf also does not wither. Whatever he does shall prosper. The wicked are not so, but are like the chaff which the wind drives away. Therefore the wicked shall not stand in the judgment, nor sinners in the congregation of the righteous. For Yahweh knows the way of the righteous, but the way of the wicked shall perish.",
        notes: "First Note, Second Note"
    }]
  ReactDOM.render(<BrowserRouter><DiaryEntry data={sampleData[0]}/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});