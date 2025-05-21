    <template>
      <div class="app">
        <header class="header">
          <div class="container">
            <div class="logo">
              <router-link to="/">
                <h1>BookHaven</h1>
              </router-link>
            </div>
            <nav class="nav">
              <router-link to="/" class="nav-link">Home</router-link>
              <router-link to="/books" class="nav-link">Books</router-link>
              <router-link to="/basket" class="nav-link">
                <div class="cart-icon">
                  <span class="material-icons">shopping_cart</span>
                  <span v-if="cart.items.length" class="cart-count">{{ cart.items.length }}</span>
                </div>
              </router-link>
            </nav>
          </div>
        </header>
        

        <main>
          <router-view />
        </main>

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>BookHaven</h3>
            <p>Your destination for quality books and literary treasures.</p>
          </div>
          <div class="footer-section">
            <h3>Contact</h3>
            <p>Email: info@bookhaven.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div class="footer-section">
            <h3>Follow Us</h3>
            <div class="social-links">
              <a href="#" class="social-link">Facebook</a>
              <a href="#" class="social-link">Twitter</a>
              <a href="#" class="social-link">Instagram</a>
            </div>
          </div>
        </div>
        <div class="copyright">
          <p>&copy; 2025 BookHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
 

import { ref, provide, computed } from 'vue'

// Cart logic
const cartItems = ref([])

const addToCart = (book) => {
  const existing = cartItems.value.find(item => item.id === book.id)
  if (existing) {
    existing.quantity += 1
  } else {
    cartItems.value.push({ ...book, quantity: 1 })
  }
}

const removeFromCart = (bookId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== bookId)
}

const updateQuantity = (bookId, quantity) => {
  const item = cartItems.value.find(item => item.id === bookId)
  if (item) item.quantity = Math.max(1, quantity)
}

const cartTotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

const cart = {
  items: cartItems,
  addToCart,
  removeFromCart,
  updateQuantity,
  total: cartTotal
}

provide('cart', cart)
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

:root {
  --primary: #5c6ac4;
  --primary-dark: #4a5497;
  --secondary: #f8f9fa;
  --text: #333;
  --text-light: #666;
  --border: #e1e1e1;
  --success: #28a745;
  --danger: #dc3545;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  color: var(--text);
  line-height: 1.6;
  background-color: #f8f9fa;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
}

.logo h1 {
  color: var(--primary);
  font-size: 1.8rem;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--primary);
}

.cart-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--primary);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

main {
  min-height: calc(100vh - 200px);
}

.footer {
  background-color: #2c3e50;
  color: white;
  padding: 40px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}

.footer-section h3 {
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.social-link {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.social-link:hover {
  opacity: 0.8;
}

.copyright {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
}

/* Button styles */
.btn {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
}

.btn-outline:hover {
  background-color: var(--primary);
  color: white;
}

/* Form styles */
.form-group {
  margin-bottom: 20px;
}

.form-label { 
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}     
          
.form-control {   
  width: 100%;     
  padding: 10px;  
  border: 1px solid var(--border);   
  border-radius: 4px;      
  font-family: inherit;       
}        
                   
.form-control:focus {    
  outline: none;   
  border-color: var(--primary);   
}  

/* Router link active state */
.router-link-active {
  color: var(--primary);
  font-weight: 600;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>



