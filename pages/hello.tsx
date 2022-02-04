import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const Home = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  return (
    <ReactMapGL
      mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_KEY}`}
      {...viewport}
      onViewportChange={(
        nextViewport: React.SetStateAction<{
          width: number;
          height: number;
          latitude: number;
          longitude: number;
          zoom: number;
        }>
      ) => setViewport(nextViewport)}
      attributionControl={false}
      disableTokenWarning
      reuseMaps
    />
  );
};

export default Home;

