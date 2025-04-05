const films = {
    // фільми, які потрібно подивитись
    Brimstone: {
        title: "Brimstone",
        date: "January 12, 2017",
        actors: [
            "Dakota Fanning",
            "Guy Pearce",
            "Carice van Houten",
            "Kit Harington",
            "Emilia Jones"
        ],
        description: "A triumphant epic of survival and a tale of powerful womanhood and resistance against the unforgiving cruelty of a hell on earth. Our heroine is Liz (Dakota Fanning), carved from the beautiful wilderness, full of heart and grit, hunted by a vengeful Preacher (Guy Pearce)--a diabolical zealot and her twisted nemesis. But Liz is no victim: she's a survivor, a woman of fearsome strength who responds with astonishing bravery to claim the better life that she and her daughter deserve. Fear not. Retribution is coming.",
        image: "assets/images/Brimstone.jpg"
    },
    Atonement: {
        title: "Atonement",
        date: "September 7, 2007",
        actors: [
            "Keira Knightley",
            "James McAvoy",
            "Saoirse Ronan",
            "Brenda Blethyn",
            "Julia West"
        ],
        description: "When Briony Tallis (Saoirse Ronan), thirteen-years-old and an aspiring writer, sees her older sister Cecilia (Keira Knightley) and Robbie Turner (James McAvoy) at the fountain in front of the family estate, she misinterprets what is happening, thus setting into motion a series of misunderstandings and a childish pique that will have lasting repercussions for all of them. Robbie is the son of a family servant toward whom the family has always been kind. They paid for his time at Cambridge and now he plans on going to medical school. After the fountain incident, Briony reads a letter intended for Cecilia and concludes that Robbie is a deviant. When her cousin Lola (Juno Temple) is raped, she tells the Police that it was Robbie she saw committing the deed.",
        image: "assets/images/Atonement.jpg"
    },
    Irreversible: {
        title: "Irréversible",
        date: "May 22, 2002",
        actors: [
            "Monica Bellucci",
            "Vincent Cassel",
            "Albert Dupontel",
            "Philippe Nahon",
            "Jo Prestia"
        ],
        description: "A young woman, Alex, is raped by a stranger in a tunnel. Her boyfriend Marcus and ex-boyfriend Pierre decide to do justice themselves. In 2002, Gaspar Noé created controversy (and controversy) by presenting his film at the Cannes Film Festival. 17 years later, he returns with a brand new version of his cult film.",
        image: "assets/images/Irreversible.jpg"
    }
};

document.addEventListener("click", function (e) {
    const film = films[e.target.id];
    if (film)
    {
        document.getElementById("title").textContent = film.title;
        document.getElementById("date").textContent = film.date;
        document.getElementById("description").textContent = film.description;

        const actorsContainer = document.querySelector(".actors");
        actorsContainer.innerHTML = "";
        film.actors.forEach(function (actor) {
            const span = document.createElement("span");
            span.textContent = actor;
            actorsContainer.appendChild(span);
        });

        document.querySelector(".img img").src = film.image;
        document.querySelector(".img img").alt = film.title + " poster";
    }
});

