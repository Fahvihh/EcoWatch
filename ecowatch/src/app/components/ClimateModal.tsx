"use client";
"use client";
// Para usar o gráfico, instale: npm install echarts echarts-for-react
import React from "react";
const ClimateChart = React.lazy(() => import("./ClimateChart"));

interface ClimateModalProps {
  open: boolean;
  onClose: () => void;
  lat: number;
  lng: number;
  regionName: string;
  meteoData: any;
}

export default function ClimateModal({ open, onClose, lat, lng, regionName, meteoData }: ClimateModalProps) {
  if (!open) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.7)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#101c2c",
        borderRadius: 22,
        boxShadow: "0 0 48px #00ffe0",
        padding: 48,
        minWidth: 700,
        maxWidth: 900,
        color: "#eafcff",
        position: "relative"
      }}>
        <button onClick={onClose} style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "#00ffe0",
          color: "#101c2c",
          border: "none",
          borderRadius: 8,
          padding: "6px 14px",
          fontWeight: 700,
          cursor: "pointer"
        }}>Fechar</button>
        <h2 style={{fontSize: "1.7em", color: "#2fffd6", marginBottom: 12}}>{regionName}</h2>
        <div style={{marginBottom: 18}}>
          <iframe
            width="100%"
            height="350"
            style={{borderRadius: 16, border: "2px solid #00ffe0"}}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${lat},${lng}&z=10&output=embed`}
          />
        </div>
        <div style={{marginBottom: 10, fontWeight: 600}}>Dados Climáticos:</div>
        {meteoData && meteoData.data && meteoData.data[0] && meteoData.data[0].coordinates && meteoData.data[0].coordinates[0] ? (
          <>
            <React.Suspense fallback={<div>Carregando gráfico...</div>}>
              <ClimateChart dates={meteoData.data[0].coordinates[0].dates} />
            </React.Suspense>
            
          </>
        ) : (
          <div style={{color: '#ff4f4f'}}>Dados não disponíveis no momento.</div>
        )}
      </div>
    </div>
  );
}
