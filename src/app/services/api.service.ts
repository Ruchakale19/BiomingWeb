import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { IVTSResponce } from '@/models/IVTSModel';
import { IDashboardResponce } from '@/models/IDashboardModel';



@Injectable({
    providedIn: 'root'
})
export class ApiService {

    API_URL = environment.baseRptUrl;
    baseURL = this.API_URL;
    private searchContent = new BehaviorSubject<any>({});
    public mapContent = new BehaviorSubject<any>({});
    public featureParams = this.mapContent.asObservable();
    public SearchParams = this.searchContent.asObservable();
    constructor(private _httpClient: HttpClient) {
      debugger
    }

    private handleError(errorResponce: HttpErrorResponse) {
        if (errorResponce.error instanceof ErrorEvent) {
          return throwError(()=>"Client side Error " + errorResponce.message);
        }
        else {
          return throwError(()=>"Server side Error :" + errorResponce.message);
        }
        return throwError(()=>"something went wrong");
      }
      getMapContentParams(VideoModel:any) {
        debugger;
        // this.mapContent = new BehaviorSubject({});
        this.mapContent.next(VideoModel);
      }
      getSearchContentParams(SearchModel:any) {
        this.searchContent.next(SearchModel);
      }
      getVTSWBData(Fromdate:any,Todate:any): Observable<IVTSResponce> {
        return this._httpClient.get<IVTSResponce>(this.baseURL + "GetVTSWBData?FromDate="+Fromdate+"&Todate="+Todate)
          .pipe(catchError(this.handleError));
      }
      getVTSLocationData(Ticket:any): Observable<IVTSResponce> {
        debugger;
        return this._httpClient.get<IVTSResponce>(this.baseURL + "GetVTSLocationData?Ticket="+Ticket)
          .pipe(catchError(this.handleError));
      }
      getdashboardCount(Year:any): Observable<IDashboardResponce> {
        debugger;
        return this._httpClient.get<IDashboardResponce>(this.baseURL + "GetDashboardCount?Year="+Year)
          .pipe(catchError(this.handleError));
      }
}
