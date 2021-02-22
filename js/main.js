// import bookApp from './pages/book-app.cmp.js';
import appHeader from './cmps/app-header.cmp.js';
import { myRouter } from './routes.js';

const options = {
    el: '#app',
    router: myRouter,
    template: `
        <section>
            <app-header />
            <router-view />
            <!-- <book-app /> -->
            <footer><p> &copy; Coffeerights 2021</p></footer>
        </section>
    `,
    components:{
        appHeader,
        // bookApp,
    }
}

const app = new Vue(options)
