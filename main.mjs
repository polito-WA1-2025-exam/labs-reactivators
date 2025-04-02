import db from "./server.mjs";

//import { addRound, deleteRoundById, updateRoundScoreById } from "./rounds.mjs";
import { addUser, deleteUserById, updateUserScoreById } from "./users.mjs";
import { addMemes, deleteMemeById, updateMemeImageUrlById } from "./memes.mjs";
//import { addCaption,deleteCaptionById,updateCaptionTextById } from './captions.mjs';
//import{addMemeCaption,deleteMemeCaptionById,updateMemeCaptionScoreById} from './memeCaptions.mjs';
//import { addGame, deleteGameById, updateGameCompletionById } from "./games.mjs";
import { addCaption } from "./captions.mjs";
import { addMemeCaption } from "./mem_captions.mjs";
import { 
  addRound, 
  getRoundsForGame
} from "./rounds.mjs";
import { addGame } from "./games.mjs";
//---------------------------------------------------rounds------------------------------------------------------

/*addRound(db, 1, 1, 2, 10);
deleteRoundById(db, 5);
updateRoundScoreById(db, 2, 15);

//---------------------------------------------------users------------------------------------------------------

addUser(db, 'John Doe', '1234pass', 100); 
addUser(db, 'Jane Doe', '5678pass', 200);
addUser(db, 'Alice Smith', 'p1234', 50);

deleteUserById(db, 3);

updateUserScoreById(db, 2, 250);
*/

//----------------------------------------------------memes----------------------------------------------------

// Add a meme
//addMemes(db, 'https://miro.medium.com/v2/resize:fit:1400/1*GI-td9gs8D5OKZd19mAOqA.png');
//addMemes(db, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9gL12WnG9eu3PJmOqxJ7sxaanczYBnPUa2w&s');
//addMemes(db, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrOOUJ7Vji5xem89Ap9DCZT0URgYA6AHv_gw&s');
//addMemes(db, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf1rs6YCedWIozWnGA4GboUiGXSwLRd-1EbQ&s');

//deleteMemeById(db, 1);

updateMemeImageUrlById(db, 2, "https://example.com/updated-dog-meme.png");
//---------------------------------------------------captions------------------------------------------------------

// Add captions and ensure the IDs are valid
// addCaption(db, "When you realize it's Monday again");
// addCaption(db, "That moment when you find extra fries in the bag");
// addCaption(db, "Trying to look busy at work");
// addCaption(db, "Me after eating an entire pizza by myself");

// //---------------------------------------------------meme_captions------------------------------------------------------

// // Add meme-caption relationships
// // Make sure you manually specify the correct IDs for `meme_id` and `caption_id`
// // For example, if memes with `meme_id` values 1, 2, 3, 4 exist in the database:

// addMemeCaption(db, 2, 2, 15); // Meme 2, Caption 2, Score 15
// addMemeCaption(db, 3, 3, 20); // Meme 3, Caption 3, Score 20
// addMemeCaption(db, 4, 4, 25); // Meme 4, Caption 4, Score 25



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