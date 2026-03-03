import { useEffect, useState, useCallback } from "react";

type Period = "AM" | "PM";

export default function useDateTimeFields(initialUtcDate?: string | Date) {
    const [dueDate, setDueDate] = useState("");
    const [hour, setHour] = useState("01");
    const [minute, setMinute] = useState("00");
    const [period, setPeriod] = useState<Period>("AM");

    useEffect(() => {
        if (!initialUtcDate) return;

        const utcDate = new Date(initialUtcDate);

        const localDate = new Date(
            utcDate.getUTCFullYear(),
            utcDate.getUTCMonth(),
            utcDate.getUTCDate(),
            utcDate.getUTCHours(),
            utcDate.getUTCMinutes()
        );

        const formattedDate =
            localDate.getFullYear() +
            "-" +
            String(localDate.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(localDate.getDate()).padStart(2, "0");

        setDueDate(formattedDate);

        let hrs = localDate.getHours();
        const mins = localDate.getMinutes();

        const ampm: Period = hrs >= 12 ? "PM" : "AM";
        hrs = hrs % 12 || 12;

        setHour(String(hrs).padStart(2, "0"));
        setMinute(String(mins).padStart(2, "0"));
        setPeriod(ampm);
    }, [initialUtcDate]);

    const getUtcDate = () => {
        if (!dueDate) return null;

        let hrs = Number(hour);

        if (period === "PM" && hrs !== 12) hrs += 12;
        if (period === "AM" && hrs === 12) hrs = 0;

        const localDate = new Date(dueDate);
        localDate.setHours(hrs);
        localDate.setMinutes(Number(minute));
        localDate.setSeconds(0);

        return new Date(
            Date.UTC(
                localDate.getFullYear(),
                localDate.getMonth(),
                localDate.getDate(),
                localDate.getHours(),
                localDate.getMinutes(),
                0
            )
        ).toISOString();
    };

    const reset = useCallback(() => {
    setDueDate("");
    setHour("12");
    setMinute("00");
    setPeriod("AM");
  }, []);

    return {
        dueDate,
        setDueDate,
        hour,
        setHour,
        minute,
        setMinute,
        period,
        setPeriod,
        getUtcDate,
        reset
    };
}