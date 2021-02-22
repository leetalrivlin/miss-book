import longText from '../cmps/long-text.cmp.js';
import {bookService} from '../services/book-service.js';

export default {
  template: `
    <section v-if="book" class="book-details-container">
        <!-- <button @click="$emit('close')" class="x-btn">X</button> -->
        <router-link to="/book">Back</router-link>

        <img src="../img/sale-sign.png" v-if="book.listPrice.isOnSale" class="sale-sign" />

        <h1>{{titleUpperCase}}</h1>
        <img :src="book.thumbnail" class="book-img"/>
        <p>
            <span class="detail-title">Subtitle:</span> 
            {{book.subtitle}}
        </p>
        <p>
            <span class="detail-title">Price: </span>
            <span :class="className">{{showCurrencyNumber}}</span>
        </p>
        <ul><span class="detail-title">Authors: </span>
            <li v-for="(author, idx) in book.authors" :key="idx">{{author}}</li>
        </ul>
        <p>
            <span class="detail-title">Published Date: </span>
            {{book.publishedDate}} 
            <span>{{publishedDisplay}}</span>
        </p>
        <long-text :txt="book.description"/>
        <p>
            <span class="detail-title">Page Count: </span>
            {{book.pageCount}} 
            <span>{{pageCountDisplay}}</span>
        </p>
        <ul><span class="detail-title">Categories: </span>
            <li v-for="(category, indx) in book.categories" :key="indx">{{category}}</li>
        </ul>
        <p>
            <span class="detail-title">Language: </span>
            {{book.language}}
        </p>
    </section>
    `,
    data() {
      return {
          book: null,
      }
  },
  computed: {
    titleUpperCase() {
      return this.book.title.charAt(0).toUpperCase() + this.book.title.substring(1);
    },
    pageCountDisplay() {
      let str = '';
      if (this.book.pageCount > 500) str = '- Long reading';
      if (this.book.pageCount > 200) str = '- Decent Reading';
      if (this.book.pageCount < 100) str = '- Light Reading';
      return str;
    },
    publishedDisplay() {
      let str = '';
      if (this.book.publishedDate > 10) str = '- Veteran Book';
      if (this.book.publishedDate < 1) str = '- New!';
      return str;
    },
    showCurrencyNumber() {
      return this.book.listPrice.amount.toLocaleString('de-DE', {
        style: 'currency',
        currency: this.book.listPrice.currencyCode,
      });
    },
    className() {
      if (this.book.listPrice.amount > 150) return 'red';
      if (this.book.listPrice.amount < 20) return 'green';
    },
  },
  components: {
    longText,
  },
  created() {
    const id = this.$route.params.bookId
        bookService.getById(id)
            .then(book => this.book = book)
  }
};
