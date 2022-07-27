export interface VTSModel{
   
    Id :String,
    Ticket_No :String,
    Net_Date :String,
    Net_Time :String,
    GrossDate :String,
    GrossTime :String,
    TareDate :String,
    TareTime :String,
    GrossWt:String,
    TareWt:String,
    NetWt :String,
    Party_Name :String,
    Item_Name :String,
    Vehicle_No :String,
    Item_Code :String,
    StartPOI :String,
    StartDate :String,
    EndPOI :String,
    EndDate :String,
    Vehicletype :String,
    POI :String,
    GPS_Date_time :String,
    Image_URL :String,
    Logsheet_No :String,
    Latitude :String,
    Longitude :String,
}

export interface IVTSResponce {
    Msg: String;
    ServiceResponse: number;
    Data: VTSModel[];
   
}