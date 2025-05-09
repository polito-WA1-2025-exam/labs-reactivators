import styles from './profile.module.css';
import profileImage from '../../assets/profileimage.jpg'; 

function Profile() {
  return (
    
    <div className={styles.profileContainer}>
    <div className={styles.infoContainer}>

      <div className={styles.imageContainer}>
      <img src={profileImage} alt="Profile" className={styles.profileImage} />

      </div>
          <div className={styles.inputField}>
            <label>Username</label>
            <input
              type="text"
              value="John Doe" // Placeholder for username (non-editable)
              readOnly
              className={styles.readOnlyInput}
            />
          </div>
          <div className={styles.inputField}>
            <label>Total Score</label>
            <input
              type="number"
              placeholder="Total Score"
              className={styles.totalScoreInput}
            />
          </div>

        {/* Start New Game Button */}
        <button className={styles.startButton}>Start New Game</button>
      </div>

      {/* Right Section: Game History */}
      <div className={styles.historyContainer}>
  <h2>Game History</h2>
  <table className={styles.historyTable}>
    <thead>
      <tr>
        <th className={styles.historyItemColumn}>Game</th>
        <th className={styles.historyItemColumn}>Score</th>
        <th className={styles.historyItemColumn}>play</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className={styles.historyItemColumn}>Game 1</td>
        <td className={styles.historyItemColumn}>Score: 100</td>
        <td>
          <button className={styles.startButton}>Play the Game</button>
        </td>
      </tr>
      <tr>
        <td className={styles.historyItemColumn}>Game 2</td>
        <td className={styles.historyItemColumn}>Score: 200</td>
        <td>
          <button className={styles.startButton}>Play the Game</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>

    </div>
  );
}

export default Profile;
