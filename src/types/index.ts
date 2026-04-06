export interface IVinVariable {
    Variable: string;
    VariableId: number;
    Value: string | null;
    ValueId: number | null;
}

export interface IVinDecodeResponse {
    Count: number;
    Message: string;
    SearchCriteria: string;
    Results: IVinVariable[];
}

export interface IVehicleVariable {
    ID: number;
    Name: string;
    Description: string;
    GroupName: string | null;
    DataType: string;
}

export interface IVehicleVariablesResponse {
    Count: number;
    Message: string;
    Results: IVehicleVariable[];
}

export interface IHistoryItem {
    vin: string;
    decodedAt: string;
    results: IVinVariable[];
    message: string;
}