

"use client";
import "./assets/css/styles.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { fetchNasaData, NasaData } from "./utils/nasaApi";
import { fetchMeteomaticsData, MeteomaticsData } from "./utils/meteomaticsApi";
import ClimateModal from "./components/ClimateModal";
const GlobeBrazil = dynamic(() => import("./components/GlobeBrazil"), { ssr: false });
export default function Home() {
  const [nasaData, setNasaData] = useState<NasaData | null>(null);
  const [meteoData, setMeteoData] = useState<MeteomaticsData | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>("Manaus");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLat, setModalLat] = useState(-3.119);
  const [modalLng, setModalLng] = useState(-60.212);

  useEffect(() => {
    fetchNasaData(-3.119, -60.212).then(setNasaData);
    fetchMeteomaticsData(-3.119, -60.212).then(setMeteoData);
  }, []);

  function handleRegionClick(lat: number, lng: number, name: string) {
    setSelectedRegion(name);
    setModalLat(lat);
    setModalLng(lng);
    setModalOpen(true);
    fetchMeteomaticsData(lat, lng).then(setMeteoData);
  }

  return (
  <div className="min-h-screen bg-cover bg-center" style={{backgroundColor: '#061826'}}>
      

      {/* Main Content */}
  <main className="main-content" style={{marginTop: '40px'}}>
        

        <section className="right-column" style={{
          minWidth: '900px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          height: '750px',
          overflow: 'visible',
        }}>
          <GlobeBrazil onRegionClick={handleRegionClick} />
          <ClimateModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            lat={modalLat}
            lng={modalLng}
            regionName={selectedRegion}
            meteoData={meteoData}
          />
      
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '25px',
        background: 'rgba(10,50,80,0.95)',
        fontSize: '1.1em',
        color: '#2fffd6',
        position: 'relative',
        zIndex: 5,
        borderTop: '2px solid #2fffd6',
        marginTop: '40px',
        letterSpacing: '1px',
      }}>
        <p>2025 NASA Space Apps Challenge</p>
      </footer>
    </div>
  );
}
