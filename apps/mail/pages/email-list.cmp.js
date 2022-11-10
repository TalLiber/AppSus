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
            <!-- //todo consider make preview as smart cmp -->
       <email-preview  :email="email" :filterTab="filterTab"
       @isRead="setEmailReadStat"
       @toggleStar="toggleStarTab"
       @toTrashFolder="setToTrashFolder"
       @removeEmail="removeEmail"/>
        </li>
    </ul>

    <email-compose v-if="isCompose"> </email-compose>

    </section>
`,
    data() {
        return {
            emails: null,
            filterTab: '',
            filterBy: {},
            sortBy: ''
        }
    },

    created() {
        this.filterTab = this.$route.query.tab
        this.getEmailsByTab()
        eventBus.on('filter-by', this.setFilterByProp)
        eventBus.on('sort-by', this.setSortByProp)
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
        },
        setSortByProp(sortBy) {
            this.sortBy = sortBy
        },
        setEmailReadStat(email) {
            emailService.put(email)
            //todo-compact those funcs-add query() to render relevant
            // .then(()=>emailService.query()
            // .then(emails => this.emails = emails))
        },
        toggleStarTab(email) {
            emailService.put(email)
        },
        setToTrashFolder(email) {
            emailService.put(email)
                .then(() => this.getEmailsByTab())

        },
        removeEmail(email) {
            emailService.removeEmail(email.id)
                .then(() => this.getEmailsByTab())
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

            if (readStat.length && readStat !== 'All') {
                if (readStat === 'Read') emails = emails.filter(e => e.isRead)
                else emails = emails.filter(e => !e.isRead)
            }

            return emails
        },
        sortByOrder() {
            if (this.sortBy === 'name') {
                this.emails.sort((e1, e2) => e1.name.localeCompare(e2.name))
            } else if (this.sortBy === 'date') {
                this.emails.sort((e1, e2) => (e1.sentAt - e2.sentAt))
            }
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
        sortBy: {
            handler() {
                this.sortByOrder
            }
        }

    }
}