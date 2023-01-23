import React, { useContext, useState, useEffect } from 'react';
import { Button, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { AppScreens, AppStackParamList } from '../../routes/app-stack-param-list';
import { StackNavigationProp } from '@react-navigation/stack';
import AuthContext from '../../contexts/auth';
import { styles } from "./styles";
import MapApp from '../../components/maps';
import Header from '../../components/header';
import Loading from '../../components/loading';
import { Colors } from '../../styles';

import { DataTable } from 'react-native-paper';
import { IInvite, InviteService } from '../../services/invite.service';

type homeScreenProp = StackNavigationProp<AppStackParamList, AppScreens.Invite>;


const Invite: React.FC = () => {

    const { user } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [invites, setInvites] = useState([] as IInvite[]);
    function handleNameChange(name: string) { setName(name); }
    function handleEmailChange(email: string) { setEmail(email); }

    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        const response = await InviteService.List(user._id);
        if (response.data) {
            setInvites(response.data);
        }
    };

    useEffect(() => {
        try {
            setLoading(true);
            fetchData().then(x => { setLoading(false); });
        } catch (e) {
            setLoading(false);
        }
    }, [] as IInvite[]);



    async function handleSendPress() {
        setLoading(true);
        try {
            await InviteService.Post(user._id, { email, name, user: user._id, user_invited: '' } as IInvite).then(x => {
                fetchData().then((f) => { setLoading(false); });
            });
        } catch (e: Error | any) {
            setLoading(false);
            setTimeout(() => alert(e.message), 1);
        }
        setName('');
        setEmail('');
    }
   
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.titulo} >Invite your friend!</Text>
                <SafeAreaView css={{ top: 'always', horizontal: 'never' }}>
                    <View style={styles.inputContainer} >
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={name}
                            onChangeText={handleNameChange}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder={"Email"}
                            value={email}
                            onChangeText={handleEmailChange}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleSendPress}>
                            <Text style={{ color: Colors.WHITE }}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                <ScrollView >
                    <View style={styles.inputContainer}>

                        <DataTable>

                            

                            <DataTable.Header >
                                <DataTable.Title>Name</DataTable.Title>
                                <DataTable.Title>Email</DataTable.Title>
                                <DataTable.Title numeric>Ok</DataTable.Title>
                            </DataTable.Header>
                            {
                                invites.map((v, i) => {
                                    return (
                                        <DataTable.Row key={i}>
                                            <DataTable.Cell>{v.name}</DataTable.Cell>
                                            <DataTable.Cell>{v.email}</DataTable.Cell>
                                            <DataTable.Cell>{v.user_invited !== "" ? "Ok" : <Button title="Reeviar" onPress={() => alert("A senha é: " + v._id)} />}</DataTable.Cell>
                                        </DataTable.Row>
                                    );
                                })
                            }
                        </DataTable>
                    </View>
                </ScrollView>
                <Loading show={loading} />
            </View>
        </>
    );
}

export default Invite;

