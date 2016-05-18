
const DEFAULT_OPTIONS = {
  syntax: {
    startSymbol: '{',
    endSymbol: '}',
    delimiter: '|'
  }
};


const _ = require('lodash');

module.exports = Spinner;


function Spinner (source, options) {

  var tree = [];

  options = _.merge({}, DEFAULT_OPTIONS, options);

  const spinner = {
    countVariations: countVariations,
    unspin: unspin,
    unspinRandom: unspinRandom
  };

  compileSource();


  return spinner;


  function countVariations () {
    return countVariationsInSequence(tree);
  }

  function unspinRandom (limit, unique) {
    return unspin(true, limit, unique);
  }

  function unspin (random, limit, unique) {
    if (random) {
      if ('undefined' === typeof limit) {
        limit = 1;
      }
      if (unique) {
        var variationsCount = countVariations();
        if (limit > variationsCount) {
          throw new Error('Variation space can not accommodate ' + variationsCount + ' variations');
        }
        var variations = [];
        while (variations.length < limit) {
          variations.push(getRandomVariation());
          variations = _.uniq(variations);
        }
        return variations;
      } else {
        return _.times(limit, function () {
          return getRandomVariation();
        });
      }
    } else {
      return unspinSequence(tree);
    }

    function getRandomVariation () {
      return unspinSequence(tree, true)[0];
    }

  }

  function compileSource () {
    tree = parseSequence(source);
  }


  function parseSequence (string) {

    var isParsingSpin = false;
    var sequence = [];
    var fragment = '';
    var level = 0;

    for (var i = 0; i < string.length; i++) {
      var char = string[i];
      switch (char) {
        case options.syntax.startSymbol:
          if (!isParsingSpin) {
            closeFragment();
            isParsingSpin = true;
          }
          level++;
          fragment += char;
          break;
        case options.syntax.endSymbol:
          fragment += char;
          if (isParsingSpin) {
            level--;
            if (0 == level) {
              isParsingSpin = false;
              sequence.push(parseSpin(fragment));
              fragment = '';
            }
          }
          break;
        default:
          fragment += char;
      }
    }

    closeFragment();

    return sequence;


    function closeFragment () {
      if (fragment.length > 0) {
        sequence.push(fragment);
        fragment = '';
      }
    }

  }

  function parseSpin (string) {

    var spin = [];
    var level = 0;
    var fragment = '';
    var isComplexFragment = false;

    for (var i = 0; i < string.length; i++) {
      var char = string[i];
      var isFirstChar = (0 == i);
      var isLastChar = (string.length - 1 == i);
      if (isFirstChar || isLastChar) {
        continue;
      }
      switch (char) {
        case options.syntax.startSymbol:
          level++;
          fragment += char;
          isComplexFragment = true;
          break;
        case options.syntax.endSymbol:
          level--;
          fragment += char;
          break;
        case options.syntax.delimiter:
          if (0 == level) {
            closeFragment();
          } else {
            fragment += char;
          }
          break;
        default:
          fragment += char;
      }
    }

    closeFragment();

    return spin;

    function closeFragment () {
      if (isComplexFragment) {
        spin.push(parseSequence(fragment));
      } else {
        spin.push(fragment);
      }
      fragment = '';
      isComplexFragment = false;
    }

  }

  function countVariationsInSequence (sequence) {
    var count = 1;
    _.forEach(sequence, function (element) {
      var isSpin = ('object' === typeof element);
      if (isSpin) {
        count *= countVariationsInSpin(element);
      }
    });
    return count;
  }

  function countVariationsInSpin (spin) {
    var count = 0;
    _.forEach(spin, function (element) {
      var isSequence = ('object' === typeof element);
      if (isSequence) {
        count += countVariationsInSequence(element);
      } else {
        count++;
      }
    });
    return count;
  }

  function unspinSequence (sequence, random) {

    var variations = [''];

    _.forEach(sequence, function (element) {
      var isSpin = ('object' === typeof element);
      if (isSpin) {
        multiplyVariations(unspinSpin(element, random));
      } else {
        extendVariations(element);
      }
    });

    return variations;

    function multiplyVariations (multipliers) {
      var result = [];
      _.forEach(variations, function (string) {
        _.forEach(multipliers, function (string2) {
          result.push(string + string2);
        });
      });
      variations = result;
    }

    function extendVariations (extension) {
      _.forEach(variations, function (string, key) {
        variations[key] = string + extension;
      })
    }

  }

  function unspinSpin (spin, random) {

    var variations = [];

    if (random) {
      handleElement(_.sample(spin));
      return variations;
    } else {
      _.forEach(spin, handleElement);
    }

    return variations;


    function handleElement (element) {
      var isSequence = ('object' === typeof element);
      if (isSequence) {
        variations = variations.concat(unspinSequence(element, random));
      } else {
        variations.push(element);
      }
    }

  }

}
