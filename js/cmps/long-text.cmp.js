export default {
    props:['txt'],
    template:`
    <section class="book-description">
        <p><span class="detail-title">Description: </span>{{txtDisplay}}
           <button v-if="isLongTxt" @click="toggleShow" class="show-more-btn">{{btnTxt}}</button>
        </p>
        
    </section>
    `,
    data() {
        return {
            isLongTxt: false,
            isShowMore: false,
        }
    },
    methods: {
        toggleShow() {
            this.isShowMore = !this.isShowMore;
        }
    },
    computed: {
        txtDisplay() {
            if (this.txt.length > 100) {
                this.isLongTxt = true;
                if (!this.isShowMore) {
                    return this.txt.substring(0, 100);
                }
                return this.txt;
            } 
            return this.txt;
        },
        btnTxt() {
            return (this.isShowMore) ? '...Show less' : 'Show more...';
        }
    },
}