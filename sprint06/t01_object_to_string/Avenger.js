class Avenger
{
    constructor({ name, alias, gender, age, powers })
    {
        const data = { name, alias, gender, age, powers };

        const AvengerFunction = function () {
            return `${data.alias.toUpperCase()}\n${data.powers.join('\n')}`;
        };

        AvengerFunction.toString = function () {
            return `name: ${data.name}\ngender: ${data.gender}\nage: ${data.age}`;
        };

        Object.defineProperty(AvengerFunction, 'name', { value: 'Avenger' });

        return AvengerFunction;
    }
}

module.exports = { Avenger };

