
import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
const EMAIL_KEY = 'emailDB'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

_createEmails()

export const emailService = {

}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY)

    if (!emails || !emails.length) {
        emails = []
        for (var i = 0; i < 10; i++) {
            emails.push(_createEmail())
        }
    }
    utilService.saveToStorage(EMAIL_KEY, emails)
    return emails

}

function _createEmail() {
    const name = utilService.makeName()
    const email = {
        id: utilService.makeId(),
        name: name,
        subject: utilService.makeLorem(4),
        body: utilService.makeLorem(20),
        isRead: false,
        sentAt: Date.now(),
        from: `${name}@gmail.com`,
        to: `${loggedinUser.email}`
    }

    return email
}

