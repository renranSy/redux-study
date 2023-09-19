import {createStore} from 'redux'

// 用来记录 old state
let recordState
const initialState = []

// 创建 reducer
const reducer = function (state = initialState, action) {
    recordState = state
    switch (action.type) {
        case 'addBook':
            console.log(action)
            return [
                ...state,
                {
                    bookId: action.info.bookId,
                    bookName: `<<${action.info.bookName}>>`
                }
            ]
        case 'delBook':
            return state.filter((book) => book.bookId !== action.info.bookId)
        default:
            return [
                ...state
            ]
    }
}

// 创建 store
const store = createStore(reducer)

const root = document.getElementById('app');
const addBook = document.getElementById('addBook');
const delBook = document.getElementById('delBook');
const bookList = document.getElementById('bookList');

const addBookBtn = document.createElement('button');
const bookNameInput = document.createElement('input');
const delBookBtn = document.createElement('button');
const bookIdInput = document.createElement('input');

addBookBtn.innerText = "添加"
delBookBtn.innerText = "删除"

addBookBtn.addEventListener('click', addBookFn)
delBookBtn.addEventListener('click', delBookFn)

// 定义一个生成器函数生成 id
function* generateID() {
    let id = 0;
    while (true) {
        yield id++
    }
}

const generateId = generateID()
const genBookId = () => generateId.next().value.toString()

function addBookFn() {
    const bookName = bookNameInput.value
    if (bookName) {
        const bookId = genBookId()
        bookNameInput.value = ''
        const action = {
            type: 'addBook',
            info: {
                bookId,
                bookName
            }
        }
        store.dispatch(action)
    }
}

function delBookFn() {
    const bookId = bookIdInput.value
    if (bookId) {
        bookIdInput.value = ''
        const action = {
            type: 'delBook',
            info: {
                bookId: bookId
            }
        }
        store.dispatch(action)
    }
}

addBook.appendChild(bookNameInput)
addBook.appendChild(addBookBtn)
delBook.appendChild(bookIdInput)
delBook.appendChild(delBookBtn)

const showState = store.subscribe(() => {
    console.log('Old State' + recordState)
    console.log('New State' + store.getState())
})

const showNewList = store.subscribe(() => {
    const currentState = store.getState()
    if (currentState.length !== recordState.level) {
        bookList.innerText = ''
        currentState.forEach((element) => {
            bookList.appendChild(createBookList(element))
        })
    }
})

function createBookList(info) {
    const element = document.createElement('li')
    element.innerText = `BookID: ${info.bookId} BookName: ${info.bookName}`
    return element
}