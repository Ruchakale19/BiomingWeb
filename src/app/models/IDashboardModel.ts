export interface DashboardModel{
   
    Date :String,
    Count :Number,
    NetWt :Number,
   
}

export interface IDashboardResponce {
    Msg: String;
    ServiceResponse: number;
    Data: DashboardModel[];
   
}