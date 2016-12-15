"use strict;"
require('mocha-generators').install();

var expect = require('chai').expect;
var Nightmare = require('nightmare');
var options = {
    show: false
};


describe('registration-form', function () {
    this.timeout( 4000 );
    let nightmare;
    before(function* () {
        nightmare = Nightmare(options);
    });

    after(function* () {
        var endTest = yield nightmare
            .end()
    });

    var selector = ".result--error"


    it('Should show sucess message', function* () {

        let nm = yield nightmare
            .goto('http://localhost:9001/forum/registrierung')
            .type('form [name=given-name]', 'Rathje')
            .click('form [type=submit]')
            .wait(2000)
            .visible(selector)
            .then((result) => {
                expect(result).to.eql(true);
                done();
            }).catch((err) => {
                console.error("Test-runner failed:", err);
            });

        

    })
})