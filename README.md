# one-hit-wonders

This API is a collection of sports leagues (MLB, NBA, WNBA, PGA, LPGA, ATP, WTA, and NHL) and players considered to be "one hit wonders" according to analysis conducted by The Pudding ([original dataset here](https://github.com/the-pudding/data/blob/master/one-hit-wonders/data.csv)).
"One hit wonders" are players who finished in the top 20 of all players for their league in one single season and never repeated that success again.

## Endpoints

### Base URL

The base URL for this API is https://one-hit-wonders-sports.herokuapp.com/. All requests should be prepended with this URL

### GET all Leagues

`GET /api/v1/leages`

| Status  | Response |
| ------------- | ------------- |
| 200 (success)  | an array of all leagues  |
| 500 (internal error)  | error message  |

A successful response will return an array of `league` objects. Each `league` is comprised of:

| Name  | Data Type |
| ------------- | ------------- |
| id  | number  |
| league  | string  |
| sport_name  | string  |
| created_at  | string  |
| updated_at  | string  |


### GET all players

`GET /api/v1/players`

| Status  | Response |
| ------------- | ------------- |
| 200 (success)  | an array of all players  |
| 500 (internal error)  | error message  |

A successful response will return an array of `player` objects. Each `player` is comprised of:

| Name  | Data Type |
| ------------- | ------------- |
| id  | number  |
| league_name  | string  |
| first_name  | string  |
| last_name  | string  |
| team  | string  |
| created_at  | string  |
| updated_at  | string  |


### GET a specific league by ID

`GET /api/v1/leagues/:id`

#### Required Parameters

| Name  | Data Type | Description | 
| ------------- | ------------- | ------------- |
| id  | number  | league-specifc id number  |


| Status  | Response |
| ------------- | ------------- |
| 200 (success)  | the associated league object  |
| 404 (error)  | A message indicating there is not a league with a corresponding ID  |


### GET a specific player by ID

`GET /api/v1/players/:id`

#### Required Parameters

| Name  | Data Type | Description | 
| ------------- | ------------- | ------------- |
| id  | number  | player-specifc id number  |


| Status  | Response |
| ------------- | ------------- |
| 200 (success)  | the associated player object  |
| 404 (error)  | A message indicating there is not a player with a corresponding ID  |

### POST a new league

`POST /api/v1/leagues`

#### Required Parameters

| Name  | Data Type | 
| ------------- | ------------- |
| league  | string  | 
| sport_name  | string  |


| Status  | Response |
| ------------- | ------------- |
| 201 (success)  | the ID of the newly added league |
| 422 (unprocessable)  | A message indicating which required parameter is missing from the request |

### POST a new player

`POST /api/v1/players`

#### Required Parameters

| Name  | Data Type | 
| ------------- | ------------- |
| first_name  | string  | 
| last_name  | string  |
| league_name  | string  |
| team | string  |


| Status  | Response |
| ------------- | ------------- |
| 201 (success)  | the ID of the newly added player |
| 422 (unprocessable)  | A message indicating which required parameter is missing from the request |

### DELETE an existing player

`DELETE /api/v1/players/:id`

#### Required Parameters

| Name  | Data Type | Description | 
| ------------- | ------------- | ------------- |
| id  | number  | player-specifc id number  |



| Status  | Response |
| ------------- | ------------- |
| 201 (success)  | the ID of the deleted player |
| 422 (unprocessable)  | A message indicating the request could not be completed |






