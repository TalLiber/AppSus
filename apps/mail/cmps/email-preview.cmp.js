
export default {
    props: ['email'],
    template: `
    <section className="email-preview flex space-between">

        <h4>{{email.name}}</h4>
        <div>
            <!-- //todo inline style -->
        <h4>{{email.subject}}</h4>
            <span>{{getShortBody}}</span> 
            </div>
            <!-- //todo design date -->
            <h5>{{email.sentAt}}</h5>

    </section>
`,
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        getShortBody() {
            if (this.email.body < 10) return this.email.body
            return '-'+ this.email.body.slice(0, 10) + '...'
        }
    },
    components: {

    }
}