class Product
{
    constructor(name, kcal_per_portion) {
        this.name = name;
        this.kcal = kcal_per_portion;
    }

    isJunkFood()
    {
        return this.kcal > 200;
    }
}

module.exports = { Product };