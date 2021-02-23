import { bookService } from '../services/book.service.js'
import { eventBus } from '../services/event-bus.service.js'

export default {
    template: `
   <section v-if="carToEdit" class="car-edit app-main">
        <h3>{{title}}</h3>
        <form @submit.prevent="save">
            <input type="text" placeholder="Vendor" v-model="carToEdit.vendor">
            <input type="number" placeholder="Max speed" v-model.number="carToEdit.maxSpeed">
            <textarea cols="30" rows="10" v-model="carToEdit.desc"></textarea>
            <button>Save</button>
        </form>
   </section>
    `,
    data() {
        return {
            carToEdit: null
        }
    },
    
    methods: {
        save() {
            carService.save(this.carToEdit)
                .then(car => {
                    console.log('Saved Car:', car);
                    const msg = {
                        txt: 'Car saved succesfully',
                        type: 'success'
                    }
                    eventBus.$emit('show-msg', msg)
                    this.$router.push('/car')
                })
                .catch(err => {
                    console.log(err);
                    const msg = {
                        txt: 'Error, please try again later',
                        type: 'error'
                    }
                    eventBus.$emit('show-msg', msg)
                })
        }
    },
    computed: {
        title() {
            return this.carId ? 'Car Edit' : 'Car Add'
        },
        carId() {
            return this.$route.params.carId
        }
    },
    created() {
        if (this.carId) {
            carService.getById(this.carId).then(car => this.carToEdit = car)
        } else {
            this.carToEdit = carService.getEmptyCar()
        }
    },
    watch : {
        carToEdit: {
            handler(val) { 
                console.log('Car Modified', val)
                // TODO: Call the Validation Service
            },
            deep:true
        }
    }
}