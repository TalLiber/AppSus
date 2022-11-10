import { eventBus } from "../../../services/event-bus.service.js"

export default {
    props: [],
    template: `
    <section className="email-filter flex space-between">
        <input placeholder="Search mail" class="grow" type="text" 
        v-model="filterBy.name" @input="setFilter" />

        <div class="select-wrapper flex">
        <!-- //sort -->
        <select v-model="sortBy" @change="setSort">
        <option value="name">name</option>
            <option value="date">date</option>
        </select>

        <!-- //todo set the function to onChange -->
        <select  v-model="filterBy.readStat" @input="setFilter" >
            <option >All</option>
            <option >Read</option>
            <option >unread</option>
        </select>
        </div>

    </section>
`,
    data() {
        return {
            filterBy: {
                name: '',
                readStat: []
            },
            sortBy: 'name'
        }
    },
    methods: {
        setFilter() { 
            eventBus.emit('filter-by', this.filterBy)
        },
        setSort(){
            eventBus.emit('sort-by',this.sortBy)
        }
    },
    computed: {
    },
    components: {
    }
}