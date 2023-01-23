import React, { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from "../services/user.service";
import { AuthService } from "../services/auth.service";
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children } ) => {

    const [token, setToken] = useState<string>("");
    const [user, setUser] = useState<IUser>({} as IUser);

    async function signIn(login: string, password: string) {
        if (login.length === 0 || password.length === 0) throw new Error("Invalid Login or Password!");
        const response = await AuthService.login(login, password);
        if (response.ok && response.data) {
            if (response.data.token === null) throw new Error("Invalid Login or Password!");
            setUser(response.data.user);
            setToken(response.data.token);
            await AsyncStorage.setItem('Token', response.data.token);
        } else {
            throw new Error(response.error.message);
        }
    }
    async function signOut(){
        setToken("");
        await AsyncStorage.setItem('Token', "");
        setUser({} as IUser);
    }
   
    return (
        <AuthContext.Provider value={{ signed: token !== "", token, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;


interface AuthContextData {
    signed: boolean;
    token: string;
    user: IUser;
    signIn(login: string, senha: string): Promise<void>;
    signOut(): void;
}