import {AxiosResponse} from 'axios';
import {IVinDecodeResponse, IVehicleVariablesResponse} from '../types';
import $api from '../api/$api';

export default class VinService {
    static decodeVin(vin: string): Promise<AxiosResponse<IVinDecodeResponse>> {
        return $api.get<IVinDecodeResponse>(`/vehicles/decodevin/${vin}?format=json`);
    }

    static getVariablesList(): Promise<AxiosResponse<IVehicleVariablesResponse>> {
        return $api.get<IVehicleVariablesResponse>('/vehicles/getvehiclevariablelist?format=json');
    }
}