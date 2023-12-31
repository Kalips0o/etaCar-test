import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { formatNumber } from "../../utils/formatters";
import { StatsContext, StatsContextState } from "../../context/stats.context";
import { fetchCryptoStats } from '../../api/Api';

export interface CurrencyChartPoint {
    date: string;
    priceUsd: string;
    time: number;
}

async function fetchCurrencyChartData(currencyId: string | null) {
    const timeNow = Date.now();
    const MONTH_MILLISECONDS = 2_592_000_000;
    const timeMonthAgo = timeNow - MONTH_MILLISECONDS;

    try {
        const data = await fetchCryptoStats(currencyId, "d1", timeMonthAgo, timeNow);
        return data;
    } catch (error) {
        throw error;
    }
}

function CurrencyChart() {
    const { setErrorMessage, setShouldShowStats } =
        useContext<StatsContextState>(StatsContext);
    const [currencyChartData, setCurrencyChartData] =
        useState<CurrencyChartPoint[]>();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchCurrencyChartData(searchParams.get("id"));
                setCurrencyChartData(data);
            } catch (error) {
                // @ts-ignore
                setErrorMessage(error);
                setShouldShowStats(true);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            {currencyChartData && (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={currencyChartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis tickFormatter={(value) => value + 1} interval={1} />
                        <YAxis tickFormatter={(value) => `$${value}`} />
                        <Tooltip
                            separator={": "}
                            labelFormatter={(value) => `Day ${value + 1}`}
                            formatter={(value: string) => [
                                `$${formatNumber(parseFloat(value))}`,
                                "Price",
                            ]}
                        />
                        <Line type="monotone" dataKey="priceUsd" stroke="#e73919" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </>
    );
}

export default CurrencyChart;
