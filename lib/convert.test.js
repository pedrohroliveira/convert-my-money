const convert = require('./convert.js')

test('Convert Cotação 4 e Quantidade 2', () => {
    expect(convert.convert(4,2)).toBe(8)
})

test('Convert Cotação 3,5 e quantidade 2', () => {
    expect(convert.convert("3.5",2)).toBe(7)
})

test('toMoney convert number to float', () => {
    expect(convert.toMoney(2)).toBe('2.00')
})

test('toMoney convert String to float', () => {
    expect(convert.toMoney('2')).toBe('2.00')
})
