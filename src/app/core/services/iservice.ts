import { Observable } from "rxjs";

export interface Iservice<T> {
    get(): Observable<T[]>;
    post(value: T[]): Observable<T[]>;
    put(value: T[]): Observable<boolean>;
    delete(value: T[]): Observable<boolean>;
}