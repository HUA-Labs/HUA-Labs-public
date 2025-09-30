"use client";
import React, { useEffect, useState } from 'react';
// Chart.js는 클라이언트 컴포넌트에서만 동작하므로 dynamic import 필요
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Chart.js 요소 등록
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Doughnut = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), { ssr: false }) as any;
const Bar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), { ssr: false }) as any;

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [slip, setSlip] = useState<any>(null);
  const [ethics, setEthics] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/logs/stats').then(r => r.json()).then(setStats);
    fetch('/api/logs/stats/slip').then(r => r.json()).then(d => setSlip(d.slip));
    fetch('/api/logs/stats/ethics').then(r => r.json()).then(d => setEthics(d.ethics));
    fetch('/api/logs?limit=10').then(r => r.json()).then(setRecent);
  }, []);

  // Chart 데이터 변환
  const emotionData = stats ? {
    labels: Object.keys(stats.emotion),
    datasets: [{
      data: Object.values(stats.emotion),
      backgroundColor: ['#22c55e', '#a3a3a3', '#ef4444'],
    }]
  } : null;
  const tierData = stats ? {
    labels: Object.keys(stats.tier),
    datasets: [{
      data: Object.values(stats.tier),
      backgroundColor: ['#fbbf24', '#60a5fa', '#a3e635'],
    }]
  } : null;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-4">감정 통계 대시보드</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>감정 분포</CardTitle>
          </CardHeader>
          <CardContent>
            {emotionData && <Doughnut data={emotionData} />}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>티어 분포</CardTitle>
          </CardHeader>
          <CardContent>
            {tierData && <Bar data={tierData} />}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader><CardTitle>슬립 통계</CardTitle></CardHeader>
          <CardContent>
            <div>True: {slip?.true ?? 0}</div>
            <div>False: {slip?.false ?? 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>윤리 통계</CardTitle></CardHeader>
          <CardContent>
            <div>True: {ethics?.true ?? 0}</div>
            <div>False: {ethics?.false ?? 0}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>최근 감정 로그</CardTitle></CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2">감정</th>
                <th className="p-2">티어</th>
                <th className="p-2">슬립</th>
                <th className="p-2">윤리</th>
                <th className="p-2">시간</th>
              </tr>
            </thead>
            <tbody>
              {recent && recent.map((log, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{log.emotion}</td>
                  <td className="p-2">{log.tier}</td>
                  <td className="p-2">{String(log.slip)}</td>
                  <td className="p-2">{String(log.ethics)}</td>
                  <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
} 