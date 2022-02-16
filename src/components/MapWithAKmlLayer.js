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
    defaultZoom={9}
    defaultCenter={{ lat: 41.9, lng: -87.624 }}
  >
    {console.log('props:', props)}
    <KmlLayer
      url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml"
      options={{ preserveViewport: true }}
    />
  </GoogleMap>
);

export default MapWithAKmlLayer;
