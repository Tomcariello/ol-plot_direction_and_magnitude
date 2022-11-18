import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Tile from 'ol/layer/Tile';
import View from 'ol/View';
import {Fill, RegularShape, Stroke, Style} from 'ol/style';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';

// An array to contain all of the features from the dataset after processing
const featuresArr = [];

// Set of colors to be applied to each feature based on the feature's magnitude
const arrowColorScaleArr = ["red","blue","green"];

// Fetch data, convert to JSON, then processData()
const getData = await fetch('data/spread_weather.json')
  .then(function (resData) {
    return resData.json();
  })
  .then(function (resDataJSON) {
    processData(resDataJSON);
  });

// Initialize the map
const map = new Map({
  layers: [
    // Include an Open Street Map layer
    new Tile({
      source: new OSM()
    }),
    // Include a Vector Layer which contains all of our features
    new VectorLayer({
      source: new VectorSource({
        features: featuresArr,
      })
    }),
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

function processData(data) {
  const weatherData = data.list;
  // Process data
  for (let i = 0; i < weatherData.length; ++i) {
    // Extract coordinates & wind values
    const { coord, wind } = weatherData[i];

    // Convert from lon/lat to floats using the provided OL method
    const coordinates = fromLonLat([coord.lon, coord.lat]);
    
    // Convert DEGREES to RADIANS
    const pi = 3.14
    const radianDirection = wind.deg * pi/180;
    
    const magnitude = wind.speed;

    // Initialize color & size multiplier values
    let arrowColor, arrowSizeMultiplier;

    // Adjust color & arrow length based on magnitude
    if (magnitude < 15) {
      arrowColor = arrowColorScaleArr[0];
      arrowSizeMultiplier = 1
    } else if (magnitude < 22) {
      arrowColor = arrowColorScaleArr[1];
      arrowSizeMultiplier = 1.25
    } else {
      arrowColor = arrowColorScaleArr[2];
      arrowSizeMultiplier = 1.5;
    }

    // Create a style array containing an arrow shaft & arrow point
    const arrow = [
      // The arrow shaft
      new Style({
        image: new RegularShape({
          points: 2,
          radius: 10 * arrowSizeMultiplier,
          stroke: new Stroke({
            width: 2,
            color: arrowColor,
          }),
          angle: radianDirection,
        }),
      }),
      // The arrow head
      new Style({
          image: new RegularShape({
            points: 3,
            radius: 5 * arrowSizeMultiplier,
            angle: radianDirection,
            fill: new Fill({
              color: arrowColor
            }),
          }),
        })
      ];

    // Push feature & style to the array
    featuresArr[i] = new Feature(new Point(coordinates));
    featuresArr[i].setStyle(arrow);
  }
}