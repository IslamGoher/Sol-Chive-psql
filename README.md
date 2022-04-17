# Sol-Chive

Solution Archive is an open source application that allows user to archive an important problems and their solutions.

## Database Schema
[here](https://dbdesigner.page.link/9Ru4djvHKUpYUMoV9)

## API Documentation
Run the server on development mode then go to the link bellow
```
http://localhost:<port>/docs
```

## docker setup
```
$ docker build -t solchive .
$ docker run -it solchive
```

## Local Setup

1. Install [Node.js](https://nodejs.org/en/download/)

2. install [PostgreSQL](https://www.postgresql.org/download/)

3. Install [git](https://git-scm.com/downloads)

4. Clone the repository
```
$ git clone https://github.com/IslamGoher/Sol-Chive-psql.git
```

5. `cd` to the repository directory
```
$ cd jogging-tracker
```

6. Install dependencies

```
$ npm install
```

7. Create `.env` file, and add [Environment Variables](#environment-variables) to it using `nano`:
```
$ nano .env
```

8. create database
```
npm run create-db-dev
```

9. create database tables
```
npm run create-tables-dev
```

10. Run the server

for development environment
```
$ npm run dev
```
for production environment
```
$ npm run build && npm start
```

## Environment Variables

1. `PORT` = ${port number that server will running on}, example: `3000`

2. `CLIENT_DOMAIN` = domain name that server will allow against CORS policy, example: `*`

3. `CLIENT_HOME_URL` = URL to home page of front end server, example: `http://localhost:5000/home`

4. `JWT_SECRET` = any string secret, example: `my secret`

5. `PG_CLIENT_URI` = connection url to postgres server, to create database and tables, example: `postgres://postgres:123456@localhost:5432/postgres`

6. `PG_POOL_URI` = connection url to postgres server, to connect with created database, example: `postgres://postgres:123456@localhost:5432/solchive`

7. `PG_DB` = database name that wanted create, example: `solchive`

8. `GOOGLE_CLIENT_ID` = the client id of google console application, example: `********.apps.googleusercontent.com`

9. `GOOGLE_CLIENT_SECRET` = the secret of google console application, example: `********`

10. `GOOGLE_REDIRECT_URI` = redirection url that login and signup the user, <ins>set to</ins>: `http://localhost:<port>/api/v1/auth/google/callback`

11. `GOOGLE_GET_DATA_URL` = google api url to get user data, <ins>set to</ins>: `https://www.googleapis.com/oauth2/v3/userinfo?access_token=`

12. `GOOGLE_GET_ACCESS_TOKEN_URL` = google api url to get access token, <ins>set to</ins>: `https://www.googleapis.com/oauth2/v4/token`
