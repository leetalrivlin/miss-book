import {bookService} from '../services/book-service.js';

export default {
    name: 'reviewAdd',
    props: ['bookId'],
    template: `
        <section v-if="bookId" class="review-add-container">
            <h2>Add Your Rating</h2>
            <form @submit.prevent="save" class="flex column">
                <label for="fullName">Full Name:</label>
                <input type="text" placeholder="Enter Full Name" v-model="review.userName" name="fullName" ref="fullName">
                <label for="rating">Your Rating:</label>
                <select v-model.number="review.rate">
                    <option v-for="num in numbers" :key="num" name="rating">{{num}}</option>
                </select>
                <label for="readAt">Read the book at:</label>
                <input type="date" name="readAt" v-model="review.readAt"/>
                <label for="freeTxt">Some more:</label>
                <textarea name="freeTxt" cols="30" rows="6" v-model="review.txt"></textarea>
                <button>Submit</button>
            </form>

            <section v-if="reviews">
                <hr />
                <div v-for="review in reviews">
                    <p>Name: {{review.userName}}</p>
                    <p>Rating: {{review.rate}}</p>
                    <p>Read the book at: {{review.readAt}}</p>
                    <p>{{review.txt}}</p>
                    <hr />
                </div>
            </section>
        </section>
    `,
    data() {
        return {
            numbers: [1, 2, 3, 4, 5],
            review: {
                userName: 'Books Reader',
                rate: 0,
                readAt: this.formatDate,
                txt: '',
            },
            reviews: [],
        }
    },
    computed: {
        formatDate() {
            const date = new Date();
            return (Number(date.getMonth())+1)+'-'+date.getDate()+'-'+date.getFullYear();
        }
    },
    methods: {
        save() {
            bookService.addReview(this.bookId, this.review)
            .then(book => {
                bookService.save(book);
            })
        }

    },
    created() {
        const id = this.$route.params.bookId
            bookService.getById(id)
                .then(book => this.reviews = book.reviews);
      },
    mounted() {
        this.$refs.fullName.focus();
    }
}