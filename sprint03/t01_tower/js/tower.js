/*
class Building
{
    constructor(floors, material, address)
    {
        this.floors = floors;
        this.material = material;
        this.address = address;
    }
    toString()
    {
        return [
            `Floors: ${this.floors}`,
            `Material: ${this.material}`,
            `Address: ${this.address}`,
        ].join('\n');
    }
}**/

class Tower extends Building
{
    constructor(floors, material, address)
    {
        super(floors, material, address);
        this.hasElevator = false;
        this.arcCapacity = 0;
        this.height = 0;
    }

    getFloorHeight()
    {
        if (this.floors > 0)
        {
            return this.height / this.floors;
        }
        return 0;
    }

    toString()
    {
        return (
            super.toString() + // Виклик toString() з батьківського класу
            `\nElevator: ${this.hasElevator ? '+' : '-'}\n` +
            `Arc reactor capacity: ${this.arcCapacity}\n` +
            `Height: ${this.height}\n` +
            `Floor height: ${this.getFloorHeight()}`
        );
    }
}
