import React from 'react';
 
import {
  GoogleApiWrapper,
  Marker,
  Map,
  Polyline
} from 'google-maps-react';
 
const customizeMap = {
  width: '38%',
  height: '49%'
};
 
let firstLoad = true;

class GoogleMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cords: [],
      longitude: 0,
      latitude: 0
    };
  }

  componentDidMount() {
    this.getCoordinates();
  }

  componentDidUpdate() {
    if (!firstLoad) {
      this.getCoordinates();
      firstLoad = true;
    } else {
      firstLoad = false;
    }
  }

  getCoordinates = () => {
    fetch(this.props.rutaKml)
      .then(response => {
        return response.text();
      })
      .then(data => {
        const dataArray = data.split(/\r\n|\n/);
        const coords = [];
        dataArray.forEach(element => {
          element = element.trim();
          if (element.includes("<coordinates>")) {
            element = element.substring(13);
            var elements = element.split(',');
            coords.push({ longitude: Number(elements[0]), latitude: Number(elements[1]) });
          }
        });
        this.setState({
          cords: coords,
          longitude: coords[0].longitude,
          latitude: coords[0].latitude
        });
      });
  }

  drawMarker = () => {
    return this.state.cords.map((store, i) => {
      return (
        <Marker key={i} id={i} position={{
            lat: store.latitude,
            lng: store.longitude
          }}
        />
      );
    });
  }

  drawPolyline = () => {
    const path = [];

    this.state.cords.map((cord) => {
      path.push({
        lat: cord.latitude,
        lng: cord.longitude
      });
    });

    return (
      <Polyline
        path={path}
        geodesic={true}
        strokeColor={'red'}
        strokeOpacity={1.0}
        strokeWeight={3}
      />
    );
  }

  render() {
    if (this.state.cords.length == 0) {
      return null;
    } else {
      return (
        <Map
          google={this.props.google}
          style={customizeMap}
          zoom={12}
          center={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }}
        >
          {this.drawMarker()}
          {this.drawPolyline()}
        </Map>
      );
    }
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB5XqKVMRIVh-YUMhdZMrOCAJcD7tWaOig'
})(GoogleMapComponent);
