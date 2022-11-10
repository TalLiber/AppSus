export default {
    name: 'side-nav',
    props: [],
    template: `
            <router-link :to="{name:'keep-notes'}">Notes</router-link> |
            <router-link :to="{name:'keep-trash'}">Trash</router-link> 
        `,
    components: {},
    created() {},
    data() {
        return {}
    },
    methods: {},
    computed: {},
}