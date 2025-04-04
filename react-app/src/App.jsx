import "./App.css";

function App() {
  return (
    <main className="container">
      <div className="text-center">
        <h1 className="game-logo">Meme Games</h1>
        <hr className="logo-underline" />
        <p className="game-subtitle">
          Get ready to laugh and play! Choose your mode below.
        </p>
        <div className="mt-4 d-grid gap-4 col-10 col-md-3 text-white mx-auto">
          <button className="btn game-btn btn-default ">
            Default Mode
          </button>
          <button className="btn game-btn btn-user px-24">Play as User</button>
        </div>
      </div>
    </main>
  );
}

export default App;
