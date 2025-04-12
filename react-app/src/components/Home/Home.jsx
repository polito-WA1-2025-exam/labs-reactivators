import styles from "./Home.module.css";

function Home(){
    return(
        <main className={styles.container}>
        <div className={styles["text-center"]}
        >
          <h1 className={styles["game-logo"]}>Meme Games</h1>
          <hr className={styles["logo-underline"]} />
          <p className={styles["game-subtitle"]}>
            Get ready to laugh and play! Choose your mode below.
          </p>
          <div className="mt-4 d-grid gap-4 col-10 col-md-3 text-white mx-auto">
            <button className={`${styles.btn} ${styles["game-btn"]} ${styles["btn-default"]}`}
            >
              Default Mode
            </button>
            <button className={`${styles.btn} ${styles["game-btn"]} ${styles["btn-user"]} px-24`}>Play as User</button>
          </div>
        </div>
      </main>


    );


}

export default Home;