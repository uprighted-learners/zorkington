const transitions = {
    mainSt: ["foyer"],
    foyer: ["mainSt","bedroom","livingRoom","kitchen"],
    bedroom: ["foyer"],
    kitchen: ["foyer"],
    livingRoom: ["foyer","secretRoom"],
    secretRoom: ["livingRoom"]
};

let commands = {
    move: ["move", "walk", "go"],
    inspect: ["inspect", "read", "look"]
    
}