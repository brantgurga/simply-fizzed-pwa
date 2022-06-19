import { Wrapper } from "@googlemaps/react-wrapper";
import {
  useEffect,
  useRef,
  useState,
  PropsWithChildren,
  Children,
} from "react";
import React from "react";
import { getApp } from "firebase/app";
import {
  collection,
  GeoPoint,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<PropsWithChildren<MapProps>> = ({
  onClick,
  onIdle,
  children,
  style,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);
  useEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);
  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);
  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);

  return null;
};

function SodaSpots() {
  const [positions, setPositions] = useState<google.maps.LatLngLiteral[]>([]);
  useEffect(() => {
    const db = getFirestore(getApp());
    const sodaSpots = collection(db, "soda-spots");
    const allSodaSpots = query(sodaSpots);
    const allSodaSpotsDetails = getDocs(allSodaSpots);
    allSodaSpotsDetails
      .then((value) => {
        value.forEach((sodaSpot) => {
          const location = sodaSpot.data().geolocation as GeoPoint;
          positions.push({ lat: location.latitude, lng: location.longitude });
        });
      })
      .then(() => {
        setPositions(positions);
      });
  }, [positions]);
  return (
    <Wrapper apiKey="AIzaSyCmqXemln5UJb7BkFS4h_KTsAycFxR-H0c">
      <Map
        style={{ width: "50%", height: "300px" }}
        zoom={3}
        center={{ lat: 0, lng: 0 }}
      >
        {positions.map((element, index) => {
          return <Marker key={index} position={element} />;
        })}
      </Map>
    </Wrapper>
  );
}

export default SodaSpots;
