import {bookService} from '../services/book-service.js';

export default {
    props: ['bookId'],
    template: `
        <section class="review-add-container">
            <form @submit.prevent="save" class="flex column">
                <label for="fullName">Full Name:</label>
                <input type="text" placeholder="Enter Full Name" v-model="review.userName" name="fullName" ref="fullName">
                <label for="rating">Your Rating:</label>
                <select>
                    <option v-for="num in numbers" :key="num" value="num" name="rating">{{num}}</option>
                </select>
                <label for="readAt">Read the book at:</label>
                <input type="date" name="readAt" />
                <label for="freeTxt">Some more:</label>
                <textarea name="freeTxt" cols="30" rows="6"></textarea>
            </form>
        </section>
    `,
    data() {
        return {
            numbers: [1, 2, 3, 4, 5],
            review: {
                userName: 'Books Reader',
                rate: 0,
                readAt: null,
                txt: '',
            },
        }
    },
    methods: {
        save() {
            bookService.addReview(bookId, review)
        }

    },
    mounted() {
        this.$refs.fullName.focus();
    }
}