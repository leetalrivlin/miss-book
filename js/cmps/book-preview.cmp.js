export default {
    props:['book'],
    template:`
    <section class="book-preview">
        <img :src="book.thumbnail" class="preview-img"/>
        <p>Title: {{book.title}}</p>
        <p>Price: {{showCurrencyNumber}}</p>
    </section>
    `,
    computed: {
        showCurrencyNumber() {
            return this.book.listPrice.amount.toLocaleString('de-DE', { style: 'currency', currency: this.book.listPrice.currencyCode })
        },
    },
}