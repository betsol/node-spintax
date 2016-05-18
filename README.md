# node-spintax

[![npm version](https://badge.fury.io/js/node-spintax.svg)](http://badge.fury.io/js/node-spintax)

Complete Spintax support for Node.js.


## Features

- Unspins Spintax strings
- Supports three generation strategies:
  - Returns all possible variations (use only for simple strings)
  - Returns `n` random variations
  - Returns `n` random variations without duplicates
- Counts number of all possible variations
- Spintax syntax is fully-configurable (customizable interpolation)
- Implemented using finite-state machine and doesn't use regular expressions
- Very small, almost no dependencies
- Unit-tested


## Installation

### Install library with *npm*

`npm i -S node-spintax`


## Usage

Please see the example below.

### Example

```js

const Spinner = require('node-spintax');

// Creates new instance of Spinner with specified spintax-string.
var spinner = new Spinner('A{B|C|D}E{F|G{H|I}J}K');

// Returns total number of possible variations:
var variationsCount = spinner.countVariations();

// Returns list of all possible variations:
var allVariations = spinner.unspin();
// Use this only for simple spintax-strings!

// Returns list of 100 random variations:
var randomVariations = spinner.unspinRandom(100);

// Returns list of 100 random variations without duplicates:
var randomUniqueVariations = spinner.unspinRandom(100, true);

```


## API

@todo


## Changelog

Please see the [changelog][changelog] for list of changes.


## Feedback

If you have found a bug or have another issue with the library —
please [create an issue][new-issue].

If you have a question regarding the library or it's integration with your project —
consider asking a question at [StackOverflow][so-ask] and sending me a
link via [E-Mail][email]. I will be glad to help.

Have any ideas or propositions? Feel free to contact me by [E-Mail][email].

Cheers!


## FAQ

@todo


## Developer guide

Fork, clone, create a feature branch, implement your feature, cover it with tests, commit, create a PR.

Run:

- `npm i` to initialize the project
- `mocha` to run the tests


## Support

If you like this library consider to add star on [GitHub repository][repo-gh].

Thank you!


## License

The MIT License (MIT)

Copyright (c) 2016 Slava Fomin II, BETTER SOLUTIONS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

  [changelog]: changelog.md
  [so-ask]:    http://stackoverflow.com/questions/ask?tags=node.js,javascript,spintax
  [email]:     mailto:s.fomin@betsol.ru
  [new-issue]: https://github.com/betsol/node-spintax/issues/new
  [repo-gh]:   https://github.com/betsol/node-spintax
