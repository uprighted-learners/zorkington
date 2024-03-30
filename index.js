/*
*Pseudocode for Zorkington Project 

Stories (what needs to be implemented)
One Room
- Display intro text
- Wait for user input
- Handle unknown commands ("I don't know how to ...")

Interact with item
- Into text
- On valid command AND target
-- Output based on command

Immovable Objects
- Item properties (unable to be taken)

Locked Out
- Locked doors w/keypad

Speak friend and enter
- Enter next room based on correct code for locked door

Unauthorized Access
- Deny access on wrong code (no move)

Foyer
- Give description of next room

Inventory
- Allow items to be picked up and put into inventory

Display Inventory
- Show inventory when prompted ('i' or 'inventory' or 'take inventory')

Drop Inventory
- Drop item from inventory when prompted ('drop <ITEM>')

Keep Doors Open
- Keep track of unlocked doors

Create More Rooms
- Make 4 more rooms, with connections and inventories
-- limited number of room connections
-- unique description
-- seperate inventory
-- optionally puzzles, locked door, interactive items

-------

State machine
- Current Room
-- Room description (immutable, cannot be changed)
-- Room connection (immutable)
-- Room inventory (mutable)
- Current Player
-- Player inventory (mutable)
-- Player status (mutable)

-------

Actions 
- read
- take
- open
- enter
- drop
- move (N,E,S,W)
- i/inventory/take inventory

-------

Classes

-Player
-- Player inventory
-- Player location

-Room
-- Description
-- Inventory
-- North Room
-- South Room
-- East Room
-- West Room

-Doors
-- Locked or Unlocked
-- Code or key required

-Items
-- Interactable
-- Description
-- InPlayerInventory

------

Example game state
Player location: Room 1
Room 1 North Room: {Room 2, Door1}
Room 1 Items: Paper, Sign
Room 2 South Room: {Room 1, Door1}
Door1: Locked, 12345
Paper: Pickup, description(useless)
Sign: Not Pickup, description gives code

------

*/

const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

class Door {
  constructor(locked, password="") {
    this.locked = locked
    this.password = password
  }
  
  tryUnlock(code) {
      if (code == this.password) {
        this.locked = false;
        console.log("unlocked!")
        return true
      } else {
        console.log("no unlock")
        return false
      }
    }
}

class Room {
  constructor(description, inventory) {
    this.description = description;
    this.inventory = inventory;
  }
}

class Player {
  constructor(location, inventory) {
    this.location = location;
    this.inventory = inventory;
  }
}

class Game {
  constructor(player, rooms) {
    this.player = player;
    this.rooms = rooms;
  }
}

class Item {
  constructor(name, canBePickedUp, description, inPlayerInventory) {
    this.name = name;
    this.canBePickedUp = canBePickedUp;
    this.description = description;
    this.inPlayerInventory = inPlayerInventory;
  }
}

function setupGame() {
  
  // Setup rooms
  let rooms = [];
  let oneRoomItems = [];
  let oneRoomSign = new Item('sign', false, 'The sign says Derek is a beautiful human', false)
  oneRoomItems.push(oneRoomSign);
  let oneRoom = new Room(
  `182 Main St.
  You are standing on Main Street between Church and South Winooski.
  There is a door here. A keypad sits on the handle.
  On the door is a handwritten sign.\n`, oneRoomItems)
  rooms.push(oneRoom);

  // Setup player (put into oneRoom)
  let player = new Player(oneRoom, null)

  // Setup game (keeps track of player and rooms)
  return new Game(player, rooms)
}

const allowedActions = ["read", "take", "open", "enter", "drop", "move", "i", "inventory"]
const noArgumentActions = ["i", "inventory"]

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}



async function handlePrompt() {
  let input = await ask(">_");
  if (input == "") return;

  // "read sign".split(" ")
  // ["read", "sign"]
  let inputTokens = input.split(" ");
  let action = inputTokens[0];
  if (inputTokens.length < 2 && noArgumentActions(action)) {
    console.log(`Sorry, I don't know what to ${action} to/with/on`);
    return;
  }

  if (allowedActions.includes(action) == false) {
    console.log(`Sorry, I don't know to ${action}`);
    return;
  }

  let actionArgument = "";
  if (inputTokens.length >= 2) {
    actionArgument = inputTokens[1];
  }

  /*
    We want to read actionArgument (this is the name of the item)

    Game: Player location (Room)
    Room: Inventory (Array of Items)
    Item: Description

    game.player.location.inventory = [Sign]
    Sign - Name: "sign", Description ...

    if our actionArgument is the name of an item in our location, then print the description
  */
 // *switch is a big-ass if else chain
  switch(action) {
    case "read":
      let foundItem = false;
      // Loop through items in the player's current room
      for (i in game.player.location.inventory) { // [for-item loop...]
        // Check if current actionArgument is equal to the name of an item in the current room
        if (actionArgument == game.player.location.inventory[i].name) {
          // Match, print the description of the found item
          console.log(game.player.location.inventory[i].description);
          foundItem = true;
          break; // <------ sorta frowned upon, but whatever. This just exits the [for-item loop...]
        }
      }
      if (!foundItem) {
        console.log(`There is no ${actionArgument} to read...`);
      }
      break;
    
    case "take":
      console.log("Would do take")
      break
    
    case "open":
      console.log("Would do open")
      break

    case "enter":
      console.log("Would do enter")
      break
    
    case "drop":
      console.log("Would do drop")
      break

    case "move":
      console.log("Would do move")
      break

    case "i":
    case "inventory":
      console.log("Can do i/inventory")
      break
      
    default:
      console.log("Not yet implemented")
  }
}


async function start() {
  console.log(game.player.location.description);
  while (true) {
    await handlePrompt();
    
  }
  
  process.exit();
}

let game = setupGame();
start();