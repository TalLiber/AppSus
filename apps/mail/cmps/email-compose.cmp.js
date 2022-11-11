import { emailService } from '../services/mail.service.js'
import { svgService } from '../../../services/svg.service.js'

export default {
    props: [],
    template: `
    <section class="email-compose flex column">
        <header class="flex space-between align-center">
            <h4>New Message</h4>
            <div>
                <button @click="this.$router.back()">
                <img style="width:18px; height:18px" :src="getMailSvg('button1')" alt="" />
                </button>
            </div>
        </header>
        <section class="main-content flex grow">
            <form class="flex column grow" @submit.prevent="sendEmail" >
                <input placeholder="To" type="text" v-model="emailProps.to" />
                <input placeholder="Subject" type="text" v-model="emailProps.subject" />
                <textarea name="" class="grow" v-model="emailProps.body" ></textarea>
                <button class="send-btn">Send</button>
            </form>
            </section>
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
        },
        getMailSvg(iconName) {
            return svgService.getMailSvg(iconName)
        },
    },
    computed: {
    },
    components: {
    }
}