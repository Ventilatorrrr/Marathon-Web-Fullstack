class Team
{
    constructor(id, avengers = []) {
        this.id = id;
        this.avengers = avengers;
    }

    battle({ damage })
    {
        this.avengers = this.avengers.map(a => {
            const newHp = a.getHp() - damage;
            a.setHp(newHp);
            return a;
        }).filter(a => a.getHp() > 0);
    }

    calculateLosses(clonedTeam)
    {
        const originalCount = clonedTeam.avengers.length;
        const currentCount = this.avengers.length;
        const losses = originalCount - currentCount;
        if (losses === 0) {
            console.log("We haven't lost anyone in this battle.");
        } else {
            console.log(`In this battle we lost ${losses} avenger${losses > 1 ? 's' : ''}.`);
        }
    }

    clone()
    {
        const clonedAvengers = this.avengers.map(av => av.clone());
        return new Team(this.id, clonedAvengers);
    }
}

module.exports = { Team };
