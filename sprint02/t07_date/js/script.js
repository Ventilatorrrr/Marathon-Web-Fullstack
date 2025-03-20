const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getFormattedDate(dateObject)
{
    let date = String(dateObject.getDate()).padStart(2, '0');
    let month = String(dateObject.getMonth() + 1).padStart(2, '0');
    let year = dateObject.getFullYear();
    let hour = String(dateObject.getHours()).padStart(2, '0');
    let minute = String(dateObject.getMinutes()).padStart(2, '0');
    let number_of_Day = dateObject.getDay();
    let dayNum = day[number_of_Day];

    return `${date}.${month}.${year} ${hour}:${minute} ${dayNum}`;
}