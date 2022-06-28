import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { ReactElement, useEffect, useState } from "react";
import { getApp } from "firebase/app";
import {
  addDoc,
  collection,
  DocumentData,
  FirestoreDataConverter,
  GeoPoint,
  getDocs,
  getFirestore,
  orderBy,
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
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
  interface LatLongPair {
    latitude: number;
    longitude: number;
  }
  interface SodaSpot {
    name: string;
    geolocation?: LatLongPair;
  }
  const db = getFirestore(getApp());
  const sodaSpotConverter: FirestoreDataConverter<SodaSpot> = {
    toFirestore: function (
      modelObject: WithFieldValue<SodaSpot>
    ): DocumentData {
      const geolocation = modelObject.geolocation;
      if (geolocation && "latitude" in geolocation) {
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
      if (geolocation) {
        return {
          name: data.name,
          geolocation: {
            latitude: geolocation.latitude,
            longitude: geolocation.longitude,
          },
        };
      } else {
        return { name: data.name };
      }
    },
  };
  const sodaSpots = collection(db, "soda-spots").withConverter(
    sodaSpotConverter
  );
  useEffect(() => {
    const allSodaSpots = query(sodaSpots, orderBy("name"));
    const allSodaSpotsDetails = getDocs(allSodaSpots);
    const newPositions: google.maps.Marker[] = [];
    allSodaSpotsDetails
      .then((value) => {
        value.forEach((sodaSpot) => {
          const data = sodaSpot.data();
          const location = data.geolocation;
          const name = data.name;
          if (location) {
            newPositions.push(
              new google.maps.Marker({
                label: { text: name },
                position: { lat: location.latitude, lng: location.longitude },
              })
            );
          } else {
            newPositions.push(
              new google.maps.Marker({
                label: { text: name },
              })
            );
          }
        });
      })
      .then(() => {
        if (positions.length !== newPositions.length) {
          setPositions(newPositions);
        }
      });
  }, [positions, sodaSpots]);
  const [newPlace, setNewPlace] = useState("");
  const addNewPlace = () => {
    addDoc<SodaSpot>(sodaSpots, { name: newPlace }).then(() => {
      setNewPlace("");
    });
  };
  return (
    <Grid container columns={2}>
      <Grid item sx={{ width: "50%" }}>
        <Wrapper
          apiKey="AIzaSyCmqXemln5UJb7BkFS4h_KTsAycFxR-H0c"
          render={render}
        >
          <Map
            style={{ width: "100%", height: "300px" }}
            zoom={3}
            center={{ lat: 40.276389, lng: -95.530342 }}
            markers={positions}
          ></Map>
        </Wrapper>
      </Grid>
      <Grid item>
        <List>
          {positions.map((marker, index) => {
            const label = marker.getLabel();
            return <ListItem key={index}>{label?.text}</ListItem>;
          })}
          <ListItem key="new-place">
            <TextField
              label="New Place Name"
              defaultValue={newPlace}
              onBlur={(event) => {
                setNewPlace(event.target.value);
              }}
            />
            <Button
              onClick={() => {
                addNewPlace();
              }}
            >
              Add
            </Button>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

export default SodaSpots;
