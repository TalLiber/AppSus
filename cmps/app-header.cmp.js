export default {
    template: `
        <header class="app-header">
            <h1>AppSus</h1>
            <nav>
                <router-link to="/">Home</router-link> | 
                <router-link to="/about">About</router-link> |
                <router-link to="/mail/list?tab=inbox">Mail</router-link> |
                <router-link to="/keep/notes">Keep</router-link>
            </nav>
        </header>
    `,
}