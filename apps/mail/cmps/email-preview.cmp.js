
export default {
    props: ['email'],
    template: `
    <router-link :to="'/mail/list/' + email.id">

        <section @click="openDetails(email.id)"
        className="email-preview flex space-between">
    
        <!-- //todo add star indication -->
            <h4>{{email.name}}</h4>
                <!-- //todo inline style smaller span -->
                <h4>{{email.subject}}<span class="small">{{getShortBody}}</span> </h4>
                
                <!-- //todo design date -->
                <h5>{{email.sentAt}}</h5>
    
        </section>
    </router-link>
`,
    data() {
        return {
        }
    },
    methods: {
        openDetails(emailId){
            console.log(emailId)
        } 
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