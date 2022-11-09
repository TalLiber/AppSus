import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: [],
    template: `
        <section class="email-folder-list flex column">
        <!-- //todo-svg for all divs\ -->
        <h2>email-folder-list</h2>
        <div>
        Compose
        </div>
        <div @click="setToInbox()">
        inbox

        </div>
        <div @click="setTab('star')">
        starred
        </div>
        <div>
        important
        </div>
        <div>
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
        setToInbox(){
            eventBus.emit('setFilterTab','')
        } ,
        setTab(tab){
            eventBus.emit('setFilterTab',tab)
        }
    },
    computed: {
    },
    components: {
    }
}