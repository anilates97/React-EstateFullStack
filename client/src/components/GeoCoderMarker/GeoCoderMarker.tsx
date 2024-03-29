import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";

import { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Props {
  address: string;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface Bounds {
  _southWest: LatLng;
  _northEast: LatLng;
}

interface Properties {
  [key: string]: any;
}

interface Result {
  bounds: Bounds;
  latlng: LatLng;
  properties: Properties;
  score: number;
  text: string;
}

interface Results {
  results: Result[];
}

function GeoCoderMarker({ address }: Props) {
  const map = useMap();
  const [position, setPosition] = useState<any>([60, 19]);

  useEffect(() => {
    (ELG as any)
      .geocode()
      .text(address)
      .run((err: any, results: Results, response: any) => {
        if (results?.results?.length > 0 && response) {
          const { lat, lng } = results?.results[0].latlng;
          setPosition([lat, lng]);
          map.flyTo([lat, lng], 15);
        } else {
          throw new Error(err);
        }
      });
  }, [address]);
  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup />
    </Marker>
  );
}

export default GeoCoderMarker;
