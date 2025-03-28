import db from "./server.mjs";

import { 
  addRound, 
  getRoundsForGame
} from "./rounds.mjs";
import { addGame } from "./games.mjs";

//---------------------------------------------------games------------------------------------------------------
// Add a new game
addGame(db, 1, false, 0); // user_id 1, not completed, initial score 0

//---------------------------------------------------rounds------------------------------------------------------
// Add a round to the game
addRound(db, 3, 1, 2, 10); // game_id 3, meme_id 1, caption_id 2, score 10

// Test getting rounds for the game
getRoundsForGame(db, 3).then(rounds => {
  console.log("Rounds for game 3:", rounds);
}).catch(err => {
  console.error("Error getting rounds for game:", err);
});