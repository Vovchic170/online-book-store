<template>                    
  <div>                       
    <h1 class="text-3xl font-bold text-gray-900 mb-8"> 
    Кітап санаттары </h1> 
            
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">      
          
      <router-link   
        v-for="category in categories"  
        :key="category.id"
        :to="'/categories/' + category.id"
        class="card p-6 hover:shadow-lg transition-shadow duration-300"
      > 
        <div class="flex items-center space-x-4"> 
          <div class="text-4xl">{{ category.icon }}</div> 
          <div> 
            <h3 class="text-xl font-semibold text-gray-900">{{ category.name }}</h3>
            <p class="text-gray-600">{{ category.count }}кітаптар</p>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Рекомендуемые категории --> 
    <div class="mt-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">
        Ұсынылатын санаттар</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> 
        <div v-for="featured in featuredCategories" :key="featured.id" class="card overflow-hidden"> 
          <div class="relative h-48">  
            <img :src="featured.image" :alt="featured.name" class="w-full h-full object-cover"> 
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6 text-white">
              <h3 class="text-2xl font-bold">{{ featured.name }}</h3>    
              <p class="mt-2">{{ featured.description }}</p>  
            </div>  
          </div> 
        </div> 
      </div> 
    </div> 
  </div> 
</template>  
    
<script setup> 
import { ref } from 'vue' 
   
const categories = ref([ 
  { id: 1, name: 'Қиял', icon: '📚', count: 156 },
  { id: 2, name: 'Роман', icon: '📖', count: 98 },
  { id: 3, name: 'Ғылым', icon: '🔬', count: 45 },
  { id: 4, name: 'Тарихи', icon: '⏳', count: 67 }, 
  { id: 5, name: 'Өмірбаяны', icon: '👤', count: 34 }, 
  { id: 6, name: 'Поэзия', icon: '✒️', count: 23 }, 
  { id: 7, name: 'Бизнесс', icon: '💼', count: 89 }, 
  { id: 8, name: 'Технологиялар', icon: '💻', count: 56 }, 
  { id: 9, name: 'Өнер және дизайн', icon: '🎨', count: 42 } 
]) 
             
const featuredCategories = ref([
  {
    id: 1,
    name: 'Фантастикалық бестселлер',
    description: 'Біздің ең танымал өнер туындыларын табыңыз',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: ' Жаңа шығарылымдар',
    description: 'Біздің соңғы толықтыруларымызды тексеріңіз',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
])
</script> 