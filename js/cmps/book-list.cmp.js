import {bookService} from '../services/book-service.js';
import bookPreview from './book-preview.cmp.js';
import { eventBus } from '../services/event-bus-service.js';

export default {
    props: ['books'],
    template: `
    <ul class="book-list-container main-width flex flex-wrap clean-list justify-center">
        <li v-for="book in books" :key="book.id" class="book-preview-container flex column space-between" >
            <book-preview :book="book" @click.native="select(book)" />
            <div class="btns-container flex justify-center align-center">
                <button @click="remove(book.id)" class="btn delete-btn"><i class="fa fa-trash btn-icon"></i></button>
                <router-link tag="button" class="btn" :to="'/book/'+book.id"><i class="fa fa-eye btn-icon"></i></router-link>
            </div>
        </li>
    </ul>
    `,
    methods: {
        remove(bookId) {
            bookService.remove(bookId)
                .then(book => {
                    const msg = {
                        txt: 'Book removed succesfully',
                        type: 'success',
                        link: '',
                    }
                    eventBus.$emit('show-msg', msg);
                    eventBus.$emit('reloadBooks');
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
        select(book) {
            this.$emit('selected', book)
        },
    },
    components:{
        bookPreview,
    },
}