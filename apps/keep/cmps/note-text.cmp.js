export default {
    name: 'note-text',
    props: ['info'],
    template: `
            <div contenteditable="true" @input="onChangeText">{{ info.text }}</div>
        `,
    components: {},
    created() {},
    data() {
        return {}
    },
    methods: {
        onChangeText(ev) {
            this.$emit('update', 'text', ev.target.innerText)
        }
    },
    computed: {},
}