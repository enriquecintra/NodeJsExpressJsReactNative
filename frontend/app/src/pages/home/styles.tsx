import { StyleSheet } from "react-native";
import { Colors } from "../../styles";

export const styles = StyleSheet.create({

    cabecalho: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    cabecalhoItem: {
        flex: 1.0,
        padding: 10,
        alignItems: 'center',
        backgroundColor: Colors.GREY
    },
    cabecalhoTexto: {
        color: Colors.WHITE, fontWeight: 'bold'
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: Colors.WHITE
    }
});