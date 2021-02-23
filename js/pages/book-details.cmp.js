import longText from '../cmps/long-text.cmp.js';
import reviewAdd from '../cmps/review-add.cmp.js';
import {bookService} from '../services/book-service.js';
import { eventBus } from '../services/event-bus-service.js';

export default {
  name: 'bookDetails',
  template: `
    <section v-if="book" class="book-details-container app-main">
        <!-- <button @click="$emit('close')" class="x-btn">X</button> -->
        <router-link to="/book" class="back-btn">Back</router-link>

        <img src="img/sale-sign.png" v-if="book.listPrice.isOnSale" class="sale-sign" />

        <h1>{{titleUpperCase}}</h1>
        <img :src="book.thumbnail" class="book-img"/>
        <div class="book-info">
          <p><span class="detail-title">Subtitle:</span> {{book.subtitle}}</p>
          <p><span class="detail-title">Price: </span><span :class="className">{{showCurrencyNumber}}</span></p>
          <ul><span class="detail-title">Authors: </span>
            <li v-for="(author, idx) in book.authors" :key="idx">{{author}}</li>
          </ul>
          <p><span class="detail-title">Published Date: </span>{{book.publishedDate}} <span>{{publishedDisplay}}</span></p>
          <long-text :txt="book.description"/>
          <p><span class="detail-title">Page Count: </span>{{book.pageCount}} <span>{{pageCountDisplay}}</span>
          </p>
          <ul><span class="detail-title">Categories: </span>
              <li v-for="(category, indx) in book.categories" :key="indx">{{category}}</li>
          </ul>
          <p><span class="detail-title">Language: </span>{{book.language}}</p>
        </div>
        <hr />

        <review-add :bookId="book.id" :reviews="book.reviews" @removed="removeReview" @saveReview="saveReview"/>
    </section>
    `,
    data() {
      return {
          book: null,
          reviews: [],
      }
  },
  methods: {
    saveReview(review) {
      console.log("Submiting review...");
          bookService.addReview(this.book.id, review)
              .then(book => {
                console.log('book2',book);
                this.book = book
              })
              .then(book => {
                            const msg = {
                                txt: 'Review was saved succesfully',
                                type: 'success',
                                link: `/book/:${this.bookId}`,
                            }
                            eventBus.$emit('show-msg', msg);
                            this.$emit('update-details');
                        })
                        .catch(err =>{
                            console.log(err);
                            const msg = {
                                txt: 'Error, please try again later',
                                type: 'error',
                                link: '',
                            }
                            eventBus.$emit('show-msg', msg)
                        })
    },
    removeReview(reviewIdx) {
      console.log("removing review...");
            bookService.removeReview(this.book.id, reviewIdx)
                .then(book => {
                  this.book = book
                })
                .then(book => {
                              const msg = {
                                  txt: 'Review removed succesfully',
                                  type: 'success'
                              }
                              eventBus.$emit('show-msg', msg);
                              this.$emit('update-details');
                          })
                          .catch(err =>{
                              console.log(err);
                              const msg = {
                                  txt: 'Error, please try again later',
                                  type: 'error'
                              }
                              eventBus.$emit('show-msg', msg)
                          })
    },

    // updateBookDetails() {
    //   console.log('Updating in details');
    //   const id = this.$route.params.bookId
    //   bookService.getById(id)
    //       .then(book => {
    //         this.book = book
    //         console.log('this.book',this.book);
    //       }); 
    // }
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
    reviewAdd,
  },
  created() {
    // this.updateBookDetails();
    const id = this.$route.params.bookId
        bookService.getById(id)
          .then(book => this.book = book)
  }
};
