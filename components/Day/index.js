
import Inferno from 'inferno';

import styles from './styles.css';

const empty = '';

export default ({ children }) => <div className={`${styles.root} ${!children ? styles.disable : empty}`}>
  { children }
</div>

