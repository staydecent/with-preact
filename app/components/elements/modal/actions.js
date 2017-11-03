import {createAction} from 'wasmuth'

export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const openModal = (name, props = true) => createAction(OPEN_MODAL)({name, props})
export const closeModal = createAction(CLOSE_MODAL)({})
