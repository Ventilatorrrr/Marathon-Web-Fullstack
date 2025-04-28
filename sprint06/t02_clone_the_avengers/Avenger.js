class Avenger
{
    constructor(name, alias, gender, age, powers, hp) {
        const data = { name, alias, gender, age, powers, hp };

        const AvengerFunction = function () {
            return `${data.alias.toUpperCase()}\n${data.powers.join('\n')}`;
        };

        AvengerFunction.toString = function () {
            return `name: ${data.name}\ngender: ${data.gender}\nage: ${data.age}`;
        };

        Object.defineProperty(AvengerFunction, 'name', { value: 'Avenger' });

        AvengerFunction.getHp = () => data.hp;
        AvengerFunction.setHp = (value) => { data.hp = value; };
        AvengerFunction.clone = () => new Avenger(data.name, data.alias, data.gender, data.age, [...data.powers], data.hp);

        return AvengerFunction;
    }
}

module.exports = { Avenger };
