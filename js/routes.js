import homePage from './pages/home-page.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage,
    },
]

export const myRouter = new VueRouter({ routes });