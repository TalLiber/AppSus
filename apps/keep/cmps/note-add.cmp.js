import { noteService } from '../services/note.service.js'
import { svgService } from '../../../services/svg.service.js'

export default {
    name: 'note-add',
    template: `
            <section class="add-note flex column justify-between">
                <img :src="imgUrl" class="note-img" />
                <section class="add-note-title">
                    <input v-model="note.info.title" type="text" placeholder="Title"/>
                </section>
                <!-- <section class="focus-content"> -->
                <section class="add-note-content">
                    <input type="text" v-model="content" :placeholder="placeholderText"/>
                </section>
                <section class="action-container flex">
                    <div @click="checkListNote" class="icon">
                        <img style="width:18px; height:18px" :src="getSvg('checkBox')"/>
                    </div>
                    <label>
                        <span class="icon">
                            <img style="width:18px; height:18px" :src="getSvg('img')"/>
                        </span>
                        <input type="file" class="file-input btn" name="image" @change="getImgUrl" style="display: none"/>
                    </label>
                    <div className="icon" @click="mapNote" v-html="getSvg('tag')"></div>
                    <span>
                        <button class="close-btn" @click="saveNote">Close</button>                    
                    </span>
                </section>
            </section>
        `,
    created() {
        this.note = noteService.getEmptyNote()
    },
    data() {
        return {
            note: null,
            contentPlaceholder: 'Take a note...',
            content: ''
        }
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        saveNote() {
            if (this.note.type === 'todoNote') this.createTodos()
            else this.note.info.text = this.content
                //TODO: remove noteService!!
            noteService.save(this.note)
                .then(note => {
                    this.$emit('added', note)
                    this.note = noteService.getEmptyNote()
                    this.content = ''
                    this.contentPlaceholder = 'Take a note...'
                })
        },
        async getImgUrl(ev) {
            const url = await noteService.createImg(ev)
            this.note.imgUrl = url
        },
        checkListNote() {
            this.contentPlaceholder = 'Enter comma separeted list...'
            this.note.type = 'todoNote'
        },
        createTodos() {
            var todos = this.content.split(',')
            todos = todos.map(todo => {
                return {
                    text: todo,
                    doneAt: null
                }
            })
            this.note.info.todos = todos
        },
        mapNote() {
            this.contentPlaceholder = 'Enter loaction...'
            this.note.type = 'mapNote'
        }
    },
    computed: {
        imgUrl() {
            return this.note.imgUrl
        },
        placeholderText() {
            return this.contentPlaceholder
        }
    },
    components: {},
}