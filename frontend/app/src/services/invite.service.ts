import ApiService from './api.service'

export class InviteService {

    static async Get(userId: string, id: string) {
        return await ApiService.get<IInvite>("/user/" + userId + "/invite/" + id, true);
    }
    static async List(userId: string) {
        return await ApiService.get<IInvite[]>("/user/" + userId + "/invite/", true);
    }
    static async Post(userId: string, data: IInvite) {
        return await ApiService.post<IInvite>("/user/" + userId + "/invite/", data, true);
    }
    static async Put(userId: string, id: string, data: IInvite) {
        return await ApiService.put<IInvite>(id, "/user/" + userId + "/invite", data, true);
    }
}

export interface IInvite {
    _id: string;
    name: string;
    email: string;
    user: string;
    user_invited: string;
}