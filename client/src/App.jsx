import React from "react";
import { Route, Routes } from "react-router-dom";
import Result from "./components/Result.jsx";
import Home from "./components/Home.jsx";

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/result" element={<Result />} />
            </Routes>
        </div>
    );
};

export default App;