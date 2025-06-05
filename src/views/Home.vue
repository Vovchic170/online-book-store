<template> 
  <div> 
     <!-- Раздел Hero --> 
    <section class="bg-primary-600 text-white py-16"> 
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
        <div class="text-center"> 
          <h1 class="text-4xl font-bold sm:text-5xl md:text-6xl"> 
            Откройте для себя свою следующую любимую книгу 
          </h1>  
          <p class="mt-4 text-xl text-primary-100"> 
            Изучите нашу обширную коллекцию книг всех жанров 
          </p> 
          <div class="mt-8"> 
            <router-link to="/books" class="btn bg-white text-primary-600  hover:bg-primary-50"> 
              Просмотр книг  
            </router-link>  
          </div>   
        </div>   
      </div>     
    </section>  
       
    <!-- Рекомендуемые книги --> 
    <div class="mt-16"> 
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Рекомендуемые книги</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="book in featuredBooks" :key="book.id" class="card group">
          <router-link :to="'/book/' + book.id" class="block">
            <div class="relative aspect-[3/4] overflow-hidden">
              <img :src="book.cover" :alt="book.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ book.title }}</h3> 
              <p class="text-gray-600">{{ book.author }}</p> 
              <div class="mt-2 flex items-center justify-between"> 
                <span class="text-primary-600 font-semibold">${{ book.price }} </span>  
                <button class="btn btn-primary"  
@click.prevent="addToCart(book)">Добавить в корзину</button> 
              </div>    
            </div>     
          </router-link>   
        </div>   
      </div>   
    </div>   
   
    <!-- Раздел категорий -->    
    <section class="bg-gray-50 py-12">  
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Просмотр по категориям</h2> 
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <router-link v-for="category in categories" :key="category.id" 
            :to="'/categories/' + category.id"
            class="card p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div class="text-4xl mb-4">{{ category.icon }}</div>
            <h3 class="text-lg font-semibold text-gray-900">{{ category.name }}</h3> 
          </router-link>  
        </div>   
      </div> 
    </section> 
  </div>  
</template>  
     
<script setup>    
import { ref } from 'vue'  
import { useCartStore } from '../stores/cart'  

const cartStore = useCartStore()

const featuredBooks = ref([
  {
    id: 1,
    title: 'Великий Гэтсби', 
    author: 'Ф. Скотт Фицджеральд', 
    price: 2500,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  }, 
  { 
    id: 2, 
    title: 'Убить пересмешника',
    author: 'Харпер Ли',
    price: 3000,
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    title: '1984',
    author: 'Джордж Оруэлл',
    price: 5000,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  }, 
  {  
    id: 4,  
    title: 'Гордость и предубеждение',  
    author: 'Джейн Остин',  
    price: 3500,  
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' 
  }  
])   
       
const categories = ref([ 
  { id: 1, name: 'Фантастика', icon: '📚' }, 
  { id: 2, name: 'Роман', icon: '📖' },  
  { id: 3, name: 'Наука', icon: '🔬' },  
  { id: 4, name: 'Исторические', icon: '⏳' }  
])   
     
const addToCart = (book) => { 
  cartStore.addItem({ 
    id: book.id, 
    title: book.title, 
    price: book.price, 
    quantity: 1 
  }) 
} 
</script> 






