import {bookService} from '../services/book-service.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookList from '../cmps/book-list.cmp.js';
import { eventBus } from '../services/event-bus-service.js';

export default {
    name: 'bookApp',
    template: `
        <section class="book-app">
            <book-filter @filtered="setFilter" />
            <book-list :books="booksToShow"/>
        </section>
    `,
    data() {
        return {
            books: [],
            filterBy: null,
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
    },
    created() {
        this.loadBooks();
        eventBus.$on('reloadBooks', this.loadBooks);
    }
}