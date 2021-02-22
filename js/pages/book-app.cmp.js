import {bookService} from '../services/book-service.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookList from '../cmps/book-list.cmp.js';
import bookDetails from './book-details.cmp.js';

export default {
    template: `
        <section class="book-app">
            <book-filter @filtered="setFilter" />
            <book-list v-if="!selectedBook" :books="booksToShow" @selected="selectBook" @remove="removeBook"/>
            <!-- <book-details v-if="selectedBook" :book="selectedBook" @close="selectedBook = null"/> -->
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
        loadBooks() {
            bookService.query()
                .then(books => this.books = books)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        selectBook(book) {
            this.selectedBook = book;
        },
        removeBook(bookId) {
            // 
            bookService.remove(bookId)
                .then(this.loadBooks)
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
        // bookService._createBooks();
        // this.books = bookService.query();
        this.loadBooks();
    }
}