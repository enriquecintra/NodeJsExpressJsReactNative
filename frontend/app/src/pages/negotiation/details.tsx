import React from 'react';
import { Text, View } from 'react-native';
import { styles } from "./styles";
import Header from '../../components/header';

const Negotiation: React.FC = () => {

    return (
        <>
            <Header />
            <View style={styles.container}>
                <Text style={styles.titulo} >Create Negotiation!</Text>
            </View>
        </>
    );
}

export default Negotiation;

