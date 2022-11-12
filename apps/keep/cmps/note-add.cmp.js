import { noteService } from '../services/note.service.js'
import { svgService } from '../../../services/svg.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

import canvasNote from './note-canvas.cmp.js'

export default {
    name: 'note-add',
    template: `
            <section class="add-note flex column justify-between">
                <img :src="imgUrl" class="note-img" />
                <component @update="update" :is="note.type" :info="note.info" :isDetails="true"></component>
                <section class="add-note-title">
                    <input v-model="note.info.title" type="text" placeholder="Title"/>
                </section>
                <!-- <section class="focus-content"> -->
                <section class="add-note-content">
                    <input type="text" v-model="content" :placeholder="placeholderText"/>
                </section>
                <section class="action-container flex">
                    <div class="icon" @click="textNote" v-html="getSvg('text1')"></div>
                    <div class="icon" @click="checkListNote" v-html="getSvg('checkBox')"></div>
                    <label>
                        <div class="icon" v-html="getSvg('img')"></div>
                        <input type="file" class="file-input btn" name="image" @change="getImgUrl" style="display: none"/>
                    </label>
                    <div class="icon" @click="canvasNote" v-html="getSvg('pencil2')"></div>
                    <span class="icon">
                    <div @click="mapNote" v-html="getSvg('location')"></div>
                    </span>
                    <span>
                        <button class="close-btn" @click="saveNote">Close</button>                    
                    </span>
                </section>
            </section>
        `,
    created() {
        this.note = noteService.getEmptyNote()
        this.textNote()
    },
    data() {
        return {
            note: null,
            contentPlaceholder: '',
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
                    this.textNote()
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
        },
        textNote() {
            this.note.type = 'textNote'
            this.contentPlaceholder = 'Take a note...'
        },
        canvasNote() {
            this.note.type = 'canvasNote'
        },
        update(prop, toUpdate) {
            this.note.info.canvasUrl = toUpdate
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
    components: {
        canvasNote,
    },
}