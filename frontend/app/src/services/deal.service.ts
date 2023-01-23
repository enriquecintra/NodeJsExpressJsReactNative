import ApiService from './api.service'
import { ILocation } from './user.service';

export class DealService {

    static async search() {
        return await ApiService.post<IDeal[]>("/deal/search/", {}, true);
    }
}

export interface IDeal {
    _id: string;
    type: number;
    value: number;
    description: string;
    trade_for: string;
    location: ILocation;
    urgency: IUrgency;
    photos: IPhoto[];
}

export interface IUrgency {
    type: string;
    limit_date: string;
}
export interface IPhoto {
    src: string;
}