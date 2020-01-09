import {AxiosInstance} from 'axios';

export class BaseClient {
    constructor(private axiosInstance: AxiosInstance) {
    }

    get<O>(url: string): Promise<O> {
        return this.axiosInstance.get<any, O>(url);
    }

    post<I, O>(url: string, data?: I): Promise<O> {
        return this.axiosInstance.post<any, O>(url, data);
    }
}
