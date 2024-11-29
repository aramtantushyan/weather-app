import { useContext } from "react";
import styles from './header.module.scss';
import { WeatherContext } from "../../contexts/WeatherContextProvider";

const Header: React.FC = () => {
  const { isCelsius, setIsCelsius } = useContext(WeatherContext);
  return (
    <div className={styles.header}>
      <label htmlFor="metric">{isCelsius? 'C' : 'F'}</label>
      <input id="metric" type="checkbox" onChange={(e) => setIsCelsius?.(e.target.checked)} />
    </div>
  );
};
export default Header;
