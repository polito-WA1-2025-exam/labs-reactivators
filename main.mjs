import db from "./server.mjs";


import { addRound, deleteRoundById, updateRoundScoreById } from './rounds.mjs';
import { addUser,deleteUserById,updateUserScoreById } from './users.mjs'; 
import { addMemes,deleteMemeById,updateMemeImageUrlById } from './memes.mjs'; 
//import { addCaption,deleteCaptionById,updateCaptionTextById } from './captions.mjs';
//import{addMemeCaption,deleteMemeCaptionById,updateMemeCaptionScoreById} from './memeCaptions.mjs';
import { addGame, deleteGameById, updateGameCompletionById } from './games.mjs';

addRound(db, 1, 1, 2, 10);
deleteRoundById(db, 5);
updateRoundScoreById(db, 2, 15);

addUser(db, 'John Doe', '1234pass', 100); 
addUser(db, 'Jane Doe', '5678pass', 200);
addUser(db, 'Alice Smith', 'p1234', 50);
deleteUserById(db, 3);
updateUserScoreById(db, 2, 250);
