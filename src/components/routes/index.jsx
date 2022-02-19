import React, { useEffect, useState } from "react"
import { Route, Router } from 'react-router-dom'
import { PrivateLayout, PublicLayout } from '../../layout'

const AppRoute = () => {

    const [user, setUser ] = useState(null)

    useEffect(()=> {
        const user = localStorage.getItem('userInfo')
        setUser(user)

    },[localStorage.getItem('userInfo')])

    if(!user){
        return (
            <PublicLayout>
                <Router>
                    <Route path="/login" exact component={<div>Login</div>} />
                </Router>
            </PublicLayout>
        )
    } else {
     return  (
        <PrivateLayout>
            <Router>
                <Route path="/backlinks" exact component={<div>Página 1</div>} />
                <Route path="/palavras-chave" exact component={<div>Página 2</div>} />
                <Route path="/cobrancas" exact component={<div>Página 3</div>} />
                <Route path="*">
                    <div className="fs-30 fw-400 color-default p-3">Página não encontrada!</div>
                </Route>
            </Router>
        </PrivateLayout>
     ) 
   }
}

export default AppRoute