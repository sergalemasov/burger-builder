import axios, {AxiosInstance} from 'axios';

export class BaseClient {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://burgerbuilder-acc5e.firebaseio.com/'
        });
    }

    get<O>(url: string): Promise<O> {
        return this.axiosInstance.get<any, O>(url);
    }

    post<I, O>(url: string, data?: I): Promise<O> {
        return this.axiosInstance.post<any, O>(url, data);
    }
}
