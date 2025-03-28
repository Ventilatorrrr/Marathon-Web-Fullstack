// Прототип houseBlueprint
const houseBlueprint = {
    address: "",
    date: new Date(),
    description: "",
    owner: "",
    size: 0,
    _building_speed: 0.5,
    _averageBuildSpeed: 0.5,

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
/*
const house = new HouseBuilder('88 Crescent Avenue',

    'Spacious town house with wood flooring, 2-car garage, and a back patio.',

    'J. Smith',

    110,

    5);


console.log(house.address);

// '88 Crescent Avenue'


console.log(house.description);

// 'Spacious town house with wood flooring, 2-car garage, and a back patio.'


console.log(house.size);

// 110


console.log(house.date.toDateString());

// [the current date], for example: 'Tue Aug 11 2020'


console.log(house.owner);

// J. Smith


console.log(house._building_speed);

// 0.5


console.log(house.getDaysToBuild());

// 220


console.log(house.roomCount);

// 5 **/