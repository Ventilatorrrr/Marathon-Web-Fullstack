// guestList(Set)
let guestList = new Set();
guestList.add('Kate');
guestList.add('Lola');
guestList.add('Dan');
guestList.add('Marta');
guestList.add('Oracle');
guestList.add('Observer');
guestList.add('Mr. Zelenskiy');
guestList.add('Boss KFC');

/*
// tests
console.log("Guest List:");
console.log("Is Observer on the list?", guestList.has("Observer"));
console.log("Is Mr. Zelenskiy on the list?", guestList.has("Mr. Zelenskiy"));
console.log("Is Pupa on the list?", guestList.has("Pupa"));

guestList.delete("Marta");
console.log("Is Marta on the list?", guestList.has("Marta"));

guestList.clear();
**/

// menu(Map)
let menu = new Map();
menu.set("Big Taste", 300);
menu.set("McCrispie", 250);
menu.set("Cheeseburger", 100);
menu.set("Big Mac", 200);
menu.set("Double Royal Cheeseburger", 170);

// tests
/*
console.log("\nMenu:");
console.log("Iterating through menu:");
menu.forEach((price, dish) => console.log(`${dish}: $${price}`));

console.log("Price of McCrispie:", menu.get("McCrispie"));
console.log("Price of Big Mac:", menu.get("Big Mac"));

menu.delete("Cheeseburger");
console.log("Menu after removing Cheeseburger:", menu);

console.log("Menu size:", menu.size);
**/

// bankVault(WeakMap)
let bankVault = new WeakMap();

const box1Credentials = { id: "box1" };
const box2Credentials = { id: "box2" };
const box3Credentials = { id: "box3" };
const box4Credentials = { id: "box4" };
const box5Credentials = { id: "box5" };

bankVault.set(box1Credentials, "Secret documents");
bankVault.set(box2Credentials, "Diamonds");
bankVault.set(box3Credentials, "АК-47");
bankVault.set(box4Credentials, "Gold bars");
bankVault.set(box5Credentials, "Infinity Stones");

/*
// tests
console.log("\nBank Vault:");
console.log("Contents of box1:", bankVault.get(box1Credentials));
console.log("Contents of box6:", bankVault.get({id: "box6"}));

bankVault.delete(box2Credentials);
console.log("Bank Vault after removing box2:", bankVault);
**/

// coinCollection(WeakSet)
const coinCollection = new WeakSet();

const coin1 = { value: "1 cent" };
const coin2 = { value: "5 cents" };
const coin3 = { value: "10 cents" };
const coin4 = { value: "25 cents" };
const coin5 = { value: "1 dollar" };

coinCollection.add(coin1);
coinCollection.add(coin2);
coinCollection.add(coin3);
coinCollection.add(coin4);
coinCollection.add(coin5);

/*
// tests
console.log("\nCoin Collection:");
console.log("Has 1 cent coin?", coinCollection.has(coin1));
console.log("Has 2 dollar coin?", coinCollection.has({value: "2 dollar"}));

coinCollection.delete(coin3);
console.log("Coin Collection after removing 10 cents:", coinCollection);
**/