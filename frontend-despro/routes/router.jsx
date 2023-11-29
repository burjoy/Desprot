import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { Menu } from '../components/menu';
import { Graph } from '../components/grafik';

function AppRouter() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Menu />}/>
                <Route path="/crowd_monitor" element={<Graph />}/>
            </Routes>
        </Router>
    )
}

export {AppRouter}