
import { svgService } from '../../../services/svg.service.js'
import { eventBus } from "../../../services/event-bus.service.js"
import { emailService } from '../services/mail.service.js'

export default {
    props: [],
    template: `
        <section class="email-folder-list flex column">
        <!-- //todo-svg for all divs\ -->
        <div class="compose-wrapper flex">
            <div class="compose flex align-center center" @click="composeEmail()">
                <div class="compose-icon" v-html="getMailSvg('pencil')"></div>
            Compose
            </div>

        </div>
    <div ref="folder" class="folders-nav">

        <div @click="setTab('inbox')" >
        <img  style="width:20px; height:20px" :src="getMailSvg('inbox')" alt="" />
        <span class="f-text">Inbox</span>
        </div>

        <div @click="setTab('star')">
        <img style="width:20px; height:20px" :src="getMailSvg('star')" alt="" />
        <span class="f-text"> Starred</span>
        </div>
        <div @click="setTab('important')"> 
        <img style="width:20px; height:20px" :src="getMailSvg('important')" alt="" />
        <span class="f-text">Important</span>
        </div>
        <div @click="setTab('sent')">
        <img style="width:20px; height:20px" :src="getMailSvg('sent')" alt="" />
        <span class="f-text">Sent</span>
        </div>

        <div @click="setTab('trash')">
        <div v-html="getMailSvg('trash')"></div>

        <span class="f-text">Trash</span>
        </div>

        <div @click="setTab('draft')">
        <img style="width:20px; height:20px" :src="getMailSvg('draft')" alt="" />

        <span class="f-text">Drafts</span>
        </div>



     </div>

        </section>

`,
    data() {
        return {
        }
    },
    methods: {
        setTab(tab) {
            this.$router.push({ path: '/mail/list', query: { tab: `${tab}` } })
        },
        composeEmail() {
            const tab = this.$route.query.tab
            this.$router.push({
                path: '/mail/list',
                query: { tab, compose: 'new' }
            })
            emailService.createDraftEmail()
                .then(email => eventBus.emit('setCurrDraft', email))
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
