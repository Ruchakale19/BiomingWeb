import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import GeometryType from 'ol/geom/GeometryType';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style';
import { ApiService } from '@services/api.service';
import { IVTSResponce, VTSModel } from '@/models/IVTSModel';
import { DashboardModel } from '@/models/IDashboardModel';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public mapD!: Map
    API_URL = "https://swd.mcgm.gov.in/wmswebapi";
    baseURL = this.API_URL;
    dashCountList: DashboardModel[];
    dashMothlyList: DashboardModel[];
    yearList:any[]=[]
    constructor(private apiService: ApiService, private datePipe: DatePipe) { }
    // sourceL = new VectorSource({
    //     url: this.baseURL+'/DewateringLoc.json',
    //     format: new GeoJSON()
    //   });
    ngOnInit(): void {  
        let yr=2019;
        let cYr=Number(this.datePipe.transform(new Date(), "yyyy"))
        for(let i=yr; i<=cYr;i++)
        {
            this.yearList.push(i)
        }
        
        this.apiService.getdashboardCount('').subscribe(
            (result) => {
                this.dashCountList = result.Data;
               // console.log(result)
            },
            (err) => {

            }
        )

        this.apiService.getdashboardCount(this.datePipe.transform(new Date(), "yyyy")).subscribe(
            (result) => {
                this.dashMothlyList = result.Data;
               // console.log(result)
            },
            (err) => {

            }

        )

    }
    GetDataByYear(yr:string){
       
        this.apiService.getdashboardCount(yr).subscribe(
            (result) => {
                this.dashMothlyList = result.Data;
               // console.log(result)
            },
            (err) => {

            }

        )
    }
}
