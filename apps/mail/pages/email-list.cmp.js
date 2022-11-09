import { emailService } from '../services/mail.service.js'

import emailPreview from '../cmps/email-preview.cmp.js'

export default {
    props: [],
    template: `
    <section className="email-list">
    
    <ul class="clean-list">
        <li v-for="email in emails" :key="email.id"
        class="">
       <email-preview  :email="email"/>

        </li>
    </ul>

    </section>
`,
    data() {
        return {
            emails: [],
            filterTab: ''
        }
    },
    created() {
        emailService.query()
            .then(emails => this.emails = this.getEmailsByTab(emails))
    },
    // todo-maybe to change that hook
    mounted(){
        emailService.query()
        .then(emails => this.emails = this.getEmailsByTab(emails))
    },
    methods: {
        getEmailsByTab(emails) {
            //inbox||starred
            let filteredEmails
            if (!this.filterTab) {
                filteredEmails = emails.filter(e => (e.tab === 'inbox' || e.tab === 'star'))
            }
            return filteredEmails
        }
    },
    computed: {
    },
    components: {
        emailPreview
    }
}