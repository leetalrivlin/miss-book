import { bookService } from '../services/book-service.js'
import { eventBus } from '../services/event-bus-service.js'

export default {
    template: `
   <section class="book-add-container">
    <input type="search" placeholder="Add a new book">
   </section>
    `,
    data() {
        return {
            bookSearched: null,
            booksresults: null,
        }
    },
    
    methods: {
        searchBook() {
            bookService.getBookFromApi()
            .then(items => {
                console.log(items)
                this.booksresults = items;
            })
        }
        // save() {
        //     bookService.save(this.bookAdded)
        //         .then(book => {
        //             console.log('Saved Book:', book);
        //             const msg = {
        //                 txt: 'Book saved succesfully',
        //                 type: 'success'
        //             }
        //             eventBus.$emit('show-msg', msg)
        //             this.$router.push('/book')
        //         })
        //         .catch(err => {
        //             console.log(err);
        //             const msg = {
        //                 txt: 'Error, please try again later',
        //                 type: 'error'
        //             }
        //             eventBus.$emit('show-msg', msg)
        //         })
        // }
    },
    computed: {
       
    },
    created() {
       this.searchBook();
    },
}