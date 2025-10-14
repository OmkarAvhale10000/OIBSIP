# 🍕 Pizza Palace - Online Pizza Ordering System

A full-stack web application for ordering pizzas online with custom pizza builder, real-time order tracking, and inventory management.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss)

---

## 🎯 About The Project

Pizza Palace is a modern pizza ordering platform that allows customers to browse pre-made pizzas or create their own custom pizzas with a variety of bases, sauces, cheeses, and toppings. The application includes secure payment processing via Razorpay and provides administrators with tools to manage inventory and track orders in real-time.

---

## ✨ Key Features

### For Customers
- **Browse Pizza Menu** - View 6 different pizza varieties with prices
- **Custom Pizza Builder** - Create your perfect pizza in 5 easy steps
- **Secure Payments** - Pay safely with Razorpay integration
- **Order Tracking** - Monitor your order status in real-time
- **User Authentication** - Secure login with email verification

### For Administrators
- **Inventory Management** - Track and update ingredient stock levels
- **Order Management** - View all orders and update their status
- **Low Stock Alerts** - Receive email notifications when inventory is low
- **Dashboard Analytics** - Monitor orders and inventory at a glance

---

## 🛠 Built With

- **Frontend:** React, Tailwind CSS, Context API
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcryptjs
- **Payment:** Razorpay
- **Email:** Nodemailer

---

## 👥 User Roles

### Customer
- Register and login
- Build custom pizzas
- Make payments
- Track orders

### Admin
- Manage inventory
- Update order status
- Receive low stock alerts
- View all orders

---

## 📱 How It Works

### Ordering Process
1. Customer browses pizzas or builds a custom one
2. Selects base, sauce, cheese, and toppings
3. Reviews order and proceeds to checkout
4. Completes payment via Razorpay
5. Receives order confirmation
6. Tracks order status in real-time

### Admin Workflow
1. Views incoming orders
2. Updates order status (Received → Kitchen → Delivery)
3. Monitors inventory levels
4. Receives alerts for low stock
5. Updates inventory quantities

---

## 🔐 Test Credentials

**User Account:**
- Email: `user@test.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@test.com`
- Password: `admin123`

**Test Payment Card:**
- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

---

## 📂 Project Structure

```
pizza-ordering-app/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   └── App.js         # Main app component
│   └── public/
├── backend/               # Node.js server
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   └── server.js          # Express server
└── README.md
```

---

## 🌟 Features Breakdown

### Pizza Builder (5 Steps)
1. **Choose Base** - Thin, Thick, Stuffed, Whole Wheat, Gluten-Free
2. **Select Sauce** - Marinara, BBQ, Alfredo, Pesto, Buffalo
3. **Pick Cheese** - Mozzarella, Cheddar, Parmesan, Feta
4. **Add Veggies** - Mushrooms, Peppers, Onions, Tomatoes, Olives, etc.
5. **Add Meat** - Pepperoni, Chicken, Beef, Sausage

### Real-Time Updates
- Order status changes reflect instantly for users
- Inventory updates automatically after each order
- Email notifications for important events

---

## 📧 Contact

Omkar Avhale - omkaravhale82370@gmail.com

Project Link: [https://github.com/yourusername/pizza-ordering-app](https://github.com/yourusername/pizza-ordering-app)

---

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for pizza lovers everywhere! 🍕**
