import React, { useContext } from 'react';
import AuthContext from '../contexts/auth';

import AuthRoutes from '../routes/auth.routes'
import AppMenu from './app.menu';


const Routes = () => {
    const { signed } = useContext(AuthContext);
    return signed ? <AppMenu /> : <AuthRoutes />;
    //return (<Chat />);
    //return (<AuthRoutes />);
}

export default Routes;