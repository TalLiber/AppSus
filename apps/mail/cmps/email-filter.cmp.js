import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: [],
    template: `
    <section className="email-filter flex space-between">
        <input placeholder="Search mail" type="text" 
        v-model="filterBy.name" @input="setFilter" />

        <select v-model="filterBy.readStat" @input="setFilter">
            <option >Read</option>
            <option >unread</option>
        </select>

    </section>
`,
    data() {
        return {
            filterBy: {
                name: '',
                readStat: []
            }
        }
    },
    methods: {
        setFilter() {
           
            eventBus.emit('filter-by', this.filterBy)
        }
    },
    computed: {
    },
    components: {
    }
}