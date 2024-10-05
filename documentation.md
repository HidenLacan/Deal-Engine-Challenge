## Documentacion de funciones
El código se encuentra compuesto por tres funciones principales que otorgan como resultado final la predicción del clima en diferentes aeropuertos de diversas ciudades, con el fin que estos datos mejoren la experiencia del usuario.

### Función getWeather
Esta función consulta la API de OpenWeather para obtener el clima basado en la latitud y longitud de una ubicación. Utiliza caché para almacenar respuestas y reducir llamadas innecesarias.

### Función getFlightData
Lee el archivo CSV que contiene los vuelos y convierte cada fila en un objeto. Devuelve un array de objetos que representan los vuelos.


### Función processFlights
Esta función itera sobre cada vuelo del dataset y obtiene el clima para los aeropuertos de origen y destino. Los resultados se almacenan en un array.

### Función MAIN
Al ejecutar el algorithmo en terminal escribe un archivo json con la informacion que la funcion processFlights realizo , para ser consumido posteriormente. 

### API Weather 
https://openweathermap.org/api/one-call-3 
