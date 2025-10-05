# TypeGraphQL Learning Project

A comprehensive TypeGraphQL application built following Ben Awad's tutorial series. This project demonstrates modern GraphQL API development using TypeScript, TypeORM, Redis, and PostgreSQL.

## 📚 Tutorial Reference

This project is built by following the YouTube playlist:
**[TypeGraphQL Tutorial Series by Ben Awad](https://www.youtube.com/playlist?list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs)**

## 🚀 Features

- **GraphQL API** with TypeGraphQL
- **User Authentication & Authorization** with sessions
- **Email Confirmation** system
- **Password Reset** functionality
- **Redis Session Management**
- **PostgreSQL Database** with TypeORM
- **Data Loading** optimization with DataLoader
- **Query Complexity Analysis**
- **Input Validation** with class-validator
- **Author-Book Management** system

## 🛠 Tech Stack

- **Backend Framework**: Express.js
- **GraphQL**: Apollo Server v4 + TypeGraphQL
- **Database**: PostgreSQL with TypeORM
- **Session Store**: Redis with connect-redis
- **Authentication**: bcryptjs for password hashing
- **Email**: Nodemailer
- **Validation**: class-validator
- **Development**: TypeScript, ts-node-dev

## 📦 Installation

### Prerequisites

Make sure you have the following installed:
- Node.js (v16 or higher)
- PostgreSQL
- Redis Server

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd type-graphql-learn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Create a PostgreSQL database named `typegraphqldb`
   - Update database credentials in `data-source.ts` if needed
   - Default connection:
     - Host: localhost
     - Port: 5432
     - Username: postgres
     - Password: pass4post
     - Database: typegraphqldb

4. **Redis Setup**
   - Make sure Redis server is running on localhost:6379
   - Or update Redis configuration in `src/redis.ts`

5. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   SESSION_SECRET=your-session-secret-here
   # Add other environment variables as needed
   ```

6. **Start the development server**
   ```bash
   npm start
   ```

The GraphQL playground will be available at `http://localhost:4000/graphql`

## 📁 Project Structure

```
src/
├── entities/          # TypeORM entities
│   ├── User.ts       # User entity with authentication
│   ├── Author.ts     # Author entity
│   ├── Book.ts       # Book entity
│   └── ...
├── modules/          # GraphQL resolvers organized by feature
│   ├── user/         # User-related resolvers
│   │   ├── Register.ts
│   │   ├── Login.ts
│   │   ├── Me.ts
│   │   └── ...
│   ├── author-book/  # Author-Book relationship resolvers
│   └── ...
├── middleware/       # Custom middleware
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
└── index.ts          # Application entry point
```

## 🔧 Available Scripts

- `npm start` - Start development server with auto-reload
- `npm test` - Run tests (placeholder)

## 📝 Key Learning Points

This project covers:

1. **Setting up TypeGraphQL** with Apollo Server
2. **Entity Relationships** (One-to-Many, Many-to-Many)
3. **Authentication & Authorization** patterns
4. **Session Management** with Redis
5. **Email Confirmation** workflows
6. **Password Reset** implementation
7. **DataLoader** for N+1 query optimization
8. **Query Complexity Analysis** for security
9. **Input Validation** with decorators
10. **Middleware** implementation in GraphQL context

## 🔐 Authentication Features

- User registration with email confirmation
- Login/logout functionality
- Session-based authentication
- Password reset via email
- Protected resolvers with auth middleware
- Role-based access control

## 🌟 GraphQL Features Implemented

- **Queries**: User profile, authors, books
- **Mutations**: User registration, login, password management
- **Subscriptions**: Real-time updates (if implemented)
- **Field Resolvers**: Optimized data fetching
- **Custom Scalars**: Date handling
- **Input Types**: Structured input validation

## 🤝 Contributing

This is a learning project based on a tutorial series. Feel free to:
- Fork the repository
- Experiment with additional features
- Submit issues for learning discussions

## 📖 Additional Resources

- [TypeGraphQL Documentation](https://typegraphql.com/)
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [TypeORM Documentation](https://typeorm.io/)
- [Original Tutorial Playlist](https://www.youtube.com/playlist?list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs)

## 📄 License

ISC License - See package.json for details.

---

**Note**: This project is for educational purposes, following Ben Awad's excellent TypeGraphQL tutorial series.