import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {Fill, RegularShape, Stroke, Style} from 'ol/style';
import OSM from 'ol/source/OSM';
import Tile from 'ol/layer/Tile';


// This determines the number to points to generate
const count = 250;
const features = new Array(count);
const e = 4500000;

const fillArr = ["red","blue","green"];

// Create random coordinates, direction & magnitude
for (let i = 0; i < count; ++i) {
  const coordinates = [6 * e * Math.random() - e, 6 * e * Math.random() - e];
  
  // Randomly generate DEGREES & convert to RADIANS
  // Surely there is a more direct approach...
  const pi = 3.14
  const radianDirection = Math.floor(Math.random() * 361) * pi/180;
  
  // Generate the magnitude
  const magnitude = Math.floor(Math.random() * 20000);
  console.log(magnitude)

  // Select random color from array
  // const arrowColor = fillArr[Math.floor(Math.random() * (fillArr.length))]
  let arrowColor = fillArr[0];
  let arrowMultiplier = 1;

  // Based on magnitude, adjust color & arrow length
  if (magnitude < 6666) {
    arrowColor = fillArr[1];
    arrowMultiplier = 1.25
  } else if (magnitude < 13500) {
    arrowColor = fillArr[2];
    arrowMultiplier = 1.5
  }

  // Create a style array containing an arrow shaft & arrow point
  const arrow = [
    // the arrow shaft
    new Style({
      image: new RegularShape({
        points: 2,
        radius: 10 * arrowMultiplier,
        stroke: new Stroke({
          width: 2,
          color: arrowColor,
        }),
        displacement: [0,0], // [horizontal offset, vertical offset] positive shifts right or down
        angle: radianDirection,
      }),
    }),
    // The arrow head <-- This does render!
    new Style({
        image: new RegularShape({
          points: 3,
          radius: 5 * arrowMultiplier,
          displacement: [0,0],
          angle: radianDirection,
          fill: new Fill({color: arrowColor}),
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
