import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { ReactElement, useEffect, useState } from "react";
import { getApp } from "firebase/app";
import {
  collection,
  GeoPoint,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import Map from "../GoogleMap/Map";
import { CircularProgress } from "@mui/material";

const render = (status: Status): ReactElement => {
  switch (status) {
    case Status.FAILURE:
      return <div>It broke</div>;
    default:
      return <CircularProgress />;
  }
};

function SodaSpots() {
  const [positions, setPositions] = useState<google.maps.Marker[]>([]);
  useEffect(() => {
    const db = getFirestore(getApp());
    const sodaSpots = collection(db, "soda-spots");
    const allSodaSpots = query(sodaSpots);
    const allSodaSpotsDetails = getDocs(allSodaSpots);
    const newPositions: google.maps.Marker[] = [];
    allSodaSpotsDetails
      .then((value) => {
        value.forEach((sodaSpot) => {
          const data = sodaSpot.data();
          const location = data.geolocation as GeoPoint;
          const name = data.name as string;
          newPositions.push(
            new google.maps.Marker({
              label: name,
              position: { lat: location.latitude, lng: location.longitude },
            })
          );
        });
      })
      .then(() => {
        if (positions.length !== newPositions.length) {
          setPositions(newPositions);
        }
      });
  }, [positions]);
  return (
    <Wrapper apiKey="AIzaSyCmqXemln5UJb7BkFS4h_KTsAycFxR-H0c" render={render}>
      <Map
        style={{ width: "50%", height: "300px" }}
        zoom={3}
        center={{ lat: 40.276389, lng: -95.530342 }}
        markers={positions}
      ></Map>
    </Wrapper>
  );
}

export default SodaSpots;
