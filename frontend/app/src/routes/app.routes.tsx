import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/home/index';
import { AppScreens, AppStackParamList } from './app-stack-param-list';
import Invite from '../pages/invite';

const AppStack = createStackNavigator<AppStackParamList>();

const AppRoutes = () => {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }} >
            <AppStack.Screen name={AppScreens.Home} component={Home} />
            <AppStack.Screen name={AppScreens.Negotiation} component={Home} />
            <AppStack.Screen name={AppScreens.Negotiations} component={Home} />
            <AppStack.Screen name={AppScreens.Invite} component={Invite} />
        </AppStack.Navigator>
    );
}

export default AppRoutes;