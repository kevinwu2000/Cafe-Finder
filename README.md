# Cafe Finder

## Deployment Link
https://cafe-finder-c0ys.onrender.com

## Description
Cafe Finder is a social network-style cafe review website that allows users to discover, review, and share their experiences with various cafes. After logging in, users can:
- Add new cafes for review
- Rate cafes using custom rating categories
- Write detailed comments
- Create 2D floor plan layouts

## Key Features
The website provides a comprehensive cafe review experience with four main sections for each cafe:
1. Basic cafe information
2. User-defined rating categories
3. Detailed comment section
4. 2D floor plan visualization

## Getting Started
Sign up for a new account and log in to access all website functionalities

### Important Notes
- After submitting a review, you may need to refresh the page to see updates
- To prevent spam, only the most recent comment and rating from each account will be retained for each cafe
- The 2D floor plan feature allows random display of maps created by different users

## Technology Stack

### Backend
- Node.js
- Express
- GraphQL
- MongoDB

### Frontend
- React
- HTML
- CSS

## Installation and Local Testing

### Prerequisites
- Node.js
- MongoDB
- Yarn package manager

### Setup Steps
1. Copy the `cafe-finder` folder to your local machine
2. Install frontend dependencies:
   ```bash
   cd cafe-finder/frontend
   yarn install
   ```
3. Install backend dependencies:
   ```bash
   cd ../local-dev
   yarn install
   ```
4. Create a `.env` file in the `local-dev` folder with necessary configuration
    ```
    MONGO_URL=your_mongodb_connection_string
    ```
5. Start the application:
   ```bash
   # In the frontend directory
   yarn start     # frontend
   
   # In the cafe-finder root directory
   yarn start:local-dev     # backend
   ```
6. Access the website and create an account to explore all features

### Troubleshooting
- Ensure all dependencies are correctly installed
- Verify the `.env` file configuration
- Check that you're using compatible versions of Node.js and Yarn

