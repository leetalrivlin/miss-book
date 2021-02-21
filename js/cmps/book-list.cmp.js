import bookPreview from './book-preview.cmp.js';

export default {
    props: ['books'],
    template: `
    <ul class="book-list-container flex flex-wrap clean-list justify-center">
        <li v-for="book in books" :key="book.id" class="book-preview-container flex column space-between" >
            <book-preview :book="book" @click.native="select(book)" />
            <div class="btns-container flex justify-center">
                <button @click="remove(book.id)" class="btn">Delete book</button>
                <button @click="select(book)" class="btn">Details</button>
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