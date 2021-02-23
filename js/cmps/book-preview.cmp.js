export default {
    props:['book'],
    template:`
    <section class="book-preview flex column align-center">
        <img :src="book.thumbnail" class="preview-img"/>
        <h4>{{book.title}}</h4>
        <p>{{showCurrencyNumber}}</p>
    </section>
    `,
    computed: {
        showCurrencyNumber() {
            return this.book.listPrice.amount.toLocaleString('de-DE', { style: 'currency', currency: this.book.listPrice.currencyCode })
        },
    },
}