import styles from './Footer.module.css';

function Footer() {
    return (
        <div className={styles.footer}>
            <div>
                <p>&copy; {new Date().getFullYear()} RunCast. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
