import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

export default function App() {
  const [activeItem, setActiveItem] = useState('apps');

  return (
    <div className="flex">
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      <MainContent activeItem={activeItem} />
    </div>
  );
}