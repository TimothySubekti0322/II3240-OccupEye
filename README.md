# OccupEye

OccupEye is a comprehensive technology solution designed to enhance store operations and business analysis through the integration of IoT devices, web and mobile applications, and API services. By accurately counting and reporting the number of visitors to a store in real-time, OccupEye provides valuable insights that can help business owners make informed decisions and optimize their strategies. The system leverages data analytics to transform raw visitor data into actionable information, enabling businesses to improve customer experiences and drive sales.

## OccupEye Team
18221059 - Nadira Rahmananda Arifandi
18221063 - Timothy Subekti
18221081 - Nadine Aliya Putri
18221093 - Carissa Zahrani Putri
18221147 - Benyamin Jodi Sitinjak

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Feedback](#feedback)

## Features

### Real-Time Visitor Counting
- IoT Devices: Utilizes advanced IoT sensors to count the number of visitors entering and exiting the store.
- Accuracy: Ensures high accuracy in visitor counting to provide reliable data for analysis.

### Data Analytics
- Insights Generation: Analyzes visitor data to generate insights on customer behavior, peak hours, and store performance.
- Business Strategies: Helps business owners draw appropriate strategies based on real-time data and historical trends.

### Web Application
- Dashboard: Provides a user-friendly dashboard for business owners to monitor visitor data in real-time.
- Reports: Generates detailed reports on visitor statistics, allowing for easy tracking and analysis.

### Mobile Application
- On-the-Go Access: Enables business owners to access visitor data and insights from their mobile devices.
- Notifications: Sends real-time notifications and alerts based on visitor patterns and thresholds.

### API Service
- Integration: Offers API services for seamless integration with other business systems and applications.
- Customization: Allows businesses to customize data retrieval and reporting based on their specific needs.

## Technologies Used

### Mobile App
- **Framework :** React Native (Expo)
- **UI Library :** React Native Paper
- **CSS framework :** Nativewind
- **Language :** Typescript

### API Service
- **Framework :** Express.js
- **open source server environment :** Node.js
- **ORM :** Prisma
- **Language :** Javascript

### Database
- **Cloud Database :** Supabase

## Getting Started

### Prerequisites

Before you begin setting up OccupEye on your system, ensure you meet the following prerequisites to ensure a smooth setup and execution environment:

1. **Node.js :**

   - **Description :** You need Node.js version 20.10.0 or higher installed on your machine. Node.js is essential as it will run the npm package manager and the server environment for your project.

   - **Download** : [Node.js installation](https://nodejs.org/en/)

2. **Expo CLI**

   - **Description**: The command-line tool for interacting with Expo during development.

   - **Installation**: Run this command in your terminal to install Expo CLI:
     ```bash
     npm install -g expo-cli
     ```

3. **Git :**

   - **Description :** Version control is handled via Git. Make sure you have Git installed to clone the project repository.

   - **Download :** [Git installation](https://git-scm.com/downloads)

4. **PostgreSQL :**

   - **Description :** Prepare your cloud postgresql server. For free instance you could using supabase for create postgresql server

   - **Initiate supabase :** https://supabase.com/

### Installation

First of all you need to **clone this project**

```bash
git clone https://github.com/TimothySubekti0322/II3240-OccupEye
```

#### Backend Setup

Navigate to the backend directory

Then install all the dependencies by running this command

```bash
npm install
```

Create a .env file in the root of the backend directory to store your environment variables such as API keys, database URLs, and other sensitive configurations. Use the following template to guide your setup:

```bash
PORT=4000
JWT_SECRET=YOUR_JWT_SECRET_HERE
DATABASE_URL=YOUR_DATABASE_URL_HERE
```

- **JWT_SECRET :** could be generate automaticly by typing this command in terminal

  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
  
 - **DATABASE_URL :** if you are using Supabase, you could go to supabase project > project settings > Database. Then Copy your connection String. Your connection String should look like this "postgres://postgres.pqxlskdoexqassdiiqa:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5433/postgres". Replace [YOUR-PASSWORD] with your database password then copy-paste to .env file

Once all configurations are in place, start the backend server by running:

```bash
npm start
```

This command will use Nodemon to run app.js and now you can access server on **localhost:4000**

#### Frontend Setup

Navigate to the Frontend directory

```bash
cd II3240-OCCUPEYE
cd mobile
```

Then install all the dependencies by running this command

```bash
npm install
```

Before we start the server, we should to configure the API URL in order to connect with backend server. go to static/API.js and replace the code with your IPv4 address. you can get your IPv4 address by going to command terminal and type "ipconfig". Then search for IPv4 address that look's like this "192.168.1.110", then replace the Base_URL like the code below

```bash
const BASE_URL = "http://{IPv4 Address}:4000";
```

Launch the development server with Expo to start working on the frontend

```bash
npm run start
```

This command will open a new tab where you can choose to run the application on an iOS simulator, Android emulator, or your mobile device via the Expo Go app.

#### Verifying Installation

To verify that your installation is successful, ensure the backend server is running without errors and the frontend connects to the backend correctly. Check the console for any potential errors or missing configurations and ensure your .env file is correctly set up as per the backend requirements.

By following these detailed steps, you will set up both the frontend and backend of the OccupEye application, ready for development and testing.

## API Documentation

For a comprehensive guide on how to use the API endpoints provided by OccupEye, please refer to our detailed API documentation. This documentation includes all necessary details on API endpoints, including request formats, required parameters, example requests and responses, and error handling.

### Accessing the API Documentation

You can view the API documentation by visiting the following link:
[OccupEye API Documentation](https://www.postman.com/red-satellite-143346/workspace/occupeye)

### Using the Documentation

The API documentation is interactive and allows you to directly interact with the API from within the documentation itself. To use this feature:

- Ensure you are logged into Postman if required.
- Select the endpoint you wish to test.
- Enter required parameters and authentication credentials directly in the documentation to make live API calls.
- API flow already automated, everytime you hit login API, then token variable will be updated. Remember that you have to hit login API once before you use another APIs

## Deployment

To make it easier for users and stakeholders to try out the OccupEye app, we provide a downloadable APK for Android devices and a backend URL for accessing the server.

### Android Application

To download the latest version of the OccupEye app for Android:

**[Download OccupEye APK](https://drive.google.com/drive/folders/1r1uJ1AfW3OGiJygA8kkoONSaEl--RPmo?usp=drive_link)**:

The APK file can be sideloaded onto your Android device. Follow these steps:

1. Download the APK file to your device.
2. Allow installations from unknown sources if prompted.
3. Install the app by tapping on the downloaded APK file.
4. Launch the app and start exploring the features of OccupEye.

### Backend URL

Access the backend server for API interactions and management:

**[OccupEye Backend URL](https://ii-3240-occup-eye.vercel.app/**

You can access the backend via this URL, which provides:

- APIs for managing guests and events.
- Real-time data insights through dashboards.
- Secure endpoints to ensure your event data is protected.

## Feedback

Your feedback is crucial for us to continue improving OccupEye and providing the best possible experience. Whether it's a feature request, bug report, or general comments, we value your input.

### How to Provide Feedback

- **GitHub Issues**: For technical issues or feature requests, please open an issue on our [GitHub repository](/issues).
