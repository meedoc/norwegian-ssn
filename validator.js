var _ = require('lodash')

module.exports = function(ssn) {
  return {
    number: ssn,
    isValid: hasValidContent() && hasValidChecksum() && hasValidBirthDate(),
    birthDate: getBirthDate(),
    gender: getGender()
  }

  function hasValidContent() {
    return _.size(ssn) === 11 && /^\d+$/.test(ssn)
  }

  function hasValidChecksum() {
    var series1 = [3, 7, 6, 1, 8, 9, 4, 5, 2, 0, 0]
    var series2 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2, 0]

    var ssnDigits = _.split(ssn, '').map(_.toNumber)
    var checksum1 = 11 - multAndSum(ssnDigits, series1) % 11
    var checksum2 = 11 - multAndSum(ssnDigits, series2) % 11

    return checksum1 % 11 === ssnDigits[9]
      && checksum2 % 11 === ssnDigits[10]

    function multAndSum(as, bs) {
      return _(_.zip(as, bs))
        .map(_.spread(_.multiply))
        .sum()
    }
  }

  function hasValidBirthDate() {
    return !_.isUndefined(getBirthDate()) || getSsnType() === 'FH'
  }

  function getBirthDate() {
    var day = numberAt(0, 2)
    day = day > 40 ? day - 40 : day

    var month = numberAt(2, 4)
    month = month > 40 ? month - 40 : month

    var year = numberAt(4, 6)
    var personalNumber = numberAt(6, 9)
    if (year >= 54 && personalNumber >= 500 && personalNumber < 750) {
      year += 1800
    } else if (personalNumber < 500 || (year >= 40 && personalNumber >= 900)) {
      year += 1900
    } else if (year < 40 && personalNumber >= 500) {
      year += 2000
    } else {
      year = -1
    }

    if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1854 && year <= 2039) {
      return new Date(year, month, day)
    }
  }

  function getGender() {
    if (getSsnType() === 'FH') {
      return
    }

    if (numberAt(8, 9) % 2 === 0) {
      return 'female'
    } else {
      return 'male'
    }
  }

  function getSsnType() {
    var day = numberAt(0, 2)
    var month = numberAt(2, 4)
    if (day > 80) {
      return 'FH'
    } else if (day > 40) {
      return 'D'
    } else if (month > 40) {
      return 'H'
    } else {
      return 'F'
    }
  }

  function numberAt(start, end) {
    return _.toNumber(ssn.substring(start, end))
  }
}

