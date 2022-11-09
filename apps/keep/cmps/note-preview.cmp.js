import textNote from './note-text.cmp.js'

export default {
    name: 'note-preview',
    props: ['note'],
    template: `
    <section class=""></section>
            <component :is="note.type" :info="note.info"></component>
        `,
    created() {},
    data() {
        return {}
    },
    methods: {},
    computed: {},
    components: {
        textNote,
    },
}