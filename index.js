const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

const classes = require("./classes.js")


function setupGame() {
  // Setup rooms
  let rooms = [];

  // Setup room one items
  let mainStreetItems = [];
  let mainStreetSign = new classes.Item(
    "sign",
    false,
    'The sign reads: "Welcome to Burlington Code Academy!\n Come on inside!\n If the door is locked, use the code 12345"'
  );
  let mainStreetPaper = new classes.Item(
    "paper",
    true,
    "A random piece of paper with no value"
  );
  mainStreetItems.push(mainStreetSign);
  mainStreetItems.push(mainStreetPaper);

  // Setup //! Main Street
  let mainStreet = new classes.Room(
    "Main Street",
    `182 Main St.
    You are standing on Main Street between Church and South Winooski.
    There is a door here. A keypad sits on the handle.
    There's a random piece of "paper" on the ground.
    On the door is a handwritten "sign".\n`,
    mainStreetItems
  );

  // Setup //! Foyer
  let foyerItems = [];
  let foyerTable = new classes.Item(
    "table",
    false,
    "A wooden table in the middle of the room"
  );
  let foyerMedallion = new classes.Item(
    "medallion",
    true,
    "A peculiar looking medallion."
  );
  foyerItems.push(foyerTable);
  foyerItems.push(foyerMedallion);
  let foyer = new classes.Room(
    "Foyer",
    `You are in a foyer. Or maybe it's an antechamber. 
  Or a vestibule. 
  Or an entryway. 
  Or an atrium. 
  Or a narthex. 
  But let's forget all that fancy vocabulary, and just call it a foyer.
  Anyways, it's definitely not a mudroom.
  You immediately notice a random "medallion" tucked into the corner of the room.
  There's a "table" in the center of the room.
  There are doors going north, east, south, and west`,
    foyerItems
  );

  //Setup //! Bedroom
  let bedRoomItems = [];
  let bedRoomBed = new classes.Item(`bed`, false, `A normal looking bed`);
  let bedRoomDesk = new classes.Item(
    `desk`,
    false,
    `There's a standard desk with a monitor on top of it and a computer beneath it.\n 
  There appears to be a "letter" hanging out of a drawer.`
  );
  let bedRoomLetter = new classes.Item(
    `letter`,
    true,
    `You are trapped in the house! If you want to leave, find my secret room hahahahaaaa\n
  Looks like there's scribbles on the bottom you can barely make out\n
  "Searc te iving oom - 432024"`
  ); // Living Room door will be locked, requires code 432024
  let bedRoomChair = new classes.Item(
    `chair`,
    false,
    `A slightly worn desk chair, appears to have no use`
  );
  bedRoomItems.push(bedRoomBed);
  bedRoomItems.push(bedRoomDesk);
  bedRoomItems.push(bedRoomLetter);
  bedRoomItems.push(bedRoomChair);

  let bedRoom = new classes.Room(
    "Bedroom",
    `Stepping into the bedroom, your eyes meet a creepy looking "bed", barely lit by the window.\n 
  A rickety desk sits against the wall, bare but for a single "chair". There's a sense of unease in this room, but there must be something important here`,
    bedRoomItems
  );

  //Setup //! Kitchen
  let kitchenItems = [];
  let kitchenCupboard = new classes.Item(
    `cupboard`,
    false,
    `There's a cupboard filled with fine china and decorative items`
  );
  let kitchenCounter = new classes.Item(
    `counter`,
    false,
    `A knife lies casually on the kitchen counter, ready for action in the heart of culinary creativity.`
  );
  let kitchenKnife = new classes.Item(
    `knife`,
    true,
    `Why are you READING a knife? Weirdo.`
  );
  kitchenItems.push(kitchenCupboard);
  kitchenItems.push(kitchenCounter);
  kitchenItems.push(kitchenKnife);

  let kitchen = new classes.Room(
    "Kitchen",
    `In the kitchen, a simple "cupboard" stands against one wall, storing essentials out of sight.\n 
  Nearby, a spacious "counter" provides ample workspace, with a "knife" resting on its surface, ready for use.`,
    kitchenItems
  );

  //Setup //! Living Room
  let livingRoomItems = [];
  let livingRoomSofa = new classes.Item(
    `sofa`,
    false,
    `What a nice sofa! Looks very comfy`
  );
  let livingRoomCoffeeTable = new classes.Item(
    `coffee table`,
    false,
    `A very interesting looking coffee table, almost looks like it doesn't belong here.\n
  You hardly notice a piece of a "note" peeking out from under the coffee table.`
  );
  let livingRoomNote = new classes.Item(
    `note`,
    true,
    `Enjoying your eternal stay here? Be sure to get comfy. Whatever you do, do not take my painting of the wall.`
  );
  let livingRoomPainting = new classes.Item(
    `painting`,
    true,
    `An elaborate "painting" of a person, should I take it?`
  );
  // let livingRoomMedallionSlot = new Item(`medallion slot`, false, `I think I can slot the medallion I found into it, should I?`);
  livingRoomItems.push(livingRoomSofa);
  livingRoomItems.push(livingRoomCoffeeTable);
  livingRoomItems.push(livingRoomNote);
  livingRoomItems.push(livingRoomPainting);
  // livingRoomItems.push(livingRoomMedallionSlot);

  let livingRoom = new classes.Room(
    "Living Room",
    `You enter what appears to be the living room of the home. A "sofa" huddles in the shadows, its faded form casting a sense of unease.\n
  Opposite, a "coffee table" rests silently, its surface holding secrets in the dim light.`,
    livingRoomItems
  );

  //Setup //! Secret(Final) Room
  let secretRoomItems = [];
  let secretRoomWorkBench = new classes.Item(
    `work bench`,
    false,
    `Looks like whoever captured me does most of their dirty work here.\n
  Against the back of the workbench, you spot a "wallet" full of cash.`
  );
  let secretRoomWallet = new classes.Item(
    `wallet`,
    true,
    `As you open the wallet, you find hundreds of dollars as well as the capturers id card`
  );
  secretRoomItems.push(secretRoomWorkBench);
  secretRoomItems.push(secretRoomWallet);

  let secretRoom = new classes.Room(
    "Secret Room",
    `As you enter the secret room, a shiver runs down your spine.\n
  You feel like you shouldn't be here, but feel that this must be the way out.\n
  A well kept "work bench" resides against the wall of the room.\n
  After another observation of the room, you make out an unlocked door almost entirely camoflauged into the wall. Should you open it?`,
    secretRoomItems
  );

  // Setup Doors
  let doors = [];
  let mainStreetfoyerDoor = new classes.Door(
    true,
    "A plain door with a keypad on the door handle",
    "12345",
    "This door is locked."
  );
  let foyerBedroomDoor = new classes.Door(
    false,
    "A door to another room, appears to be unlocked"
  );
  let foyerLivingRoomDoor = new classes.Door(
    true,
    "The door to the living room",
    "432024",
    "Dang, the door is locked! Maybe the code is around here somewhere."
  );
  let foyerKitchenDoor = new classes.Door(false, "The door to the kitchen");
  let livingRoomSecretDoor = new classes.Door(false, "???", "Medallion?", "???");
  let finalDoor = new classes.Door(false, "???");

  doors.push(mainStreetfoyerDoor);
  doors.push(foyerBedroomDoor);
  doors.push(foyerLivingRoomDoor);
  doors.push(foyerKitchenDoor);
  doors.push(livingRoomSecretDoor);
  doors.push(finalDoor);

  let mainStreetTofoyerConnection = new classes.RoomConnection(
    foyer,
    doors.indexOf(mainStreetfoyerDoor)
  );
  let foyerTomainStreetConnection = new classes.RoomConnection(
    mainStreet,
    doors.indexOf(mainStreetfoyerDoor)
  );

  let foyerTobedroomConnection = new classes.RoomConnection(
    bedRoom,
    doors.indexOf(foyerBedroomDoor)
  );
  let bedroomTofoyerConnection = new classes.RoomConnection(
    foyer,
    doors.indexOf(foyerBedroomDoor)
  );

  let foyerTolivingRoomConnection = new classes.RoomConnection(
    livingRoom,
    doors.indexOf(foyerLivingRoomDoor)
  );
  let livingRoomtofoyerConnection = new classes.RoomConnection(
    foyer,
    doors.indexOf(foyerLivingRoomDoor)
  );

  let foyerTokitchenConnection = new classes.RoomConnection(
    kitchen,
    doors.indexOf(foyerKitchenDoor)
  );
  let kitchenTofoyerConnection = new classes.RoomConnection(
    foyer,
    doors.indexOf(foyerKitchenDoor)
  );

  let livingRoomTosecretRoomConnection = new classes.RoomConnection(
    secretRoom,
    doors.indexOf(livingRoomSecretDoor)
  );
  let secretRoomtolivingRoomConnection = new classes.RoomConnection(
    livingRoom,
    doors.indexOf(livingRoomSecretDoor)
  );

  let secretRoomToWinConnection = new classes.RoomConnection(
    null,
    doors.indexOf(finalDoor)
  );

  mainStreet.setNorthRoomConnection(mainStreetTofoyerConnection);

  foyer.setNorthRoomConnection(foyerTolivingRoomConnection);
  foyer.setEastRoomConnection(foyerTokitchenConnection);
  foyer.setSouthRoomConnection(foyerTomainStreetConnection);
  foyer.setWestRoomConnection(foyerTobedroomConnection);
  bedRoom.setEastRoomConnection(bedroomTofoyerConnection);

  kitchen.setWestRoomConnection(kitchenTofoyerConnection);

  livingRoom.setEastRoomConnection(livingRoomTosecretRoomConnection);
  livingRoom.setSouthRoomConnection(livingRoomtofoyerConnection);

  secretRoom.setWestRoomConnection(secretRoomtolivingRoomConnection);
  secretRoom.setEastRoomConnection(secretRoomToWinConnection);

  // Setup player (put into mainStreet) thanks for doing all that bro I appreciate you
  let player = new classes.Player(mainStreet, []);

  rooms.push(mainStreet);
  rooms.push(foyer);
  rooms.push(bedRoom);
  rooms.push(kitchen);
  rooms.push(livingRoom);
  rooms.push(secretRoom);
  // Setup game (keeps track of player and rooms and doors)
  return new classes.Game(player, rooms, doors);
}

