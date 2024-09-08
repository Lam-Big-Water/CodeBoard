import {Routes, Route, Link} from 'react-router-dom';

import Basic from './Basic';
import LocalStorage from './LocalStorage';
import Custom from './Custom';
import Ref from './Ref';
import Async from './Async';
import Remove from './Remove';
import Conditional from './Conditional';
import Reducer from './Reducer';
import Impossible from './ImpossibleState';
import DataFetching from './DataFetching';
import Refetching from './ReFetching';
import Memoized from './Memoized';
import Explicit from './Explicit';
import Axios from './Axios';
import AsyncAwait from './Async&Await'
 
import './App.css';

const App = () => {
    return (
        <div className='app'>
            <nav>
                <Link to="/basic">Basic</Link>
                <Link to="/local">LocalStorage</Link>
                <Link to="/custom">Custom</Link>
                <Link to="/ref">Ref</Link>
                <Link to="/async">Async</Link>
                <Link to="/remove">remove</Link>
                <Link to="/conditional">conditional</Link>
                <Link to="/reducer">reducer</Link>
                <Link to="/impossible">impossible</Link>
                <Link to="/dataFetching">dataFetching</Link>
                <Link to="/refetching">refetching</Link>
                <Link to="/memoized">memoized</Link>
                <Link to="/explicit">explicit</Link>
                <Link to="/axios">Axios</Link>
                <Link to="/asyncAwait">AsyncAwait</Link>
            </nav>

            <Routes>
                <Route path="/basic" element={<Basic />}/>
                <Route path="/local" element={<LocalStorage />}/>
                <Route path="/custom" element={<Custom />}/>
                <Route path="/ref" element={<Ref />}/>
                <Route path="/async" element={<Async />}/>
                <Route path="/remove" element={<Remove />}/>
                <Route path="/conditional" element={<Conditional />}/>
                <Route path="/reducer" element={<Reducer />}/>
                <Route path="/impossible" element={<Impossible />}/>
                <Route path="/dataFetching" element={<DataFetching />}/>
                <Route path="/refetching" element={<Refetching />}/>
                <Route path="/memoized" element={<Memoized />}/>
                <Route path="/explicit" element={<Explicit />}/>
                <Route path="/axios" element={<Axios />}/>
                <Route path="/asyncAwait" element={<AsyncAwait />}/>
            </Routes>
        </div>
    )
}

export default App