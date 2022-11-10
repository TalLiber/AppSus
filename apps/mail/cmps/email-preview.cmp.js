import { svgService } from '../../../services/svg.service.js'

export default {
    props: ['email'],
    template: `
    <router-link :to="'/mail/list/' + email.id">

        <section :class="isRead" @click="setAsRead"
        class="email-preview flex space-between"
        :class="isRead">
    
        <!-- //todo add star indication -->
            <h4>
         <img style="width:24px; height:24px" @click.stop="toggleStarTab()" :src="getMailSvg('star')" alt="" />
                {{email.name}}</h4>
                <!-- //todo inline style smaller span -->
                <h4>{{email.subject}}<span class="small">{{getShortBody}}</span> </h4>
                
                <!-- //todo design date -->
                <h5>{{email.sentAt}}</h5>
    
        </section>
    </router-link>
`,
    data() {
        return {
        }
    },
    methods: {
        setAsRead() {
            this.email.isRead = true
            this.$emit('isRead', this.email)
        },
        getMailSvg(iconName) {
            return svgService.getMailSvg(iconName)
        },
        toggleStarTab(){
            if(this.email.tab==='star')this.email.tab='inbox'
            else this.email.tab='star'
            this.$emit('toggleStar',this.email)
        }
    },
    computed: {
        getShortBody() {
            if (this.email.body < 10) return this.email.body
            return '-' + this.email.body.slice(0, 10) + '...'
        },
        isRead() {
            console.log(this.email.isRead)
            return { isRead: this.email.isRead }
        }
    },
    components: {

    }
}