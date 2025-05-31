<template>
  <div id="app">
    <nav>
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/books" class="nav-link">Books</router-link>
      <router-link to="/basket" class="nav-link">Basket</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('./assets/main.css');

nav {
  background-color: var(--color-background-soft);
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 2rem;
}

.nav-link {
  margin-right: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
}

.nav-link.router-link-active {
  background-color: hsla(160, 100%, 37%, 0.2);
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
</style>