
export default {
    props:['book'],
    template:`
    <section class="book-details-container">
        <button @click="$emit('close')" class="x-btn">X</button>

        <img src="../img/sale-sign.png" v-if="book.listPrice.isOnSale" class="sale-sign" />

        <p>Title: {{book.title}}</p>
        <p>Subtitle: {{book.subtitle}}</p>
        <p>Authors: {{book.authors[0]}}</p>
        <p>Published Date: {{book.publishedDate}} <span>{{publishedDisplay}}</span></p>
        <p>Description: {{book.description}}</p>
        <p>Page Count: {{book.pageCount}} <span>{{pageCountDisplay}}</span></p>
        <p>Categories: {{book.categories[0]}}</p>
        <p>Image: {{book.thumbnail}}</p>
        <p>Language: {{book.language}}</p>
        <p>Price: <span :class="className">{{showCurrencyNumber}}</span></p>
        <p>Currency Symbol: {{book.listPrice.currencyCode}}</p> 
    </section>
    `,
    data() {
        return {
        }
    },
    methods: {

    },
    computed: {
        pageCountDisplay() {
            let str = '';
            if (this.book.pageCount > 500)  str = '- Long reading';
            if (this.book.pageCount > 200 )  str = '- Decent Reading';
            if (this.book.pageCount < 100 )  str = '- Light Reading';
            return str;
        },
        publishedDisplay() {
            let str = '';
            if (this.book.publishedDate > 10) str = '- Veteran Book';
            if (this.book.publishedDate < 1) str = '- New!';
            return str;
        },
        showCurrencyNumber() {
            return this.book.listPrice.amount.toLocaleString('de-DE', { style: 'currency', currency: this.book.listPrice.currencyCode })
        },
        className() {
           if (this.book.listPrice.amount > 150) return 'red';
           if (this.book.listPrice.amount < 20) return 'green';
        }
    
    },
    components: {
      
    },
    created() {
       
    }
}