
let linesObject = {
  "N": ["Times Square", "34th", "28th", "23rd", "Union Square", "8th"],
  "L": ["8th", "6th", "Union Square", "3rd", "1st"],
  "6": ["Grand Central", "33rd", "28th", "23rd", "Union Square", "Astor Place"]
}

function planTrip() {

  //pull the data from <select> and feed it as inputs to below and colorize()
  let startLine = document.getElementById("stationOne").value.slice(0,1);
  let startStation = document.getElementById("stationOne").value.slice(2,);
  let endLine = document.getElementById("stationTwo").value.slice(0,1);
  let endStation = document.getElementById("stationTwo").value.slice(2,);


  let directions = "Invalid trip";
  let lineOneStops = [];
  let lineTwoStops = [];

  if (validateStations(startLine, startStation, endLine, endStation) != true) return;


  if (startStation === "Union Square") startLine = endLine;
  if (endStation === "Union Square") endLine = startLine;

  colorize(startLine, startStation, endLine, endStation);


  if (startLine === endLine && startStation === endStation) {
    document.getElementById("tripOutput").innerHTML = "Same stations selected";
    return;
  }

  if (startLine === endLine) {
    lineOneStops = singleLineTrip(startLine, startStation, endStation);
    directions = `You will travel through the following stops on the ${startLine} line: ${lineOneStops.join(', ')}.<br>\n${lineOneStops.length} stops in total.`;

  } else {
    lineOneStops = singleLineTrip(startLine, startStation, "Union Square");
    lineTwoStops = singleLineTrip(endLine, "Union Square", endStation);
    directions = `You will travel through the following stops on the ${startLine} line: ${lineOneStops.join(', ')}.<br>\nChange at Union Square station.<br>\nThen continue on ${endLine} line: ${lineTwoStops.join(', ')}.<br>\n${lineOneStops.length + lineTwoStops.length} stops in total.`;
  }

  document.getElementById("tripOutput").innerHTML = directions;

}

function colorize(startLine, startStation, endLine, endStation) {
    let tdList = document.getElementsByTagName("td");
    let startId = startLine + " " + startStation;
    let endId = endLine + " " + endStation;
    let stops = [];

    for (let i = 0; i < tdList.length; i++) {
      tdList[i].setAttribute("class", "");
    }

    if (startLine === endLine) {
      stops = singleLineTrip(startLine, startStation, endStation);
        for (let i = 0; i < stops.length; i++) {
          stops[i] = `${startLine} ${stops[i]}`;
        }
    } else {
      let stopsOne = singleLineTrip(startLine, startStation, "Union Square");
      let stopsTwo = singleLineTrip(endLine, "Union Square", endStation);
        for (let i = 0; i < stopsOne.length; i++) {
          stopsOne[i] = `${startLine} ${stopsOne[i]}`;
        }
        for (let i = 0; i < stopsTwo.length; i++) {
          stopsTwo[i] = `${endLine} ${stopsTwo[i]}`;
        }
        stopsTwo.unshift(`${endLine} Union Square`);
        for (let i = 0; i < stopsOne.length; i++) {
          stops.push(stopsOne[i]);
        }
        for (let i = 0; i < stopsTwo.length; i++) {
          stops.push(stopsTwo[i]);
        }
        if (startLine != "L" && endLine != "L") {
          stops.push("L Union Square");
        }
    }
    for (let i = 0; i < stops.length; i++) {
      document.getElementById(stops[i]).setAttribute("class", "passed");
    }

    document.getElementById(startId).setAttribute("class","selectedStart");
    document.getElementById(endId).setAttribute("class","selectedEnd");
}

function singleLineTrip(line, startStation, endStation) {
  let singleJourneyOutput = [];
  let stationListArray = linesObject[line];
  let startStationIndex;
  let endStationIndex;

  //am I going up or down the line?
  for (let i = 0; i < stationListArray.length; i++) {
    if (startStation === stationListArray[i]) {
      startStationIndex = Number(i);
    }
    if (endStation === stationListArray[i]) {
      endStationIndex = Number(i);
    }
  }
  if (startStationIndex < endStationIndex) {
    for (let i = startStationIndex + 1; i <= endStationIndex; i++ ) {
      singleJourneyOutput.push(stationListArray[i]);
    }
  } else {
    //reverse direction if needed
    for (let i = startStationIndex - 1; i >= endStationIndex; i--) {
      singleJourneyOutput.push(stationListArray[i]);
    }
  }
  return singleJourneyOutput;
}

function validateStations(startLine, startStation, endLine, endStation) {
  let lineOneArray = linesObject[startLine];
  let lineTwoArray = linesObject[endLine];
  let lineOneStation = 0;
  let lineTwoStation = 0;

  for (let i = 0; i < lineOneArray.length; i++) {
    if (startStation == lineOneArray[i]) lineOneStation++;
  }

  for (let i = 0; i < lineTwoArray.length; i++) {
    if (endStation === lineTwoArray[i]) lineTwoStation++;
  }

  if (lineOneArray.length > 0 && lineTwoArray.length > 0 && lineOneStation > 0 && lineTwoStation > 0) return true;
  return false;
}

//console.log(`You must travel through the following stops on the <input> line: <joined array excluding starting, including finishing>. \nNo line change required. \nYou will have <stops, including last> stops total.`);

//planTrip("N", "23rd", "6", "33rd")
// planTrip("6", "Union Square", "L", "1st")
// planTrip("L", "8th", "6", "Union Square")
// planTrip("L", "8th", "N", "Astor Place")
