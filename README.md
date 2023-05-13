# BombitApp

### *The problem*
I have some years fighting against the water pump setup at my home. Ideally, when the rooftop water tank is empty, the pump should start extracting the water from a natural underground reservoir and pushing it to the tank until it's full. Most of the time this setup works well, but there are some ocassional failures that can't be predicted or prevented easily. Sometimes, the water level sensor stops working for different reasons, making the pump to keep working even when the tank is full, resulting in a water overflow and waste. Another common issue is that the water is not going through the pipe, usually caused by a blockage, exposing the pump to a burn up risk by running dry. Both issues share the same consequence, the pump working endlessly, so makes sense to think a shared solution that attacks both problems.

### *The solution*
There are many ways to solve this, but an interesting option that allows me to practice and learn some new things, is to use a microcontroller to automatically power off the pump when the working time exceeds some specified threshold. Even better, that microcontroller could be able to connect to a mobile app, to be remotely controlled and supervised from a phone. 

The pump setup details are the following:

#### Pump setup
- 2 220VAC 1/2 HP pumps, connected to a 5m long pipe which ends at an natural undergroud water reservoir.
- 2 rooftop water tanks.
- 2 water level sensors, placed inside the tanks and made by an on/off switch that turns on when the tank gets emptied and turns off when the filling process is complete. That switch operates directly at 220VAC and it's signal is plugged in to the pumps.
- 2 separated home pipe circuits, each one connected to a different tank and pump.

And, after a long desing and test process, this project has the following components and features:

##### Hardware
- An ESP-12E board, able to connect to the home Wi-Fi network.
- A custom PCB, to allow the ESP mounting and connection to the inputs and ouputs.
- 2 220VAC inputs, to recieve the tank water level signal. The ESP will read that signal to make it's decissions.
- 2 220VAC outputs, to power the water pumps. The ESP will power them with the water level sensor signal or not, depending on it's decissions.
- 1 5VCC input, to power the ESP board.

##### Firmware
- A sketch written in C++ and loaded to the ESP.
- Allows the level sensor signal to reach the output and power the pump until a time threshold is exceeded. After that, the connection is stopped to prevent the engine to keep working. If the signal stops before the threshold (i. e. the filling was successful), nothing happens.
- The time threshold can be setted via an HTTP request.
- Allows to resume the pump power via an HTTP request, overriding the stop state.
- The current engine working time can be get with an HTTP request.
- Allows to see the latest 10 engine run times via an HTTP request.
- Allows to see an average of all the previous engine run times via an HTTP request.
- The water level sensor status can be seen via an HTTP request (i. e. if it's on or off).

##### Mobile App
- A React Native mobile app compiled for Android.
- Gives a nice and human-friendly presentation layer for the firmware interaction, showing engine status and actions that can be made through HTTP.
