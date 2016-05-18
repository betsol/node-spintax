
const expect = require('./lib/expect');
const _ = require('lodash');
const Spinner = require('./../Spinner');

const TEST_SAMPLE = 'A{B|C|D}E{F|G{H|I}J}K';


describe('Spinner', function () {

  var spinner;

  beforeEach(function () {
    spinner = new Spinner(TEST_SAMPLE);
  });

  it('calculates number of variations', function () {
    expect(spinner.countVariations()).to.equal(9);
  });

  it('unspins simple sequence', function () {
    testUnspin('AEK', ['AEK']);
  });

  it('unspins sequence with spins', function () {
    testUnspin('A{B|C}D{E|F}G', [
      'ABDEG',
      'ABDFG',
      'ACDEG',
      'ACDFG'
    ]);
  });

  it('unspins sequence with optional constructs (before)', function () {
    testUnspin('A{|B}C', [
      'AC',
      'ABC'
    ]);
  });

  it('unspins sequence with optional constructs (after)', function () {
    testUnspin('A{B|}C', [
      'ABC',
      'AC'
    ]);
  });

  it('unspins sequence with optional constructs (middle)', function () {
    testUnspin('A{B||C}D', [
      'ABD',
      'AD',
      'ACD'
    ]);
  });

  it('unspins complex sequence', function () {
    testUnspin(TEST_SAMPLE, [
      'ABEFK',
      'ABEGHJK',
      'ABEGIJK',
      'ACEFK',
      'ACEGHJK',
      'ACEGIJK',
      'ADEFK',
      'ADEGHJK',
      'ADEGIJK'
    ]);
  });

  it('supports custom interpolation symbols', function () {

    var results = new Spinner('A<B~C~>D', {
      syntax: {
        startSymbol: '<',
        endSymbol: '>',
        delimiter: '~'
      }
    }).unspin();

    expect(results).to.eql([
      'ABD',
      'ACD',
      'AD'
    ]);

  });

  it('supports random spinning (single element)', function () {

    var results = new Spinner('A{B|C|D|}E').unspin(true);

    var randomVariant = results[0];

    expect(randomVariant).to.be.oneOf([
      'ABE',
      'ACE',
      'ADE',
      'AE'
    ]);

  });

  it('supports random spinning with limit and uniqueness', function () {
    var spinner2 = new Spinner('A{B|C|D}E{F|G}{H|I}{J|K}');
    var variationsCount = spinner2.countVariations();
    var results = _.uniq(spinner2.unspin(true, 24, true));
    expect(results.length).to.be.eq(variationsCount);
  });

});


function testUnspin (source, expectedResult) {
  var results = (new Spinner(source)).unspin();
  expect(results).to.eql(expectedResult);
}
