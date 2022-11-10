import { svgService } from '../../../services/svg.service.js'

export default {
    props: ['email', 'filterTab'],
    template: `
    <!-- <router-link :to="'/mail/list/' + email.id"> -->

    <!-- //todo -change the func name to the  action -->
        <section  @click="goToDetails"
        class="email-preview flex space-between align-center"
        :class="isRead">
    
        <div class="flex align-center">
        <div className="icon" @click.stop="setTabToTrash('trash')" v-html="getMailSvg('trash')"></div>
        <!-- //todo add star indication -->
        <img class="star" style="width:24px; height:24px" @click.stop="toggleStarTab()" :src="getMailSvg('star')" alt="" />
        <h4>  {{email.name}}</h4>
        </div>
                <!-- //todo inline style smaller span -->
                <h4>{{email.subject}}<span class="small">{{getShortBody}}</span> </h4>
                
                <h5>{{formattedDate}}</h5>
        </section>
    <!-- </router-link> -->
`,
    data() {
        return {
        }
    },
    methods: {
        goToDetails() {
            this.email.isRead = true
            this.$router.push(`/mail/list/${this.email.id}`)
            this.$emit('isRead', this.email)
        },
        getMailSvg(iconName) {
            return svgService.getMailSvg(iconName)
        },
        toggleStarTab() {
            if (this.email.tab === 'star') this.email.tab = 'inbox'
            else this.email.tab = 'star'
            this.$emit('toggleStar', this.email)
        },
        setTabToTrash(tab) {

            if(this.email.tab==='trash') {
                this.$emit('removeEmail',this.email)
            }else{
                this.email.tab = tab
                this.$emit('toTrashFolder', this.email)
            }
        }
    },
    computed: {
        getShortBody() {
            if (this.email.body < 10) return this.email.body
            return '-' + this.email.body.slice(0, 10) + '...'
        },
        isRead() {
            return { isRead: this.email.isRead }
        },
        formattedDate() {
            const month = new Date(this.email.sentAt).toLocaleString('default', { month: 'short' })
            const day = new Date(this.email.sentAt).getDate()
            return month + ' ' + day
        }
    },
    components: {

    }
}