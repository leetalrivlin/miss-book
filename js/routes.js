import homePage from './pages/home-page.cmp.js';
import about from './pages/about.cmp.js';
import bookApp from './pages/book-app.cmp.js';
import bookDetails from './pages/book-details.cmp.js';

const routes = [
    {
        path: '/',
        component: homePage,
    },
    {
        path: '/about',
        component: about
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
]

export const myRouter = new VueRouter({ routes });