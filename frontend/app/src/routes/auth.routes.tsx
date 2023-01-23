import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/auth/index';
import { AuthScreens, AuthStackParamList } from './auth-stack-param-list';

const AppStack = createStackNavigator<AuthStackParamList>();

const AuthRoutes = () => {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }} >
            <AppStack.Screen name={AuthScreens.Login} component={Login} />
        </AppStack.Navigator>
    );
}

export default AuthRoutes;