# norwegian-ssn

Norwegian SSN validator and information extractor

### Installation

```
npm install git@github.com:meedoc/norwegian-ssn.git
```

### Usage

Package consists of one function which accepts SSN number as string and returns the following object:

```
{
  number:     <SSN number>, 
  isValid:    <whether SSN number is valid or not>,
  gender:     <'male' | 'female' | undefined for FH-numbers>,
  birthDate:  <Date object | undefined for FH-numbers>
}
```

Here is an example:

```javascript

var SSN = require('norwegian-ssn')

var ssn = SSN('SOME-SSN-NUMBER-AS-STRING')
if (ssn.isValid) {
  console.log("Number %s belongs to a %s person born in %s", ssn.number, ssn.gender, ssn.birthDate)
} else {
  console.log("Invalid number: %s", ssn.number)
}
```
