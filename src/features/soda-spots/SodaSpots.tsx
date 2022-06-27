import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { ReactElement, useEffect, useState } from "react";
import { getApp } from "firebase/app";
import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  GeoPoint,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import Map from "../GoogleMap/Map";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

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
    interface LatLongPair {
      latitude: number;
      longitude: number;
    }
    interface SodaSpot {
      name: string;
      geolocation: LatLongPair;
    }
    const sodaSpotConverter: FirestoreDataConverter<SodaSpot> = {
      toFirestore: function (
        modelObject: WithFieldValue<SodaSpot>
      ): DocumentData {
        const geolocation = modelObject.geolocation;
        if ("latitude" in geolocation) {
          if (
            typeof geolocation.latitude === "number" &&
            typeof geolocation.longitude === "number"
          ) {
            return {
              name: modelObject.name,
              geolocation: new GeoPoint(
                geolocation.latitude,
                geolocation.longitude
              ),
            };
          } else {
            return { name: modelObject.name };
          }
        } else {
          return { name: modelObject.name };
        }
      },
      fromFirestore: function (
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options?: SnapshotOptions | undefined
      ): SodaSpot {
        const data = snapshot.data(options);
        const geolocation = data.geolocation;
        return {
          name: data.name,
          geolocation: {
            latitude: geolocation.latitude,
            longitude: geolocation.longitude,
          },
        };
      },
    };
    const allSodaSpots = query(sodaSpots).withConverter(sodaSpotConverter);
    const allSodaSpotsDetails = getDocs(allSodaSpots);
    const newPositions: google.maps.Marker[] = [];
    allSodaSpotsDetails
      .then((value) => {
        value.forEach((sodaSpot) => {
          const data = sodaSpot.data();
          const location = data.geolocation;
          const name = data.name;
          newPositions.push(
            new google.maps.Marker({
              label: { text: name },
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
    <Container>
      <Wrapper apiKey="AIzaSyCmqXemln5UJb7BkFS4h_KTsAycFxR-H0c" render={render}>
        <Map
          style={{ width: "50%", height: "300px" }}
          zoom={3}
          center={{ lat: 40.276389, lng: -95.530342 }}
          markers={positions}
        ></Map>
      </Wrapper>
      <List>
        {positions.map((marker, index) => {
          const label = marker.getLabel();
          return <ListItem key={index}>{label?.text}</ListItem>;
        })}
        <ListItem key="new-place"></ListItem>
      </List>
    </Container>
  );
}

export default SodaSpots;
