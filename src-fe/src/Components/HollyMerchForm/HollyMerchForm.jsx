import styles from './HollyMerchForm.module.css';

export const HollyMerchForm = ({ children, onSubmit, submitCTAText, title }) => {

    return (
        <div className={`container ${styles.container}`}>
            <h3 className={`card-title ${styles.title}`}>{title}</h3>
            <div className="justify-content-center">
                <form onSubmit={event => event.preventDefault()} className={`${styles.form}`}>
                    {children}
                    <button type="submit" onClick={onSubmit} className={`btn btn-primary btn-block ${styles.loginBtn}`}>
                        {submitCTAText}
                    </button>
                </form>
            </div>
        </div>
    );
};