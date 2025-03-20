function getAnimal()
{
    let animal = prompt('What animal is the superhero most similar to?');
    const animalRegex = RegExp('^[A-Za-z]{1,20}$');

    if (animalRegex.test(animal)) {
        alert('Animal name is ' + animal);
        return animal;
    } else {
        alert('Invalid input! Please enter a single word with only letters and no more than 20 characters.');
        return null;
    }
}

function getGender()
{
    let gender = prompt('Is the superhero male or female? Leave blank if unknown or other.');
    const genderRegex = RegExp('^male$|^female$|^$', 'i');

    if (genderRegex.test(gender)) {
        alert('Gender is ' + gender);
        return gender;
    } else {
        alert('Accepts only male, female gender or blank (not case sensitive)!');
        return null;
    }
}

function getAge()
{
    let age = prompt('How old is the superhero?');
    const ageRegex = RegExp(/^(?!0\d)\d{1,5}$/);

    if (ageRegex.test(age)) {
        alert('Age is ' + age);
        return age;
    } else {
        alert('Invalid input! Please enter a valid age (up to 5 digits, only numbers, not starting with zero).');
        return null;
    }
}

function superheroName()
{
    let description;
    let animal, gender, age;
    while(animal == null) {
        animal = getAnimal();
    }
    while(gender == null) {
        gender = getGender();
    }
    while(age == null) {
        age = getAge();
    }

    if (RegExp('^male$', 'i').test(gender) && age < 18)
    {
        description = "boy";
    }
    else if(RegExp('^male$', 'i').test(gender) && age >= 18)
    {
        description = "man";
    }
    else if(RegExp('^female$', 'i').test(gender) && age < 18)
    {
        description = "girl";
    }
    else if(RegExp('^female$', 'i').test(gender) && age >= 18)
    {
        description = "woman";
    }
    else if(RegExp('^$').test(gender) && age < 18)
    {
        description = "kid";
    }
    else if(RegExp('^$').test(gender) && age >= 18)
    {
        description = "hero";
    }

    alert(animal + '-' + description);
}

superheroName();