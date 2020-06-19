import React from 'react';

import Header from './components/Header';

function App() {
  return (
    <>
      <Header title="HomePage">
        <ul>
          <li>HomePage 1</li>
          <li>HomePage 2</li>
        </ul>
      </Header>
      <Header title="Project">
        <ul>
          <li>Project 3</li>
          <li>Project 4</li>
        </ul>
      </Header>
    </>
  );
}

export default App;