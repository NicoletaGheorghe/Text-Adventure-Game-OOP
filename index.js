class Field {
    constructor(name){
        this._name = name;
        this._description = "";
        this._linkedFields = {};
        this._backgroundImage = "";
        this._animal = null;
        this._hasHearts = false;
    }
 get name(){
    return this._name;
 }
 get description(){
    return this._description;
 }
 get backgroundImage(){
    return this._backgroundImage;
 }
 get animal(){
    return this._animal;
 }
 get hasHearts(){
    return this._hasHearts;
 }

 set name(newName){
    if(typeof newName === "string" && newName.length > 0){
        this._name = newName;
        return
    }else{
    throw new Error("Invalid name.")
    }
 }
 set description(value){
    if(value.length < 5){
        throw  new Error("Description is too short.");
    }
      this._description = value;
 }
 set animal(species){
    this._animal = species;
 }
 set hasHearts(value){
    if(typeof value === "boolean"){
        this._hasHearts = value;
    }
 }
 set backgroundImage(url) {
    if(typeof url === "string" && url.length > 0){
        this._backgroundImage = url;
    }else{
        throw new Error("Invalid background image");
    }
 }
 
 linkField(direction, fieldToLink){
     this._linkedFields[direction] = fieldToLink;
 }
 getLinkedField(direction){
    return this._linkedFields[direction];
 }
 describe(){
   if(currentField !==  StartField){  
        let description = `You are in the <strong>${this._name}</strong>. ${this._description}.` ;
        if(this._animal){
            description += `You can see a ${this._animal.name} ${this._animal.description}`;
        }
        if(this._hasHearts) {
            description += `\n There is a heart you can collect here!`;
        }
        return description;
  }else{
    return StartField.description;
  }
 }
 move(direction) {
    if (direction in this._linkedFields) {
        return this._linkedFields[direction];
    }else {
        alert("You can't go that way.");
        return this;
    }
 }

}
class Animal {
    constructor(name) {
        this._name = name;
        this._description = "";
        this._isRescued = false;
    }
    get name(){
        return this._name;
    }
    get description(){
        return this._description;
    }
    set name(value) {
        this._name = value;
    }
    set description(value){
        this._description = value;
    }
    rescue(){
       if(!this._isRescued) {
        this._isRescued = true;
        return `You rescued the ${this._name}!`;
       }else{ 
        return `This ${this._name} is already safe.`
       }
    }
}
const StartField = new Field("Start");
StartField.description = "Welcome to <strong>Animal Rescue Adventure!</strong> Explore the magical fields using directions like 'north', 'south', 'east' or 'west'. " + 
"<strong>Look for animals</strong> in need and help them. <strong>Collect hearts</strong> along the way to show your kindness.\n" +
"Type 'start' to begin your journey into the Flower Meadow.";
StartField.backgroundImage = "startImg.png";

const FlowerMeadow = new Field ("Flower Meadow");
FlowerMeadow.description = "Butterflies flutter around";
FlowerMeadow.backgroundImage = "kitten.png";
FlowerMeadow.hasHearts = true;
const kitten = new Animal("kitten");
kitten.description = "stuck in flowers, can you rescue it? To the east there's a Hollow Tree, and from south, you can hear Chiriping Birds. Where would you like to go?"; 
FlowerMeadow.animal = kitten;

const ChirpingBirdsMeadow = new Field ("Chirping Birds Meadow");
ChirpingBirdsMeadow.description = "Dozens of colourful birds flutter from branch to branch, chirping a cheerful tune";
ChirpingBirdsMeadow.backgroundImage = "bird.png";
ChirpingBirdsMeadow.hasHearts = false;
const bird = new Animal("bird");
bird.description = "with a hurt wing. It needs your help. To the north, you can return to the Flower Meadow, and to the east, you can see the Bunny Burrow. Where would you like to go next?"
ChirpingBirdsMeadow.animal = bird;

const HollowTree = new Field ("Hollow Tree");
HollowTree.description = "A massive tree towers before you, its wide trunk is hollowed out by time and weather";
HollowTree.backgroundImage = "squirrel.png";
HollowTree.hasHearts = true;
const squirrel = new Animal("squirrel");
squirrel.description = "stuck between its twisted branches. She looks at you with hopeful eyes. Can you help her? To the south, you can see the Bunny Burrow, but to the west, you can walk into the Flower Meadow. What would you like to explore?";
HollowTree.animal = squirrel;

const BunnyBurrow = new Field("Bunny Burrow");
BunnyBurrow.description = "Soft clover covers the field like a green blanket. At the base of a gentle hill, you spot a small burrow";
BunnyBurrow.backgroundImage = "rabbit.png";
BunnyBurrow.hasHearts = true;
const bunny = new Animal("bunny");
bunny.description = "stuck. She looks scared. Would you help her? From the west, you can hear Chirping Birds, and to the north you see the Hollow Tree. Where would you go?"
BunnyBurrow.animal = bunny;

StartField.linkField("start", FlowerMeadow);
FlowerMeadow.linkField("south", ChirpingBirdsMeadow);
FlowerMeadow.linkField("east", HollowTree);
ChirpingBirdsMeadow.linkField("north", FlowerMeadow);
ChirpingBirdsMeadow.linkField("east", BunnyBurrow);
BunnyBurrow.linkField("west", ChirpingBirdsMeadow);
BunnyBurrow.linkField("north", HollowTree);
HollowTree.linkField("south", BunnyBurrow);
HollowTree.linkField("west", FlowerMeadow);
