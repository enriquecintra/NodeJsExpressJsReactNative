import ApiService from './api.service'
import { IUser } from './user.service';

export class AuthService {

    static async login(login: string, password: string) {
        ApiService.addHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        const formBody = [{ key: "login", value: login }, { key: "password", value: password }];
        return await ApiService.postEncoding<IAuth>("/authenticate", formBody);
    }
}

export interface IAuth {
    token: string;
    user: IUser;
}