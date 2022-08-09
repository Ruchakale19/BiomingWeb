import {Component,OnInit} from '@angular/core';
import { ApiService } from '@services/api.service';
import { VTSModel } from '@/models/IVTSModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BlankComponent } from '@pages/blank/blank.component';


@Component({
  selector: 'app-vtsreport',
  templateUrl: './vtsreport.component.html',
  styleUrls: ['./vtsreport.component.scss']
})
export class VtsreportComponent implements OnInit {
  //public mapD!: Map
  searchForm: FormGroup;
  API_URL = "https://swd.mcgm.gov.in/wmswebapi";
  baseURL = this.API_URL;
  Vtsdata:VTSModel[];
  columns = [{ prop: 'Ticket_No' }, { prop: 'Vehicle_No' }, { prop: 'Net_Date' }, { prop: 'Net_Time' }, 
             { prop: 'GrossWt' }, { prop: 'TareWt' }, { prop: 'NetWt' }];
  selected = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  constructor(private apiService:ApiService,private _fb: FormBuilder, public matDialog: MatDialog){}
  // sourceL = new VectorSource({
  //     url: this.baseURL+'/DewateringLoc.json',
  //     format: new GeoJSON()
  //   });
  ngOnInit(): void {
    debugger;
    this.searchForm = this._fb.group({     
      fromdate: [new Date(), [Validators.required]],
      todate: [new Date(), [Validators.required]],
    });    
  }
  onSubmit(){
    console.log(this.searchForm.value)
    this.apiService.getVTSWBData(this.searchForm.value.fromdate,this.searchForm.value.todate).subscribe(
      (result)=>{
        debugger;
        this.Vtsdata=result.Data;
    //  console.log(result)
      },
      (err)=>{
      
      }
      
      ) 
  }

  onSelect({ selected }) {

    debugger;
    this.apiService.getMapContentParams(selected[0]);   
         const dialogConfig = new MatDialogConfig();               
                dialogConfig.disableClose = false;
                dialogConfig.id = "modal-component";
                dialogConfig.height = "950px";
                dialogConfig.width = "1000px";
                const modalDialog = this.matDialog.open(BlankComponent, dialogConfig);
   
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }
}
