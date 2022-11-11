
import { svgService } from '../../../services/svg.service.js'

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
        <span class="f-text">inbox</span>
        </div>

        <div @click="setTab('star')">
        <img style="width:20px; height:20px" :src="getMailSvg('star')" alt="" />
        <span class="f-text"> starred</span>
        </div>
        <div @click="setTab('important')"> 
        <img style="width:20px; height:20px" :src="getMailSvg('important')" alt="" />
        <span class="f-text">important</span>
        </div>
        <div @click="setTab('sent')">
        <img style="width:20px; height:20px" :src="getMailSvg('sent')" alt="" />
        <span class="f-text">sent</span>
        </div>

        <div @click="setTab('trash')">
        <div v-html="getMailSvg('trash')"></div>

        <span class="f-text">trash</span>
        </div>

     </div>

        </section>

`,
    data() {
        return {
        }
    },
    // mounted(){
    //    console.dir(this.$refs.folder.children) 
    // },
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

//ssl.gstatic.com/ui/v1/icons/mail/rfr/create_gm_24_1x.png