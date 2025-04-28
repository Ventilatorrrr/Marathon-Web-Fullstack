class EatException extends Error
{
    constructor(productName, mealType) {
        super(`Too many calories in ${productName} for ${mealType}!`);
        this.name = "EatException";
    }
}

module.exports = { EatException };
