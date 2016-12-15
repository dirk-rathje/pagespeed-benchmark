var casper = require('casper').create();
casper.start('http://localhost:9001/');

casper.then(function() {
    this.echo('First Page: ' + this.getTitle());
    this.echo(this.page);
    this.page.render('screenshots/homepage.jpeg', {
        format: 'jpeg',
        quality: '100'
    });
    this.page.render('screenshots/homepage.pdf', {
        format: 'pdf'
    });

});
casper.run();
