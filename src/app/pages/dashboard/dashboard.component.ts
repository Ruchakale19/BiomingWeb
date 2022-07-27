import {Component,OnInit} from '@angular/core';
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
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
    public mapD!: Map
    API_URL = "https://swd.mcgm.gov.in/wmswebapi";
    baseURL = this.API_URL;
    Vtsdata:VTSModel[];
constructor(private apiService:ApiService){}
    // sourceL = new VectorSource({
    //     url: this.baseURL+'/DewateringLoc.json',
    //     format: new GeoJSON()
    //   });
    ngOnInit(): void {

// this.apiService.getVTSWBData('2022-04-11','2022-04-11').subscribe(
//   (result)=>{
// this.Vtsdata=result.Data;
// console.log(result)
//   },
//   (err)=>{

//   }
  
// )

//         this.mapD = new Map({
//             layers: [
//               new TileLayer({
//                 source: new OSM(),
//               }),
//               new VectorLayer({
//                 source: this.sourceL,
//                 style: new Style({
//                   fill: new Fill({
//                     color: 'rgba(255, 255, 255, 0.2)',
//                   }),
//                   stroke: new Stroke({
//                     color: 'blue',
//                     width: 4,
//                   }),
//                   // image: new CircleStyle({
//                   //   radius: 5,
//                   //   fill: new Fill({
//                   //     color: 'blue',
//                   //   }),
//                   // }),
//                   image: new Icon({
//                     anchor: [0.5, 46],
//                     anchorXUnits: 'fraction',
//                     anchorYUnits: 'pixels',
//                     src: 'assets/img/wp.png',
//                   }),
//                 }),
//               }),
             
//             ],
//            // overlays: [overlay],
//             target: 'mapD',
//             view: new View({
//               center: [8111403.258440978, 2166113.1415149523],
//               zoom: 12, maxZoom: 18,
//             }),
//           });
      
    }
  
}
