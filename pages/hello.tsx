import * as React from 'react';
import { useState } from 'react';
import ReactMapGL, { ViewportProps } from 'react-map-gl';

const Home = () => {
  const [viewport, setViewport] = useState({ latitude: 37.7577, longitude: -122.4376, zoom: 8 });

  const handleViewPort = (nextViewport: ViewportProps) => {
    if (nextViewport) {
      setViewport({
        ...viewport,
        latitude: nextViewport.latitude ? nextViewport.latitude : viewport.latitude,
        longitude: nextViewport.longitude ? nextViewport.longitude : viewport.longitude,
        zoom: nextViewport.zoom ? nextViewport.zoom : viewport.zoom,
      });
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactMapGL
        height="100%"
        width="100%"
        mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_KEY}`}
        {...viewport}
        onViewportChange={handleViewPort}
        attributionControl={false}
        disableTokenWarning
        reuseMaps
      />
    </div>
  );
};

export default Home;
