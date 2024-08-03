
# Project Title

This backend application is built using Node.js with Express and MongoDB. It provides functionality for user management and task management.


# API Reference

## user singup

```http
  POST /users/signup
```
`json`
| Parameter | Type     | Description                |
-------- | :------- | :------------------------- 
| `username` | `string` | **Required** |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |

#### response 
```
status:200
({id:id,
token:token,
message:"signup successful"})
```

## user login

```http
  POST /users/login
```
`json`
| Parameter | Type     | Description                |
-------- | :------- | :------------------------- 
| `username` | `string` | **Required** |
| `password` | `string` | **Required** |

#### response 
```
status:200
({
token:token,
message:"successful login"})

status:401
{error:"invalid username or password"}
```

## change password
```http
  PUT /users/changepassword
```
`json`
| Parameter | Type     | Description                |
-------- | :------- | :------------------------- 
| `username` | `string` | **Required** |
| `oldPassword` | `string` | **Required** |
| `newPassword` | `string` | **Required** |

#### response 
```
status:200
({
message:"password changed"})
}
```
# tasks

## add task
```http
  POST /tasks
```
`json`
| Parameter | Type     | Description                |
-------- | :------- | :------------------------- 
| `title` | `string` | **Required** |
| `description` | `string` | **Required** |


#### response 
```
status:200
({
response:"response"})
}
```

## add task
```http
  POST /tasks
```
`json`
| Parameter | Type     | Description                |
-------- | :------- | :------------------------- 
| `title` | `string` | **Required** |
| `description` | `string` | **Required** |


#### response 
```
status:200
({
response:"response"})
}
```


## update task
```http
  PUT /tasks/:id
```
`json`
| Parameter | Type     | Description                |
-------- | :------- | :------------------------- 
| `title` | `string` | **Required** |
| `description` | `string` | **Required** |


#### response 
```
status:200
({
response comes as updated task})
}
```


## delete task
```http
  DELETE /tasks/:id
```
#### response 
```
status:200
({
message:"task deleted"})
}
```
