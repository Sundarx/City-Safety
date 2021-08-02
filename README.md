# Project Overview


## City-Safety


## Project Description

The purpose of this website is to display the current weather and pollution of a given city. The city is specified by the user and the data is collected from IQAir Airvisual API.


## API and Data Sample

API: http://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key=cd2b6222-cf90-4e64-b633-836b11dc5b70
Sample JSON: 
```javascript
    {
    "status": "success",
    "data": {
        "city": "Los Angeles",
        "state": "California",
        "country": "USA",
        "location": {
            "type": "Point",
            "coordinates": [
                -118.2417,
                34.0669
            ]
        },
        "current": {
            "weather": {
                "ts": "2021-07-31T21:00:00.000Z",
                "tp": 30,
                "pr": 1015,
                "hu": 42,
                "ws": 1.79,
                "wd": 301,
                "ic": "01d"
            },
            "pollution": {
                "ts": "2021-07-31T22:00:00.000Z",
                "aqius": 44,
                "mainus": "p2",
                "aqicn": 15,
                "maincn": "p2"
            }
        }
    }
}
```

## Wireframes

![wireframe](https://wireframe.cc/pro/pp/d764aed05461434)


### MVP/PostMVP

#### MVP 
*These are examples only. Replace with your own MVP features.*

- Create three dynamic dropdown menus for Country, State, City queries.
- Make request from Country API to get Countries supported by IQAir and convert response to the dropdown Country menu
- Based on the specified Country, make request from State API to get States supported by IQAir and convert response to the dropdown State menu
- Based on the specified State, make request from City API to get Cities supported by IQAir and convert response to the dropdown City menu
- Get all three values in the option tags to make request from the Specified City API to make a request for the weather/pollution data of the given City, State, and Country
- Render the weather/pollution data of the Specified City on the page
- Implement flexbox to organize the contents and to improve the presentation of the page 

#### PostMVP  

- Implement the hover feature on the data fields on the web page that will describe each data field in depth so that more users are able to understand the information more clearly
- Add a feature for the user to bookmark certain cities so that they may refer to these cities in a bookmarked list of cities for fast 


## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|July 30| Prompt / Wireframes / Priority Matrix / Timeframes | Incomplete
|August 2| Project Approval / Core Application Structure (HTML, CSS, etc.) | Incomplete
|August 3| Pseudocode / actual code | Incomplete
|August 4| Initial Clickable Model  | Incomplete
|August 5| MVP | Incomplete
|August 6| Presentations | Incomplete

## Priority Matrix

![Priority Matrix](https://whimsical.com/getting-started-SUyZuEWdKanmkWpW4uq5Yy)


## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| HTML Webpage Structure | H | 1.5 hr | 3.5hrs | 3.5hrs |
| Working with API | H | 4 hrs| 3.5hrs | 3.5hrs |
| Working on webpage design | H | 4 hrs| 3.5hrs | 3.5hrs |
| Total | H | 9.5 hrs| 5hrs | 5hrs |


## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of and a brief description.  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  
