/*************  ✨ Windsurf Command ⭐  *************/
# ChiCha Mobile Backend

This is the backend for the ChiCha Mobile application, built using Node.js and Express. The backend provides APIs for managing users, products, orders, and other functionalities required by the ChiCha Mobile app.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chicha-mobile-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd chicha-mobile-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

### Running in Production

Build the application and start the server:

```bash
npm run build
npm start
```

## API Endpoints

- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login a user

- **Products**
  - `GET /api/products` - Get all products
  - `POST /api/products` - Create a new product

- **Orders**
  - `GET /api/orders` - Get all orders
  - `POST /api/orders` - Create a new order

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

## License

This project is licensed under the MIT License.
/*******  d3457edf-89e4-40d5-805c-f639773824d9  *******/