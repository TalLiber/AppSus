
import { emailService } from '../services/mail.service.js'
import { svgService } from '../../../services/svg.service.js'

export default {
    props: [],
    template: `
	<section className="email-details full-height flex column">

		<section  class="action-bar flex">
			<!-- svgs btns -->
			<img style="width:24px; height:24px" @click="backToList" :src="getMailSvg('back')" alt="" />
			<div className="icon" @click="setTabToTrash('trash')" v-html="getMailSvg('trash')"></div>
			<img style="width:24px; height:24px" @click="toggleStarTab()" :src="getMailSvg('star')" alt="" />
			<img style="width:24px; height:24px" @click="toggleReadProp()" :src="getMailSvg('readStat')" alt="" />
		</section>

		<section v-if="email" class="details-content">
			<header class="flex space-between">
                <!-- //todo date format -->
				<h4> {{email.name}} <span class="small"> &lt;{{email.from}}&gt;</span></h4>
                <span class="small">{{email.sentAt}}</span>
			</header>
            <p>{{email.body}}</p>
		</section>
		
        <footer>
            <button>Replay</button>
            <button>Forward</button>
        </footer>

	</section>
`,
    data() {
        return {
            email: null,
            prvTab: ''
        }
    },
    created() {
        this.loadEmailDetails()
        this.prvTab = this.$route.query.tab
    },
    methods: {
        loadEmailDetails() {
            emailService.get(this.emailId)
                .then(email => this.email = email)
        },
        getMailSvg(iconName) {
            return svgService.getMailSvg(iconName)
        },
        backToList() {
            this.$router.back()
        },
        setTabToTrash(tab) {
            this.email.tab = tab
            emailService.put(this.email)
                .then(() => this.backToList())
        },
        toggleStarTab() {
            if (this.email.tab === 'star') this.email.tab = 'inbox'
            else this.email.tab = 'star'
            emailService.put(this.email)
        },
        toggleReadProp() {
            this.email.isRead = !this.email.isRead
            emailService.put(this.email)
        }
    },
    computed: {
        emailId() {
            return this.$route.params.id
        }
    },
    components: {
    }
}