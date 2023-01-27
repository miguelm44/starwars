import React from 'react';
import './App.css';
import UseProvider from './context/Requisitar';
import Table from './componets/Table';

function App() {
  return (
    <UseProvider>
      <Table />
    </UseProvider>
  );
}

export default App;
