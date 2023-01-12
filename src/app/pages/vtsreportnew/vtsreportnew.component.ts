import {Component, OnInit} from '@angular/core';
import {ApiService} from '@services/api.service';
import {VTSModel} from '@/models/IVTSModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {BlankComponent} from '@pages/blank/blank.component';
import Swal from 'sweetalert2';

declare var $:any
declare var jQuery: any;


import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {OSM} from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import {GeoJSON} from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import GeometryType from 'ol/geom/GeometryType';
import {Circle as CircleStyle, Fill, Icon, Stroke, Style} from 'ol/style';
import {LineString} from 'ol/geom';
import Feature from 'ol/Feature';
import {transform} from 'ol/proj';

@Component({
    selector: 'app-vtsreportnew',
    templateUrl: './vtsreportnew.component.html',
    styleUrls: ['./vtsreportnew.component.scss']
})
export class VtsreportnewComponent implements OnInit {
    searchForm: FormGroup;
    API_URL = 'https://swd.mcgm.gov.in/wmswebapi';
    baseURL = this.API_URL;
    Vtsdata: VTSModel[];

    fromRecord = 1;
    toRecords = 10;
    totalrecords = 0;

    pagination = false;

    lstVtsData: any = [];

    selected = [];
    ColumnMode = ColumnMode;
    SelectionType = SelectionType;
    constructor(
        private apiService: ApiService,
        private _fb: FormBuilder,
        public matDialog: MatDialog
    ) {
        this.pagination = false;
    }
    // sourceL = new VectorSource({
    //     url: this.baseURL+'/DewateringLoc.json',
    //     format: new GeoJSON()
    //   });
    ngOnInit(): void {
        debugger;
        this.pagination = false;
        this.searchForm = this._fb.group({
            fromdate: [new Date(), [Validators.required]],
            todate: [new Date(), [Validators.required]]
        });
    }
    onSubmit() {
        debugger;
        this.Vtsdata = [];
        this.lstVtsData = [];
        this.totalrecords = 0;
        console.log(this.searchForm.value);

        if (this.searchForm.value.todate >= this.searchForm.value.fromdate) {
           

            this.apiService
                .getVTSWBData(
                    this.searchForm.value.fromdate,
                    this.searchForm.value.todate
                )
                .subscribe(
                    (result) => {
                        debugger;
                        this.Vtsdata = result.Data;
                        //  console.log(result);
                        this.totalrecords = this.Vtsdata.length;
                        if (this.Vtsdata.length > 10) {
                            this.pagination = true;

                            for (var i = 0; i < 10; i++) {
                                this.lstVtsData.push(this.Vtsdata[i]);
                            }
                        } else {
                            this.pagination = false;
                            this.lstVtsData = this.Vtsdata;
                        }
                    },
                    (err) => {}
                );
        } else {
            Swal.fire({
                icon: 'warning',
                text: 'ToDate should be greater than FromDate !'
            });
        }
    }

    viewMap1(selected) {
        debugger;
        this.apiService.getMapContentParams(selected);
        debugger;
        const dialogConfig = new MatDialogConfig();
        debugger;
        dialogConfig.disableClose = false;
        debugger;
        debugger;
        dialogConfig.id = 'modal-component';
        debugger;
        dialogConfig.height = '950px';
        debugger;
        dialogConfig.width = '1000px';
        debugger;
        const modalDialog = this.matDialog.open(BlankComponent, dialogConfig);
        debugger;
    }

    public mapD: Map;
    viewMap(selected) {
        debugger;
        let str = [];
        jQuery('#openmap').show();
        this.apiService.getVTSLocationData(selected.Ticket_No).subscribe(
            (result) => {
                debugger;
                let dt = result.Data;
                debugger;
                dt.forEach((el) => {
                    str.push([Number(el.Longitude), Number(el.Latitude)]);
                });
                debugger;
                let trnsStr = new LineString(str);
                trnsStr.transform('EPSG:4326', 'EPSG:3857');
                const geojsonObject = {
                    type: 'FeatureCollection',
                    crs: {
                        type: 'name',
                        properties: {
                            name: 'EPSG:3857'
                        }
                    },
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'MultiLineString',
                                coordinates: [trnsStr]
                            }
                        }
                    ]
                };
               
                const vectorSource = new VectorSource({
                    features: new GeoJSON().readFeatures(geojsonObject)
                });
                debugger;
                this.mapD = new Map({
                    layers: [
                        new TileLayer({
                            source: new OSM()
                        }),
                        new VectorLayer({
                            source: vectorSource,
                            style: new Style({
                                fill: new Fill({
                                    color: 'rgba(255, 255, 255, 0.2)'
                                }),
                                stroke: new Stroke({
                                    color: 'blue',
                                    width: 4
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
                                    src: 'assets/img/wp.png'
                                })
                            })
                        })
                    ],
                    // overlays: [overlay],
                    target: 'mapD',
                    view: new View({
                        center: transform(
                            [Number(dt[0].Longitude), Number(dt[0].Latitude)],
                            'EPSG:4326',
                            'EPSG:3857'
                        ),
                        zoom: 12,
                        maxZoom: 18
                    })
                });
                debugger;
            },
            (err) => {}
        );
    }

    close() {
        debugger;
        this.mapD.dispose();
        this.closeWindow();
    }

    closeWindow() {
        debugger;
        jQuery('#openmap').hide();
        $("#btnopenmapClose").click();
    }

    onActivate(event) {
        console.log('Activate Event', event);
    }

    previousRecordsClick() {
        debugger;
        if (this.fromRecord > 1) {
            debugger;
            this.lstVtsData = [];
            let FN = +this.fromRecord - +this.recordCount;
            this.toRecords = this.fromRecord - 1;
            this.fromRecord = FN < 0 ? 0 : FN;

            for (var k = this.fromRecord - 1; k < this.toRecords; k++) {
                if (this.Vtsdata[k] != undefined) {
                    this.lstVtsData.push(this.Vtsdata[k]);
                }
            }
        }
    }

    recordCount = 10;
    nextRecordsClick() {
        debugger;
        if (this.toRecords < this.totalrecords) {
            debugger;
            this.lstVtsData = [];
            this.fromRecord = +this.toRecords + 1;
            this.toRecords = this.toRecords + this.recordCount;
            // this.BindAllVehiclesList('');

            for (var j = this.fromRecord - 1; j < this.toRecords; j++) {
                if (this.Vtsdata[j] != undefined) {
                    this.lstVtsData.push(this.Vtsdata[j]);
                }
            }
        }
    }
}
