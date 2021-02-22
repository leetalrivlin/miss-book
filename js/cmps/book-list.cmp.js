import bookPreview from './book-preview.cmp.js';

export default {
    props: ['books'],
    template: `
    <ul class="book-list-container main-width flex flex-wrap clean-list space-around">
        <li v-for="book in books" :key="book.id" class="book-preview-container flex column space-between" >
            <book-preview :book="book" @click.native="select(book)" />
            <div class="btns-container flex justify-center align-center">
                <button @click="remove(book.id)" class="btn delete-btn"><i class="fa fa-trash btn-icon"></i></button>
                <button @click="select(book)" class="btn details-btn"><i class="fa fa-eye btn-icon"></i></button>
            </div>
        </li>
    </ul>
    `,
    data() {
        return {

        }
    },
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId)
        },
        select(book) {
            this.$emit('selected', book)
        },
        // logId(bookId) {
        //     console.log('Id is', bookId);
        // }
    },
    components:{
        bookPreview,
    }
}