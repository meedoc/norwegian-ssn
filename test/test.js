var should = require('should')
var SSN = require('../validator.js')

describe('Norwegian SSN validator', function() {
  it('should return valid info for Fødselsnummer', function() {
    SSN("15070091884").should.eql({
      isValid: true,
      gender: 'female',
      birthDate: new Date(2000, 7, 15)
    })
    SSN("12119806192").should.eql({
      isValid: true,
      gender: 'male',
      birthDate: new Date(1998, 11, 12)
    })
  })

  it('should return valid info for D-nummer', function() {
    SSN("70037337860").should.eql({
      isValid: true,
      gender: 'female',
      birthDate: new Date(1973, 3, 30)
    })
    SSN("70091038925").should.eql({
      isValid: true,
      gender: 'male',
      birthDate: new Date(1910, 9, 30)
    })
  })

  it('should return valid info for H-nummer', function() {
    SSN("18466301236").should.eql({
      isValid: true,
      gender: 'female',
      birthDate: new Date(1963, 6, 18)
    })
    SSN("02485907907").should.eql({
      isValid: true,
      gender: 'male',
      birthDate: new Date(1959, 8, 2)
    })
  })

  it('should recognize valid FH-nummer', function() {
    SSN("81019806111").should.eql({
      isValid: true,
      gender: undefined,
      birthDate: undefined
    })
    SSN("81019806111").should.eql({
      isValid: true,
      gender: undefined,
      birthDate: undefined
    })
  })

  it('should recognize invalid numbers', function() {
    SSN("").should.have.property('isValid').eql(false)
    SSN("ABCDEFGHIJK").should.have.property('isValid').eql(false)
    SSN("00000000000").should.have.property('isValid').eql(false)
    SSN("18099805991").should.have.property('isValid').eql(false)
  })
})

