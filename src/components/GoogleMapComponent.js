import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Translation, useTranslation, Trans } from 'react-i18next';

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
        console.log("MAP STATE: ", this.state),
        console.log("MAP cords 0: ", this.state.cords[0]),
        console.log("MAP cords 0: ", this.state.cords[1]),
        <div>
          <Container>
            <Row>
            <Col xs={6} style={{textAlign: "left"}}>
              <label><Translation ns= "global">{(t) => <>{t('PosIni')}</>}</Translation></label>
              <input
                type="text"
                name="PosIni"
                className="u-full-width"
                readOnly = {true}
                //placeholder={this.state.form.descFin}
                value={this.state.cords[0].latitude + "-" + this.state.cords[0].longitude}
              />
            </Col>
            <Col xs={6} style={{textAlign: "left"}}>
              <label><Translation ns= "global">{(t) => <>{t('PosFin')}</>}</Translation></label>
              <input
                type="text"
                name="PosFin"
                className="u-full-width"
                readOnly = {true}
                //placeholder={this.state.form.descFin}
                value={this.state.cords[1].latitude + "-" + this.state.cords[1].longitude}
              />
            </Col>
            </Row>
          </Container>
          {"  "}
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
        </div>
      );
    }
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB5XqKVMRIVh-YUMhdZMrOCAJcD7tWaOig'
})(GoogleMapComponent);
