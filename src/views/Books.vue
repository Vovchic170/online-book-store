<template>
  <div>
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Боковая панель фильтров -->
      <div class="w-full md:w-64 space-y-6">
        <div class="card p-4">
          <h3 class="text-lg font-semibold mb-4">Фильтры</h3>
          
          <!--     Ценовой диапазон -->
          <div class="mb-4">
            <h4 class="font-medium mb-2">Ценовой диапазон</h4>
            <div class="space-y-2">
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  class="rounded text-primary-600"
                  v-model="filters.priceRanges.under10"
                  @change="applyFilters"
                >
                <span class="ml-2">До $10</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  class="rounded text-primary-600"
                  v-model="filters.priceRanges.tenTo20"
                  @change="applyFilters" 
                >    
                <span class="ml-2">$10 - $20</span> 
              </label> 
              <label class="flex items-center"> 
                <input  
                  type="checkbox"  
                  class="rounded text-primary-600" 
               v-model="filters.priceRanges.twentyTo30"
                  @change="applyFilters" > 
                <span class="ml-2">$20 - $30</span> 
              </label> 
              <label class="flex items-center">  
                <input 
                  type="checkbox"    
                  class="rounded text-primary-600"
                  v-model="filters.priceRanges.over30"
                  @change="applyFilters"
                >
                <span class="ml-2">Выше $30</span>
              </label>
            </div>
          </div>

          <!-- Категории --> 
          <div class="mb-4">   
            <h4 class="font-medium mb-2">Категории</h4>
            <div class="space-y-2"> 
              <label class="flex items-center">  
                <input     
                  type="checkbox" 
                  class="rounded text-primary-600"
                  v-model="filters.categories.Фантастика"
                  @change="applyFilters"
                >
                <span class="ml-2">Фантастика</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  class="rounded text-primary-600"
                  v-model="filters.categories.Роман" 
                  @change="applyFilters"  
                >
                <span class="ml-2">Нонфикшен</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  class="rounded text-primary-600"
                  v-model="filters.categories.Наука"
                  @change="applyFilters"
                >
                <span class="ml-2">Наука</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  class="rounded text-primary-600"
                  v-model="filters.categories.Исторические"
                  @change="applyFilters"
                >
                <span class="ml-2">Исторические</span>
              </label>
            </div>
          </div>

          <!--  Очистить фильтры -->
          <button 
            class="btn btn-secondary w-full mt-4"
            @click="clearFilters"
          >
            Очистить фильтры
          </button>
        </div>
      </div>

      <!-- Сетка из Книг -->
      <div class="flex-1">
        <!-- Поиск и сортировка -->
        <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div class="w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Поиск книг..." 
              class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500" 
              v-model="searchQuery"  
              @input="applyFilters"  
            >  
          </div>  
          <select  
            class="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"  
            v-model="sortBy"  
            @change="applyFilters"  
          >     
            <option value="featured"> Рекомендуемые</option> 
            <option value="priceLow">Цена: от низких к высоким</option> 
            <option value="priceHigh">Цена: от высоких к низким</option> 
            <option value="newest">Новые-первыми</option> 
          </select>    
        </div>  
   
           <!-- Сетка из Книг --> 
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="book in filteredBooks" :key="book.id" class="card group">
            <div class="relative aspect-[3/4] overflow-hidden">
              <router-link :to="'/book/' + book.id">
                <img :src="book.cover" :alt="book.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              </router-link>
            </div>
            <div class="p-4">
              <router-link :to="'/book/' + book.id">
                <h3 class="text-lg font-semibold text-gray-900">{{ book.title }}</h3>
                <p class="text-gray-600">{{ book.author }}</p>
              </router-link>
              <div class="mt-2 flex items-center justify-between">
                <span class="text-primary-600 font-semibold">{{ book.price }}т</span>    
                <button class="btn btn-primary" @click="addToCart(book)">Добавить в корзину</button> 
              </div>       
            </div>          
          </div>             
        </div>                

        <!-- Сообщение об отсутствии результатов -->
        <div v-if="filteredBooks.length === 0" class="text-center py-8">
          <p class="text-gray-500">Книг, соответствующих вашим критериям, не найдено.</p> 
        </div> 
   
            <!-- Пагинация --> 
        <div class="mt-8 flex justify-center"> 
          <nav class="flex items-center space-x-2"> 
            <button  
              class="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50" 
              :disabled="currentPage === 1" 
              @click="currentPage--"
            >Предыдущие</button> 
            <button  
              v-for="page in totalPages"  
              :key="page" 
              class="px-3 py-1 rounded-md" 
              :class="currentPage === page ? 'bg-primary-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'" 
              @click="currentPage = page" 
            >{{ page }}</button> 
            <button 
              class="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50"  
              :disabled="currentPage === totalPages"  
              @click="currentPage++"  
            >Следующие</button>  
          </nav>  
        </div>  
      </div>  
    </div>  
  </div>  
