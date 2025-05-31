
<template>
  <div class="books-page">
    <h1>Our Book Collection</h1>
    <div class="books-grid">
      <div v-for="book in books" :key="book.id" class="book-card">
        <img :src="book.image" :alt="book.title" class="book-image" />
        <div class="book-details">
          <h3>{{ book.title }}</h3>
          <p class="author">by {{ book.author }}</p>
          <p class="description">{{ book.description }}</p>
          <div class="book-footer">
            <span class="price">${{ book.price }}</span>
            <button @click="addToBasket(book)" class="add-to-basket">Add to Basket</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BooksPage',
  data() {
    return {
      books: [
        {
          id: 1,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          description: "A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.",
          price: 12.99,
          image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
        },
        {
          id: 2,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          description: "A gripping tale of racial injustice and childhood innocence in the American South.",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop"
        },
        {
          id: 3,
          title: "1984",
          author: "George Orwell",
          description: "A dystopian social science fiction novel about totalitarian control and surveillance.",
          price: 13.99,
          image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop"
        },
        {
          id: 4,
          title: "Pride and Prejudice",
          author: "Jane Austen",
          description: "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
          price: 11.99,
          image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop"
        },
        {
          id: 5,
          title: "The Catcher in the Rye",
          author: "J.D. Salinger",
          description: "A controversial novel about teenage rebellion and alienation in post-war America.",
          price: 13.49,
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
        },
        {
          id: 6,
          title: "Lord of the Flies",
          author: "William Golding",
          description: "A disturbing tale of British boys stranded on an uninhabited island and their disastrous attempt to govern themselves.",
          price: 10.99,
          image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=400&fit=crop"
        },
        {
          id: 7,
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          description: "A fantasy adventure about Bilbo Baggins' unexpected journey to help a group of dwarves reclaim their homeland.",
          price: 15.99,
          image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop"
        },
        {
          id: 8,
          title: "Brave New World",
          author: "Aldous Huxley",
          description: "A dystopian novel set in a futuristic World State of genetically modified citizens and intelligence-based social hierarchy.",
          price: 12.49,
          image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=300&h=400&fit=crop"
        }
      ]
    }
  },
  methods: {
    addToBasket(book) {
      // Get existing basket from localStorage or initialize empty array
      let basket = JSON.parse(localStorage.getItem('basket') || '[]');
      
      // Check if book already exists in basket
      const existingItem = basket.find(item => item.id === book.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        basket.push({ ...book, quantity: 1 });
      }
      
      // Save back to localStorage
      localStorage.setItem('basket', JSON.stringify(basket));
      
      // Show confirmation
      alert(`"${book.title}" has been added to your basket!`);
    }
  }
}
</script>

<style scoped>
.books-page {
  padding: 2rem 0;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--color-heading);
  font-size: 2.5rem;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.book-card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.book-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.book-details {
  padding: 1.5rem;
}

.book-details h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.author {
  color: var(--color-text);
  font-style: italic;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.description {
  color: var(--color-text);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.book-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: hsla(160, 100%, 37%, 1);
}

.add-to-basket {
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.add-to-basket:hover {
  background-color: hsla(160, 100%, 30%, 1);
}
</style>
