import { noteService } from '../services/note.service.js'

export default {
    name: 'note-add',
    template: `
            <section class="add-note">
                <section class="add-note-title">
                    <input v-model="note.info.title" type="text" placeholder="Title"/>
                </section>
                <section class="add-note-content">
                    <input type="text" v-model="note.info.text" placeholder="Take a note..."/>
                </section>
                <button @click="saveNote">Close</button>
            </section>
        `,
    created() {
        this.note = noteService.getEmptyNote()
    },
    data() {
        return {
            note: null
        }
    },
    methods: {
        saveNote() {
            noteService.save(this.note)
                .then(note => {
                    this.$emit('added', note)
                    this.note = noteService.getEmptyNote()
                })
        },
    },
    computed: {},
    components: {},
}