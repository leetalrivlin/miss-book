import bookApp from './pages/book-app.cmp.js'

const options = {
    el: '#app',
    template: `
        <section>
            <h1>My app</h1>
            <book-app />
        </section>
    `,
    components:{
        bookApp,
    }
}

const app = new Vue(options)
