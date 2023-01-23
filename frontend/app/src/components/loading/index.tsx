import React from "react";
import { View } from "react-native";
import { styles } from './styles';

import Spinner from 'react-native-loading-spinner-overlay';
import { Colors } from "../../styles";


interface Props {
    show: boolean;
    color?: string;
    backgroundColor?: string;
    dimLights?: number;
    loadingMessage?: string;
}

export const Loading: React.FC<Props> = (props: Props) => {
    return (
        <>
            {props.show &&
                <View style={styles.container}  >
                <Spinner size="large" color={Colors.PURPLE}  textContent={props.loadingMessage} visible={true} />
                </View >
            }
        </>
    )
};

Loading.defaultProps = {
    show: false,
    color: Colors.BLACK,
    backgroundColor: Colors.BLACK,
    dimLights: 0.6,
    loadingMessage: "",
};

export default Loading;
