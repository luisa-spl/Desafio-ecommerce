import React from 'react';
import Login from './pages/Login/index';
import Cadastro from './pages/Cadastro/index';
import Produtos from './pages/Produtos/index';
import ProdutoNovo from './pages/ProdutoNovo/index';
import Perfil from './pages/Perfil/index';
import AuthProvider from './contextos/authProvider';
import useAuth from './hooks/useAuth';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch 
} from 'react-router-dom';

function RotaProtegida(props) {
    const auth = useAuth();
  
    return (
      <Route
        render={() => (auth.token ? props.children : <Redirect to="/login" />)}
      />
    );
  }

function Routes() {
    return(
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path='/' exact component={Login} />
                    <Route path='/cadastro'  component={Cadastro} />
                    <RotaProtegida>
                        <Route path='/produtos'  exact component={Produtos}/>
                        <Route path='/produtos/novo' component={ProdutoNovo} />
                        <Route path='/perfil' component={Perfil} />
                    </RotaProtegida>
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default Routes;