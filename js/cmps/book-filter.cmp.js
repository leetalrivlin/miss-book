export default {
    template: `
    <section class="book-filter">
        <label> Search a book: </label>    
        <input type="text" @input="setFilter" placeholder="Enter a book title..." v-model="filterBy.byTitle">
        <label> From price: </label>    
        <input type="number" @input="setFilter" v-model.number="filterBy.fromPrice"/>
        <label> To price: </label>    
        <input type="number" @input="setFilter" v-model.number="filterBy.toPrice"/>
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