export default {
    template: `
    <section class="book-filter-container">
        <section class="book-filter main-width flex justify-left">
            <label> Search a book: </label>    
            <input type="search" @input="setFilter" placeholder="Enter a book title..." v-model="filterBy.byTitle">
            <div class="price-inputs flex">
                <div>
                    <label> From price: </label>    
                    <input type="number" @input="setFilter" v-model.number="filterBy.fromPrice"/>
                </div>
                <div>
                    <label> To price: </label>    
                    <input type="number" @input="setFilter" v-model.number="filterBy.toPrice"/>
                </div>
            </div>
        </section>
    </section>
    `,
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