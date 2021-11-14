import { NavLink } from 'react-router-dom'
import './headerItem.styles.scss'

const HeaderItem = ({ text, location, extraClass, type, ...props }) => {
  return (
    <li {...props} className={`header-menu-item ${extraClass}`}>
      <NavLink
        to={location}
        className={`header-menu-link ${extraClass}`}
        activeClassName='selected'
      >
        {text}
      </NavLink>
    </li>
  )
}

export default HeaderItem
