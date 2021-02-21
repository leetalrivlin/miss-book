import {bookService} from '../services/book-service.js';

import bookFilter from '../cmps/book-filter.cmp.js';
import bookList from '../cmps/book-list.cmp.js';
import bookDetails from './book-details.cmp.js';

export default {
    template: `
        <section class="book-app">
            <book-filter @filtered="setFilter" />
            <book-list :books="booksToShow" @selected="selectBook" @remove="removeBook"/>
            <book-details v-if="selectedBook" :book="selectedBook" @close="selectedBook = null"/>
        </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null,
            selectedBook: null,
        }
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        selectBook(book) {
            this.selectedBook = book;
        },
        removeBook(bookId) {
            bookService.remove(bookId)
        },
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const searchStr = this.filterBy.byTitle.toLowerCase();
            const booksToShow = this.books.filter(book => {
                return book.title.toLowerCase().includes(searchStr) &&
                this.filterBy.fromPrice <= book.listPrice.amount  &&
                this.filterBy.toPrice >= book.listPrice.amount
            });
            return booksToShow
        }
    },
    components: {
        bookList,
        bookFilter,
        bookDetails,
    },
    created() {
        this.books = bookService.query();
    }
}