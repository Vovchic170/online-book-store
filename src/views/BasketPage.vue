
<template>
  <div class="basket-page">
    <h1>Your Shopping Basket</h1>
    
    <div v-if="basketItems.length === 0" class="empty-basket">
      <p>Your basket is empty.</p>
      <router-link to="/books" class="continue-shopping">Continue Shopping</router-link>
    </div>
    
    <div v-else class="basket-content">
      <div class="basket-items">
        <div v-for="item in basketItems" :key="item.id" class="basket-item">
          <img :src="item.image" :alt="item.title" class="item-image" />
          <div class="item-details">
            <h3>{{ item.title }}</h3>
            <p class="author">by {{ item.author }}</p>
            <div class="item-controls">
              <div class="quantity-controls">
                <button @click="decreaseQuantity(item)" class="quantity-btn">-</button>
                <span class="quantity">{{ item.quantity }}</span>
                <button @click="increaseQuantity(item)" class="quantity-btn">+</button>
              </div>
              <button @click="removeItem(item)" class="remove-btn">Remove</button>
            </div>
          </div>
          <div class="item-price">
            <span class="unit-price">${{ item.price }} each</span>
            <span class="total-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>
      </div>
      
      <div class="basket-summary">
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasketPage',
  data() {
    return {
      basketItems: []
    }
  },
  computed: {
    subtotal() {
      return this.basketItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
  },
  mounted() {
    this.loadBasket();
  },
  methods: {
    loadBasket() {
      this.basketItems = JSON.parse(localStorage.getItem('basket') || '[]');
    },
    saveBasket() {
      localStorage.setItem('basket', JSON.stringify(this.basketItems));
    },
    increaseQuantity(item) {
      item.quantity++;
      this.saveBasket();
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        this.saveBasket();
      }
    },
    removeItem(item) {
      const index = this.basketItems.findIndex(basketItem => basketItem.id === item.id);
      if (index > -1) {
        this.basketItems.splice(index, 1);
        this.saveBasket();
      }
    }
  }
}
</script>

<style scoped>
.basket-page {
  padding: 2rem 0;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--color-heading);
  font-size: 2.5rem;
}

.empty-basket {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-basket p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.continue-shopping {
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  display: inline-block;
  font-weight: 500;
}

.basket-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.basket-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.basket-item {
  display: flex;
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
  gap: 1rem;
}

.item-image {
  width: 100px;
  height: 130px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.author {
  color: var(--color-text);
  font-style: italic;
  margin-bottom: 1rem;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-btn {
  background-color: var(--color-border);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: bold;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.item-price {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.unit-price {
  font-size: 0.9rem;
  color: var(--color-text);
}

.total-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: hsla(160, 100%, 37%, 1);
}

.basket-summary {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2rem;
  height: fit-content;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
}

.summary-row.total {
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
}

.checkout-btn {
  width: 100%;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
}

.checkout-btn:hover {
  background-color: hsla(160, 100%, 30%, 1);
}

@media (max-width: 768px) {
  .basket-content {
    grid-template-columns: 1fr;
  }
  
  .basket-item {
    flex-direction: column;
    text-align: center;
  }
}
</style>
