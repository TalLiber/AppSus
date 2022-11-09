import { emailService } from '../services/mail.service.js'

export default {
    props: [],
    template: `
<section className="email-details full-height flex column">
   <pre>{{email}}</pre>
   <section class="action-bar">
       <button >   <i class="fa-solid fa-arrow-left"></i></button>
    
    <!-- <button @click="" :title="">icon</button>
    <button>delete</button>
    <button></button> -->
    
   </section>

   
</section>
`,
    data() {
        return {
            email: null,
            actions:[
                {

                }
            ]

        }
    },
    created() {
        this.loadEmailDetails()
    },
    methods: {
        loadEmailDetails() {
            emailService.get(this.emailId)
                .then(email => this.email = email)
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