import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Variables from './pages/variables/Variables';
import VariableDetail from './pages/variableDetail/VariableDetail';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/variables" element={<Variables/>}/>
            <Route path="/variables/:variableId" element={<VariableDetail/>}/>
        </Routes>
    </BrowserRouter>
);

export default App;