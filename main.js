import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {Fill, RegularShape, Stroke, Style} from 'ol/style';
import OSM from 'ol/source/OSM';
import Tile from 'ol/layer/Tile';

const fill = new Fill({color: 'black'});

// This determines the number to points to generate
const count = 250;
const features = new Array(count);
const e = 4500000;

// Create random coordinates & angle
for (let i = 0; i < count; ++i) {
  const coordinates = [6 * e * Math.random() - e, 6 * e * Math.random() - e];
  const angle = Math.floor(Math.random() * (360 + 1))
  
  // OL angle is in radians so convert
  const radianAngle = angle * 3.14/180;
  
  // Create a style array containing an arrow shaft & arrow point
  const arrow = [
    // the arrow shaft
    new Style({
      image: new RegularShape({
        points: 2,
        radius: 5,
        color: fill,
        stroke: new Stroke({
          width: 2,
          color: fill,
        }),
        displacement: [0,8], // [horizontal offset, vertical offset] positive shifts right or down
        angle: radianAngle,
      }),
    }),
    // The arrow head <-- This does render!
    new Style({
        image: new RegularShape({
          points: 3,
          radius: 5,
          angle: radianAngle,
          fill: fill,
          offset: [0,0],
        }),
      })
    ];

  // Apply feature & style
  features[i] = new Feature(new Point(coordinates));
  features[i].setStyle(arrow);
}

// Apply all features from array to a VectorSource
const source = new VectorSource({
  features: features,
});

// Apply the source to a VectorLayer 
const vectorLayer = new VectorLayer({
  source: source,
});

// Initialize the map with the vectorLayer
const map = new Map({
  layers: [
    new Tile({
      source: new OSM()
    }),
    vectorLayer,
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
