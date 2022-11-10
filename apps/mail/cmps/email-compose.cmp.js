import { emailService } from '../services/mail.service.js'

export default {
    props: [],
    template: `
    <section class="email-compose flex column">
        <header class="flex space-between">
            <h4>New Message</h4>
            <div>
                
                <button @click="this.$router.back()">X</button>
            </div>
        </header>
            <form class="flex column grow" @submit.prevent="sendEmail" >
                <input placeholder="To" type="text" v-model="emailProps.to" />
                <input placeholder="Subject" type="text" v-model="emailProps.subject" />
                <textarea name="" class="grow" v-model="emailProps.body" ></textarea>
                <button>Send</button>
            </form>
    </section>
    `,
    data() {
        return {
            emailProps: {
                to: '',
                subject: '',
                body: ''
            }
        }
    },
    //todo-consider make that cmp stupid and emit props
    methods: {
        sendEmail() {
            const { emailProps: { to, subject, body } } = this
            emailService.sendEmail(to,subject,body)
            .then(()=>{
                this.$router.back()
            })
        }
    },
    computed: {
    },
    components: {
    }
}