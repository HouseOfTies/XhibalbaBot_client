import { Observable } from 'rxjs';

export interface IHttpClient {
  get<T>(route: string, options?: {}): Observable<any>
  getById<T>(route: string, id: number, options?: {}): Observable<any>
  post<T>(obj: object, route: string): Observable<any>
  update<T>(id: number, obj: object, route: string): Observable<any>
  patch<T>(obj: any, route: string): Observable<any>
  delete<T>(id: number, route: string): Observable<any>
}
