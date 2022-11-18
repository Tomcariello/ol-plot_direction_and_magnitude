Open Layers Plot Direction and Magnitude

This repo is for me to explore openlayers by representing direction & magnitude in a meaningful way on a map.

I will render **WIND CURRENTS** from a data file on an OpenLayers 7.1.0 map. Each feature is styled with an arrow with the COLOR and SIZE adjusted based on the strength of the current. Currently there are 3 levels of magnitude (low, medium, high) but this can be sliced further if need be. 

The code is over-commented as I value clarity above all else :-)

# How to run
- git clone https://github.com/Tomcariello/ol-plot_direction_and_magnitude.git
- npm install
- npm start

# The Data 
/data/s-weather.json is based on real weather data but the lats/lons have been randomized to spread them out. 

# Intended Roadmap
[X] Render stacked styles to form an arrow

[X] Render randomized data (since deleted)

[X] Modify code to use static data

[X] Adjust arrows by size to represent the magnitude

[X] Adjust arrows by color to represent the magnitude

[-] Render MVT data file instead of JSON

# Other Stuff
This project was inspired by various Openlayers examples (https://openlayers.org/en/latest/examples/).

If you find this repo & want to contribute/chat/criticize, feel free to reach out.