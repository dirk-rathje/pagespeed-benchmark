"use strict;"

var Nightmare = require('nightmare');
var nightmare = Nightmare({
    show: false
});

var selector = ".result--error"

nightmare
    .goto('http://localhost:9001/forum/registrierung')
    .type('form [name=given-name]', 'Rathje')
    .click('form [type=submit]')
    .wait(2000)
    .visible(selector)

    // .evaluate(function (selector) {
    //     // now we're executing inside the browser scope.
        
    //     return document.querySelector(selector).style
    // }, selector)
    .end()
    .then(function (result) {
        console.log(result)
    })
    .catch(function (error) {
        console.error('registration failed:', error);
    });