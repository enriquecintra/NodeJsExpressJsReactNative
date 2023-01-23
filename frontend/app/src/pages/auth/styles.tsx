import { StyleSheet } from "react-native";
import { Colors } from '../../styles';

export const styles = StyleSheet.create({
    inputContainer: {
        margin: 30,
        alignItems: 'stretch',
    },
    titulo: {
        paddingTop: 30,
        marginTop: 30,
        textAlign: 'center',
        fontSize: 24
    },
    topImage: {
        margin: 20,
    },
    input: {
        borderRadius: 50,
        marginBottom: 20,
        height: 60,
        backgroundColor: Colors.WHITE,
        borderColor: Colors.PURPLE,
        borderWidth: 1,
        paddingHorizontal: 24,
        fontSize: 16,
        alignItems: 'stretch' 
    },
    button: {
        marginTop: 10,
        height: 50,
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