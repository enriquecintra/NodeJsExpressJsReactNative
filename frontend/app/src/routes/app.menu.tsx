import React, { useContext } from 'react';
import { Text, StyleSheet, View,    SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';


import Home from '../pages/home/index';
import { AppScreens, AppStackParamList } from './app-stack-param-list';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import AppRoutes from './app.routes';

import {
    DrawerActions,
    useNavigation
} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

type Props = React.ComponentProps<typeof DrawerItemList>;

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AuthContext from '../contexts/auth';

import { Colors } from '../styles';
import Invite from '../pages/invite';
import Negotiations from '../pages/negotiation';
import Negotiation from '../pages/negotiation/details';


function CustomDrawerContent(props: Props) {

    const { signOut } = useContext(AuthContext);

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>

            <DrawerContentScrollView {...props} contentContainerStyle={{}}>
                <SafeAreaView css={{ top: 'always', horizontal: 'never' }}>
                  
                    <DrawerItemList {...props} />
                    
                </SafeAreaView>
            </DrawerContentScrollView>

            <SafeAreaView>
                <DrawerItem label={() =>
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialIcons
                                style={{ paddingRight: 10 }}
                                name="logout"
                                size={30}
                                color={Colors.WHITE}
                            />
                            <Text style={{ color: 'white', alignItems: 'center', fontWeight: 'bold' }}>Sign Out</Text>
                        </View>
                    </>
                }
                    style={{ backgroundColor: Colors.PURPLE, borderRadius: 50 }}
                    onPress={signOut}
                />

            </SafeAreaView>


        </View>
    );
}

const AppMenu = () => {

    //const { provedor } = useContext(AuthContext);

    const navigation = useNavigation<StackNavigationProp<AppStackParamList, AppScreens.Menu>>();

    //const titleProvedor = provedor.razaoSocial ? provedor.razaoSocial : "";

    return (

        <Drawer.Navigator initialRouteName={AppScreens.Menu} drawerContent={(props) => <CustomDrawerContent {...props} />}

            screenOptions={{
                drawerPosition: 'right',
                drawerStyle: styles.drawerStyle,
                headerTitleAlign: 'center',
                headerShown: true,
                drawerLabelStyle: styles.drawerLabelStyle,
                headerLeft: ({ }) => (<Ionicons
                    style={{ paddingRight: 10, color: Colors.PURPLE }}
                    onPress={() => true ? navigation.goBack() : navigation.goBack()}
                    name="arrow-back"
                    size={30}
                />),
                headerRight: ({ }) =>
                (<Ionicons
                    style={{ paddingRight: 10 }}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    name="md-menu"
                    size={30}
                />)
            }}
        >

            <Drawer.Screen name={AppScreens.AppRoutes} component={AppRoutes}
                options={{
                    drawerLabel: () => <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons
                            style={{ paddingRight: 10 }}
                            name="home"
                            size={30}
                        />
                        <Text style={{ alignItems: 'center' }}>Home</Text>
                    </View>,
                    title: "Home"
                }}
            />

            <Drawer.Screen name={AppScreens.Negotiation} component={Negotiation}
                options={{
                    drawerLabel: () => <>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome
                                style={{ paddingRight: 10 }}
                                name="handshake-o"
                                size={30}
                            />
                            <Text style={{ alignItems: 'center' }}>Create Negotiation</Text>
                        </View>
                    </>,
                    title: "Criar Negociação"
                }}
            />
            <Drawer.Screen name={AppScreens.Negotiations} component={Negotiations}
                options={{
                    drawerLabel: () => <>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons
                                style={{ paddingRight: 10 }}
                                name="list-circle-outline"
                                size={30}
                            />
                            <Text style={{ alignItems: 'center' }}>Negotiations</Text>
                        </View>
                    </>,
                    title: "Minhas Negociações"
                }}
            />

            <Drawer.Screen name={AppScreens.Invite} component={Invite}
                options={{
                    drawerLabel: () => <>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons
                                style={{ paddingRight: 10 }}
                                name="list-circle-outline"
                                size={30}
                            />
                            <Text style={{ alignItems: 'center' }}>My invites</Text>
                        </View>
                    </>,
                    title: "Meus convites"
                }}
            />

        </Drawer.Navigator>
    );

}

export default AppMenu;


const styles = StyleSheet.create({

    drawerStyle: {
        //backgroundColor: '#313131',
        paddingVertical: 10

    },
    drawerLabelStyle: { color: '#000', borderBottomColor: '#000', borderBottomWidth: 1, padding: 5 }

});