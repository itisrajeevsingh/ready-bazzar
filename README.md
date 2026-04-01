# Ready Bazzar 🛍️

Ready Bazzar is a modern, full-stack e-commerce application built with React, Node.js, Express, and MongoDB. It offers a premium shopping experience with features like user authentication, persistent carts, and order management.

---

## 📂 Project Structure

The project is divided into two main parts:

- **`/frontend`**: The React-based user interface built with Vite and Tailwind CSS (or Vanilla CSS).
- **`/backend`**: The Node.js/Express server handling the API, authentication, and database interactions.

---

## ✨ Features

- **User Authentication**: Secure Login & Registration with JWT.
- **Product Catalog**: Dynamic product fetching from MongoDB with search and filter capabilities.
- **Persistent Cart**: Shopping cart that stays with you across sessions once you're logged in.
- **Orders**: Secure checkout and order history for every customer.
- **Premium Design**: Modern, responsive UI with smooth animations.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/itisrajeevsingh/ready-bazzar.git
   cd ready-bazzar
   ```

2. Install root dependencies:
   ```bash
   npm install
   ```

3. Install frontend and backend dependencies:
   ```bash
   # From root
   npm run install-all
   ```

4. Seed the database (optional but recommended):
   ```bash
   npm run data:import
   ```

---

## 💻 Development

Run both the frontend and backend concurrently with a single command:

```bash
npm run dev
```

### Individual Commands

- **Run Backend**: `npm run backend` (Default: http://localhost:5000)
- **Run Frontend**: `npm run frontend` (Default: http://localhost:5173)

---

## 🛠️ Built With

- **Frontend**: React, Lucide Icons, Framer Motion, Axios.
- **Backend**: Node.js, Express, Mongoose, JWT, BcryptJS.
- **Database**: MongoDB.

---

## 📄 License

This project is licensed under the MIT License.
