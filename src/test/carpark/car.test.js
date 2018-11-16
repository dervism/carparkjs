const {Car} = require('../../main/carpark');

test('has correct license nr', () => {
    const car = new Car("AB12345");
    expect(car.licencePlateNr).toBe("AB12345");
});

test('has correct type', () => {
    const car = new Car("AB12345", "truck");
    expect(car.type).toBe('🚚');
});

test('unknown type has same name', () => {
    const car = new Car("AB12345", "abcd");
    expect(car.type).toBe('abcd');
});

test('throws error if no license plate number given', () => {
    expect(() => new Car()).toThrow(/no license plate number/);
});