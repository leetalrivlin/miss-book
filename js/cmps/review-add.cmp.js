export default {
    name: 'reviewAdd',
    props: ['bookId', 'reviews'],
    template: `
        <section v-if="bookId" class="review-add-container">
            <h2>Add Your Rating</h2>
            <form @submit.prevent="save" class="flex column">
                <label for="fullName">Full Name:</label>
                <input type="text" placeholder="Enter Full Name" v-model="review.userName" name="fullName" ref="fullName">
                <label for="rating">Your Rating:</label>
                <select v-model.number="review.rate">
                    <option v-for="star in stars" :key="star" name="rating">{{star}}</option>
                </select>
                <label for="readAt">Read the book at:</label>
                <input type="date" name="readAt" v-model="review.readAt"/>
                <label for="freeTxt">Some more:</label>
                <textarea name="freeTxt" cols="30" rows="6" v-model="review.txt"></textarea>
                <button>Submit</button>
            </form>

            <section v-if="reviews" class="reviews-container">
                <hr />
                <div v-for="(review, idx) in reviews">
                    <p>Name: {{review.userName}}</p>
                    <p>Rating: {{review.rate}}</p>
                    <p>Read the book at: {{review.readAt}}</p>
                    <p>{{review.txt}}</p>
                    <button @click="removeReview(idx)" class="delete-review-btn btn">X</button>
                    <hr />
                </div>
            </section>
        </section>
    `,
    data() {
        return {
            stars: ['⭐', '⭐⭐' ,'⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
            review: {
                userName: 'Books Reader',
                rate: 0,
                readAt: this.formatDate,
                txt: '',
            },
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
            this.$emit('saveReview', this.review)
        },
        removeReview(reviewIdx) {
            this.$emit('removed', reviewIdx);
        },
    },
    created() {
      },
    mounted() {
        this.$refs.fullName.focus();
    }
}