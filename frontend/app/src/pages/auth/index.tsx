import React, { useContext, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import AuthContext from "../../contexts/auth";
import { styles } from './styles';
import Loading from '../../components/loading';
import { Colors } from '../../styles';

export default function Login() {

    const { signIn } = useContext(AuthContext);
    
    const [login, setLogin] = useState('enriquecintra');
    const [password, setpassword] = useState('123');
    function handleLoginChange(login: string) { setLogin(login); }
    function handlepasswordChange(password: string) { setpassword(password); }

    const [loading, setLoading] = useState(false);

    async function handleLoginPress() {
        setLoading(true);
        try {
            await signIn(login.toLowerCase(), password);
        } catch (e: Error | any) {
            setLoading(false);
            setTimeout(() => alert(e.message), 1);
        }
    }
    return (

        

        <>
            {/* <Header title="Teste" /> */}
            <View style={styles.container}>
                <Text style={styles.titulo} >Teste de Fullstack Ecommerce Venda e Troca </Text>
                <View style={styles.inputContainer} >
                    <TextInput
                        style={styles.input}
                        placeholder="Login"
                        value={login}
                        onChangeText={handleLoginChange}
                    />
                    
                        <TextInput
                            style={styles.input}
                        placeholder={"Password"}
                        value={password}
                        onChangeText={handlepasswordChange}
                            secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
                        <Text style={{ color: Colors.WHITE }}>Sign In</Text>
                    </TouchableOpacity>

                    <Loading show={loading} />
                </View>

            
            </View>
        </>
    );
}