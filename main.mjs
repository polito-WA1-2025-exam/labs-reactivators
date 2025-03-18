function Meme() {
    constructor(id, imageUrl, (correctCaptions = []));
    {
      this.id = id;
      this.imageUrl = imageUrl;
      this.correctCaptions = correctCaptions;
    }
  }
  function game() {
    constructor(
      game_id,
      (random_meme = []),
      (random_captions = []),
      score,
      message_report
    );
    {
      this.game_id = game_id;
      this.random_meme = random_meme;
      this.random_captions = random_captions;
      this.score = score;
      this.message_report = message_report;
    }
  }
  function gamesession() {
    constructor((random_games = []), total_score, summary_reprt);
    {
      this.random_games = random_games;
      this.total_score = total_score;
      this.summary_reprt = summary_reprt;
    }
  }
function caption(){
    constructor(id,text);{
        this.id=id
        this.text=text
    }

}