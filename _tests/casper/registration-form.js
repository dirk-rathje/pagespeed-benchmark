casper.test.begin('forum/registration', 1, function (test) {

    casper.start("http://localhost:9001/forum/registrierung").then(function () {

        test.assertTitle("Forum Beschleunigerphysik / Registrierung (beschleunigerphysik.de)")

    }).then(function () {
        this.fill('form', {
            "given-name": "Rathje"
        }, false);



        this.click('input[type=submit]');



    }).then(function () {

        this.waitUntilVisible(".result.success")

    }).run(function () {
        test.done();
    });








});