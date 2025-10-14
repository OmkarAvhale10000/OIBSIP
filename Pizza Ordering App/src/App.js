import React, { useState, useEffect, createContext, useContext } from 'react';
import { ShoppingCart, User, Settings, Package, Mail, CheckCircle, Clock, Truck, ChefHat } from 'lucide-react';

// Context for global state management
const AppContext = createContext();

// Mock database simulation
const mockDB = {
  users: [
    { id: 1, email: 'user@test.com', password: 'password123', role: 'user', verified: true },
    { id: 2, email: 'admin@test.com', password: 'admin123', role: 'admin', verified: true }
  ],
  inventory: {
    bases: { thin: 50, thick: 45, stuffed: 30, wholewheat: 25, glutenfree: 20 },
    sauces: { marinara: 100, bbq: 80, alfredo: 60, pesto: 40, buffalo: 70 },
    cheeses: { mozzarella: 200, cheddar: 150, parmesan: 100, feta: 80 },
    veggies: { mushrooms: 150, peppers: 120, onions: 180, tomatoes: 160, olives: 90 },
    meats: { pepperoni: 100, chicken: 80, beef: 60, sausage: 70 }
  },
  orders: []
};

const PizzaApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [inventory, setInventory] = useState(mockDB.inventory);
  const [orders, setOrders] = useState(mockDB.orders);
  const [currentOrder, setCurrentOrder] = useState(null);

  const contextValue = {
    currentUser,
    setCurrentUser,
    currentView,
    setCurrentView,
    inventory,
    setInventory,
    orders,
    setOrders,
    currentOrder,
    setCurrentOrder
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {currentView === 'login' && <LoginForm />}
          {currentView === 'register' && <RegisterForm />}
          {currentView === 'forgot-password' && <ForgotPasswordForm />}
          {currentView === 'user-dashboard' && <UserDashboard />}
          {currentView === 'admin-dashboard' && <AdminDashboard />}
          {currentView === 'pizza-builder' && <PizzaBuilder />}
          {currentView === 'checkout' && <CheckoutForm />}
        </main>
      </div>
    </AppContext.Provider>
  );
};

