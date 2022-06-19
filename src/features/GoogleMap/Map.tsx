import React, { useEffect } from "react";
import { Children, PropsWithChildren, useRef, useState } from "react";

interface MapProps extends google.maps.MapOptions {
  style: { [key: string]: string };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  markers?: google.maps.Marker[];
}

const Map: React.FC<PropsWithChildren<MapProps>> = ({
  onClick,
  onIdle,
  markers,
  children,
  style,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
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
  useEffect(() => {
    markers?.forEach((marker) => {
      marker.setMap(map);
    });
    return () => {
      if (markers) {
        markers.forEach((marker) => {
          marker.setMap(null);
        });
      }
    };
  }, [markers, map]);
  return (
    <>
      <div ref={ref} style={style} />
      {Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default Map;
