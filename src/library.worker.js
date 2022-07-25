import { EventEmitter } from 'fbemitter';
export var emitter = new EventEmitter();

// emitter exported from this file & can be used to add, emit & remove events
// var subscription = emitter.addListener('event', function(x, y) { console.log(x, y); });   // registers an event listener
// emitter.emit('event', 5, 10);  // Listener prints "5 10".                                 // fires the event listener
// subscription.remove();                                                                    // removes the registered event listener
