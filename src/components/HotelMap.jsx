import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const TestMap = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (mapContainer.current) {
      const map = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://api.maptiler.com/maps/streets/style.json?key=QLWbjgAWSOjGLHTsbCKJ', // Detailed street map
        center: [37.666816, -0.317850], // Hotel coordinates
        zoom: 16 // Zoom in for street-level detail
      });

      // Add Marker at hotel location
      new maplibregl.Marker()
        .setLngLat([37.666816, -0.317850])
        .addTo(map);

      map.on('load', () => {
        console.log('Maplibre loaded successfully');
      });

      return () => map.remove();
    }
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '250px',
   
      }}
    />
  );
};

export default TestMap;
