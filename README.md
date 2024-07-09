# Events Platform Project

This project serves as a platform for a small community business where the staff of the business can create and share events to the members of their community. A community member can sign up and add the event to their google calendar if they opted for it. The events can be free, or paid, with the option for open price where the members can buy the ticket for how much they feel it is worth.
<br/>
<br/>
You may view this app at https://eventsplatform-tr.netlify.app.
<br/>
The backend of this application is hosted at https://eventplatform-tr.onrender.com.
<br/>
<br/>

### Tech Used

Frontend :

- Typescript
- React
- Redux
- Axios
- SCSS
- React-Stripe-JS

Backend :

- Typescript
- NodeJS
- Express
- Firebase (User Authentication and Storage)
- Google API (Google Calendar)
- MongoDB
- Mongoose
- Stripe
- Jest
- Supertest
- Nodemailer
  <br/>
  <br/>
  <br/>

## How to run the app

To run the application locally (Ubuntu/Linux):

- on your terminal, go to your desired folder and make a clone of this repository.You can use this command `git clone https://github.com/hjaox/EventPlatform-TR.git`.
- navigate to the root folder and run the script `npm run install-packages`. This will install the necessary packages in root, client, and server folders.
- this application needs mongoDB for database, firebase for user authentication and stripe for payment system. You will need to setup a .env and store your variables from the said technologies. Create an account of each mentioned and follow the steps mentioned in the section [How to setup your .env file](#how-to-setup-your-env-file).
- run the script `npm run seed`. This will seed development data into the database and seed a user to firebase users.
- to be able to test the insert into google calendar functionality of the application, you will need to enable `Google Calendar api`, add scopes the scopes needed, and add a `test user` into your app in `google console`. You may use [this](#google-calendar-setup) as a reference.
- to be able to explore the functionality of the app as a logged in user (staff), use the user credentials that was seeded (see below) or you can register a user using `/register` endpoint at the backend of this application (requires properties `name, email, and password`).
  - ```email: testUser1@gmail.com, password: testPass1 ```
- run the script `npm run app`. This will start the app.
- kindly see [notes](#notes) as it might contain some information that you might need.
  <br/>
  <br/>
  <br/>

#### How to setup your .env file

This application uses MongoDB as database, Firebase for user authentication and Stripe for payment system. You will need to create accounts for the mentioned technologies and store the credentials in a .env file. If you already created the accounts, follow the steps:

- navigate to the `client` folder and create a `.env` file.
- copy your `Firebase JS SDK` to your newly created `.env` file and add `VITE_` at the beginning of each variable name. If your are new to firebase, use [this](#getting-your-firebase-js-sdk) as reference.
  - Example:
  ```
  VITE_apiKey="<YOUR_APIKEY>"
  VITE_authDomain="<YOUR_AUTHDOMAIN>"
  VITE_projectId="<YOUR_PROJECTID>"
  VITE_storageBucket="<YOUR_STORAGEBUCKET>"
  VITE_messagingSenderId="<YOUR_MESSANGINGSENDERID>"
  VITE_appId="<YOUR_APPID>"
  VITE_measurementId="<YOUR_MEASUREMENTID>"
  ```
- on your Stripe, copy your publishable and secret keys and paste them to your `.env` file with `VITE_PUBLISHABLE_KEY` and `VITE_SECRET_KEY` as variable names. If you are new to stripe, you can use [this](#getting-stripe-api-keys) as reference.
  - Example:
  ```
  VITE_PUBLISHABLE_KEY="<YOUR_PUBLISHABLEKEY>"
  VITE_SECRET_KEY="<YOUR_SECRETKEY>"
  ```
- add the url of where you host your backend and assign it to `VITE_axiosBaseUrl`.
  - Example: `VITE_axiosBaseUrl="http://localhost:9090"`
- go back to root and navigate to `server` folder. You will need to create a `.env` or multiple `.env` file depending on your needs.

  - To run the application locally and in a development environment, create a `.env.development` file.
  - To run the tests in a test environment, create a `.env.test` file.

- in your `.env.development`, you will need to put your [`Firebase JS SDK`](#getting-your-firebase-js-sdk),[`Firebase Admin SDK`](#getting-your-firebase-admin-sdk), [`MongoDB URL`](#getting-your-mongodb-url), [`OAuth2 Client ID Credentials`](#getting-your-oauth2-client-id-credentials) and [`Stripe API keys`](#getting-stripe-api-keys). Copy these values to your `.env.development` file.

  - Example :

  ```
  # MongoDB URL
  MONGODBURL="<YOUR_MONGODBURL>"

  # Firebase SDK
  apiKey="<YOUR_APIKEY>"
  authDomain="<YOUR_AUTHDOMAIN>"
  projectId="<YOUR_PROJECTID>"
  storageBucket="<YOUR_STORAGEBUCKET>"
  messagingSenderId="<YOUR_MESSAGINSENDERID>"
  appId="<YOUR_APPID>"
  measurementId="<YOUR_MEASUREMENTID>"

  # Firebase Admin SDK
  type="<YOUR_TYPE>"
  project_id="<YOUR_PROJECTID>"
  private_key_id="<YOUR_PRIVATEKEYID>"
  private_key="<YOUR_PRIVATEKEY>"
  client_email="<YOUR_CLIENTEMAIL>"
  client_id="<YOUR_CLIENTID>"
  auth_uri="<YOUR_AUTHURI>"
  token_uri="<YOUR_TOKENURI>"
  auth_provider_x509_cert_url="<YOUR_AUTHPROVIDERCERT>"
  client_x509_cert_url="<YOUR_CLIENTCERTURL>"
  universe_domain="<YOUR_UNIVERSEDOMAIN>"

  # OAuth2 Client Credentials
  clientId="<YOUR_CLIENTID>"
  clientSecret="<YOUR_CLIENTSECRET>"

  # Stripe
  PUBLISHABLE_KEY="<YOUR_PUBLISHABLEKEY>"
  SECRET_KEY="<YOUR_SECRETKEY>"
  ```
- setup your `HTTP Origins` in `Google Console`. Follow [this](#setting-up-your-http-origins-in-google-console) as reference.
- you will need a redirect uri for google to give prompt for consent to users when opted to insert the event into their google calendar. Follow [this](#setting-up-your-redirect-uri) reference on how to setup your redirect uri.
- once you have setup your redirect uri, add this to your `.env.development` file with a variable name `redirect_URI`.
    - Example : ```redirect_URI="<YOUR_REDIRECTURI>"```
- for the automated email when a user purchases an event, you will need a gmail account that will send email to the buyer. To set this up, you will need a `email address` and `app password` and assign them to `nodemailerEmail` and `nodemailerPassword` variable names. To get your `app password`, refer to [this documentation](https://support.google.com/accounts/answer/185833?visit_id=638494123463933141-3125702535&p=InvalidSecondFactor&rd=1).
  - Example:
  ```
  nodemailerEmail="<EMAIL_ADDRESS>"
  nodemailerPassword="<APP_PASSWORD>"
  ```
- at this point, your `.env.development` file is done. Go to the next step in [how to run the application locally](#how-to-run-the-app).
- if you want to run the tests, add a `.env.test` file in `server` folder (same location for `.env.development` file) and follow the same steps for `.env.development` (it is recommended to have a different environment for test and development).
- you will need to add an `ACCESSTOKEN` variable to be able to pass some of the tests as some endpoints requires id tokens. Follow steps in [this](#generate-an-accesstoken-for-test-environment) reference to generate a token and paste the value in `.env.test` file.
    - Example: ```ACCESSTOKEN="<YOUR_ACCESSTOKEN>" ```
  - at this point, your `.env.test` file is done.
  <br/>
  <br/>
  <br/>


#### Getting Stripe API keys

On your Stripe, go to `Developers` -> `API Keys` and you will see your `publishable` and `secret keys`.
<br/>
<br/>

#### Getting your Firebase JS SDK

On your firebase console, select `Web` under Get started by adding Firebase to your app. Fill in the form and register your app, then you should see your Firebase JS SDK. If you need to see your SDK again, navigate to `Project Overview` -> `Project Settings` -> `General` and you will see your Firebase JS SDK.
<br/>

While you're here, make sure to setup your Authentication. Navigate to `Build` -> `Authentication` then on this page, enable `Email/Password` as `Sign-in providers`. Also select `Google` as your one of your providers as this will auto generate a web client that you will need later on.
<br/>
Also setup firebase storage by navigating to `Build` -> `Storage` and select `Start in test mode` to allow seeding images into the firebase storage bucket.
<br/>
<br/>

#### Getting your Firebase ADMIN SDK

On your firebase console, navigate to `Project Overview` -> `Project Setting` -> `Service Accouts` and in this page, select `Generate new private key` to download a .json file containing your admin sdk.
<br/>
<br/>

#### Getting your MongoDB URL

Once have an account and created a database for the application, go to `MongoDB Console` -> `Overview` -> `Deployment` and connect to your datase. Then select `Drivers` under `Connect to your application` section. You will see your `MongoDB URL` (connection string). Please note that you will need to input your username and password in the url.

- Example : ```mongodb+srv://<YOUR_USERNAME>:<YOUR_PASSWORD>@cluster0.ksfhyni.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0```
<br/>
<br/>

#### Getting your OAuth2 Client Id Credentials
To get your OAuth2 client id credentials, please make sure you created your firebase account first, created a project for the application, and enabled `Google` as one of your sign in providers. Once you have done this, you can go to `https://console.cloud.google.com/` and select the project name you have given to the application from firebase (if the project does not appear, go to `firebase console` -> `Project Overview` -> `Project Settings` -> `Service Accouts` and select `Manage service account permissions`). Then go to `APIs & Services` -> `Credentials` and in this page, select a `web client` (normally, there is one web client that is auto generated by google services after adding google as sign in provider) under `OAuth 2.0 Client Ids`. In this page you will see your `Cliend ID` and `Client secret`.
<br/>
<br/>

#### Setting up your HTTP Origins in Google Console
From your `google console`, navigate to `APIs & Services` -> `Credentials` and in this page, select a `web client` under `OAuth 2.0 Cliend IDs`. In this page you will see `Authorized Javascript Origins`. Add your `HTTP Origins`(where you host the frontend of the application).
  - Example: ```http://localhost:5173``` (Default port number of vite)

#### Setting up your Redirect URI
From your `google console`, navigate to `APIs & Services` -> `Credentials` and in this page, select a `web client` under `OAuth 2.0 Client Ids`. In this page you will see `Authorized redirect URIs`. Add your `HTTP Origins`(where you host the frontend of the application) and add `/Popup` at the end.
- Example : ```http://localhost:5173/Popup```
<br/>
<br/>

#### Generate an ACCESSTOKEN for Test Environment
To generate a token, create a user in the project you created in firebase for your testing environment. Then go to your terminal and use the following command:
```
curl 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=<YOUR_APIKEY>' \
-H 'Content-Type: application/json' \
--data-binary '{"email":"<USER_EMAIL>","password":"<USER_PASSWORD>","returnSecureToken":true}'
```
You will need to use your API key of the firebase project that you created for testing the application, and the email and password of the user that you created in firebase.

You will get a response object that contains a property `idToken`. Use this as your `ACCESSSTOKEN`. Please note that this token expires and you may need to generate and replace the value in your .env file after a certain period of time.
<br/>
<br/>

#### Google Calendar Setup
To enable Google Calendar:
- From your `google console`, navigate to `APIs & Services` -> `Enabled APIs & services` and in this page, select `ENABLED APIS AND SERVICES`. Seacrh and enable `Google Calendar API`

To add scopes and test users:
- From your `google console`, navigate to `APIs & Services` -> `OAuth consent screen` and in this page, make sure the `Publishing status` is `Testing` then select `EDIT APP`. Fill up the `Developer contact information` and select `save and continue` to go to the next page.In this page you will see `ADD OR REMOVE SCOPES`. Under Google Calendar API, search and add the following scopes then save and continue:
  - `https://www.googleapis.com/auth/calendar.events`
  - `https://www.googleapis.com/auth/calendar`
  - `https://www.googleapis.com/auth/calendar.calendars`
 - In the next page, you will see `Test users`. Add the email that you will use to test the adding to google calendar functionality of this application. Save and continue.
<br/>
<br/>

#### Notes
- Please be mindful of your `HTTP Origins` and `Redirect URI` if running in development. If you are using `localhost`, use `localhost` all throughout. You might get `127.0.0.1` from vite when hosting react and if your `redirect url` is using `localhost`, you might get an unexpected result. You can change `127.0.0.1` with `locahost` when hosting if you are using `localhost` for your `redirect uri`.
- it recommended to have a separate environment variables for test and development enrironment, i.e. having their own database url and firebase credentials.
-  If there is no auto generated web client in `OAuth 2.9 Client IDs`, either create one or go to `firebase console` -> `Authentication` and select `Sign-in method` then add `Google` as as one of your `Sign-in providers`.
- Scripts:
    - Root Folder :
        - `npm run seed` : runs `npm run seed` in server folder
        - `npm run seed-prod` : runs `npm run seed-prod` in server folder
        - `npm run test-server-api` : runs `npm run test-api` in server folder
        - `npm run test-server-utils` :runs `npm run test-utils` in server folder
        - `npm run server` : runs `npm run server` in server folder
        - `npm run client` : runs `npm run dev` in server folder
        - `npm run install-packages` : runs `npm run i` in root, server and client folder
        - `npm run app` : runs `npm run server` in server and `npm run dev` in client folder concurrently.
    - Server Folder :
        - `server`: starts hosting backend
        - `seed`: seeds development data into development database
        - `seed-prod`: seeds development data into production database
        - `test-api`: runs http tests for endpoints
        - `test-utils` runs unit tests for utils
    - Client Folder :
        - `dev`: starts hosting frontend
- Seeded User:
  - use the following credential to be able to login and explore the functionaly of the application as a logged in user (staff).
    - ```email: testUser1@gmail.com, password: testPass1 ```
- Testing payment system :
  - To test the payment system, you may use the test cards provided by Stripe. See [documentation](https://docs.stripe.com/testing?locale=en-GB).
- If running tests gives you a `JavaScript heap out of memory` error, run `export NODE_OPTIONS="--max-old-space-size=8192"` in your terminal and run the test again.
- Requirements (this project was created with these versions):
    NodeJS: v20.11.1
  <br/>
  <br/>
  <br/>


#### Credits
Credits for photos that was used for this project.
- [Marcela Laskoski](https://unsplash.com/@marcelalaskoski?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) : for the image used in "Bach Network Dialogue Meeting 2024" event
- [Aditya Chinchure](https://unsplash.com/@adityachinchure?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) : "Coull Quartet" event
- [Anoir Chafik](https://unsplash.com/@anoirchafik?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) : "Helping Reactive Dogs Classes, Godmanchester, April 2024" event
- [KAL VISUALS](https://unsplash.com/@kalvisuals?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) : "Baleen" event
- [Ugur Akdemir](https://unsplash.com/@ugur?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) : "British Book Bash does Peterborough 2024" event
- [Patrick](https://unsplash.com/@patsz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) : "Wild in the Woods (Cambourne): Outdoor Art" event
- [Markus Spiske](https://unsplash.com/@markusspiske?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) : "The Sigma Sports CiCLE Classic Sportif" event
- [Prudence Earl](https://unsplash.com/@prudenceearl?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) : "The Diverse and Vibrant Lives of Houseplants" event
- [Duy Pham](https://unsplash.com/@miinyuii?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) : background image for Login page
- [starline](http://www.freepik.com) : background image for CreateEvent/EditEvent page
- [Hannah Busing](https://unsplash.com/@hannahbusing?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) : default image for events
- [pikisuperstar](https://www.freepik.com/free-vector/error-404-concept-landing-page_4730711.htm#query=404%20page%20found&position=44&from_view=keyword&track=ais&uuid=5612a091-9401-4cf2-91cf-672c3cd9d16c) on [Freepik](http://www.freepik.com) - image background for Error page
- testtesttesttesttesttest