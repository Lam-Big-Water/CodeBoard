import {Routes, Route, Link} from 'react-router-dom';

import Basic from './Basic';
import LocalStorage from './LocalStorage';
import './App.css';

const App = () => {
    return (
        <div className='app'>
            <nav>
                <Link to="/basic">Basic</Link>
                <Link to="/local">LocalStorage</Link>
            </nav>

            <Routes>
                <Route path="/basic" element={<Basic />}/>
                <Route path="/local" element={<LocalStorage />}/>
            </Routes>
        </div>
    )
}

export default App