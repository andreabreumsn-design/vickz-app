import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

export default function MapContainer({ onPointsChange, onCoordinatesChange }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState(null); // 'obra' | 'vizinhos' | null
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize Leaflet map
    const map = L.map(mapRef.current).setView([-23.5505, -46.6333], 15); // São Paulo coordinates

    // Add tile layer with dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© VICKZ Vistoria Cautelar',
      maxZoom: 19,
      className: 'leaflet-container dark-mode',
    }).addTo(map);

    mapInstanceRef.current = map;

    // Handle map click for drawing
    map.on('click', (e) => {
      if (drawMode) {
        const newPoint = {
          id: Date.now(),
          type: drawMode,
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          label: drawMode === 'obra' ? 'Local da Obra' : `Vizinho ${points.filter(p => p.type === 'vizinhos').length + 1}`,
        };

        setPoints([...points, newPoint]);

        // Add marker to map
        const markerColor = drawMode === 'obra' ? '#FF6600' : '#E62117';
        const marker = L.circleMarker([e.latlng.lat, e.latlng.lng], {
          radius: 8,
          fillColor: markerColor,
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
        }).addTo(map);

        marker.bindPopup(`<div class="text-xs font-semibold text-[#001F5B]">
          <p>${newPoint.label}</p>
          <p>Lat: ${e.latlng.lat.toFixed(6)}</p>
          <p>Lng: ${e.latlng.lng.toFixed(6)}</p>
        </div>`);

        // Notify parent
        onPointsChange([...points, newPoint]);
        onCoordinatesChange(e.latlng.lat, e.latlng.lng);
      }
    });

    return () => {
      map.remove();
    };
  }, [drawMode, points, onPointsChange, onCoordinatesChange]);

  const handleStartDrawing = (mode) => {
    setDrawMode(mode);
    setIsDrawing(true);
  };

  const handleStopDrawing = () => {
    setDrawMode(null);
    setIsDrawing(false);
  };

  const handleUndoPoint = () => {
    if (points.length > 0) {
      const newPoints = points.slice(0, -1);
      setPoints(newPoints);
      onPointsChange(newPoints);

      // Refresh map markers (simplified - in production use proper layer management)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.eachLayer((layer) => {
          if (layer instanceof L.CircleMarker) {
            mapInstanceRef.current.removeLayer(layer);
          }
        });
        newPoints.forEach(point => {
          const markerColor = point.type === 'obra' ? '#FF6600' : '#E62117';
          L.circleMarker([point.lat, point.lng], {
            radius: 8,
            fillColor: markerColor,
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8,
          }).addTo(mapInstanceRef.current);
        });
      }
    }
  };

  const handleRecenter = () => {
    if (mapInstanceRef.current && points.length > 0) {
      const lastPoint = points[points.length - 1];
      mapInstanceRef.current.flyTo([lastPoint.lat, lastPoint.lng], 17);
    }
  };

  const handleCloseTerrain = () => {
    if (points.length >= 3) {
      console.log('Terreno fechado com', points.length, 'pontos');
      handleStopDrawing();
    } else {
      alert('Adicione pelo menos 3 pontos para fechar o terreno');
    }
  };

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden shadow-lg bg-[#0f1419]">
      {/* Leaflet Map Container */}
      <div
        ref={mapRef}
        className="w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Header Overlay */}
      <div className="absolute top-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white z-[400]">
        <h3 className="text-sm font-bold mb-1">Mapa da Obra</h3>
        <p className="text-xs text-[#cbd5e1]">
          Lat: -23.5505 | Lng: -46.6333
        </p>
      </div>

      {/* Quick Action Buttons */}
      <div className="absolute top-20 left-4 right-4 flex gap-2 z-[400]">
        <button
          onClick={() => handleStartDrawing('obra')}
          className={`flex-1 py-2 px-3 rounded-lg text-white text-xs font-bold transition-all ${
            drawMode === 'obra'
              ? 'bg-[#3b82f6] ring-2 ring-[#60a5fa]'
              : 'bg-[#1e40af] hover:bg-[#3b82f6]'
          }`}
        >
          📍 Marcar Obra
        </button>
        <button
          onClick={() => handleStartDrawing('vizinhos')}
          className={`flex-1 py-2 px-3 rounded-lg text-white text-xs font-bold transition-all ${
            drawMode === 'vizinhos'
              ? 'bg-[#E62117] ring-2 ring-[#FF6600]'
              : 'bg-[#991b1b] hover:bg-[#E62117]'
          }`}
        >
          🏘️ Marcar Vizinhos
        </button>
      </div>

      {/* Drawing Mode Indicator */}
      {isDrawing && (
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 bg-[#FF6600] text-white px-4 py-2 rounded-full text-xs font-bold z-[400] animate-pulse">
          Clique no mapa para marcar pontos
        </div>
      )}

      {/* Control Buttons Grid */}
      <div className="absolute bottom-28 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 grid grid-cols-3 gap-2 z-[400]">
        <button
          onClick={handleCloseTerrain}
          className="py-2 px-2 rounded-lg bg-[#10b981] text-white text-xs font-bold hover:bg-[#059669] transition-all"
        >
          ✓ Fechar
        </button>
        <button
          onClick={handleUndoPoint}
          className="py-2 px-2 rounded-lg bg-[#6366f1] text-white text-xs font-bold hover:bg-[#4f46e5] transition-all"
        >
          ↶ Desfazer
        </button>
        <button
          onClick={handleRecenter}
          className="py-2 px-2 rounded-lg bg-[#8b5cf6] text-white text-xs font-bold hover:bg-[#7c3aed] transition-all"
        >
          ⊕ Recentrar
        </button>
      </div>

      {/* Points Count Badge */}
      <div className="absolute bottom-28 right-4 bg-[#FF6600] text-white rounded-full w-10 h-10 flex items-center justify-center text-xs font-bold z-[400]">
        {points.length}
      </div>
    </div>
  );
}
