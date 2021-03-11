# Master branch is the most up to date (main does not allow commits)

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.
## Coursework Structure
### Stack Used:
Linux, NGinx, MySQL, Php (LEMP)

### Host:
#### Herkou
http://ben-laravel-coursework.herokuapp.com/

### Frameworks used
#### Laravel version 8.0
Php routing, controller, database migrations and blade templates
User Authentication (Database table, PHP classes, controller and frontend) created with Laravel starter kit - https://laravel.com/docs/8.x/authentication
#### React
Front end to retieve stolen bikes from an api
### Bike Index API V3 used
https://bikeindex.org/documentation/api_v3

### Database
MySQL accessed through MySQL workbench and database migrations through PuTTY

### Main files & folders
routes/ 
           -> Web.php handles routing

resources/ 
           -> sass (css & bootstrap render)
           -> views (php template files that render html)
           -> js (react files)

composer.json 
            -> includes laravel ui scaffolding for Login/Register templates

package.json 
            -> includes all packages installed (e.g. jquery, bootstrap, react, chartjs)

database/migrations/ 
            -> shows how tables are defined, in Web Server SSH: "php artisan migrate" runs the migrations to create tables.

Http/Controllers/ 
            -> shows the controllers that are called from web routes. These controllers can return 'blade' templates or for e.g. retrieve data from an ajax call

Models/ 
            -> creates a Model Class for tables (Users, and ViewClicks) which can be accessed by controller