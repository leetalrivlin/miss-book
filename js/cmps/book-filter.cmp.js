import bookAdd from './book-add.cmp.js'
export default {
    template: `
    <section class="book-filter-container">
        <section class="book-filter main-width flex justify-center align-center">
            <label for="searchBook">Search a book: </label>    
            <input type="search" name="searchBook" @input="setFilter" placeholder="Enter a book title..." v-model="filterBy.byTitle">
            <div class="price-inputs flex">
                <div>
                    <label for="fromPrice">From price: </label>    
                    <input type="number" name="fromPrice" @input="setFilter" v-model.number="filterBy.fromPrice"/>
                </div>
                <div>
                    <label for="toPrice">To price: </label>    
                    <input type="number" name="toPrice" @input="setFilter" v-model.number="filterBy.toPrice"/>
                </div>
            </div>
            <book-add>Add New Book</book-add>
        </section>
    </section>
    `,
    components: {
        bookAdd,
    },
    data() {
        return {
            filterBy: {
                byTitle: '',
                fromPrice: 0,
                toPrice: Infinity,
            }
        }
    },
    methods:{
        setFilter(){
            console.log(this.filterBy.fromPrice);
            this.$emit('filtered',this.filterBy);
        }
    }
}