class Door {
    constructor(locked, description, password = "", lockedDescription = "") {
      this.locked = locked;
      this.description = description;
      this.password = password;
      this.lockedDescription = lockedDescription;
    }
  
    tryUnlock(code) {
      if (code == this.password) {
        this.locked = false;
        console.log("unlocked!");
        return true;
      } else {
        console.log("no unlock");
        return false;
      }
    }
  }
  
  class Room {
    constructor(name, description, inventory) {
      this.name = name;
      this.description = description;
      this.inventory = inventory;
      this.northRoomConnection = null;
      this.eastRoomConnection = null;
      this.southRoomConnection = null;
      this.westRoomConnection = null;
    }
  
    setNorthRoomConnection(northRoomConnection) {
      this.northRoomConnection = northRoomConnection;
    }
  
    setEastRoomConnection(eastRoomConnection) {
      this.eastRoomConnection = eastRoomConnection;
    }
  
    setSouthRoomConnection(southRoomConnection) {
      this.southRoomConnection = southRoomConnection;
    }
  
    setWestRoomConnection(westRoomConnection) {
      this.westRoomConnection = westRoomConnection;
    }
  }
  
  // This ties a room with a door for use by another room
  class RoomConnection {
    constructor(destinationRoom, doorIndex) {
      this.destinationRoom = destinationRoom;
      this.doorIndex = doorIndex;
    }
  }
  
  class Player {
    constructor(location, inventory) {
      this.location = location;
      this.inventory = inventory;
    }
  
    setLocation(location) {
      this.location = location;
    }
  
    takeItem(itemIndex) {
      let takenItem = this.location.inventory.splice(itemIndex, 1)[0]; // removes the item from the room's inventory
      this.inventory.push(takenItem); // Adding item to player inventory
      console.log(`Added ${takenItem.name} to inventory`);
    }
  
    dropItem(itemIndex) {
      let droppedItem = this.inventory.splice(itemIndex, 1)[0]; // removes the item from the player's inventory
      this.location.inventory.push(droppedItem); // Adding item to player's current room's inventory
      console.log(`Dropped ${droppedItem.name} to the floor`);
    }
  
    displayInventory() {
      for (itemIndex in this.inventory) {
        console.log(`${this.inventory[itemIndex].name}\n`);
      }
  
      if (this.inventory.length == 0) {
        console.log("There's nothing in your inventory!");
      }
    }
  }
  
  class Game {
    constructor(player, rooms, doors) {
      this.player = player;
      this.rooms = rooms;
      this.doors = doors;
    }
  }
  
  class Item {
    constructor(name, canBePickedUp, description) {
      this.name = name;
      this.canBePickedUp = canBePickedUp;
      this.description = description;
    }
  }

module.exports = {
    Door,
    Room,
    RoomConnection,
    Player,
    Item,
    Game,
}