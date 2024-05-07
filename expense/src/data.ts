
export enum ReportType{
    INCOME = 'income',
    EXPENSE = 'expense'
}

export const data: Data = {
    report:[
        {
            id:'uuid1',
            source:'Salary',
            amount:300,
            created_at: new Date(),
            updated_at: new Date(),
            type:ReportType.EXPENSE
        },

        {
            id:'uuid2',
            source:'Salary',
            amount:4000,
            created_at: new Date(),
            updated_at: new Date(),
            type:ReportType.INCOME
        },

        {
            id:'uuid3',
            source:'Food',
            amount:1900,
            created_at: new Date(),
            updated_at: new Date(),
            type:ReportType.EXPENSE
        }
    ]
    
}

interface Data {
    report : {
        id:string,
        source:string,
        amount:number,
        created_at:Date,
        updated_at:Date,
        type:ReportType
    }[]
}

