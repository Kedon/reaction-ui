import React, { useEffect, useState, Suspense, lazy } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateLayout, PublicLayout } from '../layout/layout'
import Home from "./home/Home"
import Login from "./login/Login"
import ElementsList from "./elements-list/ElementsList"
import NotFound from "./notFound/NotFound.js"

const AppRoute = () => {

    
    
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<PublicLayout  component={Login} />} />
                    <Route path="/home" element={<PrivateLayout component={Home} />} />
                    <Route path="/elements-list" element={<PrivateLayout component={ElementsList} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        )
}

export default AppRoute