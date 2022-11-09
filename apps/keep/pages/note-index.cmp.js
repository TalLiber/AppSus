import { noteService } from '../services/note.service.js'
import notePreview from '../cmps/note-preview.cmp.js'
import addNote from '../cmps/note-add.cmp.js'

export default {
    name: 'note-index',
    props: [],
    template: `
        <section class="main-content">
            <section class="side-nav"></section>
            <section class="notes-content">
                <add-note @added="addNote"></add-note>
                <section class="notes-list" v-if="notes">
                    <note-preview v-for="(note, idx) in notes" :note="note" :key="idx"/>
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
    methods: {
        addNote(note) {
            this.notes.push(note)
        }
    },
    computed: {},
    components: {
        notePreview,
        addNote,
    },
}