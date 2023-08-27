import { useState } from 'react';
import Canvas from'./canvas';
import Cuztomizer from'./pages/Costuimizer';
import Home from'./pages/Home';


function App() {

  return (
    <main className='app transition-all ease-in'>
      <Home />
      <Canvas />
      <Cuztomizer />
    </main>
  )
}

export default App;
