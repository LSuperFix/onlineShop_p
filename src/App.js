import './scss/app.scss';
import Header from './components/Header';
import FullPizza from './pages/FullPizza'
import Home from './pages/Home';
import { Routes, Route} from 'react-router-dom'
import NotFound from './pages/NotFound';
import Cart from './pages/Cart'
import { createContext, useState } from 'react';
export const searchContdext = createContext('')
function App() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <div className="wrapper">
      <searchContdext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
          <Routes>
            <Route path='/' element = {<Home />} />
            <Route path='/cart' element = {<Cart />} />
            <Route path='/pizza/:id' element = {<FullPizza />}/>
            <Route path='*' element = {<NotFound />} />
          </Routes>
        </div>
      </searchContdext.Provider>
    </div>
  );
}

export default App;
