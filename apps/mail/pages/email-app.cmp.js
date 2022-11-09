//main-emailApp
//import components
import emailFilter from '../cmps/email-filter.cmp.js'
import emailFolderList from '../cmps/email-folder-list.cmp.js'

import emailList from './email-list.cmp.js'
import emailDetails from './email-details.cmp.js'
//import mailService
import { emailService } from '../services/mail.service.js'


export default {
    name: 'email-app',
    props: [],
    template: `
    <section class="email-app flex full-height">
        <!-- <email-filter></email-filter> -->
        <email-folder-list></email-folder-list>
        <div class="main-content">

        <!-- list,details -->
            <router-view>
                 </router-view>
        </div>

    </section>
        `,
    components: {},
    created() { },
    data() {
        return {}
    },
    methods: {},
    computed: {},
    components: {
        emailFilter,
        emailFolderList,
        emailList,
        emailDetails

    }
}