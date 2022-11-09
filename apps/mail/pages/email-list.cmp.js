import { emailService } from '../services/mail.service.js'

import emailPreview from '../cmps/email-preview.cmp.js'

export default {
    props: [],
    template: `
    <section className="email-list">
    
    <ul class="clean-list">
        <li v-for="email in emails" :key="email.id"
        class="">
       <email-preview :email="email "/>

        </li>
    </ul>

    </section>
`,
    data() {
        return {
            emails: []
        }
    },
    created() {
        emailService.query()
            .then(emails => this.emails = emails)
    },
    methods: {
    },
    computed: {
    },
    components: {
        emailPreview
    }
}