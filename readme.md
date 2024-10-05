# Solución al Reto Deal Engine

## Descripción del Reto

En **Deal Engine**, nuestros servicios tocan día a día los viajes de miles de pasajeros visitando distintas ciudades en el mundo. El objetivo de este reto es crear un algoritmo que entregue un informe del clima de las ciudades de salida y llegada para 3 mil tickets que salen el mismo día que se corre el algoritmo. Para ello se proporciona un dataset con información sobre vuelos.

## Estructura del Dataset

El dataset contiene las siguientes columnas:

- **Información de tickets de viaje:**
  - `origin`: aeropuerto de origen
  - `destination`: aeropuerto de destino
  - `airline`: código de la aerolínea
  - `flight_num`: número de vuelo

- **Información de los aeropuertos de origen y destino:**
  - `iata_code`: código único del aeropuerto
  - `name`: nombre del aeropuerto
  - `latitude`: latitud geográfica
  - `longitude`: longitud geográfica

## Objetivo

El objetivo es entregar un informe climático con los datos de 3 mil vuelos, obteniendo la información climática a través de la API de OpenWeather para los aeropuertos de origen y destino. Se debe utilizar concurrencia, paralelismo y caché para optimizar las llamadas al servicio web de clima.

## Características Implementadas

- **Consulta del Clima (Web Services)**:  
  Utilizamos la API de OpenWeather para obtener información del clima en los aeropuertos de origen y destino. La API se consulta usando las coordenadas de latitud y longitud de cada aeropuerto.

- **Concurrencia/Paralelismo**:  
  Aunque las solicitudes a la API se realizan de manera secuencial, se pueden procesar múltiples vuelos utilizando Promesas y `async/await`.

- **Caché**:  
  Implementamos un sistema de caché que almacena las respuestas de la API durante 1 hora para evitar hacer múltiples solicitudes con los mismos datos de latitud y longitud.

- **Manejo de Errores**:  
  Si alguna solicitud a la API falla, el error se captura y se imprime un mensaje en la consola, pero el programa continúa procesando los vuelos restantes.

## Requisitos

- **Node.js** (versión 12 o superior)
- **Paquetes de npm**:
  - `axios`: para hacer llamadas HTTP a la API de OpenWeather.
  - `csv-parser`: para procesar el archivo CSV.
  - `node-cache`: para manejar el almacenamiento en caché.

## Instalación

1. Clona el repositorio y navega al directorio del proyecto:
2. Instala las dependencias correspondientes.
3. Corre el programa con npm start
