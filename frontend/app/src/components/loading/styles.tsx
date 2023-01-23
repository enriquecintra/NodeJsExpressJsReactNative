import { StyleSheet } from 'react-native';
import { Colors } from '../../../src/styles';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignSelf:"center",
        alignItems:"center",
        backgroundColor: Colors.BRANCO,
        height:"100%",
        width:"100%"
    },
    spinnerTextStyle: {
        color: '#000',
        fontSize:40
    },
});