<p align="center">
  <h1 align="center">MaxMilhas Challenge</h1>
  <p align="center">
    API for CPF register, validation of mask, and others resources.
  </p>
</p>
<br>

## Dependencies

- NodeJS 8.xx
- Docker
- pm2

## Installing / Getting started

Follow the steps to run the project:

- [Clone repository or download it.](https://github.com/jpnathan/mm_challenge)
- Create/build the container `sudo docker build -t jpnathan/mm_challenge .`
- Run container with `sudo docker run -it -p 3000:3000 -d jpnathan/mm_challenge`
- Execute container with `sudo docker exec -it mm_challenge bash`
- Install with: `npm install`
- Go to the right folder `cd var/www`
- pm2 start index.js

## Structure of the project

After Downloado it, that is what you will see:
```
mm_challenge/
└── public/
|   ├── assets/
|   |   ├── css/
|   |   |   ├── main_css.js
|   |   ├── images/
|   |   |   ├── max-logo.png
|   |   ├── js/
|   |   |   ├── main.js
└── src/
|   ├── config/
│   |   ├── index.js
│   ├── controllers/
│   |   ├── cpf.js
│   |   ├── index.js
|   ├── models/
│   |   ├── cpfs.js
│   |   ├── index.js
|   ├── routes/
│   |   ├── cpf.js
│   |   ├── index.js
│   |   ├── views.js
└─── test
|   ├── cpf-test.js
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package-lock.json
├── package.json
├── README.me
├── index.js
```

# API Documentation
- Routes of API

### GET
- /
- /Status
- /consult `/consult?cep=12312312312`
- /everything
- /find
- /all-cpfs

### POST
- /cpf `body: {cpf: "123.123.123-12"}`

### PUT
- /free `body: {cpf: "123.123.123-12"}`
- /block `body: {cpf: "123.123.123-12"}`

### DELETE
- /del `body: {cpf: "123.123.123-12"}`

## Bugs and improvements
- To fix bugs and suggest/make improvements in this project, just fork and send a pull request. You will be add as contributor.

## Creators
- [Phillip Freitas](https://github.com/jpnathan/)

## Licensing

- The code in this project is licensed under ISC license.
