import styles from './Login.module.css';

function Login(){
    return (
        <div className={`${styles["container"]}`}>
          {/* Sign-Up Box */}
          <div className={styles["form-box"]}>
            <h2>SIGN-UP</h2>
            <form>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
              <button className={styles.btn}>Sign-up</button>
            </form>
            <p className={styles["switch-text"]}>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
    
          {/* Login Box */}
          <div className={styles["form-box"]}>
            <h2>LOGIN</h2>
            <form>
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <button className={styles.btn}>Login</button>
              
            </form>
            <p className={styles["switch-text"]}>
              New user? <a href="/signup">Sign-up</a>
            </p>
          </div>
        </div>
      );
    }


export default Login;