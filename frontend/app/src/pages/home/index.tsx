import React, { useContext, } from 'react';
import { Text, View, } from 'react-native';
import { AppScreens, AppStackParamList } from '../../routes/app-stack-param-list';
import { StackNavigationProp } from '@react-navigation/stack';
import AuthContext from '../../contexts/auth';
import { styles } from "../home/styles";
import MapApp from '../../components/maps';

type homeScreenProp = StackNavigationProp<AppStackParamList, AppScreens.Home>;


const Home: React.FC = () => {

    const { user } = useContext(AuthContext);

    return (
        <>
            <View style={[styles.cabecalho]}>
                <View style={styles.cabecalhoItem}><Text style={styles.cabecalhoTexto}>Hello my dear {user.name}!!</Text></View>
            </View>
            <View style={styles.container}>
                <MapApp  />
            </View>
        </>
    );
}

export default Home;

