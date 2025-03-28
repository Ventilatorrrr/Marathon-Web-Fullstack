export class HardWorker
{
    constructor(name, age, salary)
    {
        this.name = name;
        this._age = age;
        this._salary = salary;
    }

    set age(value)
    {
        if (value >= 1 && value < 100)
        {
            this._age = value;
        }
        else
        {
            this._age = 50;
        }
    }

    get age()
    {
        return this._age;
    }

    set salary(value)
    {
        if (value >= 100 && value < 10000)
        {
            this._salary = value;
        }
        else
        {
            this._salary = 1000;
        }
    }

    get salary()
    {
        return this._salary;
    }

    toObject()
    {
        return {
            name: this.name,
            age: this._age,
            salary: this._salary
        };
    }
}