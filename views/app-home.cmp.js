

export default {
    template: `
        <section class="home-page flex space-even">
        <router-link to="/mail/list?tab=inbox">
            <div class="gmail-wrapper">
                <img  :src="gmailUrl" alt="" />
            </div>
        </router-link>

        <router-link to="/keep/notes">
            <div class="keep-wrapper">
                <img :src="keepUrl" alt="" />
            </div>
        </router-link>

        </section>
    `,
    data() {
        return {
            gmailUrl: '../assets/img/gmailLogo.png',
            keepUrl: '../assets/img/keepLogo.png'
        }
    }
}