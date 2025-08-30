# Firmware

### How this works
This ESP8266 sketch connects the board to the WiFi network, and exposes some endpoints to get system status and set system configuration. The [Postman](https://www.postman.com/) collection in the root directoty of this repository has complete examples and use cases of this API.

### API

`[GET] /status`  

Returns the current system status, including input status, device status, run counts and more. For example:
```
{
    "time_limit": 60,
    "devices": [
        {
            "status": 0,
            "current_time": 0,
            "mean_time": 25,
            "run_count": 10,
            "input_status": false,
            "history": [
                34,
                9,
                9,
                25,
                30,
                16,
                19,
                29,
                54,
                57
            ]
        },
        {
            "status": 0,
            "current_time": 0,
            "mean_time": 50,
            "run_count": 3,
            "input_status": false,
            "history": [
                28,
                42,
                81,
                0,
                0,
                0,
                0,
                0,
                0,
                0
            ]
        }
    ]
}
```

`[GET] /clear-history?device={id}`  

Clears the run time history of a specific device. For example, the query params could be:
```
/clear-history?device=0
```

`[GET] /change-time-limit?time_limit={time}`  

Sets the run time limit in minutes to trigger the forced stop mode, for all the devices in the system. For example, the query params could be:
```
/change-time-limit?time_limit=60
```

`[GET] /resume?device={id}`  

Resumes a device that is in forced stop mode. For example, the query params could be:
```
/resume?device=0
```
