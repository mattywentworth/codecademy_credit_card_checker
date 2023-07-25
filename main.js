// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
/* Ideas for writing validateCred() function:
    1. Take in an array as a parameter
    2. Use a map array iterator to manipulate the appropriate digits and return a new array (avoid mutating the initial array)?
        No - map doesn't give you fine enough control. Use a reverse loop to loop backwards not including the check digit, and
        .push manipulated values to a new array.
    3. Use the reduce iterator on the new array to add all the elements and then divide the outcome by 10.
    4. Use a conditional to say if output is divisible by 10 with 0 remainder (% 0), return true for valide. If not, return false.
*/

//Function that takes valid and invalid credit card number arrays as an argument and, using a Luhn algorithm, returns whether they are valid ('true') or invalid ('false'):
const validateCred = arr => {
        const copiedArr = [];
        arr.forEach(element => {
            return copiedArr.push(element);
        });
        const reversedArr = copiedArr.reverse();
        const manipulatedCredArrayOne = [];
        for (let i = 1; i < reversedArr.length; i++) {
            if (i % 2 !== 0) {
                const doubledValue = reversedArr[i] * 2;
                const doubledValueLessNine = doubledValue - 9;
                if (doubledValue > 9) {
                    manipulatedCredArrayOne.push(doubledValueLessNine);
                } else {
                    manipulatedCredArrayOne.push(doubledValue);
                };
            } else {
                manipulatedCredArrayOne.push(reversedArr[i]);
            };
        };
        manipulatedCredArrayOne.unshift(reversedArr[0]);
        const reducedCredArray = manipulatedCredArrayOne.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });
        if (reducedCredArray % 10 === 0) {
            return true;
        } else {
            return false;
        };
};


/* Test code I created to mimic and simplify the problem above and debug some issues I was having:
arr1 = [true, true, true];
arr2 = [true, true, true];
arr3 = [false, false, false];
arr4 = [true, true, false];

allArrays = [arr1, arr2, arr3, arr4];

const allTrue = arr => {
    if (arr.every(element => element === true)) {
        return true;
    } else {
        return false;
    }
};

const filterTest = array => {
    return array.filter(element => allTrue(element) === false);
};

console.log(filterTest(allArrays));
*/

//Function that takes an array of arrays as an argument and returns the arrays/cards which, according to the validateCred() function, are invalid:
const findInvalidCards = arr => {
    return arr.filter(element => validateCred(element) === false);
}; // Is there a way to use a .name property or something like that to return the name of the card arrays rather than the array?

//Variable declaration to assign the value of the findInvalidCards() function with the batch variable as an argument:
const foundInvalidCards = findInvalidCards(batch);

/* Ideas for how to write idInvalidCardCompanies() function:
    1. Write function that takes in an array as an argument - create a variable equal to the findInvalidCards function
    with the batch array as an argument.
    2. Come up with an efficient way to iterate over the first digit of each nested array
    3. Based on the first digit of each nested array, populate a new array with a single value of the corresponding credit card company

*/

//Function that takes an array of arrays as an argument and returns a new array documenting each credit card company that has issued invalid cards (each company name should only appear once):
const idInvalidCardCompanies = arr => {
    const invalidCardCompanies = [];
    arr.forEach(element => {
        if (element[0] === 3) {
            if (invalidCardCompanies.some(element => element === 'Amex') === false) {
                return invalidCardCompanies.push('Amex');
            }
        } else if (element[0] === 4) {
            if (invalidCardCompanies.some(element => element === 'Visa') === false) {
                return invalidCardCompanies.push('Visa');
            }
        } else if (element[0] === 5) {
            if (invalidCardCompanies.some(element => element === 'Mastercard') === false) {
                return invalidCardCompanies.push('Mastercard');
            }
        } else if (element[0] === 6) {
            if (invalidCardCompanies.some(element => element === 'Discover') === false) {
                return invalidCardCompanies.push('Discover');
            }
        } else {
            return 'Company not found';
        }
    });
    return invalidCardCompanies;
};

console.log(idInvalidCardCompanies(foundInvalidCards));