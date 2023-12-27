# Stock Management System (SMS)

## Project Overview

This project is a Next.js web application designed for managing and tracking product inventory. The application allows users to search for products, view the current stock, and perform actions such as adding new products or updating the quantity of existing products. It features a clean and intuitive user interface, making it easy to navigate and manage product-related tasks.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Searching for Products](#searching-for-products)
  - [Adding a Product](#adding-a-product)
  - [Updating Product Quantity](#updating-product-quantity)
- [Components](#components)
  - [Header](#header)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [npm](https://www.npmjs.com/) - Node.js package manager

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/your-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-project
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Usage

### Searching for Products

The application provides a search functionality allowing users to find products by entering the product name. As you type, the dropdown will display matching products.

### Adding a Product

To add a new product, navigate to the "Add a Product" section and fill in the required information, including the product slug, quantity, and price. Click the "Add Product" button to submit the form.

### Updating Product Quantity

In the "Current Stock" section, the application displays a table of existing products with information about their quantity and price. Users can update the quantity of a product by clicking the "+" and "-" buttons next to the product in the dropdown.

## Components

### Header

The `Header` component is responsible for rendering the application header, providing a consistent and visually appealing navigation experience.

## API Endpoints

The application interacts with the following API endpoints:

- `/api/products` (GET): Retrieves a list of products.
- `/api/products` (POST): Adds a new product.
- `/api/action` (POST): Performs actions such as updating product quantity.
- `/api/search` (GET): Searches for products based on the provided query.

## Dependencies

- [React](https://reactjs.org/): JavaScript library for building user interfaces.
- [Next.js](https://nextjs.org/): React framework for building server-side rendered and static web applications.
- [tailwindcss](https://tailwindcss.com/): A utility-first CSS framework.
- [Vercel](https://vercel.com/): Deployment and hosting platform.

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md) when submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the code as needed.
