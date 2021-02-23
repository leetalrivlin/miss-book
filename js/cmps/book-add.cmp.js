import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus-service.js'

export default {
    template: `
   <section class="book-add-container">
        <form @submit.prevent="saveBook">
            <label for="addBook">Add Book: </label>
            <input type="search" list="results" name="addBook" placeholder="Search to add" v-model="strSearched" @input="searchBook" />
            <datalist id="results" @click="bookSelected">
                <option v-for="result in booksresults" :key="result.id" :value="result.title"></option>
            </datalist>
            <button class="plus-btn btn"><i class="fa fa-plus plus-icon"></i></button>
        </form>
   </section>
    `,
    data() {
        return {
            strSearched: '',
            booksresults: [],
            selectedBook: null,
        }
    },
    
    methods: {
        searchBook() {
            if (!this.strSearched || this.strSearched === '') return;
            console.log('bookSearched',this.strSearched);
            bookService.getBookFromApi(this.strSearched)
            .then(items => {
                console.log(items)
                this.booksresults = items;
            })
        },
        bookSelected() {
            console.log('booksresults',this.booksresults);
            console.log('book',book);
            this.selectedBook = this.booksresults[0];
        },
        saveBook() {
            console.log('The book chosen',this.selectedBook);
            eventBus.$emit('bookToAdd', this.selectedBook);
            // bookService.save(this.strSearched)
            //     .then(book => {
            //         console.log('Saved Book:', book);
            //         const msg = {
            //             txt: 'Book saved succesfully',
            //             type: 'success'
            //         }
            //         eventBus.$emit('show-msg', msg)
            //         this.$router.push('/book')
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         const msg = {
            //             txt: 'Error, please try again later',
            //             type: 'error'
            //         }
            //         eventBus.$emit('show-msg', msg)
            //     })
        }
    },
    computed: {
       
    },
    created() {
    //    this.searchBook();
    },
}