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