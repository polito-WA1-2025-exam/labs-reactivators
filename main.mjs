import db from "./server.mjs";

import { addRound, deleteRoundById, updateRoundScoreById } from "./rounds.mjs";
import { addUser, deleteUserById, updateUserScoreById } from "./users.mjs";
import { addMemes, deleteMemeById, updateMemeImageUrlById } from "./memes.mjs";
//import { addCaption,deleteCaptionById,updateCaptionTextById } from './captions.mjs';
//import{addMemeCaption,deleteMemeCaptionById,updateMemeCaptionScoreById} from './memeCaptions.mjs';
import { addGame, deleteGameById, updateGameCompletionById } from "./games.mjs";

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

//---------------------------------------------------meme_captions------------------------------------------------------

//---------------------------------------------------captions------------------------------------------------------

//---------------------------------------------------games------------------------------------------------------
