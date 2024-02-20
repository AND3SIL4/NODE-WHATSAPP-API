# WhatsApp API

This project is designed to connect to the WhatsApp API for sending messages to customers.

## Installation

1. Clone the repository: `git clone https://github.com/and3sil4/whatsapp-api.git`
2. Navigate to the project directory: `cd whatsapp-api`
3. Install dependencies: `npm install`

## Usage

To run the application, execute the following command:

`npm start`

## Usage of ngrok

`ngrok http [port-to-use]`

This will start the Node.js server and begin sending messages to customers based on the configured schedule.

## Configuration

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
- Author
- Andres Felipe Silva

## License

This project is licensed under the ISC License - see the LICENSE file for details.
