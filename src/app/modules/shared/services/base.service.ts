import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EntityBase } from '../models/base.entity';

export abstract class BaseResourceService<T extends EntityBase> {
  protected readonly baseUrl = "";
  protected httpClient: HttpClient

  constructor (protected apiPath: string,
    protected injector: Injector,
    protected entityFromJsonFn: (json: any) => T) {
    this.httpClient = injector.get(HttpClient)
  }

  create (data: T): Observable<T> {
    return this.httpClient.post(this.apiPath, data).pipe(
      map(this.jsonToResource.bind(this)),
      catchError(this.handlerError)
    )
  }

  list (): Observable<T[]> {
    return this.httpClient.get<T[]>(this.apiPath).pipe(
      map(this.jsonToResources.bind(this)),
      catchError(this.handlerError)
    )
  }

  getOne (id: string): Observable<T> {
    const url = `${this.apiPath}/${id}`

    return this.httpClient.get<T>(url).pipe(
      map(this.jsonToResource.bind(this)),
      catchError(this.handlerError)
    )
  }

  update (id: string, data: any): Observable<T> {
    const url = `${this.apiPath}/${id}`

    return this.httpClient.put<T>(url, data).pipe(
      map(this.jsonToResource.bind(this)),
      catchError(this.handlerError)
    )
  }

  remove (id: string): Observable<boolean> {
    const url = `${this.apiPath}/${id}`

    return this.httpClient.delete<boolean>(url).pipe(
      map(res => res),
      catchError(this.handlerError)
    )
  }




  protected jsonToResources(from: any[]): T[] {
    const resources: T[] = []

    from.forEach(el => resources.push(this.entityFromJsonFn(el)))
    return resources
  }

  protected handlerError(err: any): Observable<any> {
    console.log(err)
    return throwError(err)
  }

  protected jsonToResource(resouce: any): T {
    const resource = this.entityFromJsonFn(resouce)
    return resource
  }
}
