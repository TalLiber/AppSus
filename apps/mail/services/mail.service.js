
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
const EMAILS_KEY = 'emailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createEmails()

export const emailService = {
    query,
    get,
    put
}

function query() {
    return storageService.query(EMAILS_KEY)
}
function get(emailId) {
    return storageService.get(EMAILS_KEY, emailId)
}

function put(email) {
   return storageService.put(EMAILS_KEY, email)
}

// Local Funcs-factory
function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY)

    if (!emails || !emails.length) {
        emails = []
        for (var i = 0; i < 10; i++) {
            emails.push(_createEmail())
        }
    }
    utilService.saveToStorage(EMAILS_KEY, emails)
    return emails
}

function _createEmail() {
    const name = utilService.makeName()
    const email = {
        id: utilService.makeId(),
        tab: 'inbox',
        name: name,
        subject: utilService.makeLorem(3),
        body: utilService.makeLorem(50),
        isRead: false,
        sentAt: Date.now(),
        from: `${name}@gmail.com`,
        to: `${loggedinUser.email}`
    }

    return email
}

