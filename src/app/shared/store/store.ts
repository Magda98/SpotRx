import { createStore } from 'stan-js/vanilla'
import { storage } from 'stan-js/storage'

export const authStore = createStore({
token: storage('')
})
