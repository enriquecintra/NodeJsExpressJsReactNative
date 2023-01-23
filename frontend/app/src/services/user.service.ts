import ApiService from './api.service'

export class UserService {

    static async Get(id: string) {
        return await ApiService.get<IUser>("/user/" + id, true);
    }
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    login: string;
    password: string;
    location: ILocation;
}

export interface ILocation {
    lat: number;
    lng: number;
    address: string;
    city: string;
    state: string;
    zip_code: number;
}