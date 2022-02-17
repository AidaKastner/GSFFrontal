import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  KmlLayer,
} from 'react-google-maps';

const MapWithAKmlLayer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB5XqKVMRIVh-YUMhdZMrOCAJcD7tWaOig&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `580px`, marginTop: '1rem' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={6}
    defaultCenter={{ lat: 9.96233, lng: 49.80404 }}
  >
    {props.rutaKmls.forEach(rutaKml => {
      const url = `http://localhost:3000${rutaKml}`;
      return (
        <KmlLayer
          url={url}
          options={{ preserveViewport: true }}
        />
      )
    })}
  </GoogleMap>
);

export default MapWithAKmlLayer;
