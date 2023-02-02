import {Component, OnInit} from '@angular/core';
import {ApiService} from '@services/api.service';
import {VTSModel} from '@/models/IVTSModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {BlankComponent} from '@pages/blank/blank.component';
import Swal from 'sweetalert2';

declare var $: any;
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
import * as XLSX from 'xlsx';

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
    // toRecords = 30;
    totalrecords = 0;

    totalPages = 0;
    currentPage = 1;
    ntWtSoil = 0;
    ntWtSteel = 0;

    pagination = false;
    soilList: any = [];
    stoneList: any = [];
    searchArray = [];
    searchText = '';
    entryValue = 30;
    entry = 30;

    soilVehicleCount = 0;
    stoneVehicleCount = 0;
    soilVehicleNtWt = 0;
    stoneVehicleNtWt = 0;

    fileName = 'ExcelSheet.xlsx';

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
        this.searching = false;
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
                        if (this.Vtsdata != undefined) {
                            this.totalrecords = this.Vtsdata.length;
                        }

                        debugger;
                        if (this.totalrecords != 0) {
                            for (var i = 0; i < this.Vtsdata.length; i++) {
                                this.Vtsdata[i].TareTime = this.Vtsdata[
                                    i
                                ].TareTime.slice(0, -8);
                                this.Vtsdata[i].GrossTime = this.Vtsdata[
                                    i
                                ].GrossTime.slice(0, -8);
                            }

                            var remainder = this.totalrecords % this.entryValue;

                            this.soilList = this.Vtsdata.filter((p) =>
                                p.Item_Name.includes('SOIL')
                            );
                            this.soilVehicleCount = this.soilList.length;

                            this.soilVehicleNtWt = this.soilList.reduce(
                                function (prev, cur) {
                                    return Number(prev) + Number(cur.NetWt);
                                },
                                0
                            );

                            this.soilVehicleNtWt = Math.floor(
                                this.soilVehicleNtWt / 1000
                            );

                            this.stoneList = this.Vtsdata.filter((t) =>
                                t.Item_Name.includes('STONE')
                            );

                            this.stoneVehicleNtWt = this.stoneList.reduce(
                                function (prev, cur) {
                                    return prev.NetWt + cur.NetWt;
                                },
                                0
                            );

                            this.stoneVehicleCount = this.stoneList.length;
                            debugger;

                            if (remainder != 0) {
                                this.totalPages =
                                    Math.floor(
                                        this.totalrecords / this.entryValue
                                    ) + 1;
                            } else {
                                this.totalPages = Math.floor(
                                    this.totalrecords / this.entryValue
                                );
                            }
                        }

                        if (this.Vtsdata.length > this.entryValue) {
                            this.pagination = true;

                            for (var i = 0; i < this.entryValue; i++) {
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
        $('#btnopenmapClose').click();
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
            this.entryValue = this.fromRecord - 1;
            this.currentPage = this.currentPage - 1;
            this.fromRecord = FN < 0 ? 0 : FN;

            for (var k = this.fromRecord - 1; k < this.entryValue; k++) {
                if (this.Vtsdata[k] != undefined) {
                    this.lstVtsData.push(this.Vtsdata[k]);
                }
            }
        }
    }

    recordCount = 30;
    nextRecordsClick() {
        debugger;
        if (this.entryValue < this.totalrecords) {
            debugger;
            this.lstVtsData = [];
            this.fromRecord = +this.entryValue + 1;
            this.currentPage = this.currentPage + 1;
            this.entryValue = this.entryValue + this.recordCount;
            // this.BindAllVehiclesList('');

            for (var j = this.fromRecord - 1; j < this.entryValue; j++) {
                if (this.Vtsdata[j] != undefined) {
                    this.lstVtsData.push(this.Vtsdata[j]);
                }
            }
        }
    }

    searching = false;
    search() {
        debugger;

        if (this.searchText != '') {
            debugger;
            this.searching = true;
            // let rVal = (val.id.toLocaleLowerCase().includes(args)) || (val.email.toLocaleLowerCase().includes(args));
            this.searchArray = this.lstVtsData.filter(
                (x) =>
                    x.Ticket_No.includes(this.searchText) ||
                    x.Vehicle_No.includes(this.searchText) ||
                    x.Item_Name.includes(this.searchText) ||
                    x.Vehicletype.includes(this.searchText) ||
                    x.StartPOI.includes(this.searchText) ||
                    x.EndPOI.includes(this.searchText)
            );

            debugger;
            this.lstVtsData = this.searchArray;
        }
    }

    refresh() {
        this.searching = false;
        this.searchText = '';
        this.onSubmit();
    }

    getEntries() {
        debugger;
        this.entryValue = Number(this.entry);
        this.recordCount = this.entryValue;
        this.onSubmit();
    }

    export() {
        debugger;
        if (this.totalrecords > 0) {

            this.lstVtsData = this.Vtsdata;

            let element = document.getElementById('excel-export-table');
            /* pass here the table id */
            const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

            /* generate workbook and add the worksheet */
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

            /* save to file */
            XLSX.writeFile(wb, this.fileName);
        }

        else {
            Swal.fire({
                text: 'No Data to export!',
                icon: 'error'
            });
        }
        
    }

    ascendingValue: any = false;
    columnName:any;
    sort(colName, boolean) {
        debugger;
        this.columnName = colName;
        if (boolean == true){
            this.lstVtsData.sort((a, b) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0)
            this.ascendingValue = !this.ascendingValue
        }
        else{
            this.lstVtsData.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
            this.ascendingValue = !this.ascendingValue
        }
        debugger;
    }
    
}
