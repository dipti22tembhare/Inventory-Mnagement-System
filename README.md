# Microservices-Based Inventory Management System

## Installation & Setup
Clone this repository and install dependencies for each service.



### User Service
```bash
cd user-service
npm install
node index.js
```

### Inventory Service
```bash
cd inventory-service
npm install
node index.js
```

### API Gateway
```bash
cd api-gateway
npm install
node index.js
```

---

## User Service Endpoints

### Register a User
**POST** `/auth/register`
- **Body:**
  ```json
  {
      "username": "adminuser",
      "password": "password123",
      "role": "ADMIN"
  }
  ```
- **Response:**
  ```json
  { "message": "User registered successfully" }
  ```

### Login to Get JWT Token
**POST** `/auth/login`
- **Body:**
  ```json
  {
      "username": "adminuser",
      "password": "password123"
  }
  ```
- **Response:**
  ```json
  { "token": "your_generated_jwt_token" }
  ```

---

## Inventory Service Endpoints

**Note:** For all inventory requests, add the following **Header** in Postman:
```
Key: Authorization
Value: Bearer your_generated_jwt_token
```

### Create a Product (Admin Only)
**POST** `/product`
- **Body:**
  ```json
  {
      "name": "Laptop",
      "price": 1200,
      "quantity": 10
  }
  ```
- **Response:**
  ```json
  {
      "_id": "product_id",
      "name": "Laptop",
      "price": 1200,
      "quantity": 10
  }
  ```

### Get All Products (Admin & User)
**GET** `/product`
- **Response:**
  ```json
  [
      {
          "_id": "product_id",
          "name": "Laptop",
          "price": 1200,
          "quantity": 10
      }
  ]
  ```

### Update a Product (Admin Only)
**PUT** `/product/{product_id}`
- **Body:**
  ```json
  {
      "price": 1000
  }
  ```
- **Response:** `{ "message": "Product updated successfully" }`

### Delete a Product (Admin Only)
**DELETE** `/product/{product_id}`
- **Response:** `{ "message": "Product deleted" }`

### Get a Product by ID (Admin & User)
**GET** `/product/{product_id}`
- **Response:**
  ```json
  {
      "_id": "product_id",
      "name": "Laptop",
      "price": 1000,
      "quantity": 10
  }
  ```

---

## Expected Errors
- If you **don’t send a token**, you'll get:
  ```json
  { "message": "Access Denied" }
  ```
- If a **USER tries to create, update, or delete a product**, they’ll get:
  ```json
  { "message": "Access Forbidden" }
  ```

---

## Future Improvements
- Dockerize services for better deployment
- Implement Kafka or RabbitMQ for better communication between services
- Add more security layers for authentication

---

## Created By
**Dipti Tembhare**

