# Remix Blog

## Description

The Remix Blog is a platform built for users to create and share blog posts. That is where developers to learn, collaborate, and grow together.

## Installation

### Prerequisites

- Node.js (>=20.0.0)
- npm (Node Package Manager)
- SQLite
- Prisma CLI (optional for database migrations)
- A `.env` file with `DATABASE_URL` and `SESSION_SECRET` variables.

### Steps

1. **Clone the Repository**
2. **Install Dependencies**

```sh
npm run setup
```

3. **Set Up Environment Variables**

- Create a `.env` file in the root directory.
- Add the following lines, replacing the placeholders with your actual database URL and session secret:

```
  DATABASE_URL="your_database_url"
  SESSION_SECRET="your_session_secret"
```

If you don't have openssl installed, you can also use [1Password](https://1password.com/password-generator) to generate a random secret, just replace `$(openssl rand -hex 32)` with the generated secret.

4. **Database Setup**

- Run the following command to migrate your database:

```
npx prisma migrate dev --name init
```
  
- Initial setup:

```sh
npm run setup
```

If have any error in this step, please clean up folder `./prisma`. Just keep `seed.ts` and `schema.prisma`. Then run migrate again.

5. **Start the Server**

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get started:

- Email: `hello@liam.dev`
- Password: `strongpassword`

## Relevant code

The main functionality is creating users, logging in and out, and creating and deleting posts.

- creating users, and logging in and out [./app/models/user.server.ts](./app/models/user.server.ts)
- user sessions, and verifying them [./app/apis/session.server.ts](./app/session.server.ts)
- creating, and deleting posts [./app/models/post.server.ts](./app/models/post.server.ts)

## Usage

### Home Page

You can see all post of all user

### Creating an Account

Creating a new account to use feture CRUD post.

### Posting a Blog

- Once logged in, click on User and navigate to "my posts".
- Click the "New Post" button
- Fill in the details of your blog post and submit.

### View

Browse through various blog posts from the post page and the homepage.

### Delete and Update Post

You can delete or update the post if you are author

## Features

- Built with the latest Remix framework.
- Uses SQLite for lightweight and efficient data management.
- Prisma ORM for easy database management.
- React Icons for enhanced UI elements.
- User authentication for personalized experiences.
- Capabilities to create, view, and delete blog posts.
