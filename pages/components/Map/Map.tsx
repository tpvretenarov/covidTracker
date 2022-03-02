import * as React from 'react';
import { useState, useMemo, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactMapGL, { ViewportProps, Marker, Popup, FlyToInterpolator, WebMercatorViewport } from 'react-map-gl';
import { MapRef } from 'react-map-gl/src/components/static-map';
import { AllCountryData, CountryData } from '../../../types';
import useSupercluster from 'use-supercluster';
import countries_bbox from '../../../public/countries_bbox.json';

type MapProps = {
  data: AllCountryData;
  countryData: CountryData | undefined;
};

const Map = ({ data, countryData }: MapProps) => {
  const [viewport, setViewport] = useState<{
    latitude: number;
    longitude: number;
    zoom: number;
    transitionDuration?: number | 'auto' | undefined;
    transitionInterpolator?: FlyToInterpolator;
  }>({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [activePopup, setActivePopup] = useState<string | null>(null);
  const mapRef = useRef<MapRef | null>(null);

  const handleViewPort = (nextViewport: ViewportProps) => {
    if (nextViewport) {
      setViewport({
        ...viewport,
        latitude: nextViewport.latitude ? nextViewport.latitude : viewport.latitude,
        longitude: nextViewport.longitude ? nextViewport.longitude : viewport.longitude,
        zoom: nextViewport.zoom ? nextViewport.zoom : viewport.zoom,
        transitionDuration: undefined,
        transitionInterpolator: undefined,
      });
    }
  };

  const markerPoints = useMemo(() => {
    {
      return (
        data &&
        data
          .filter(
            (value, index, self) =>
              index ===
              self.findIndex(
                (t) =>
                  t.coordinates.latitude === value.coordinates.latitude &&
                  t.coordinates.longitude === value.coordinates.longitude
              )
          )
          .map(
            ({
              country,
              county,
              province,
              updatedAt,
              stats: { confirmed, deaths },
              coordinates: { latitude, longitude },
            }) => {
              return {
                type: 'Feature',
                properties: {
                  cluster: false,
                  country: country,
                  county: county,
                  updatedAt: updatedAt,
                  confirmed: confirmed,
                  deaths: deaths,
                  province: province,
                },
                geometry: { type: 'Point', coordinates: [Number(longitude), Number(latitude)] },
              };
            }
          )
      );
    }
  }, [data]);

  const bounds = mapRef.current ? mapRef.current.getMap().getBounds().toArray().flat() : null;

  const { clusters, supercluster } = useSupercluster({
    points: markerPoints,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 50 },
  });

  const markers = useMemo(() => {
    {
      return (
        clusters &&
        clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount, country, county, deaths, province } = cluster.properties;
          const markerKey = !isCluster ? `${longitude}-${latitude}-${country}-${county}-${province}-${deaths}` : null;
          if (isCluster) {
            return (
              <Marker key={`cluster-${cluster.id}`} latitude={latitude} longitude={longitude}>
                <ClusterMarker
                  style={{
                    width: `${40 + (pointCount / markerPoints.length) * 200}px`,
                    height: `${40 + (pointCount / markerPoints.length) * 200}px`,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20);

                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2,
                      }),
                      transitionDuration: 'auto',
                    });
                  }}
                >
                  {pointCount}
                </ClusterMarker>
              </Marker>
            );
          }
          return (
            <Marker key={markerKey} longitude={longitude} latitude={latitude}>
              <div
                onClick={() => setActivePopup(activePopup === markerKey ? null : markerKey)}
                style={{ fontSize: '14px', color: '#f70f00', height: '10px', width: '10px', cursor: 'pointer' }}
              >
                <i className="fa-solid fa-circle" />
              </div>
            </Marker>
          );
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clusters, supercluster, markerPoints.length]);

  const popUps = useMemo(() => {
    {
      return (
        clusters &&
        clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount, country, county, deaths, province } = cluster.properties;
          const markerKey = !isCluster ? `${longitude}-${latitude}-${country}-${county}-${province}-${deaths}` : null;
          if (!isCluster) {
            return (
              <React.Fragment key={markerKey + '-popup'}>
                {activePopup === markerKey ? (
                  <Popup
                    longitude={longitude}
                    latitude={latitude}
                    closeButton
                    closeOnClick={false}
                    onClose={() => setActivePopup(null)}
                    offsetLeft={6}
                    anchor="bottom"
                    captureScroll
                    captureClick
                    captureDoubleClick
                  >
                    <div className="p-2 d-flex flex-column">
                      <div>{country ? `Country: ${country}` : null}</div>
                      <div>{county ? `County: ${county}` : null}</div>
                      <div>{province ? `Province: ${province}` : null}</div>
                    </div>
                  </Popup>
                ) : null}
              </React.Fragment>
            );
          }
          return null;
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clusters, supercluster, markerPoints.length, activePopup]);

  const centerCountry = (country: string) => {
    const countryData = countries_bbox.find((key) => key.country.toLocaleLowerCase() === country.toLocaleLowerCase());

    if (countryData) {
      const longMin = countryData?.longmin;
      const latMin = countryData?.latmin;
      const longMax = countryData?.longmax;
      const latMax = countryData?.latmax;

      const { width, height } = window.getComputedStyle(mapRef.current?.getMap()._container);
      if (width && height && longMin && latMin && longMax && latMax) {
        const { longitude, latitude, zoom } = new WebMercatorViewport({
          width: parseInt(width.split('px')[0], 10),
          height: parseInt(height.split('px')[0], 10),
        }).fitBounds([
          [longMin, latMin],
          [longMax, latMax],
        ]);
        setViewport({ latitude, longitude, zoom });
      }
    }
  };

  useEffect(() => {
    if (countryData) {
      centerCountry(countryData.country);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryData, data]);

  return (
    <div className="mx-1" style={{ width: '100%', height: '400px' }}>
      <ReactMapGL
        ref={mapRef}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        height="100%"
        width="100%"
        mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_KEY}`}
        {...viewport}
        onViewportChange={handleViewPort}
        attributionControl={false}
        disableTokenWarning
        reuseMaps
        maxZoom={20}
      >
        {markers}
        {popUps}
      </ReactMapGL>
    </div>
  );
};

const ClusterMarker = styled.div`
  color: #fff;
  background: #1978c8;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Map;
