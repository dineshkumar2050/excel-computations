// create custom events
export const catFound = new CustomEvent('animalFound', {
    detail: {
        name: 'cat'
    }
})

export const dogFound = new CustomEvent('animalFound', {
    detail: {
        name: 'dog'
    }
})

// const obj = document.getElementById('')             // object obtained from here

// add am appropriate event listener at something
// obj.addEventListener('animalFound', e => {
//     console.log(e.detail.name)
// })

// dispatch the events
// obj.dispatchEvent(catFound)
// obj.dispatchEvent(dogFound)

// create custom events
{/* <div id='abc' dataset={time: ''}></div> */}
const elem = document.getElementById('abc')              // elem obtained from here 
export const event = new CustomEvent('build', {
    // detail: elem.dataset.time
})
// add event listener
elem.addEventListener('build', e => {
    // do something
})
// dispatch the event
elem.dispatchEvent(event)
