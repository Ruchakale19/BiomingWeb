import {Component,OnInit ,AfterViewInit,OnDestroy} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '@services/api.service';

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
import { LineString } from 'ol/geom';
import Feature from 'ol/Feature';
import { transform } from 'ol/proj';
@Component({
    selector: 'app-blank',
    templateUrl: './blank.component.html',
    styleUrls: ['./blank.component.scss']
})
export class BlankComponent implements OnInit,OnDestroy{
    public mapD: Map
constructor(public dialogRef: MatDialogRef<BlankComponent> ,private apiService:ApiService){
   
  let c=1;
  this.apiService.featureParams.subscribe(
    (objResult) => {  
      // c+=1;
      // console.log(c);
      // if(objResult){ 
        console.log(objResult)       
        let str = []
        this.apiService.getVTSLocationData(objResult.Ticket_No).subscribe(
          (result)=>{
           let dt=result.Data;
           dt.forEach(el=>{
             str.push([Number(el.Longitude), Number(el.Latitude)])
           })                
           let trnsStr = new LineString(str);
           trnsStr.transform('EPSG:4326', 'EPSG:3857');              
           const geojsonObject = {
             'type': 'FeatureCollection',
             'crs': {
               'type': 'name',
               'properties': {
                 'name': 'EPSG:3857',
               },
             },
             'features': [          
               {
                 'type': 'Feature',
                 'geometry': {
                   'type': 'MultiLineString',
                   'coordinates': [trnsStr]
                 },
               },                
             ],
           };

           const vectorSource = new VectorSource({
            features: new GeoJSON().readFeatures(geojsonObject),
          });
          this.mapD = new Map({
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
              new VectorLayer({
                source: vectorSource,
                style: new Style({
                  fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                  }),
                  stroke: new Stroke({
                    color: 'blue',
                    width: 4,
                  }),
                  // image: new CircleStyle({
                  //   radius: 5,
                  //   fill: new Fill({
                  //     color: 'blue',
                  //   }),
                  // }),
                  image: new Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: 'assets/img/wp.png',
                  }),
                }),
              }),
             
            ],
           // overlays: [overlay],
            target: 'mapD',
            view: new View({
              center: transform([Number(dt[0].Longitude), Number(dt[0].Latitude)], 'EPSG:4326', 'EPSG:3857'),
              zoom: 12, maxZoom: 18,
            }),
          });
          },
          (err)=>{
          
          })     
      //  }     
    });
    
}
ngOnInit(): void {
  
    
}

ngOnDestroy(): void {
  this.mapD.dispose();   

  
}
    Back() {   
      
    this.apiService.featureParams.subscribe(null)
      this.mapD.dispose(); 
     // this.apiService.mapContent.unsubscribe()
        this.dialogRef.close();
      }

}
