const Printable = {
    print()
    {
        for (const weapon of this.weapons)
        {
            console.log(weapon);
        }
    }
};

module.exports = Printable;
