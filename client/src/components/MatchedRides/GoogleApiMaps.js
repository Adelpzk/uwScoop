import React from "react";
import Geocode from "react-geocode";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "500px",
  height: "300px",
};

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

Geocode.setLanguage("en");

function GoogleApiMaps(props) {
  /*eslint no-undefined: "error"*/
  const [latOrigin, setLatOrigin] = React.useState();
  const [lngOrigin, setLngOrigin] = React.useState();

  const [latDestination, setLatDestination] = React.useState();
  const [lngDestination, setLngDestination] = React.useState();
  const center = {
    lat: (latOrigin + latDestination) / 2,
    lng: (lngDestination + lngOrigin) / 2,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  React.useEffect(() => {
    Geocode.fromAddress(props.locationOrigin).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatOrigin(lat);
        setLngOrigin(lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  React.useEffect(() => {
    Geocode.fromAddress(props.locationDropOff).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatDestination(lat);
        setLngDestination(lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  console.log(latOrigin, lngOrigin);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={7}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <>
        <Marker position={{ lat: latOrigin, lng: lngOrigin }}></Marker>
        <Marker
          position={{ lat: latDestination, lng: lngDestination }}
        ></Marker>
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(GoogleApiMaps);
