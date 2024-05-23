# WhatsApp API

This project is designed to connect to the WhatsApp API for sending messages to customers.

## Instalación

1. Clonar el repositorio: `git clone https://github.com/and3sil4/whatsapp-api.git ./wt-project`.
2. Navegar hastas la carpeta: `cd wt-project`.
3. Ejecutar `npm install` para instalar las dependencias.
4. Crear una capeta en la raíz del proyecto llamada `data`dentro de la carpeta crear un archivo llamado `data.json`
5. En la raíz del proyecto crear un acrhivo llamado `.env` configurar las variables de entorno.
6. Para ejecutar el script en segundo plano:
   1. Instalar la siguiente libreria `npm install -g pm2`
   2. Ejecutar `pm2 start index.js --name "nombre_de_proceso"`
   3. Para detener el proceso: `pm2 stop nombre_de_proceso`
   4. Para reiniciar el proceso: `pm2 restart nombre_de_proceso`

## Ejecutar el escript 

Ejecutar el siguiente comando en la terminal y en la raíz del proyecto

`npm start`

## Configuración variables de entorno

En el archivo `.env` asegurarse de tener la siguiente configuraración. 

- user: Database username
- password: Database password
- server: Database server address
- databaseName: Name of the database
- accountSid: Twilio account SID
- authToken: Twilio authentication token
- phone: Twilio phone number

## Technologies Used

- Node.js
- Express.js
- dotenv
- mssql
- node-cron
- Twilio

## Author

Andres Felipe Silva

## License

This project is licensed under the ISC License - see the LICENSE file for details.
