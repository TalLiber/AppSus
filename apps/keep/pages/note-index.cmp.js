import sideNav from '../cmps/side-nav.cmp.js'

export default {
    name: 'note-index',
    props: [],
    template: `
        <section class="main-container">
            <side-nav></side-nav>
            <section class="content-container">
                <router-view></router-view>
            </section>
        </section>

        `,
    created() {},
    data() {
        return {}
    },
    methods: {},
    computed: {},
    components: {
        sideNav,
    },
}