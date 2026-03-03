// Widget

export interface Widget 
{
    id: number;
    name: string;
}

export interface WidgetsResponse 
{
    widgets: Widget[];
}