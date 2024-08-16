
# Menu Management  Backend

This Node.js backend server manages a menu system organized into three levels: categories (e.g., Appetizers), sub-categories (e.g., Hot Beverages), and items (e.g., Coffee). 
The server provides RESTful APIs for managing categories, sub-categories, and items.

## Features

- User registration and login with JWT authentication.

- RESTful APIs for managing menu categories,subcategories, and menu items

## Tech Stack
- MongoDB: NoSQL database for storing user and ad data.
- Express.js: Web framework for Node.js.



## Getting Started

### Prerequisites

- Node.js
- MongoDB (MongoDB Atlas for cloud database)
- npm 

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ayadnez/menu-management.git
cd menu-management
```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```
    PORT=4000
    MONGODB_URI=mongodb://localhost:27017/ad-management
    JWT_SECRETKEY=your_jwt_secret_key
    REFRESH_KEY=your_refresh_secret_key
    ```


### Running the Server

To start the server, run:

```bash
  npm start
```
## API Endpoints

### Post Routes

- `POST /createCategory`: Create a new category.
- `POST /subcategory/:categoryId`: Create a sub-category under a specific category.
- `POST /createItem/:categoryId/:subCategoryId`: Create an item under a specific sub-category.

### Get Routes

- `GET /categories`: Get all categories.
- `GET /categories/:id`: Get a specific category by its ID.
- `GET /subcategories`: Get all sub-categories.
- `GET /categories/:categoryId/subcategories`: Get all sub-categories under a specific category.
- `GET /subcategory/:id`: Get a specific sub-category by its ID.
- `GET /items`: Get all items.
- `GET /items/:id`: Get all items under a specific category.
- `GET /items/:categoryId/:subCategoryId`: Get all items under a specific sub-category.
- `GET /item/:id`: Get a specific item by its ID.

### Update Routes

- `PUT /edit/:categoryId`: Edit a specific category by its ID.
- `PUT /edit/subcategory/:subCategoryId`: Edit a specific sub-category by its ID.
- `PUT /edit/item/:itemId`: Edit a specific item by its ID.



