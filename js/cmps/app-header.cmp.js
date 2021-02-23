export default {
    template: `
    <section class="app-header-container">
        <section class="app-header main-width flex space-between align-center">
            <div class="flex justify-left">
                <img src="../img/books-logo.png" class="books-logo"/>
                <h1>Miss Book</h1>
            </div>
            <nav>
            <router-link to="/" class="nav-link" active-class="active-link" exact>Home</router-link> |
            <router-link to="/book" class="nav-link" active-class="active-link">Books</router-link> |
            <router-link to="/about" class="nav-link" active-class="active-link">About</router-link>
        </nav>
       </section>
    </section>
    `,
}