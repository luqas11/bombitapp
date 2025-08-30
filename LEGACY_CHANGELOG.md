# Control de bombas

## Versión 4.0.0 (5/1/2023)
*Prototipo probado con PCB, dos bombas y caja estanca.*
#### Android:
- Migración de la app a React Native

#### Software:
- Mejora de las respuestas de error
- Refactoreo de la lógica para recibir comandos

## Versión 3.1 (10/2/2022)

#### Android:
- Corrección de errores
- Actualización de dependencias

## Versión 3.0 (9/1/2022)
*Prototipo probado con PCB, dos bombas y caja estanca.*
#### Hardware:
- Rediseño del PCB para hacerlo más compacto y corregir errores
- Cambio de optoacopladores de 5V-5V por 220V-5V
- Construcción del nuevo PCB
- Armado de caja estanca con soporte para el PCB y tomas hembra para las bombas

## Versión 2.0 (4/1/2021)
*Prototipo probado con PCB propio y una única bomba.*
#### Software:
- Refactoreo de código general
- Parametrización de las direcciones de memoria de la EEPROM
- Refactoreo de variables para permitir escalabilidad a *n* entradas
- Respuestas de request formateadas como JSON
- Corte automático en caso de falla y reanudación manual
- Capacidad de recibir comandos para configurar el tiempo de corte automático, activar la reanudación manual y limpiar valores en EEPROM

#### Hardware:
- Diseño y construcción de PCB
- Dos entradas optoacopladas 5V-5V
- Dos salidas con relé 5V-220V

## Versión 1.x (N/A) 
*Prototipo probado en versión cableada, sin PCB y con dos bombas.*
#### Software:
- Guardado de tiempos en memoria EEPROM
- Comunicación vía HTTP request
- Respuesta en texto plano sin parsear, con estado actual de las bombas, historiales y promedios
- Entradas para dos bombas 

#### Hardware:
- Construcción de circuito cableado
- Dos entradas directas a 5V

## Versión 0.x (N/A)  
Sin documentar.
