## Description
A Movie module api's

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Documentation:
```
$ npm run compdoc
```

## Swagger 
Please find the swagger docs here : http://localhost:8080/api-docs

## Available Endpoints

| API Name | Endpoint | Status |
| ------ | ------ | ------ |
| Login | /common/login | Completed |
| Register | /common/register | Completed |
| Get All Movies | /movies | Completed |
| Create Movie | /movies | Completed |
| Get Movie by ID | /movies/{id} | Completed |
| Search Movies (Public) | /movies/search | Completed |
| Add Review | /movies/{movieId}/review | Completed |
| Set favourite genre | /users/{userId} | Completed |

## Pending Endpoints
| API Name | Endpoint | Status |
| ------ | ------ | ------ |
| Vote Movie | /movies/{movieId}/vote | Peding |
| Get Recommendation | /movies/recommendation | Peding |

## Unit Test Report
![TASK](https://user-images.githubusercontent.com/23335311/136664260-aef72491-1e9e-43ec-9495-4a314aaa9cac.PNG)

