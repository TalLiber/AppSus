import { svgService } from '../../../services/svg.service.js'

export default {
    name: 'note-actions',
    props: ['note'],
    template: `
            <section class="note-actions flex">
                <div class="icon">
                    <img @click.prevent="trash" style="width:18px; height:18px" :src="getSvg('deleteForever')"/>
                </div>
                <label class="icon">
                    <img @click.stop="color" style="width:18px; height:18px" :src="getSvg('colorPallet')"/>
                    <input @click.stop @input="color" type="color" style="display: none" value="note.color"/>
                </label>
                <label>
                    <span class="icon">
                        <img @click.stop style="width:18px; height:18px" :src="getSvg('img')"/>
                    </span>
                    <input @click.stop type="file" class="file-input btn" name="image" @change="updateImgUrl" style="display: none"/>
                </label>
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
        trash() {
            this.$emit('update', 'isTrashed', true)
        },
        color(ev) {
            this.$emit('update', 'color', ev.target.value);
        },
        updateImgUrl(ev) {
            this.$emit('updateImgUrl', ev)
        }
    },
    computed: {},
    components: {},
}