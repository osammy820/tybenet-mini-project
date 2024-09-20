# Laravel Inertia React Project

This project is a web application built with Laravel, Inertia, and React. It provides a modern, efficient way to create server-side rendered React applications with Laravel.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- PHP (>= 8.1)
- Composer
- Node.js (>= 14.x)
- npm or yarn
- MySQL or another database supported by Laravel

## Installation Guide

Follow these steps to set up the project on your local machine:

1. **Clone the repository**

   ```
   git clone git@github.com:osammy820/tybenet-mini-project.git
   cd tybenet-mini-project
   ```

2. **Install PHP dependencies**

   ```
   composer install
   ```

3. **Install JavaScript dependencies**

   ```
   npm install
   # or if you're using yarn
   yarn install
   ```

4. **Set up the environment file**

   ```
   cp .env.example .env
   ```

   Then, open the `.env` file and configure your database connection details.

5. **Generate an application key**

   ```
   php artisan key:generate
   ```

6. **Run database migrations**

   ```
   php artisan migrate
   ```

7. **Seed the database** 

   ```
   php artisan db:seed
   ```
   The default seeder will create a user with the email `test@example.com` and password `password`.

8. **Link storage**

   ```
   php artisan storage:link
   ```

## Running the Application

To run the application, you need to start both the Laravel backend server and the frontend development server.

1. **Start the Laravel development server**

   ```
   php artisan serve
   ```

   This will start the server at `http://localhost:8000`.

2. **Compile and hot-reload frontend assets**

   In a new terminal window, run:

   ```
   npm run dev
   # or if you're using yarn
   yarn dev
   ```

   This will start the Vite development server for your frontend assets.

3. **Access the application**

   Open your web browser and visit `http://localhost:8000` to see the application in action.

## Building for Production

When you're ready to deploy your application, you should compile your assets for production:

```
npm run build
# or if you're using yarn
yarn build
```

This will create optimized production-ready assets in your `public` directory.


