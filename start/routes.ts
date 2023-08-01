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
Route.post('/logout', 'AuthController.logout')

// authenticated routes
Route.group(() => {
  Route.get('/users/:id', 'UsersController.show')
  Route.put('/users/:id', 'UsersController.update')
  Route.put('/users/:id/password', 'UsersController.changePassword')
}).middleware(['auth', 'CheckParam'])

Route.group(() => {
  Route.get('/recipes', 'RecipesController.index')
  Route.get('/recipes/:id', 'RecipesController.show')
  Route.get('/recipes/:recipeid/comments', 'CommentsController.index')
}).middleware('auth')

Route.group(() => {
  Route.post('/recipes', 'RecipesController.store')
  Route.put('/recipes/:id', 'RecipesController.update')
  Route.delete('/recipes/:id', 'RecipesController.destroy')

  Route.post('/recipes/:recipeid/comments', 'CommentsController.store')
  Route.delete('/recipes/:recipeid/comments/:commentid', 'CommentsController.destroy')

  Route.post('/favorites', 'FavoritesController.store')
  Route.delete('/favorites/:id', 'FavoritesController.destroy')
  Route.get('/favorites', 'FavoritesController.index')
}).middleware(['auth', 'ModifyQuery'])
