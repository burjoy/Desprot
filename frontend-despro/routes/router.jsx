import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Menu } from '../components/menu';
import { Graph } from '../components/grafik';
import { PastGraph } from '../components/pastGrafik';

function AppRouter() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Menu />}/>
                <Route path="/crowd_monitor" element={<Graph />}/>
                <Route path='/past_crowd_monitor' element={<PastGraph />}/>
            </Routes>
        </Router>
    )
}

export {AppRouter}