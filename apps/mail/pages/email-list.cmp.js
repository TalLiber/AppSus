import { emailService } from '../services/mail.service.js'
import { eventBus } from "../../../services/event-bus.service.js"

import emailPreview from '../cmps/email-preview.cmp.js'

export default {
    props: [],
    template: `
    <section className="email-list">
    
    <ul class="clean-list">
        <li v-for="email in emails" :key="email.id">
       <email-preview  :email="email"
       @isRead="setEmailReadStat"
       @toggleStar="toggleStarTab"/>

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
            .then(emails => this.emails = emails)

        eventBus.on('setFilterTab', this.setFilterTab)
    },
    methods: {
        getEmailsByTab() {
            emailService.query()
                .then(emails => this.emails = emails)
                .then(() => {
                    //inbox||starred
                    let filteredEmails
                    if (!this.filterTab) {
                        filteredEmails = this.emails.filter(e => (e.tab === 'inbox' || e.tab === 'star'))
                    }
                    else filteredEmails = this.emails.filter(e => e.tab === this.filterTab)
                    this.emails = filteredEmails
                })
        },
        setFilterTab(tab) {
            this.filterTab = tab
        },
        setEmailReadStat(email) {
            emailService.put(email)
        },
        toggleStarTab(email) {
            emailService.put(email)
        }
    },
    computed: {
    },
    components: {
        emailPreview
    },
    watch: {
        filterTab: {
            handler() {
                this.getEmailsByTab()
            }
        }
    }
}