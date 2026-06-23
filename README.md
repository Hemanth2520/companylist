# CompanyList 🏢

A full-stack **MERN** (MongoDB, Express, React, Node.js) business directory application for browsing, managing, and investing in company listings worldwide.

## ✨ Features

### Client Application
- **Browse Listings** — Explore businesses for sale and investment opportunities
- **Advanced Filtering** — Filter by industry, transaction type, location, employee range, and budget
- **Search** — Full-text search across company names, industries, and locations
- **Company Details** — Detailed view with financials, descriptions, ratings, and contact options
- **Multiple Categories** — Businesses, Investments, Franchises, Investors, and Advisors pages
- **Responsive Design** — Dark-themed, premium UI with smooth animations
- **Pagination & Sorting** — Sort by recommended, most viewed, top rated, or newest

### Admin Panel
- **CRUD Operations** — Create, read, update, and delete company listings
- **Dashboard Stats** — Total listings, featured, and premium company counts
- **Search & Filter** — Quickly find companies in the admin table
- **Form Validation** — Validated forms for adding/editing company data

### Backend API
- **RESTful API** — Full CRUD endpoints for companies
- **MongoDB Atlas** — Cloud-hosted database with Mongoose ODM
- **Text Search** — MongoDB text index for fast search queries
- **Pagination** — Server-side pagination with configurable page sizes
- **Industry Aggregation** — Endpoint for industry counts and analytics

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, React Router, Axios       |
| Admin      | React 18, React Router, Axios       |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB Atlas (Mongoose)            |
| Bundler    | Vite                                |
| Icons      | React Icons (Feather Icons)         |

## 📁 Project Structure

```
companylist/
├── client/                 # Public-facing React app (port 5173)
│   └── src/
│       ├── api/            # Axios API client
│       ├── components/     # Reusable UI components
│       ├── data/           # Mock data fallback
│       ├── pages/          # Route pages
│       └── index.css       # Global styles
├── admin/                  # Admin panel React app (port 5174)
│   └── src/
│       ├── api/            # Axios API client
│       ├── components/     # Admin form & navbar
│       ├── pages/          # Admin dashboard
│       └── index.css       # Admin styles
├── server/                 # Express.js API server (port 5000)
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route handlers
│   ├── seed.js             # Database seeder (12 sample companies)
│   └── server.js           # Express app entry point
└── package.json            # Root scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and npm
- **MongoDB Atlas** account (or local MongoDB instance)

### 1. Clone the Repository

```bash
git clone https://github.com/Hemanth2520/companylist.git
cd companylist
```

### 2. Install Dependencies

```bash
npm run install-all
```

This installs dependencies for the server, client, and admin apps.

### 3. Configure Environment Variables

Create a `.env` file inside the `server/` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

### 4. Seed the Database (Optional)

```bash
npm run seed
```

This populates your database with 12 sample company listings.

### 5. Run the Application

Open **three separate terminals** and run:

```bash
# Terminal 1 — Backend API
npm run server

# Terminal 2 — Client App
npm run client

# Terminal 3 — Admin Panel
npm run admin
```

| App    | URL                        |
|--------|----------------------------|
| Client | http://localhost:5173       |
| Admin  | http://localhost:5174       |
| API    | http://localhost:5000/api   |

## 📡 API Endpoints

| Method   | Endpoint                  | Description                |
|----------|---------------------------|----------------------------|
| `GET`    | `/api/companies`          | List companies (with filters & pagination) |
| `GET`    | `/api/companies/:id`      | Get a single company       |
| `GET`    | `/api/companies/industries` | Get industry counts      |
| `POST`   | `/api/companies`          | Create a new company       |
| `PUT`    | `/api/companies/:id`      | Update a company           |
| `DELETE` | `/api/companies/:id`      | Delete a company           |
| `GET`    | `/api/health`             | Health check               |

### Query Parameters (GET /api/companies)

| Param            | Example                    | Description                  |
|------------------|----------------------------|------------------------------|
| `industry`       | `Technology`               | Filter by industry (comma-separated) |
| `transactionType`| `Business for Sale`        | Filter by transaction type   |
| `location`       | `Asia,Europe`              | Filter by location           |
| `search`         | `SaaS`                     | Full-text search             |
| `page`           | `1`                        | Page number (default: 1)     |
| `limit`          | `12`                       | Items per page (default: 12) |
| `minEmployees`   | `10`                       | Minimum employee count       |
| `maxEmployees`   | `500`                      | Maximum employee count       |

## 🎨 Screenshots

> _Coming soon — run the app locally to preview!_

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Hemanth** — [@Hemanth2520](https://github.com/Hemanth2520)
