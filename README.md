# BombitApp

### *The problem*
A home water extraction pump usually has (in my experience) two main unpredictable failure causes. First, the undergrund pipe could stop sending water for different reasons, causing the engine to start running dry. Second, the tank water level sensor could stop sending the shutdown signal, making the engine keep working and the water overflow. Both issues shares the same consequence, the engine working endlessly, so makes sense to think a shared solution that prevents both problems.

### *The solution*
There are many ways to solve this, but an interesting option that allows me to practice and learn some new stuff, is to use some kind of microcontroller to switch off the engine when the working time exceeds some specified threshold. Even better, that microcontroller could be able to connect to a phone App, to be remotely controlled and supervised. After a long desing and test process, the project has the following features:

##### Hardware
- An ESP-12E board, that connects to the Wi-Fi network.
- A custom PCB, to allow the ESP mounting and connects the inputs and ouputs.
- 2 220VAC inputs, to recieve the tank water level signal, which is essentially an on/off switch that is on when the level is low and off when it's high.
- 2 220VAC outputs, to power the water pumps engines.
- 1 5VCC input, to power the ESP board.

##### Firmware
- Allows the level sensor signal to reach the output to power the engine until a time threshold is exceeded. After that, the connection is stopped to prevent the engine to keep working.
- The time threshold can be setted via an HTTP request.
- Allows to resume the engine power via an HTTP request, overriding the stop state.
- The current engine working time can be get with an HTTP request.
- Allows to see the latest 10 engine run times via an HTTP request.
- Allows to see an average of all the previous engine run times via an HTTP request.
- The water level sensor status can be seen via an HTTP request (i. e. if it's on or off).

##### Mobile App
- Gives a nice and human-friendly presentation layer for the firmware interaction, showing engine status and actions that can be made through HTTP.
