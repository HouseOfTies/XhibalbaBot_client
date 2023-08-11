import { Observable } from 'rxjs';
import { IHttpClient } from '../interfaces/IHttpClient';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { environment } from '../environment/environment';

export class HttpClientService implements IHttpClient {
  private readonly url = environment.API_URL;
  private readonly _http: AxiosInstance;

  constructor() {
    this._http = axios.create({
      baseURL: this.url,
      timeout: 5000,
    });
  }

  get<T>(route: string, options?: AxiosRequestConfig): Observable<T> {
    return new Observable<T>((observer) => {
      this._http
        .get<T>(route, options)
        .then((response: AxiosResponse<T>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getById<T>(route: string, id: number, options?: AxiosRequestConfig): Observable<T> {
    return this.get<T>(`${route}/${id}`, options);
  }

  post<T>(obj: object, route: string): Observable<T> {
    return new Observable<T>((observer) => {
      this._http
        .post<T>(route, obj)
        .then((response: AxiosResponse<T>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  update<T>(id: number, obj: object, route: string): Observable<T> {
    return new Observable<T>((observer) => {
      this._http
        .put<T>(`${route}/${id}`, obj)
        .then((response: AxiosResponse<T>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  patch<T>(obj: object, route: string): Observable<any> {
    return new Observable<T>((observer) => {
      this._http
        .patch<T>(route, obj)
        .then((response: AxiosResponse<T>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  delete<T>(id: number, route: string): Observable<any> {
    return new Observable<T>((observer) => {
      this._http
        .delete<T>(`${route}/${id}`)
        .then((response: AxiosResponse<T>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
