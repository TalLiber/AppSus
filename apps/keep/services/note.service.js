import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const noteService = {
    query,
    getEmptyNote,
    save,
}

var gNotes = [{
        id: 'n101',
        type: 'textNote',
        isPinned: false,
        info: {
            title: 'gtrrg',
            text: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        type: 'textNote',
        isPinned: false,
        info: {
            title: 'gtrrg',
            text: 'Hello orem ipsum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumque et, quibusdam,'
        }
    },
    {
        id: 'n103',
        type: 'textNote',
        isPinned: false,
        info: {
            title: 'gtrrg',
            text: 'HelloLorem ipsum dolor sit amet consectetur adipisicing elit. Vero,veritatis, tempora incidunt maxime minus recusandae quam dignissimosminima qui fu orem ipsum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumque et, quibusdam,'
        }
    },
    {
        id: 'n104',
        type: 'textNote',
        isPinned: false,
        info: {
            title: 'gtrrg',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumqueum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumque et, quibu et, quibusdam,'
        }
    },
    {
        id: 'n105',
        type: 'textNote',
        isPinned: false,
        info: {
            title: '',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumqueum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumque et, quibu et, quibusdam,'
        }
    },
    {
        id: 'n106',
        type: 'textNote',
        isPinned: false,
        info: {
            title: '',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumqueum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumque et, quibu et, quibusdam,'
        }
    },
    {
        id: 'n107',
        type: 'textNote',
        isPinned: false,
        info: {
            title: '',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumqueum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumque et, quibu et, quibusdam,'
        }
    },
]

const STORAGE_KEY = 'notesDB'

_createNotes()

function query() {
    return storageService.query(STORAGE_KEY)
}

function save(note) {
    if (note.id) {
        return storageService.put(STORAGE_KEY, note)
    } else {
        return storageService.post(STORAGE_KEY, note)
    }
}

function getEmptyNote() {
    return {
        id: '',
        type: 'textNote',
        isPinned: false,
        info: {
            title: '',
            text: ''
        }
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(STORAGE_KEY)
    if (!notes || !notes.length) utilService.saveToStorage(STORAGE_KEY, gNotes)
}