class Human
{
    constructor(firstName, lastName, gender, age, calories) {
        this.firstName = firstName || "unknown"
        this.lastName = lastName || "unknown"
        this.gender = gender || "unknown"
        this.age = age || "unknown"
        this.calories = calories || 500;
        this.hero = false;

        this.updateInfo();
        this.startMetabolism();
        this.getHungry();
    }

    sleepFor()
    {
        const sleepTime = prompt("How many seconds do you want to sleep?");
        const info = document.getElementById("info");

        if (sleepTime > 0)
        {
            info.textContent = `I'm sleeping`;

            setTimeout(() => {
                info.textContent = "I'm awake now!";

                // Прибрати повідомлення через 3 секунди
                setTimeout(() => {
                    info.textContent = "Human";
                }, 3000);

            }, sleepTime * 1000);
        }
        else
        {
            info.textContent = "You need to enter a valid number!";
        }
    }

    updateInfo()
    {
        document.getElementById('calories').innerHTML = this.calories;
    }

    feed()
    {
        const info = document.getElementById("info");
        if (this.hero === false)
        {
            if (this.calories < 500)
            {
                info.textContent = "Nom nom nom";

                setTimeout(() => {
                    human.calories += 200;
                    getCalories(human.calories);
                    if (human.calories < 500)
                    {
                        info.textContent = "I'm still hungry"; // Якщо калорії все ще менше 500
                    }
                    else
                    {
                        info.textContent = "Human"; // Якщо калорії більше або рівні 500

                    }
                }, 10000);
            }
            else
            {
                info.textContent = "I'm not hungry"; // Якщо калорії більше 500

            }
        }
        else
        {
            if (hero.hero && hero.calories < 500)
            {
                info.textContent = "Nom nom nom";
                setTimeout(() => {
                    hero.calories += 200;
                    getCalories(hero.calories);
                    if (hero.calories < 500)
                    {
                        info.textContent = "I'm still hungry"; // Якщо калорії все ще менше 500
                    }
                    else
                    {
                        info.textContent = "Superhero Observer"; // Якщо калорії більше або рівні 500

                    }
                }, 10000);
            }
            else
            {
                info.textContent = "I'm not hungry"; // Якщо калорії більше 500

            }
        }
    }

    startMetabolism()
    {
        setInterval(() => {
            this.calories -= 200;
            this.updateInfo();
        }, 60000);
    }

    // Отримує відчуття голоду через 5 секунд після створення
    getHungry()
    {
        const info = document.getElementById("info");
        info.textContent = "Human";

        setTimeout(() => {
            info.textContent = "I'm getting hungry!";
            if (this.calories > 0)
            {
                this.calories -= 200;
                this.updateInfo();
            }

            setTimeout(() => {
                info.textContent = "Human";
            }, 5000);
        }, 5000);
    }
}

class Superhero extends Human
{
    constructor(firstName, lastName, gender, age, calories) {
        super(firstName, lastName, gender, age, calories);
        this.hero = true;
    }

    fly()
    {
        const info = document.getElementById("info");

        info.textContent = "I'm flying!";

        setTimeout(() => {
            info.textContent = "Superhero Observer";
        }, 10000);
    }

    fightWithEvil()
    {
        const info = document.getElementById("info");

        info.textContent = "Khhhh-chh... Bang-g-g-g... Evil is defeated!";

        setTimeout(() => {
            info.textContent = "Superhero Observer";
        }, 10000);
    }

    testing()
    {
        const info = document.getElementById("info");

        info.textContent = "I'm testing sprints";

        setTimeout(() => {
            info.textContent = "Superhero Observer";
        }, 10000);
    }

}

// чулувічок
const human = new Human({
    firstName: getFirstName(),
    lastName: getLastName(),
    gender: getGender(),
    age: getAge(),
    calories: getCalories(500)
});

const hero = new Superhero(human);

// перетворення чулувічка у суперчулувічка
function turnIntoSuperhero()
{
    if(!human.hero && human.calories >= 500)
    {
        getFirstName("Observer");
        hero.calories = human.calories;
        document.getElementById('humanImage').style.display = 'none';
        document.getElementById('superheroImage').style.display = 'block';

        document.getElementById('info').innerText = 'Superhero Observer';

        document.getElementById('humanButtons').style.display = 'none';
        document.getElementById('superheroButtons').style.display = 'flex';

    }
    else
    {
        document.getElementById('info').innerText = 'Not enough calories';
    }
}

// функції для отримання даних чулувічка
function isOnlyLatinLetters(str)
{
    if (typeof str !== 'string' || str.length === 0) return false;

    for (let i = 0; i < str.length; i++)
    {
        const code = str.charCodeAt(i);

        const isUpperCase = code >= 65 && code <= 90;    // A-Z
        const isLowerCase = code >= 97 && code <= 122;   // a-z

        if (!isUpperCase && !isLowerCase)
        {
            return false;
        }
    }

    return true;
}

function getFirstName(name)
{
    let firstName = document.getElementById('firstName');

    if (name === undefined)
    {
        let valid = false;
        while (!valid)
        {
            let input = prompt("What's your name?", "Kate");

            if (
                input !== null &&
                input.length > 0 &&
                input.length <= 20 &&
                isOnlyLatinLetters(input)
            )
            {
                firstName.innerText = input;
                valid = true;
            }
        }
    }
    else
    {
        firstName.innerText = name;
    }

    return firstName.innerText;
}

function getLastName(name)
{
    let lastName = document.getElementById('lastName');

    if (name === undefined)
    {
        let valid = false;
        while (!valid)
        {
            let input = prompt("What's your last name?", "Lol");

            if (
                input !== null &&
                input.length > 0 &&
                input.length <= 20 &&
                isOnlyLatinLetters(input)
            )
            {
                lastName.innerText = input;
                valid = true;
            }
        }
    }
    else
    {
        lastName.innerText = name;
    }

    return lastName.innerText;
}

function containsMaleOrFemale(str)
{
    if (typeof str !== 'string' || str.length === 0) return false;

    const lowerStr = str.toLowerCase();
    if (lowerStr.includes("male") || lowerStr.includes("female"))
    {
        return true;
    }

    return false;
}

function getGender()
{
    let gender = document.getElementById('gender');

        let valid = false;
        while (!valid)
        {
            let input = prompt("What's your gender?", "female");

            if (
                input !== null &&
                containsMaleOrFemale(input) &&
                (input.toLowerCase() === "male" || input.toLowerCase() === "female")
            )
            {
                gender.innerText = input;
                valid = true;
            }
        }

    return gender.innerText;
}

function isNumber(str)
{
    if (typeof str !== 'string' || str.length === 0) return false;

    for (let i = 0; i < str.length; i++)
    {
        const code = str.charCodeAt(i);

        const isDigit = code >= 48 && code <= 57;  // 0-9

        if (!isDigit)
        {
            return false;
        }
    }

    return true;
}


function getAge()
{
    let age = document.getElementById('age');

    let valid = false;
    while (!valid)
    {
        let input = prompt("What's your age?", "0");

        if (
            input !== null &&
            input.length > 0 &&
            input.length <= 2 &&
            isNumber(input)
        )
        {
            age.innerText = input;
            valid = true;
        }
    }

    return age.innerText;
}

function getCalories(calories)
{
    let cl = document.getElementById('calories');
    cl.innerText = calories;
    return cl.innerText;
}