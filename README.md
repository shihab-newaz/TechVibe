# EcomSentimentAnalysis

EcomSentimentAnalysis is a full-stack e-commerce application with integrated sentiment analysis for product reviews. It uses Django for the backend, React for the frontend, and MongoDB as the database.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [API Endpoints](#api-endpoints)
7. [Contributing](#contributing)
8. [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed Python 3.8+
* You have installed Node.js 14+
* You have installed MongoDB
* You have a basic understanding of Django, React, and MongoDB

## Project Structure

```
EcomSentimentAnalysis/
│
├── backend/
│   ├── ecommerce_project/
│   ├── sentiment_analysis/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```
     source venv/bin/activate
     ```

4. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

5. Set up your MongoDB database and update the `DATABASES` configuration in `ecommerce_project/settings.py`.

6. Run migrations:
   ```
   python manage.py migrate
   ```

7. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install the required packages:
   ```
   npm install
   ```

3. Create a `.env` file in the frontend directory and add the backend URL:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```

## Running the Application

1. Start the backend server:
   ```
   cd backend
   python manage.py runserver
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and go to `http://localhost:5173` to view the application.

## API Endpoints

- `GET /api/products/all/`: Get all products
- `POST /api/products/`: Add a new product
- `GET /api/reviews/<product_id>/`: Get reviews for a specific product
- `POST /api/reviews/<product_id>/`: Add a review for a specific product
- `POST /api/analyze-sentiment/`: Analyze the sentiment of a given text

For more detailed API documentation, please refer to the backend code or set up Django Rest Framework's built-in API documentation.


## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

For any additional questions or issues, please open an issue in the GitHub repository.