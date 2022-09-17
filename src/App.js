import React from 'react';
import Navbar from './comps/Navbar.jsx';
import Title from './comps/Title.jsx';
import Gallery from './comps/Gallery';
import Footer from './comps/Footer'
import { StateContext } from './comps/context/StateContext.jsx';

function App() {

  return (
    <StateContext>
    <div className="App">
      <Navbar />
      <Title />
      <Gallery />
      <Footer />
    </div>
    </StateContext>
  )
}

export default App;
