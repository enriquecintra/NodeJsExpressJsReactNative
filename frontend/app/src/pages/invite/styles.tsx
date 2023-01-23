import { StyleSheet } from "react-native";
import { Colors } from '../../styles';

export const styles = StyleSheet.create({
    inputContainer: {
        margin: 20,
        alignItems: 'stretch',
    },
    titulo: {
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 24
    },
    input: {
        borderRadius: 20,
        marginBottom: 10,
        height: 40,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.PURPLE,
        borderWidth: 1,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch' 
    },
    button: {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 10,
        height: 40,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 50,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        textShadowColor: Colors.WHITE
    },
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE
    }, 
});