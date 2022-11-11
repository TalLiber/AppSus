
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
// import { eventBus } from "../../../services/event-bus.service.js"

const EMAILS_KEY = 'emailDB'


const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createEmails()

export const emailService = {
    query,
    get,
    put,
    sendEmail,
    removeEmail,
    createDraftEmail
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
function removeEmail(emailId) {
    return storageService.remove(EMAILS_KEY, emailId)

}

function sendEmail(to, subject, body) {
    const newEmail = {
        id: utilService.makeId(),
        tab: 'sent',
        name: loggedinUser.fullname,
        subject,
        body,
        isRead: false,
        sentAt: Date.now(),
        from: loggedinUser.email,
        to
    }
    return storageService.post(EMAILS_KEY, newEmail)
}

function createDraftEmail() {
    const draftEmail = {
        id: utilService.makeId(),
        tab: 'draft',
        name: 'Draft',
        subject: '',
        body: '',
        isRead: true,
        sentAt: Date.now(),
        to: ''
    }
    return storageService.post(EMAILS_KEY, draftEmail)
}



// Local Funcs-factory
function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY)

    if (!emails || !emails.length) {
        emails = []
        for (var i = 0; i < 16; i++) {
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