</template>  
     
<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

// В реальном приложении это можно было бы получить из API.
const allBooks = ref([
  {
    id: 1,
    title: 'Великий Гэтсби',
    author: 'Ф. Скотт Фиджеральд',
    price: 2500,
    category: 'Фантастика',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    title: 'Убить пересмешника',
    author: 'Харпер Ли',
    price: 3000,
    category: 'Фантастика',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    title: 'Краткая история времени ',
    author: 'Стивен Хокинг',
    price: 3500,
    category: 'Наука',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    title: 'Гордость и предубеждение',
    author: 'Джейн Остин',
    price: 3500,
    category: 'Роман',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5,
    title: 'Происхождение видов',
    author: 'Чарльз Дарвин',
    price: 6000,
    category: 'Наука',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  }, 
  { 
    id: 6, 
    title: 'Sapiens: Краткая история человечества',
    author: 'Юваль Ной Харари',
    price: 7000,
    category: 'Исторические',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 7,
    title: 'Искусство войны',
    author: 'Сунь-цзы',
    price: 10000,
    category: 'Исторические',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 8,
    title: 'Алхимик',
    author: 'Паоло Коэльо',
    price: 4500,
    category: 'Роман',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 9,
    title: 'Психология денег',
    author: 'Морган Хаузел',
    price: 3500,
    category: 'Психология',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  }, 
  { 
    id: 10, 
    title: 'Августовские пушки', 
    author: 'Барбара Такман', 
    price: 2500, 
    category: 'Исторические',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 11,
    title: 'Эгоистичный Ген',
    author: 'Ричард Докинз',
    price: 4700,
    category: 'Наука',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 12,
    title: 'Полуночная библиотека',
    author: 'Мэтт Хейг',
    price: 5200,
    category: 'Роман',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  }   
])  
        
// Состояние фильтрации и сортировки 
const filters = ref({ 
  priceRanges: { 
    under10: false, 
    tenTo20: false, 
    twentyTo30: false,  
    over30: false 
  },  
  categories: { 
    fiction: false,  
    nonFiction: false,  
    science: false,  
    history: false   
  }    
})  
   
const searchQuery = ref('')  
const sortBy = ref('featured')   
const currentPage = ref(1)   
const itemsPerPage = 6       
   
//  Вычисляемые свойства для отфильтрованных и отсортированных книг
const filteredBooks = computed(() => {
  let result = [...allBooks.value]

  // Применить фильтр поиска
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(book => 
      book.title.toLowerCase().includes(query) || 
      book.author.toLowerCase().includes(query)
    )
  }

   // Применить фильтры ценового диапазона 
  const activePriceRanges = Object.entries(filters.value.priceRanges) 
    .filter(([_, isActive]) => isActive) 
    .map(([range]) => range) 
 
  if (activePriceRanges.length > 0) { 
    result = result.filter(book => { 
      if (activePriceRanges.includes('under10') && book.price < 2000) return true
      if (activePriceRanges.includes('tenTo20') && book.price >= 2000 && book.price < 3000) return true
      if (activePriceRanges.includes('twentyTo30') && book.price >= 3000 && book.price < 4000) return true
      if (activePriceRanges.includes('over30') && book.price >= 4000) return true  
      return false  
    })     
  }        
            
  //  Применить фильтры категорий
  const activeCategories = Object.entries(filters.value.categories)
    .filter(([_, isActive]) => isActive)
    .map(([category]) => category)

  if (activeCategories.length > 0) {
    result = result.filter(book => activeCategories.includes(book.category))
  }

  // Применить сортировку
  switch (sortBy.value) {
    case 'priceLow':
      result.sort((a, b) => a.price - b.price)
      break
    case 'priceHigh':
      result.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      // В реальном приложении мы бы сортировали по дате
      break
    default:
      // Избранное - без определенной сортировки
      break
  }

  //  Применить нумерацию страниц
  const start = (currentPage.value - 1) * itemsPerPage
  return result.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(allBooks.value.length / itemsPerPage)
})

// Методы для управления фильтрами и сортировки
const applyFilters = () => {
  currentPage.value = 1 // Сброс на первую страницу при изменении фильтров
}

const clearFilters = () => {
  filters.value = {
    priceRanges: {
      under10: false,
      tenTo20: false,
      twentyTo30: false,
      over30: false
    },
    categories: {
      fiction: false,
      nonFiction: false,
      science: false,
      history: false
    }
  }
  searchQuery.value = ''
  sortBy.value = 'featured'
  currentPage.value = 1
}

const addToCart = (book) => {
  cartStore.addItem({
    id: book.id,
    title: book.title,
    price: book.price,
    quantity: 1
  })
}
</script> 





