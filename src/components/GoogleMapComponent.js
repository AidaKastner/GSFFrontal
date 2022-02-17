import React from 'react';
 
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
 
const customizeMap = {
  width: '38%',
  height: '47%'
};
 
let firstLoad = true;

class GoogleMapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cords: [],
      longitude: '',
      latitude: ''
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
    fetch(this.props.rutaKmls[1])
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
            coords.push({ longitude: elements[0], latitude: elements[1] });
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
      return <Marker key={i} id={i} position={{
          lat: store.latitude,
          lng: store.longitude
        }}
        onClick={() => console.log("Event Hanlder Called")} />
    });
  }

  render() {
    if (this.state.latitude == '') {
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
        </Map>
      );
    }
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB5XqKVMRIVh-YUMhdZMrOCAJcD7tWaOig'
})(GoogleMapComponent);
