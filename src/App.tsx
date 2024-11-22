import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BusTable from './components/BusTable';
import BusDetail from './components/BusDetail'; 

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BusTable />} /> 
                <Route path="/bus/:id" element={<BusDetail />} /> 
            </Routes>
        </Router>
    );
};

export default App;
