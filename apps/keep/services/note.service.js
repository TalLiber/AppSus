import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

export const noteService = {
    query,
    getEmptyNote,
    getById,
    save,
    remove,
    getNotesToShow,
    updateNote,
}

var gNotes = [{
        id: 'n101',
        type: 'textNote',
        isPinned: false,
        isTrashed: true,
        color: '#16a085',
        info: {
            title: 'gtrrg',
            text: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        type: 'textNote',
        isPinned: false,
        isTrashed: false,
        color: '#16a085',
        info: {
            title: 'gtrrg',
            text: 'Hello orem ipsum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumque et, quibusdam,'
        }
    },
    {
        id: 'n103',
        type: 'textNote',
        isPinned: false,
        isTrashed: false,
        color: '',
        info: {
            title: 'gtrrg',
            text: 'HelloLorem ipsum dolor sit amet consectetur adipisicing elit. Vero,veritatis, tempora incidunt maxime minus recusandae quam dignissimosminima qui fu orem ipsum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumque et, quibusdam,'
        }
    },
    {
        id: 'n104',
        type: 'textNote',
        isPinned: false,
        isTrashed: false,
        color: '',
        info: {
            title: 'gtrrg',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumqueum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumque et, quibu et, quibusdam,'
        }
    },
    {
        id: 'n105',
        type: 'textNote',
        isPinned: false,
        isTrashed: false,
        color: '',
        info: {
            title: '',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumqueum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumque et, quibu et, quibusdam,'
        }
    },
    {
        id: 'n106',
        type: 'textNote',
        isPinned: false,
        isTrashed: false,
        color: '',
        info: {
            title: '',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumqueum dolor sit amet consectetur adipisicing elit. Sequiasperiores expedita at voluptatem eligendi ipsum sit, tempora modinisi eum quae id cumque et, quibu et, quibusdam,'
        }
    },
    {
        id: 'n107',
        type: 'textNote',
        isPinned: false,
        isTrashed: false,
        color: '',
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

function getNotesToShow(isTrash) {
    return query()
        .then(notes => notes.filter(note => note.isTrashed === isTrash))
}

function getById(noteId) {
    return storageService.get(STORAGE_KEY, noteId)
}

function updateNote(noteId, prop, toUpdate) {
    return getById(noteId)
        .then(note => {
            switch (prop) {
                case 'isTrashed':
                    note.isTrashed = toUpdate
                    break
                case 'color':
                    note.color = toUpdate
                    break
                case 'text':
                    note.info.text = toUpdate
                    break
                case 'title':
                    note.info.title = toUpdate
                    break
            }
            save(note)
            return (note)
        })
}

function save(note) {
    if (note.id) {
        return storageService.put(STORAGE_KEY, note)
    } else {
        return storageService.post(STORAGE_KEY, note)
    }
}

function remove(noteId) {
    return storageService.remove(STORAGE_KEY, noteId)
}

function getEmptyNote() {
    return {
        id: '',
        type: 'textNote',
        isPinned: false,
        isTrashed: false,
        color: '',
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