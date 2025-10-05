"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

interface ClimateChartProps {
  dates: Array<{ date: string; value: number }>;
}

export default function ClimateChart({ dates }: ClimateChartProps) {
  const option = {
    title: {
      text: 'Temperatura (°C)',
      left: 'center',
      textStyle: { color: '#2fffd6', fontSize: 18 }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#101c2c',
      textStyle: { color: '#2fffd6' }
    },
    xAxis: {
      type: 'category',
      data: dates.map(d => d.date),
      axisLabel: { color: '#eafcff', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#eafcff', fontSize: 12 }
    },
    series: [
      {
        data: dates.map(d => d.value),
        type: 'line',
        smooth: true,
        lineStyle: { color: '#2fffd6', width: 3 },
        itemStyle: { color: '#00ffe0' },
        areaStyle: { color: 'rgba(47,255,214,0.15)' }
      }
    ],
    grid: { left: 40, right: 20, top: 40, bottom: 40 }
  };

  return (
    <div style={{ margin: '24px 0' }}>
      <ReactECharts option={option} style={{ height: 320, width: '100%' }} />
    </div>
  );
}
