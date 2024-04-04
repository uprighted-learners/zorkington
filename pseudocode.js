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

// Just need to handle it like this
      // open north/east/south/west
      /*
        switch (actionArgument):
          case "north":
            if game.player.location.northRoomConnection is null:
              don't do anything, print an error or something because the room connection doesn't exist (the player is just walking into a wall)

            openDoorIndex = game.player.location.northRoomConnection.doorIndex
            roomLocation = game.player.location.northRoomConnection.destinationRoom
            
            door = null;
            if game.doors[openDoorIndex] != null:
              door = game.doors[openDoorIndex]

            unlocked = true
            if door.locked:
              password = get password
              unlocked = door.tryUnlock(password)
            if unlocked:
              output whatever about the door being unlocked
              game.player.setLocation(roomLocation)
            else:
              print something about the door still being locked

          case "east":
            exactly the same as above, only with the eastRoomConnection instead

          case "south":
            exactly the same as above, only with the southRoomConnection instead

          case "west":
            exactly the same as above, only with the westRoomConnection instead

          default:
            treat the player as you would someone that doesn't know their directions (tell them you can only open north south east west)

            secret room with final door has the room as null, that's the easiest way I can think of to "beat" the game
            if room location is null, that is the "win" condition.
      */
      /*

      * = RoomConnection (Room, Door)

                          --------------------------------------
                          |                 | |                 |
                          |    Living       | |    Secret       |
                          |     Room        |_|     Room        |
                          |                 E_W                 E* win game
                          |                 | |                 |
                          |                 | |                 |
                          ---------S-----------------------------
                                  | |*
        ----------------- ---------N--------- -------------------
        |               | |                 | |                 |
        |     Bedroom   | |     Foyer       | |       Kitchen   |
        |               |*|                 |*|                 |
        |               E_W                 E_W                 |
        |               | |                 | |                 |
        |               | |                 | |                 |
        ---------------- ---------S--------- --------------------
                                | |*
                        ---------N---------
                        |                 |
                        |     Main        |
                        W    Street       E
                        |                 |
                        |                 |
                        |                 |
                        ---------S---------

    ---mainStreet---
      - mainStreet.setNorthRoomConnection(mainStreetTofoyerConnection)          is RoomConnection of (foyer, mainStreetFoyerDoor) 

    ---foyer---
      - foyer.setNorthRoomConnection(foyerTolivingRoomConnection)               is RoomConnection of (livingRoom, foyerLivingRoomDoor)
      - foyer.setEastRoomConnection(foyerTokitchenConnection)                   is RoomConnection of  (kitchen,    foyerKitchenDoor)
      - foyer.setSouthRoomConnection(foyerTomainStreetConnection)               is RoomConnection of (mainStreet, mainStreetFoyerDoor)
      - foyer.setWestRoomConnection(foyerTobedroomConnection)                   is RoomConnection of  (bedroom,    foyerBedroomDoor)

    ---bedroom---
      - bedroom.setEastRoomConnection(bedroomTofoyerConnection)                 is RoomConnection of  (foyer, foyerBedroomDoor)

    ---kitchen---
      - kitchen.setWestRoomConnection(kitchenTofoyerConnection)                 is RoomConnection of  (foyer, foyerKitchenDoor)

    ---livingRoom---
      - livingRoom.setEastRoomConnection(livingRoomTosecretRoomConnection)      is RoomConnection of   (secretRoom, livingRoomSecretDoor)
      - livingRoom.setSouthRoomConnection(livingRoomtofoyerConnection)          is RoomConnection of  (foyer,      foyerLivingRoomDoor)

    ---secretRoom---
      - secretRoom.setWestRoomConnection(secretRoomtolivingRoomConnection)      is RoomConnection of  (livingRoom, livingRoomSecretDoor)
      - secretRoom.setEastRoomConnection(secretRoomToWinConnection)             is RoomConnection of  (null,       finalDoor)

    when we set the player location(aka room) to null, we can "win" the game, handled later
  */
  /*
    We want to inspect actionArgument (this is the name of the item)

    Game: Player location (Room)
    Room: Inventory (Array of Items)
    Item: Description

    game.player.location.inventory = [Sign]
    Sign - Name: "sign", Description ...

    if our actionArgument is the name of an item in our location, then print the description
  */