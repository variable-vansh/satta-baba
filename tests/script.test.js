// script.test.js

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator(); // Assuming Calculator is a class in script.js
    });

    test('adds two numbers', () => {
        expect(calculator.add(1, 2)).toBe(3);
    });

    test('subtracts two numbers', () => {
        expect(calculator.subtract(5, 2)).toBe(3);
    });

    test('multiplies two numbers', () => {
        expect(calculator.multiply(3, 4)).toBe(12);
    });

    test('divides two numbers', () => {
        expect(calculator.divide(10, 2)).toBe(5);
    });

    test('handles division by zero', () => {
        expect(calculator.divide(5, 0)).toBe(Infinity);
    });
});