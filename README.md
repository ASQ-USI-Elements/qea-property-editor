# qea-property-editor

An element providing a simple interface for editing the properties of the
Asq questions.


## Dependencies

Element dependencies are managed via [Bower](http://bower.io/). and npm You can
install that via:

    install [node](https://nodejs.org/en/)

    npm install -g bower n

Then, go ahead and download the element's dependencies:

    bower install && npm install



## Playing With Your Element

This components is written in ES2015 so you need to transpile it before production.
After having modified the components inside the src folder you simply need to
transpile them using gulp.

    $ gulp

for watch file (without linter)

    $ gulp watch

If you wish to work on this element in isolation, we recommend that you use
[Polyserve](https://github.com/PolymerLabs/polyserve) to keep your element's
bower dependencies in line. You can install it via:

    npm install -g polyserve

And you can run it via:

    polyserve

Once running, you can preview your element at
`http://localhost:8080/components/qea-property-editor/`


## Testing Your Element

Simply navigate to the `/test` directory of your element to run its tests. If
you are using Polyserve: `http://localhost:8080/components/seed-element/test/`

### web-component-tester

The tests are compatible with [web-component-tester](https://github.com/Polymer/web-component-tester).
Install it via:

    npm install -g web-component-tester

Then, you can run your tests on _all_ of your local browsers via:

    wct

#### WCT Tips

`wct -l chrome` will only run tests in chrome.

`wct -p` will keep the browsers alive after test runs (refresh to re-run).

`wct test/some-file.html` will test only the files you specify.
