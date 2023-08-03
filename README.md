## Requirements

- Docker
- NodeJS (>=16)

## Instructions

Today we're going to build a Todo App.

### General Requirements

**Technical Requirements**

- User is able to login to retrieve their todos. 
- User can create/edit/delete todolist contains many todo tasks.
- It should be fast

**Code Maintainability Check**

- Absolute attention to code quality.
- `git` is utilized to stick to the strategy of atomic commits

#### Nextjs App Router Server Actions 
#### Authentication API
The backend expose one route:

1. '/api/auth/[...nextauth]'
All requests made to this route will automatically be handled by NextAuth.js.
```
GET /api/auth/[...nextauth]
POST /api/auth/[...nextauth]
```

### Part 1: API

#### First Start

1. Install deps: `npm install`
2. Copy .env.example file `cp .env.example .env`
3. Start the databases `npm run docker`
4. Run database migrations `npm run migrate`
5. Run tests `npm run test`

#### Troubleshooting
1. Make sure you have all the required enviroment variables
2. Make sure you have Docker Desktop installed and running in your OS.
3. 

### Discussion

- Question ? 
- Open to discussion 

## Notes

- I used Drizzle ORM as my database ORM, if you want to modify the database schema,

  - Edit [schema.ts](db/schema/schema.ts)
  - Then, generate a new migration, `npm run migrate`
    - This will also apply the migration
  - [Data Model](https://orm.drizzle.team/docs/schemas)
  - [CRUD Operation](https://orm.drizzle.team/docs/crud)

- To inspect the database:
  - Instruction coming soon...