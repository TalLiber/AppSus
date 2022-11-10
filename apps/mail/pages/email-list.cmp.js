import { emailService } from '../services/mail.service.js'

import emailPreview from '../cmps/email-preview.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'

export default {
    props: [],
    template: `
    <section v-if="emails" className="email-list">
    
    <ul class="clean-list">
        <li  v-for="email in emails" :key="email.id">
       <email-preview  :email="email" :filterTab="filterTab"
       @isRead="setEmailReadStat"
       @toggleStar="toggleStarTab"/>
        </li>
    </ul>

    <email-compose v-if="isCompose"> </email-compose>

    </section>
`,
    data() {
        return {
            emails: null,
            filterTab: ''
        }
    },

    created() {
        this.filterTab = this.$route.query.tab
        this.getEmailsByTab()
    },

    methods: {
        getEmailsByTab() {
            emailService.query()
                .then(emails => this.emails = emails)
                .then(() => {
                    //inbox||starred
                    let filteredEmails
                    if (this.filterTab === 'inbox') {
                        filteredEmails = this.emails.filter(e => (e.tab === 'inbox' || e.tab === 'star'))
                    }
                    else filteredEmails = this.emails.filter(e => e.tab === this.filterTab)
                    this.emails = filteredEmails
                })
        },
        setEmailReadStat(email) {
            emailService.put(email)
        },
        toggleStarTab(email) {
            emailService.put(email)
        }
    },
    computed: {
        isCompose() {
            if (this.$route.query.compose) return true
            return false

        }
    },
    components: {
        emailPreview,
        emailCompose
    },
    watch: {
        '$route.query.tab': {
            handler() {
                this.filterTab = this.$route.query.tab
                this.getEmailsByTab()
            }
        },
    }
}