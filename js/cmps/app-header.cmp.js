export default {
    template: `
    <section class="app-header-container">
        <section class="app-header main-width flex space-between align-center">
            <div class="flex justify-left">
                <img src="../img/books-logo.png" class="books-logo"/>
                <h1>Miss Book</h1>
            </div>
            <nav>
            <router-link to="/" exact>Home</router-link> |
            <router-link to="/book">Books</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
       </section>
    </section>
    `,
}