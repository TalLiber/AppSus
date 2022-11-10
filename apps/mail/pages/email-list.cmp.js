import { emailService } from '../services/mail.service.js'
import { eventBus } from "../../../services/event-bus.service.js"

import emailPreview from '../cmps/email-preview.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'

export default {
    props: [],
    template: `
    <section v-if="emails" className="email-list">
    
    <ul class="clean-list">
        <li  v-for="email in emailsToShow" :key="email.id">
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
            filterTab: '',
            filterBy: {}
            // filteredEmails:
        }
    },

    created() {
        this.filterTab = this.$route.query.tab
        this.getEmailsByTab()

        eventBus.on('filter-by', this.setFilterByProp)
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
        setFilterByProp(filterBy) {

            this.filterBy = filterBy
            console.log(this.filterBy)
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
        },
        emailsToShow() {
            const { name, readStat } = this.filterBy
            if (!name && !readStat) return this.emails
            const regex = new RegExp(name, 'i')
            var emails = this.emails.filter(e => regex.test(e.name))

            if (readStat !== undefined) {
                if (readStat === 'Read') emails = emails.filter(e => e.isRead)
                else emails = emails.filter(e => !e.isRead)
            }
            return emails
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
        filterBy: {
            handler() {
                this.emailsToShow
            },
            deep: true
        },
    }
}