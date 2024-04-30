# WhatsApp API

This project is designed to connect to the WhatsApp API for sending messages to customers.

## Installation

1. Clone the repository: `git clone https://github.com/and3sil4/whatsapp-api.git`
2. Navigate to the project directory: `cd whatsapp-api`
3. Install dependencies: `npm install`
4. Make a directory called `data` in root and then a file called `data.json`
5. Make a file on the project root `.env` and set the environment variables
6. Para ejecutar el script en segundo plano:
   1. `npm install -g pm2`
   2. pm2 start tu_script.js --name "nombre_de_proceso"
   3. Para detener el proceso: `pm2 stop nombre_de_proceso`
   4. Para reiniciar el proceso> `pm2 restart nombre_de_proceso`

## Usage

To run the application, execute the following command:

`npm start`

## Configuration environment variables

Ensure you have the following environment variables set:

- user: Database username
- password: Database password
- server: Database server address
- databaseName: Name of the database
- accountSid: Twilio account SID
- authToken: Twilio authentication token
- phone: Twilio phone number
- These environment variables are necessary for the proper functioning of the application.

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
