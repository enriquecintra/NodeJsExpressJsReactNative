import React from 'react';
import { Text, View } from 'react-native';
import { styles } from "./styles";
import Header from '../../components/header';

const Negotiations: React.FC = () => {

    return (
        <>
            <Header />
            <View style={styles.container}>
                <Text style={styles.titulo} >Negotiations!</Text>
            </View>
        </>
    );
}

export default Negotiations;