const allowedActions = [
  "north",
  "east",
  "south",
  "west",
  "inspect",
  "take",
  "open",
  "drop",
  "i",
  "inventory",
];
const noArgumentActions = ["i", "inventory", "north", "east", "south", "west"];

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

async function handlePrompt() {
  let input = await ask(">_");
  if (input == "") return;

  // "inspect sign".split(" ")
  // ["inspect", "sign"]
  let inputTokens = input.split(" ");
  let action = inputTokens[0];
  if (allowedActions.includes(action) == false) {
    console.log(`Sorry, I don't know how to ${action}. Here is a list of commands you can use:\n
    inspect\n
    take\n
    open\n
    drop\n
    i/inventory\n`);
    return;
  }

  if (inputTokens.length < 2 && !noArgumentActions.includes(action)) {
    console.log(`Sorry, I don't know what to ${action}`);
    return;
  }

  let actionArgument = "";
  if (inputTokens.length >= 2) {
    actionArgument = inputTokens[1];
  }

  switch (action) {
    case "inspect":
      let inspectFoundItem = false;
      actionArgument = input.slice(action.length + 1);
      // Loop through items in the player's current room
      for (itemIndex in game.player.location.inventory) {
        // [for-item loop...]
        // Check if current actionArgument is equal to the name of an item in the current room
        if (actionArgument == game.player.location.inventory[itemIndex].name) {
          // Match, print the description of the found item
          console.log(game.player.location.inventory[itemIndex].description);
          inspectFoundItem = true;
          break; // <------ sorta frowned upon, but whatever. This just exits the [for-item loop...]
        }
      }
      if (!inspectFoundItem) {
        console.log(`There is no ${actionArgument} to inspect...`);
      }
      break;

    case "take":
      if (actionArgument == "inventory") {
        game.player.displayInventory();
        break;
      }
      let takeFoundItem = false;
      actionArgument = input.slice(action.length + 1);

      // loop through room's inventory to find item
      for (itemIndex in game.player.location.inventory) {
        // if item is found
        if (actionArgument == game.player.location.inventory[itemIndex].name) {
          takeFoundItem = true;
          // check if item can actually be picked up
          if (game.player.location.inventory[itemIndex].canBePickedUp) {
            game.player.takeItem(itemIndex);
          } else {
            console.log(`You cannot take the ${actionArgument}!`);
          }
          break; // Break out of itemIndex loop
        }
      }
      if (!takeFoundItem) {
        console.log(`I cannot find ${actionArgument} to take...`);
      }
      break;

    case "north":
      if (game.player.location.northRoomConnection == null) {
        console.log("You are walking into a wall!");
      } else {
        openDoorIndex = game.player.location.northRoomConnection.doorIndex;
        roomLocation = game.player.location.northRoomConnection.destinationRoom;

        door = null;
        if (game.doors[openDoorIndex] != null) {
          door = game.doors[openDoorIndex];
        }

        unlocked = true;
        if (door.locked) {
          let password = await ask("Enter the password: ");
          unlocked = door.tryUnlock(password);
        }
        if (unlocked) {
          game.player.setLocation(roomLocation);
          if (roomLocation == null) {
            console.log("You win!");
            process.exit(0);
          }
          console.log(game.player.location.description);
        } else {
          console.log("The door is still locked");
        }
      }
      break;
    case "east":
      if (game.player.location.eastRoomConnection == null) {
        console.log("You are walking into a wall!");
      } else {
        openDoorIndex = game.player.location.eastRoomConnection.doorIndex;
        roomLocation = game.player.location.eastRoomConnection.destinationRoom;

        door = null;
        if (game.doors[openDoorIndex] != null) {
          door = game.doors[openDoorIndex];
        }

        unlocked = true;
        if (door.locked) {
          let password = await ask("Enter the password: ");
          unlocked = door.tryUnlock(password);
        }
        if (unlocked) {
          game.player.setLocation(roomLocation);
          if (roomLocation == null) {
            console.log("You win!");
            process.exit(0);
          }
          console.log(game.player.location.description);
        } else {
          console.log("The door is still locked");
        }
      }
      break;
    case "west":
      if (game.player.location.westRoomConnection == null) {
        console.log("You are walking into a wall!");
      } else {
        openDoorIndex = game.player.location.westRoomConnection.doorIndex;
        roomLocation = game.player.location.westRoomConnection.destinationRoom;

        door = null;
        if (game.doors[openDoorIndex] != null) {
          door = game.doors[openDoorIndex];
        }

        unlocked = true;
        if (door.locked) {
          let password = await ask("Enter the password: ");
          unlocked = door.tryUnlock(password);
        }
        if (unlocked) {
          game.player.setLocation(roomLocation);
          if (roomLocation == null) {
            console.log("You win!");
            process.exit(0);
          }
          console.log(game.player.location.description);
        } else {
          console.log("The door is still locked");
        }
      }
      break;
    case "south":
      if (game.player.location.southRoomConnection == null) {
        console.log("You are walking into a wall!");
      } else {
        openDoorIndex = game.player.location.southRoomConnection.doorIndex;
        roomLocation = game.player.location.southRoomConnection.destinationRoom;

        door = null;
        if (game.doors[openDoorIndex] != null) {
          door = game.doors[openDoorIndex];
        }

        unlocked = true;
        if (door.locked) {
          let password = await ask("Enter the password: ");
          unlocked = door.tryUnlock(password);
        }
        if (unlocked) {
          game.player.setLocation(roomLocation);
          if (roomLocation == null) {
            console.log("You win!");
            process.exit(0);
          }
          console.log(game.player.location.description);
        } else {
          console.log("The door is still locked");
        }
      }
      break;
    case "open":
      for (let door of game.doors) {
        if (actionArgument === "door") {
          openFoundDoor = true;

          if (door.locked) {
            let password = await ask("Enter the password: ");

            let unlocked = door.tryUnlock(password);
            if (unlocked) {
              console.log(
                "The door is unlocked! You enter the next room and the door shuts behind you"
              );
              game.player.setLocation(game.rooms[1]);
              console.log(game.player.location.description);
            } else {
              console.log("Nope! Wrong password.");
            }
          } else {
            console.log("The door is already unlocked!");
          }
          break;
        }
      }
      if (!openFoundDoor) {
        console.log(`There is no ${actionArgument} to open`);
      }
      //---
      break;

    case "drop":
      let dropFoundItem = false;
      actionArgument = input.slice(action.length + 1);

      for (itemIndex in game.player.inventory) {
        if (actionArgument == game.player.inventory[itemIndex].name) {
          dropFoundItem = true;
          game.player.dropItem(itemIndex);
          break;
        }
      }
      if (!dropFoundItem) {
        console.log(`You don't have ${actionArgument} in your inventory!`);
      }

      break;

    case "i":
    case "inventory":
      game.player.displayInventory();
      break;

    default:
      console.log("Not yet implemented");
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