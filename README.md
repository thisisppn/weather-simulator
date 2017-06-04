# weather-simulator

This project has been developed in a linux environment(Ubuntu 14.04) with Node v 4.4

## Installation & execution instructions.

- Unzip the contents into any non sudo directory
- cd into the directory (`cd weather-simulator/`)
- execute `npm install` in the directory to install all the dependencies.
- To start the server, execute `node server.js`. Then goto [localhost:8081](http://localhost:8081) on your browser. This is the web client.
- To start the temperature simulator, execute `node temp-simulator.js 'city_id'`.'city_id' can be any number from 0 to 1200. This number is used to get the city name from the json file `weather-simulator/cities-name-list.json`. You can run multiple instances of the temp-simulator.js(`node temp-simulator.js 12`, `temp-simulator.js 445` etc.) in multiple terminals.
- Now if you check the browser, you will see the temperatures getting updated every 3 second. 
- As you keep adding more and more simulators(by executing the temp-simulator.js file in new terminals), the new cities get appended in the web client.

## Testing
###### Test cases
- After starting the server, start a temperature simulator and a web client. Check the web client to see the temperatures updating.
- Now stop the server by terminating the `server.js` process. If you check the web client and the temperature server, they try to reconnect to the server and give proper visual messages about the status.
- Now, start the server again and check the web client and temperature simulator, you will see the status change the everything starts working as usual.

###### Mass testing
To simulate thousands of temperature sensors, I wrote a small shell script that will run the temp-simulator.js as a background process. By default, the script runs 100 simulators. I tried doing 1000 in my system, but it froze(requires memory).

- Execute, `./start-simulators.sh` from the `weather-simulator` directory.
- Now, check the Web client, you should see a list of 100 cities with their respective temperatures (after 3 seconds of start)
- To stop all the simulators, execute `./stop-simulators.sh`
# Further possible enhancements
- Add database. This can help in providing temperature history of a particular city and several other statistics.
- Provide real time temperature maps. Probaly a temperature overlay to google maps.
