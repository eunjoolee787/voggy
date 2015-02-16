# voggy
ATT Mobile Hackathon 2015 Project (Feb 13-14, 2015)

URL: voggyhi.com

## Instructions:

cd to the voggy dir after cloning repo

$ npm install
$ gulp

Use mobile media query width.

Note: Coordinate database is currently a flat file, and data does not include O`ahu area (data is mostly for Big Island).  For testing purposes, modify the first object in data/4pm.json with your current lat/lon in the data file.

Added coordinates for MIC (to be tested).
With correct coordinates in data model, should be able to access web app via mobile phone at MIC.

## Team Members

Crystal Stranger - Concept/design (layout and assets), presenter

André Pattantyus - Modeled data (see Links, below)

Eun Joo Lee - Front-End (HTML, Styles with SASS and Foundation)

Andrew Wong - Front-End UI menu, map, info, etc. (HTML, JavaScript)

Joanne Hayashi - Logic to search data model to determine current condition, device geo data, date-time, etc. (JavaScript, jQuery)


## Links

Modeled Data (provided by Andre Pattantyus)
http://weather.hawaii.edu/vmap/hysplit/images/individual/apptest_jjj_hh
where jjj = Julian Day (001 to 366), 
and hh = hour (00 to 23)