// Прототип houseBlueprint
const houseBlueprint = {
    address: "",
    date: new Date(),
    description: "",
    owner: "",
    size: 0,
    _building_speed: 0.5,

    getDaysToBuild: function()
    {
        return this.size / this._building_speed;
    }
};

// Конструктор houseBuilder
function HouseBuilder(address, description, owner, size, roomCount)
{
    const newHouse = Object.create(houseBlueprint);

    newHouse.address = address;
    newHouse.date = new Date();
    newHouse.description = description;
    newHouse.owner = owner;
    newHouse.size = size;
    newHouse.roomCount = roomCount;

    return newHouse;
}