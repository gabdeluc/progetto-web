"use client";

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

interface SimpleBarChartProps {
    data: any[];
    xKey: string;
    barKey: string;
    color?: string;
    height?: number;
}

export function SimpleBarChart({
    data,
    xKey,
    barKey,
    color = "#3b82f6",
    height = 300,
}: SimpleBarChartProps) {
    return (
        <div style={{ width: "100%", height }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                    <XAxis
                        dataKey={xKey}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "currentColor", opacity: 0.7 }}
                    />
                    <YAxis
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "currentColor", opacity: 0.7 }}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            color: "black",
                        }}
                        cursor={{ fill: "transparent" }}
                    />
                    <Bar
                        dataKey={barKey}
                        fill={color}
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

interface SimplePieChartProps {
    data: any[];
    dataKey: string;
    nameKey?: string;
    colors?: string[];
    height?: number;
}

const DEFAULT_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

export function SimplePieChart({
    data,
    dataKey,
    nameKey = "name",
    colors = DEFAULT_COLORS,
    height = 300,
}: SimplePieChartProps) {
    return (
        <div style={{ width: "100%", height }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey={dataKey}
                        nameKey={nameKey}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            color: "black",
                        }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
