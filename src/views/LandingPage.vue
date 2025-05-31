
<template>
  <div class="landing">
    <h1>Welcome to BookStore</h1>
    <p>Discover amazing books and build your personal library.</p>
    <router-link to="/books" class="cta-button">Browse Books</router-link>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
.landing {
  text-align: center;
  padding: 4rem 2rem;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--color-heading);
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.cta-button {
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: hsla(160, 100%, 30%, 1);
}
</style>
