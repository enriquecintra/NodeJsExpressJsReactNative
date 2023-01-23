import { StyleSheet } from "react-native";
import { Colors } from '../styles';

export const styleGlobal = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    }, 
    inputText: {
        borderRadius: 50,
        marginBottom: 20,
        height: 60,
        backgroundColor: Colors.WHITE,
        borderColor:Colors.PURPLE,
        borderWidth:1,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch'
    },
    inputAreaCampoSenha:{
        flexDirection:'row',
        backgroundColor:Colors.WHITE,
        borderRadius: 50,
        height: 60,
        alignItems:"stretch",
        borderColor:Colors.PURPLE,
        borderWidth:1,
        marginBottom: 10,
    }
});