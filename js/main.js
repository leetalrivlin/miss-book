import bookApp from './pages/book-app.cmp.js';
import appHeader from './cmps/app-header.cmp.js';

const options = {
    el: '#app',
    template: `
        <section>
            <app-header />
            <book-app />
        </section>
    `,
    components:{
        appHeader,
        bookApp,
    }
}

const app = new Vue(options)
