import { noteService } from '../services/note.service.js'
import notePreview from '../cmps/note-preview.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'
import addNote from '../cmps/note-add.cmp.js'

export default {
    name: 'keep-notes',
    props: [],
    template: `
            <section class="notes-content">
            <label class="gallery-img upload"><div class="upload-header">Upload Image </div>
                <input type="file" class="file-input btn" name="image" @change="onImgInput" style="display: none"/>
            </label>

                <note-filter @filter="setFilter" />
                <add-note @added="addNote" />
                <section class="notes-list" v-if="notes">
                    <note-preview @update="updateNote" v-for="(note, idx) in notesToShow" :note="note" :key="idx"/>
                </section>
                <router-view></router-view>
            </section>

        `,
    created() {
        this.getNotes()
    },
    data() {
        return {
            notes: null,
            filterBy: ''
        }
    },
    methods: {
        getNotes() {
            noteService.getNotesToShow(false)
                .then(notes => {
                    this.notes = notes
                })
        },
        addNote(note) {
            this.notes.push(note)
        },
        updateNote(noteId, prop, toUpdate) {
            // console.log(noteId, prop, toUpdate);
            noteService.updateNote(noteId, prop, toUpdate)
                .then((updatedNote) => {
                    if (prop === 'isTrashed') this.removeNote(noteId)
                    else {
                        const idx = this.notes.findIndex(note => note.id === updatedNote.id)
                        this.notes.splice(idx, 1, updatedNote)
                    }
                })

            // console.log(note);
            // updateTitle
            // uptaTxtx
            // uptdatecolor
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
        removeNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            this.notes.splice(idx, 1)
        },
        otherActions() {
            // duplicate
        },
        onImgInput(ev) {
            noteService.createImg(ev, 'loadImg')
        },
    },
    computed: {
        notesToShow() {
            const regex = new RegExp(this.filterBy.title, 'i')
            var notes = this.notes.filter(note => regex.test(note.info.title))
            return notes // TODO: add isTrashed filter
        }
    },
    components: {
        notePreview,
        addNote,
        noteFilter
    },

    watch: {
        $route: {
            handler(newValue) {
                if (newValue.query.deleted) this.removeNote(newValue.query);
                this.getNotes()
            },
            deep: true
        }
    }
}