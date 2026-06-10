function gameObject() {
  return {
    home: {
      teamName: "Brooklyn Nets",
      colors: ["Black", "White"],
      players: {
        "Alan Anderson": {
          number: 0,
          shoe: 16,
          points: 22,
          rebounds: 12,
          assists: 12,
          steals: 3,
          blocks: 1,
          slamDunks: 1,
        },
        "Reggie Evens": {
          number: 30,
          shoe: 14,
          points: 12,
          rebounds: 12,
          assists: 12,
          steals: 12,
          blocks: 12,
          slamDunks: 7,
        },
        "Brook Lopez": {
          number: 11,
          shoe: 17,
          points: 17,
          rebounds: 19,
          assists: 10,
          steals: 3,
          blocks: 1,
          slamDunks: 15,
        },
        "Mason Plumlee": {
          number: 1,
          shoe: 19,
          points: 26,
          rebounds: 12,
          assists: 6,
          steals: 3,
          blocks: 8,
          slamDunks: 5,
        },
        "Jason Terry": {
          number: 31,
          shoe: 15,
          points: 19,
          rebounds: 2,
          assists: 2,
          steals: 4,
          blocks: 11,
          slamDunks: 1,
        },
      },
    },
    away: {
      teamName: "Charlotte Hornets",
      colors: ["Turquoise", "Purple"],
      players: {
        "Jeff Adrien": {
          number: 4,
          shoe: 18,
          points: 10,
          rebounds: 1,
          assists: 1,
          steals: 2,
          blocks: 7,
          slamDunks: 2,
        },
        "Bismack Biyombo": {
          number: 0,
          shoe: 16,
          points: 12,
          rebounds: 4,
          assists: 7,
          steals: 7,
          blocks: 15,
          slamDunks: 10,
        },
        "DeSagna Diop": {
          number: 2,
          shoe: 14,
          points: 24,
          rebounds: 12,
          assists: 12,
          steals: 4,
          blocks: 5,
          slamDunks: 5,
        },
        "Ben Gordon": {
          number: 8,
          shoe: 15,
          points: 33,
          rebounds: 3,
          assists: 2,
          steals: 1,
          blocks: 1,
          slamDunks: 0,
        },
        "Brendan Hayword": {
          number: 33,
          shoe: 15,
          points: 6,
          rebounds: 12,
          assists: 12,
          steals: 22,
          blocks: 5,
          slamDunks: 12,
        },
      },
    },
  };
}

const gameData = gameObject();

function findPlayer(playerName) {
  const teams = [];
  for (let team in gameData) {
    teams.push(gameData[team]);
  }
  for (const team of teams) {
    for (let name in team.players) {
      if (name === playerName) {
        return team.players[name];
      }
    }
  }
}

function findTeam(teamName) {
  for (let team in gameData) {
    if (gameData[team].teamName === teamName) {
      return gameData[team];
    }
  }
}

function numPointsScored(playerName) {
  return findPlayer(playerName).points;
}

function shoeSize(playerName) {
  return findPlayer(playerName).shoe;
}

function teamColors(teamName) {
  return findTeam(teamName).colors;
}

function teamNames() {
  const teamNames = [];
  for (let team in gameData) {
    teamNames.push(gameData[team].teamName);
  }
  return teamNames;
}

function playerNumbers(teamName) {
  const team = findTeam(teamName);
  const numbers = []; //named numbers instead of playerNumbers to avoid confusion/conflict with the function name
  Object.keys(team.players).forEach((player) => {
    numbers.push(team.players[player].number);
  });
  return numbers;
}

function playerStats(playerName) {
  return findPlayer(playerName);
}

function bigShoeRebounds() {
  let playerWithLargestShoe;
  Object.keys(gameData).forEach((team) => {
    Object.keys(gameData[team].players).forEach((playerName) => {
      if (
        !playerWithLargestShoe ||
        playerWithLargestShoe.show < gameData[team].players[playerName].shoe
      ) {
        playerWithLargestShoe = gameData[team].players[playerName];
      }
    });
  });
  return playerWithLargestShoe.rebounds;
}

