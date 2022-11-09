import { noteService } from '../services/note.service.js'
import notePreview from '../cmps/note-preview.cmp.js'

export default {
    name: 'note-index',
    props: [],
    template: `
        <h1>keep</h1>
        <section class="main-content">
            <section class="side-nav"></section>
            <section class="notes-content">
                <section class="add-note"></section>
                <section class="notes-list" v-if="notes">
                    <note-preview v-for="(note, idx) in notes" :note="note" :key="idx" class="note-preview"/>
                </section>
            </section>
        </section>
        `,
    created() {
        noteService.query()
            .then(notes => this.notes = notes)
    },
    data() {
        return {
            notes: null
        }
    },
    methods: {},
    computed: {},
    components: {
        notePreview
    },
}