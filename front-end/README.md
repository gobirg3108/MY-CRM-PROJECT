
## CRM Frontend Application

This is the frontend application for the CRM system, built using React, Material-UI, and Vite.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Learn More](#learn-more)
- [License](#license)

## Installation

### Prerequisites
- Node.js
- npm or yarn

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/crm-frontend.git
    cd crm-frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Set up environment variables. Create a `.env` file in the root directory and add the following:
    ```bash
    VITE_API_BASE_URL=http://localhost:5000
    ```

## Usage

1. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

2. Open your browser and navigate to `http://localhost:5173`.

## Project Structure

crm-frontend/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── Auth/
│ │ │ ├── Login.jsx
│ │ │ └── Register.jsx
│ │ ├── Customers/
│ │ │ ├── CustomerForm.jsx
│ │ │ └── CustomerList.jsx
│ │ ├── Layout/
│ │ │ ├── Navbar.jsx
│ │ │ └── Footer.jsx
│ │ └── Dashboard.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── LoginPage.jsx
│ │ └── RegisterPage.jsx
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── package.json
└── vite.config.js


## Environment Variables

- `VITE_API_BASE_URL`: The base URL of the backend API.

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `yarn dev`
Runs the app in development mode. Open `http://localhost:5173` to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

### `npm run build` or `yarn build`
Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview` or `yarn preview`
Locally preview the production build.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

To learn Material-UI, check out the [Material-UI documentation](https://mui.com/).

To learn Vite, check out the [Vite documentation](https://vitejs.dev/).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

