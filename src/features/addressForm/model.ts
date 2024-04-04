import { createStore, createEvent, sample } from 'effector';

export const $addressFormError = createStore<string>('')
export const $address = createStore<string>('')
export const changeAddress = createEvent<string>()

$addressFormError.reset(changeAddress)
sample({
    clock: changeAddress,
    target: $address
})