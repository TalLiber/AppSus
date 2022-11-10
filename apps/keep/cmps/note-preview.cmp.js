import { svgService } from '../../../services/svg.service.js'

import noteActions from './note-actions.cmp.js'
import textNote from './note-text.cmp.js'

export default {
    name: 'note-preview',
    props: ['note'],
    template: `
        <section class="note-item">
            <router-link :to="{name:'note-details' ,params:{id:note.id}}">
                <section :style='{backgroundColor: note.color}' class="note-preview">
                    <section class="note-title">{{ note.info.title }}</section>
                    <section class="note-content">
                        <component :is="note.type" :info="note.info"></component>
                    </section>
                    <note-actions @update="update" :note="note"></note-actions>
                </section>
                <div class="icon pin-icon">
                    <img style="width:18px; height:18px" :src="getSvg('pin')" alt="" />
                </div>
            </router-link>
        </section>
        `,
    created() {},
    data() {
        return {}
    },
    methods: {
        getSvg(iconName) {
            return svgService.getSvg(iconName)
        },
        update(prop, toUpdate) {
            this.$emit('update', this.note.id, prop, toUpdate)
        }
    },
    computed: {},
    components: {
        textNote,
        noteActions,
    },
}