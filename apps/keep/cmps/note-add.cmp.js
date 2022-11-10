import { noteService } from '../services/note.service.js'
import { svgService } from '../../../services/svg.service.js'

export default {
    name: 'note-add',
    template: `
            <section class="add-note">
                <img :src="imgUrl" class="note-img" />
                <span class="add-note-title">
                    <input v-model="note.info.title" type="text" placeholder="Title"/>
                </span>
                <span class="add-note-content">
                    <input type="text" v-model="note.info.text" placeholder="Take a note..."/>
                </span>
                <button @click="saveNote">Close</button>                    
                <label>
                    <span class="icon">
                        <img style="width:18px; height:18px" :src="getSvg('img')"/>
                    </span>
                    <input type="file" class="file-input btn" name="image" @change="getImgUrl" style="display: none"/>
                </label>
            </section>
        `,
    created() {
        this.note = noteService.getEmptyNote()
    },
    data() {
        return {
            note: null,
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        saveNote() {
            noteService.save(this.note)
                .then(note => {
                    this.$emit('added', note)
                    this.note = noteService.getEmptyNote()
                })
        },
        async getImgUrl(ev) {
            const url = await noteService.createImg(ev)
            this.note.imgUrl = url
        }
    },
    computed: {
        imgUrl() {
            return this.note.imgUrl
        }
    },
    components: {},
}