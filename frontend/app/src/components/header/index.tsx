import React, { useContext, } from 'react';
import { Text, View } from 'react-native';
import AuthContext from '../../contexts/auth';
import { styles } from "./styles";
const Header: React.FC = () => {
    const { user } = useContext(AuthContext);
    return (
        <View style={[styles.cabecalho]}>
            <View style={styles.cabecalhoItem}><Text style={styles.cabecalhoTexto}>Hello my dear {user.name}!!</Text></View>
        </View>
    );
}
export default Header;