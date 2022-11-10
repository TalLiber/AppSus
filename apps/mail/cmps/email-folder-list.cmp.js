import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: [],
    template: `
        <section class="email-folder-list flex column">
        <!-- //todo-svg for all divs\ -->
        <h2>email-folder-list</h2>
        <div @click="composeEmail()">
        Compose
        </div>
        <div @click="setTab('inbox')">
        inbox

        </div>
        <div @click="setTab('star')">
        starred
        </div>
        <div>
        important
        </div>
        <div @click="setTab('sent')">
        sent
        </div>
        <div @click="setTab('trash')">
            trash
        </div>

        </section>

`,
    data() {
        return {
        }
    },
    methods: {
        setTab(tab) {
            this.$router.push({ path: '/mail/list', query: { tab: `${tab}` } })
        },
        composeEmail() {
            const tab = this.$route.query.tab
            this.$router.push({ path: '/mail/list', 
            query: { tab, compose: 'new' }})
        }
    },
    computed: {
    },
    components: {
    }
}