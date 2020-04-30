# COVID-19 Data Visualization Project

#### Intermediate JavaScript: Team Week

###### By Austin Butler, Julia Seid, Mikah Mathews, Sean VanLeeuwen and Ryan Duff

## Description
This project is a website that displays current National and State level data related to COVID-19. It's central feature is a color coded map of the U.S. created with LeafletJS. The COVID-19 Tracking Project API is called to supply up-to-date information and used to set colors for each state with lighter colors representing fewer infections and darker colors representing more infections. When a user mouses over a state, they are displayed that state's current number of confirmed infections. Current national data is displayed below the map when the page loads and remains displayed as the user navigates the site. When a user clicks on a state they are displayed more detailed information for that state including total deaths, total recoveries and total tests administered. The site uses Node Package Manager and Webpack to handle user and dependencies. Babel is used to refactor the Javascript, which contains elements of ES6, into an earlier version of the language which is more readable by older browsers. 

### Setup/Installation Requirements

This project will run on any current web browser, Google Chrome is recommended. Users will need to clone the project from my GitHub repository at https://github.com/juliaseid/covid-19. Once cloning is complete and the project files are available on a user's local computer, the user will be required to install all dependencies via NPM's command line interface. Enter project folder via command line and run $ npm install. When installation is complete run $ npm run build. NPM will create a new folder at the top level of the root directory named "dist". Navigate to this folder and open the index.html file with your browser of choice to view the site.


### Specifications

| Behavior       | Input         | Output  |
| ------------- |:-------------:| -----:|
|On Loading, site displays a map of the U.S. The map is color coded according to number of deaths in each state. Sidebar displays national statistics related to COVID-19.|User loads page|Color coded map is displayed. National statistics are displayed.|
|User mouses over the map and is shown total number of confirmed COVID-19 cases for each state.|User places cursor over California|46,500 confirmed cases|
|User clicks on a state and is displayed COVID-19 statistics related to that state.|User "clicks" on California|California, Total Cases:46,500, Total Recovered:35,500, Total Deaths: 1,954, Total Tested: 603,139|

### Technologies Used

* _Markdown_
* _Git_
* _HTML_
* _CSS_
* _jQuery & Javascript_
* _NPM_
* _Webpack_
* _Babel_
* _LeafletJS_
* _COVID Tracking Project API_

### Known Bugs



**The MIT license**

Copyright (c) 2020 **Austin Butler, Julia Seid, Mikah Mathews, Sean VanLeeuwen and Ryan Duff**