const Header = () => {
  const { currentUser, setCurrentUser, setCurrentView } = useContext(AppContext);

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  return (
    <header className="bg-red-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">🍕 Pizza Palace</h1>
        {currentUser && (
          <div className="flex items-center space-x-4">
            <span>Welcome, {currentUser.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-700 px-4 py-2 rounded hover:bg-red-800"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const LoginForm = () => {
  const { setCurrentUser, setCurrentView } = useContext(AppContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = mockDB.users.find(u => u.email === formData.email && u.password === formData.password);
    
    if (user) {
      if (!user.verified) {
        setError('Please verify your email first');
        return;
      }
      setCurrentUser(user);
      setCurrentView(user.role === 'admin' ? 'admin-dashboard' : 'user-dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Login
        </button>
      </form>

      <div className="mt-4 text-center space-y-2">
        <button 
          onClick={() => setCurrentView('register')}
          className="text-red-600 hover:underline block"
        >
          Don't have an account? Register
        </button>
        <button 
          onClick={() => setCurrentView('forgot-password')}
          className="text-red-600 hover:underline block"
        >
          Forgot Password?
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-600 bg-gray-100 p-3 rounded">
        <strong>Demo Credentials:</strong><br/>
        User: user@test.com / password123<br/>
        Admin: admin@test.com / admin123
      </div>
    </div>
  );
};

const RegisterForm = () => {
  const { setCurrentView } = useContext(AppContext);
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Simulate registration and email verification
    setSuccess(true);
    setTimeout(() => {
      setCurrentView('login');
    }, 2000);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
        <p>A verification email has been sent. Please check your inbox.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Register
        </button>
      </form>

      <div className="mt-4 text-center">
        <button 
          onClick={() => setCurrentView('login')}
          className="text-red-600 hover:underline"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

const ForgotPasswordForm = () => {
  const { setCurrentView } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setCurrentView('login'), 2000);
  };

  if (sent) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
        <Mail className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Reset Link Sent!</h2>
        <p>Please check your email for password reset instructions.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Send Reset Link
        </button>
      </form>

      <div className="mt-4 text-center">
        <button 
          onClick={() => setCurrentView('login')}
          className="text-red-600 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const { setCurrentView, orders, currentUser } = useContext(AppContext);
  
  const userOrders = orders.filter(order => order.userId === currentUser.id);

  const pizzaVarieties = [
    { name: 'Margherita', price: 12.99, image: '🍕', description: 'Classic tomato, mozzarella, and basil' },
    { name: 'Pepperoni', price: 14.99, image: '🍕', description: 'Pepperoni with mozzarella cheese' },
    { name: 'Supreme', price: 18.99, image: '🍕', description: 'Loaded with meat and vegetables' },
    { name: 'Hawaiian', price: 16.99, image: '🍕', description: 'Ham and pineapple' },
    { name: 'Meat Lovers', price: 19.99, image: '🍕', description: 'All the meats you love' },
    { name: 'Veggie Delight', price: 15.99, image: '🍕', description: 'Fresh vegetables galore' }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'received': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'kitchen': return <ChefHat className="w-4 h-4 text-yellow-500" />;
      case 'delivery': return <Truck className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Pizza Varieties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzaVarieties.map((pizza, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="text-4xl text-center mb-2">{pizza.image}</div>
              <h3 className="text-xl font-semibold text-center mb-2">{pizza.name}</h3>
              <p className="text-gray-600 text-center mb-3">{pizza.description}</p>
              <p className="text-2xl font-bold text-red-600 text-center mb-4">${pizza.price}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentView('pizza-builder')}
            className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-red-700"
          >
            Build Custom Pizza 🍕
          </button>
        </div>
      </div>

      {userOrders.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Your Orders</h2>
          <div className="space-y-4">
            {userOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Base:</strong> {order.pizza.base}</div>
                  <div><strong>Sauce:</strong> {order.pizza.sauce}</div>
                  <div><strong>Cheese:</strong> {order.pizza.cheese}</div>
                  <div><strong>Veggies:</strong> {order.pizza.veggies.join(', ')}</div>
                </div>
                <div className="mt-2 text-right">
                  <span className="text-lg font-bold text-red-600">${order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const { inventory, setInventory, orders, setOrders } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('inventory');

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const checkLowStock = () => {
    const alerts = [];
    const threshold = 20;
    
    Object.entries(inventory).forEach(([category, items]) => {
      Object.entries(items).forEach(([item, quantity]) => {
        if (quantity < threshold) {
          alerts.push(`${category}: ${item} (${quantity} remaining)`);
        }
      });
    });
    
    if (alerts.length > 0) {
      alert(`Low Stock Alert!\n\n${alerts.join('\n')}`);
    } else {
      alert('All items are well stocked!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded ${activeTab === 'inventory' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          >
            <Package className="w-4 h-4 inline mr-2" />
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          >
            <ShoppingCart className="w-4 h-4 inline mr-2" />
            Orders
          </button>
          <button
            onClick={checkLowStock}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            <Mail className="w-4 h-4 inline mr-2" />
            Check Stock Alerts
          </button>
        </div>

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            {Object.entries(inventory).map(([category, items]) => (
              <div key={category} className="border rounded-lg p-4">
                <h3 className="text-lg font-bold mb-3 capitalize">{category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(items).map(([item, quantity]) => (
                    <div key={item} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="capitalize">{item}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`font-bold ${quantity < 20 ? 'text-red-600' : 'text-green-600'}`}>
                          {quantity}
                        </span>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => {
                            const newInventory = { ...inventory };
                            newInventory[category][item] = parseInt(e.target.value) || 0;
                            setInventory(newInventory);
                          }}
                          className="w-16 px-1 py-1 border rounded text-center"
                          min="0"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-center text-gray-500">No orders yet</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                      <p className="text-gray-600">Customer ID: {order.userId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-600">${order.total}</p>
                      <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div><strong>Base:</strong> {order.pizza.base}</div>
                    <div><strong>Sauce:</strong> {order.pizza.sauce}</div>
                    <div><strong>Cheese:</strong> {order.pizza.cheese}</div>
                    <div><strong>Veggies:</strong> {order.pizza.veggies.join(', ')}</div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => updateOrderStatus(order.id, 'received')}
                      className={`px-3 py-1 rounded text-sm ${order.status === 'received' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
                    >
                      Order Received
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'kitchen')}
                      className={`px-3 py-1 rounded text-sm ${order.status === 'kitchen' ? 'bg-yellow-600 text-white' : 'bg-gray-200'}`}
                    >
                      In Kitchen
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'delivery')}
                      className={`px-3 py-1 rounded text-sm ${order.status === 'delivery' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                      Sent to Delivery
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const PizzaBuilder = () => {
  const { setCurrentView, setCurrentOrder } = useContext(AppContext);
  const [pizza, setPizza] = useState({
    base: '',
    sauce: '',
    cheese: '',
    veggies: [],
    meat: []
  });
  const [step, setStep] = useState(1);

  const bases = ['Thin Crust', 'Thick Crust', 'Stuffed Crust', 'Whole Wheat', 'Gluten Free'];
  const sauces = ['Marinara', 'BBQ', 'Alfredo', 'Pesto', 'Buffalo'];
  const cheeses = ['Mozzarella', 'Cheddar', 'Parmesan', 'Feta'];
  const veggies = ['Mushrooms', 'Bell Peppers', 'Onions', 'Tomatoes', 'Olives', 'Spinach', 'Jalapeños'];
  const meats = ['Pepperoni', 'Chicken', 'Beef', 'Sausage'];

  const calculatePrice = () => {
    let price = 8.99; // base price
    price += pizza.veggies.length * 1.5;
    price += pizza.meat.length * 2.5;
    return price.toFixed(2);
  };

  const handleVeggieToggle = (veggie) => {
    setPizza(prev => ({
      ...prev,
      veggies: prev.veggies.includes(veggie)
        ? prev.veggies.filter(v => v !== veggie)
        : [...prev.veggies, veggie]
    }));
  };

  const handleMeatToggle = (meat) => {
    setPizza(prev => ({
      ...prev,
      meat: prev.meat.includes(meat)
        ? prev.meat.filter(m => m !== meat)
        : [...prev.meat, meat]
    }));
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      const order = {
        pizza,
        total: parseFloat(calculatePrice())
      };
      setCurrentOrder(order);
      setCurrentView('checkout');
    }
  };

  const canProceed = () => {
    switch(step) {
      case 1: return pizza.base;
      case 2: return pizza.sauce;
      case 3: return pizza.cheese;
      case 4: return true; // veggies are optional
      case 5: return true; // meat is optional
      default: return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Build Your Custom Pizza</h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          {[1,2,3,4,5].map(i => (
            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center ${
              i === step ? 'bg-red-600 text-white' : 
              i < step ? 'bg-green-600 text-white' : 'bg-gray-300'
            }`}>
              {i}
            </div>
          ))}
        </div>
        <div className="text-center text-gray-600">
          Step {step} of 5: {
            step === 1 ? 'Choose Base' :
            step === 2 ? 'Choose Sauce' :
            step === 3 ? 'Choose Cheese' :
            step === 4 ? 'Add Veggies' : 'Add Meat'
          }
        </div>
      </div>

      <div className="mb-6">
        {step === 1 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Choose your pizza base:</h3>
            {bases.map(base => (
              <label key={base} className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="base"
                  value={base}
                  checked={pizza.base === base}
                  onChange={(e) => setPizza({...pizza, base: e.target.value})}
                  className="mr-3"
                />
                {base}
              </label>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Choose your sauce:</h3>
            {sauces.map(sauce => (
              <label key={sauce} className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="sauce"
                  value={sauce}
                  checked={pizza.sauce === sauce}
                  onChange={(e) => setPizza({...pizza, sauce: e.target.value})}
                  className="mr-3"
                />
                {sauce}
              </label>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Choose your cheese:</h3>
            {cheeses.map(cheese => (
              <label key={cheese} className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="cheese"
                  value={cheese}
                  checked={pizza.cheese === cheese}
                  onChange={(e) => setPizza({...pizza, cheese: e.target.value})}
                  className="mr-3"
                />
                {cheese}
              </label>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Add vegetables (+$1.50 each):</h3>
            {veggies.map(veggie => (
              <label key={veggie} className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pizza.veggies.includes(veggie)}
                  onChange={() => handleVeggieToggle(veggie)}
                  className="mr-3"
                />
                {veggie}
              </label>
            ))}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Add meat (+$2.50 each):</h3>
            {meats.map(meat => (
              <label key={meat} className="flex items-center p-3 border rounded hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pizza.meat.includes(meat)}
                  onChange={() => handleMeatToggle(meat)}
                  className="mr-3"
                />
                {meat}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <h4 className="font-semibold mb-2">Your Pizza Summary:</h4>
        <p><strong>Base:</strong> {pizza.base || 'Not selected'}</p>
        <p><strong>Sauce:</strong> {pizza.sauce || 'Not selected'}</p>
        <p><strong>Cheese:</strong> {pizza.cheese || 'Not selected'}</p>
        <p><strong>Veggies:</strong> {pizza.veggies.length > 0 ? pizza.veggies.join(', ') : 'None'}</p>
        <p><strong>Meat:</strong> {pizza.meat.length > 0 ? pizza.meat.join(', ') : 'None'}</p>
        <p className="text-xl font-bold text-red-600 mt-2">Total: ${calculatePrice()}</p>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => step > 1 ? setStep(step - 1) : setCurrentView('user-dashboard')}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          {step > 1 ? 'Previous' : 'Cancel'}
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={`px-6 py-2 rounded ${
            canProceed() 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {step === 5 ? 'Proceed to Checkout' : 'Next'}
        </button>
      </div>
    </div>
  );
};

const CheckoutForm = () => {
  const { currentOrder, setCurrentView, currentUser, setOrders, orders, inventory, setInventory } = useContext(AppContext);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePayment = () => {
    setPaymentProcessing(true);
    
    // Simulate Razorpay integration
    setTimeout(() => {
      // Create new order
      const newOrder = {
        id: Date.now(),
        userId: currentUser.id,
        pizza: currentOrder.pizza,
        total: currentOrder.total,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Update orders
      setOrders([...orders, newOrder]);

      // Update inventory (subtract used ingredients)
      const newInventory = { ...inventory };
      const baseKey = currentOrder.pizza.base.toLowerCase().replace(' ', '');
      const sauceKey = currentOrder.pizza.sauce.toLowerCase();
      const cheeseKey = currentOrder.pizza.cheese.toLowerCase();

      if (newInventory.bases[baseKey]) newInventory.bases[baseKey]--;
      if (newInventory.sauces[sauceKey]) newInventory.sauces[sauceKey]--;
      if (newInventory.cheeses[cheeseKey]) newInventory.cheeses[cheeseKey]--;

      currentOrder.pizza.veggies.forEach(veggie => {
        const veggieKey = veggie.toLowerCase().replace(' ', '');
        if (newInventory.veggies[veggieKey]) newInventory.veggies[veggieKey]--;
      });

      currentOrder.pizza.meat.forEach(meat => {
        const meatKey = meat.toLowerCase();
        if (newInventory.meats[meatKey]) newInventory.meats[meatKey]--;
      });

      setInventory(newInventory);
      setPaymentProcessing(false);
      setOrderPlaced(true);

      // Check for low stock and simulate email notification
      checkLowStockAndNotify(newInventory);

      setTimeout(() => {
        setCurrentView('user-dashboard');
      }, 3000);
    }, 2000);
  };

  const checkLowStockAndNotify = (inv) => {
    const threshold = 20;
    const lowStockItems = [];
    
    Object.entries(inv).forEach(([category, items]) => {
      Object.entries(items).forEach(([item, quantity]) => {
        if (quantity < threshold) {
          lowStockItems.push(`${category}: ${item} (${quantity} remaining)`);
        }
      });
    });
    
    if (lowStockItems.length > 0) {
      console.log('Email notification sent to admin:', {
        subject: 'Low Stock Alert - Pizza Palace',
        items: lowStockItems
      });
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
        <p className="mb-4">Your delicious pizza is being prepared.</p>
        <p className="text-gray-600">Redirecting to dashboard...</p>
      </div>
    );
  }

  if (paymentProcessing) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold mb-4">Processing Payment...</h2>
        <p className="text-gray-600">Please wait while we process your payment through Razorpay.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      
      <div className="bg-gray-100 p-4 rounded mb-6">
        <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Pizza Base ({currentOrder.pizza.base})</span>
            <span>$8.99</span>
          </div>
          {currentOrder.pizza.veggies.map(veggie => (
            <div key={veggie} className="flex justify-between">
              <span>{veggie}</span>
              <span>$1.50</span>
            </div>
          ))}
          {currentOrder.pizza.meat.map(meat => (
            <div key={meat} className="flex justify-between">
              <span>{meat}</span>
              <span>$2.50</span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${currentOrder.total}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Delivery Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border rounded px-3 py-2 focus:outline-none focus:border-red-500"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border rounded px-3 py-2 focus:outline-none focus:border-red-500"
            required
          />
        </div>
        <textarea
          placeholder="Delivery Address"
          className="w-full mt-4 border rounded px-3 py-2 focus:outline-none focus:border-red-500"
          rows="3"
          required
        ></textarea>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">🔒 Razorpay Test Mode</h3>
        <p className="text-sm text-gray-600 mb-2">This is a demo integration with Razorpay test mode.</p>
        <div className="text-xs text-gray-500">
          <strong>Test Cards:</strong><br/>
          • Card: 4111 1111 1111 1111<br/>
          • CVV: Any 3 digits<br/>
          • Expiry: Any future date
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentView('pizza-builder')}
          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
        >
          Back to Builder
        </button>
        <button
          onClick={handlePayment}
          className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700 flex items-center"
        >
          <span className="mr-2">💳</span>
          Pay ${currentOrder.total} with Razorpay
        </button>
      </div>
    </div>
  );
};

export default PizzaApp;