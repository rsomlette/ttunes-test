import { ApiResponse, ApisauceInstance, create } from "apisauce";

import { Observable } from "rxjs";

import { from as from$ } from "rxjs";
import { map as map$ } from "rxjs/operators";

export interface IUploadCompletedEvent {
    data: any;
}

export const DEFAULT_JSON_API_HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json"
};

export class BaseService {
    public api: ApisauceInstance;

    constructor(baseUrl: string, headers?: object) {
        this.api = create({ baseURL: baseUrl, headers });
    }

    public addMonitor(monitor: any) {
        this.api.addMonitor(monitor);
    }

    /**
     * Perform an HTTP `DELETE` and transforms response as an `Object` and
     * throw when server error or body is not an `Object`.
     */
    public delete$<T>(
        url: string,
        data?: any | undefined,
        axiosConfig?: any | undefined
    ): Observable<T> {
        return this.del$<T>(url, data, axiosConfig).pipe(
            map$(this.responseToObject)
        );
    }

    /**
     * Perform an HTTP `POST` and transforms response as an `Object` and
     * throw when server error or body is not an `Object`.
     */
    public create$<T>(
        url: string,
        data?: any | undefined,
        axiosConfig?: any | undefined
    ): Observable<T> {
        return this.post$<T>(url, data, axiosConfig).pipe(
            map$(this.responseToObject)
        );
    }

    /**
     * Perform an HTTP `GET` and transforms response as an `Object` and
     * throw when server error or body is not an `Object`.
     */
    public fetch$<T>(
        url: string,
        data?: any | undefined,
        axiosConfig?: any | undefined
    ): Observable<T> {
        return this.get$<T>(url, data, axiosConfig).pipe(
            map$(this.responseToObject)
        );
    }

    /**
     * Perform an HTTP `GET` and transforms response as a stream of `Object` and
     * throw when server error or body is not an array of `Object`.
     */
    public list$<T>(
        url: string,
        data?: any | undefined,
        axiosConfig?: any | undefined
    ): Observable<object> {
        return this.get$(url, data, axiosConfig).pipe(
            map$(this.responseToList$)
        );
    }

    /**
     * Perform an HTTP `PUT` and transforms response as an `Object` and
     * throw when server error or body is not an `Object`.
     */
    public update$<T>(
        url: string,
        data?: any | undefined,
        axiosConfig?: any | undefined
    ): Observable<T> {
        return this.put$<T>(url, data, axiosConfig).pipe(
            map$(this.responseToObject)
        );
    }

    public upload$(
        path: string,
        form: any,
        config: any = {}
    ): Observable<IUploadCompletedEvent> {
        const headers = { ...config.headers };
        headers["Content-Type"] = "multipart/form-data";

        return this.post$(path, form, {
            ...config,
            headers
        }).pipe(
            map$(this.responseToObject),
            map$((body: any) => ({
                data: body
            }))
        );
    }

    public extractResponseBody(response: ApiResponse<any>): any {
        if (!response.ok) {
            throw mapProblemToError(response);
        }

        return response.data;
    }

    public responseToBody(response: ApiResponse<any>): any | null {
        return extractResponseBody(response);
    }

    /**
     * Transforms the response body assumed to be an `array` into
     * an Observable stream containing all array elements:
     *   `responseToList$({ data: [1, 2 , 3]}) == '|----1----2----3----.'`
     */
    public responseToList$(response: ApiResponse<any>): Observable<object[]> {
        const body = extractResponseBody(response);
        if (!Array.isArray(body)) {
            throw new Error(
                `Expecting response to be an array, received data of type [${typeof body}].`
            );
        }

        return from$(body);
    }

    public responseToObject(response: ApiResponse<any>): any {
        const body = extractResponseBody(response);
        if (body == null) {
            throw new Error(
                `Expecting response to be an object, received data of type [${typeof body}].`
            );
        }

        return body;
    }

    private del$<T>(
        url: string,
        data?: any | undefined,
        axiosConfig?: any | undefined
    ): Observable<ApiResponse<T>> {
        return from$(this.api.delete<T>(url, data, axiosConfig));
    }

    private get$<T>(
        url: string,
        data?: any | undefined,
        axiosConfig?: any | undefined
    ): Observable<ApiResponse<T>> {
        return from$(this.api.get<T>(url, data, axiosConfig));
    }

    private post$<T>(
        url: string,
        data?: any | undefined,
        axiosConfig?: any | undefined
    ): Observable<ApiResponse<T>> {
        return from$(this.api.post<T>(url, data, axiosConfig));
    }

    private put$<T>(
        url: string,
        data?: any | undefined,
        axiosConfig?: any | undefined
    ): Observable<ApiResponse<T>> {
        return from$(this.api.put<T>(url, data, axiosConfig));
    }
}

function extractResponseBody(response: ApiResponse<any>): any {
    if (!response.ok) {
        throw mapProblemToError(response);
    }

    return response.data;
}

function mapProblemToError(response: ApiResponse<any>) {
    return new Error(response.problem || "API ERROR");
}
