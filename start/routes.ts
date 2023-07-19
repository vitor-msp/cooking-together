/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// public routes
Route.post('/users', 'UsersController.store')
Route.post('/login', 'AuthController.login')

// authenticated routes
Route.post('/logout', 'AuthController.logout').middleware(['auth'])

Route.get('/users', 'UsersController.show').middleware(['auth'])
Route.patch('/users/:id', 'UsersController.update').middleware(['auth'])
Route.patch('/users/:id/password', 'UsersController.changePassword').middleware(['auth'])

Route.resource('/recipes', 'RecipesController')
  .apiOnly()
  .middleware({ '*': ['auth'] })
Route.resource('/comments', 'CommentsController')
  .apiOnly()
  .middleware({ '*': ['auth'] })
