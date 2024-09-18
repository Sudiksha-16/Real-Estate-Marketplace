# Real Estate Marketplace - Backend

## Overview

This is the backend for the Real Estate Marketplace application built using Node.js and Express.js. It handles user authentication, property management, and auction participation.

## 🌟 Features

- **User Authentication**: Secure login and signup functionality.
- **Property Management**: Create, read, update, and delete property listings.
- **Auction Management**: Facilitate live auctions for properties.

##  Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (MongoDB Atlas)
- **Development Tools**: Mongo Compass

## 🚀 Installation

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB Atlas account for database management.
- Mongo Compass (optional, for database management).

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd your-repository-name
   ```
2. **Install dependicies**:
   ```bash
   npm install
   ```

3.**Set Up Environment Variables**: 
-Create a file named .env in the root of the backend directory and add the following variables:
  ```bash
  MONGODB_ATLAS_CONNECTION_STRING=<your_mongodb_atlas_connection_string>
```

4. **Start the server**:
   ```bash
   npm start
   ```
   The server should now be running on http://localhost:5000.
