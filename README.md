<p align="center">
    <a href="https://www.maxmilhas.com.br/">
    <img src="https://assets.maxmilhas.com.br/f0c0c10e7e14/site/img/logo.png" alt="MaxMilhas Challenge" height=72>
  </a>
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
- Go to the folder `cd mm_challenge`
- Create/build the container `sudo docker build -t mm_challenge .`
- Run container with `sudo docker run -it -p 3000:3000 -d mm_challenge`
- See the app [here](http://localhost:3000)

## Structure of the project

After download it, that is what you will see:
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
