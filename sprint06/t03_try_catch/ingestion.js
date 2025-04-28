const { EatException } = require("./eat-exception");
const { Product } = require("./product");

class Ingestion
{
    constructor(meal_type, day_of_diet) {
        this.meal_type = meal_type;
        this.day_of_diet = day_of_diet;
        this.products = {};
    }

    setProduct(product)
    {
        this.products[product.name] = product;
    }

    getProductInfo(name)
    {
        return this.products[name];
    }

    getFromFridge(productName)
    {
        const product = this.getProductInfo(productName);
        if (product.isJunkFood())
        {
            throw new EatException(productName, this.meal_type);
        }
    }

}

module.exports = { Ingestion };