function mostPointsScored() {
  let highestScoringPlayer;
  Object.keys(gameData).forEach((team) => {
    Object.keys(gameData[team].players).forEach((playerName) => {
      if (
        !highestScoringPlayer ||
        highestScoringPlayer.points < gameData[team].players[playerName].points
      ) {
        highestScoringPlayer = {
          name: playerName,
          points: gameData[team].players[playerName].points,
        };
      }
    });
  });
  return highestScoringPlayer.name;
}

function winningTeam() {
  const teamScores = {};
  let winningTeam;
  Object.keys(gameData).forEach((team) => {
    teamScores[gameData[team].teamName] = 0;
    Object.keys(gameData[team].players).forEach((playerName) => {
      teamScores[gameData[team].teamName] +=
        gameData[team].players[playerName].points;
    });
  });
  Object.keys(teamScores).forEach((team) => {
    if (!winningTeam || teamScores[winningTeam] < teamScores[team]) {
      winningTeam = team;
    }
  });
  return winningTeam;
}

//helper function to join an array into a list following normal grammer for inserting commas and an 'and' in a list (1,2, and 3 or 1 and 2)
function joinListWithClosingAnd(array) {
  if (array.length === 1) {
    return array[0];
  }
  if (array.length === 2) {
    return array.join(" and ");
  } else {
    let formattedList = "";
    for (let i = 0; i < array.length - 1; i++) {
      formattedList += array[i] + ", ";
    }
    formattedList += "and " + array[array.length - 1];
    return formattedList;
  }
}

function getPlayersWithLongestName(playerNames) {
  let isTied = false;
  let longestName;
  let longestNameLength;
  playerNames.forEach((name) => {
    if (!longestName || longestName.length < name.length) {
      longestName = name;
    } else if (longestName.length == name.length) {
      isTied = true;
      longestNameLength = name.length;
    }
  });
  if (!isTied) {
    return [longestName];
  } else {
    return playerNames.filter((name) => name.length === longestNameLength);
  }
}

//helper function to get the list of all player names
function getAllPlayerNames() {
  const playerNames = [];
  Object.keys(gameData).forEach((team) => {
    Object.keys(gameData[team].players).forEach((playerName) => {
      playerNames.push(playerName);
    });
  });
  return playerNames;
}

function playerWithLongestName() {
  const playerNames = getAllPlayerNames();
  const longestName = getPlayersWithLongestName(playerNames);
  if (longestName.length === 1) {
    return longestName[0];
  } else {
    return (
      joinListWithClosingAnd(longestName) + " are tied for the longest name"
    );
  }
}

function doesLongNameStealATon() {
  const playerNames = getAllPlayerNames();
  const longestNames = getPlayersWithLongestName(playerNames);
  if (longestNames.length === 1) {
    const stealCount = findPlayer(longestNames[0]).steals;
    for (const team in gameData) {
      for (const playerName in gameData[team].players) {
        if (stealCount < gameData[team].players[playerName].steals) {
          return false;
        }
      }
    }
    return true;
  } else {
    let stealCount;
    let stealLeader; //stores the name of the player with the most steals out of the list of players tied for longest name
    longestNames.forEach((playerName) => {
      const player = findPlayer(playerName);
      if (!stealCount || stealCount < player.steals) {
        stealCount = player.steals;
        stealLeader = playerName;
      }
    });
    for (const team in gameData) {
      for (const playerName in gameData[team].players) {
        if (stealCount < gameData[team].players[playerName]) {
          return false;
        }
      }
    }
    const longestNamesNotSteals = longestNames.filter(
      (name) => name !== stealLeader,
    ); //array for players that tied for longest name but not steals
    return joinListWithClosingAnd(longestNamesNotSteals)+' doesn\'t have the most steals, but '+stealLeader+' does.'
  }
}

console.log(numPointsScored("Alan Anderson"));
console.log(shoeSize("Ben Gordon"));
console.log(teamColors("Brooklyn Nets"));
console.log(playerNumbers("Brooklyn Nets"));
console.log(teamNames());
console.log(playerStats("Alan Anderson"));
console.log(bigShoeRebounds());
console.log(mostPointsScored());
console.log(winningTeam());
console.log(playerWithLongestName());
console.log(doesLongNameStealATon());