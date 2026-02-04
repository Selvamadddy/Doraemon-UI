import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import StatCard from './StatCard';

type StatsData = {
    icon: string;
    data: string;
    statName: string;
    fontColour: string;
};

export default function DashboardStats() {
    const [data, setData] = useState<StatsData[] | null>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setData([{icon :"person-walking", data:"8,432", statName:"STEPS TODAY", fontColour :"rgb(16 185 129)"},
               { icon : "currency-rupee", data : "1,240", statName : "Monthly Spend", fontColour : " rgb(255 77 77)" },
               {icon : "shield-fill", data:"Safe", statName:"Home Status", fontColour: "rgb(43 124 238)"},
               { icon:"stopwatch-fill", data:"3.5 h", statName:"Study Time", fontColour: "rgb(255 215 0)"}
            ]);
        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <>
            { data == null ?  <Spinner /> :
              data.map((stat, index) => (
                <StatCard key = {index} icon={stat.icon} data={stat.data} statName={stat.statName} fontColour= {stat.fontColour}/>
              ))
            }
        </>
    );
}