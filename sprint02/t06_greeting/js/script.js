let firstName = String(prompt('Enter your first name'));
let lastName = String(prompt('Enter your last name'));

function capitalizeFirstLetter(word)
{
    if (word && word.length > 0)
    {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    return word;
}

const nameRegex = RegExp('^[A-Za-z]+$');

if (firstName.length > 0 && lastName.length > 0 && nameRegex.test(firstName) && nameRegex.test(lastName))
{
    firstName = capitalizeFirstLetter(firstName);
    lastName = capitalizeFirstLetter(lastName);
    alert(`Hi, ${firstName} ${lastName}!`);
    console.log(`Hi, ${firstName} ${lastName}!`);
}
else
{
    alert('Wrong input!');
    console.log("Wrong input!");
}


