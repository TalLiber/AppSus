import textNote from './note-text.cmp.js'

export default {
    name: 'note-preview',
    props: ['note'],
    template: `
            <section class="note-title"></section>
            <section class="note-content">
                <component :is="note.type" :info="note.info"></component>
            </section>
            <section class="note-actions"></section>
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