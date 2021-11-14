import { useState } from 'react'
import './header.styles.scss'
import Logo from '../../assets/logo.png'
import UserHeaderSections from './userMenus/userMenuSections'
const Header = () => {
  const [visible, setVisible] = useState(false)
  return (
    <header className={`header ${visible ? 'header--visible' : ''}`}>
      <img src={Logo} className='logo' />
      <UserHeaderSections />
      <svg
        className='header__burger'
        viewBox='0 0 100 80'
        width='30'
        height='30'
        fill='#0275A9'
        onClick={() => setVisible(!visible)}
      >
        <rect width='100' height='10'></rect>
        <rect y='30' width='100' height='10'></rect>
        <rect y='60' width='100' height='10'></rect>
      </svg>
    </header>
  )
}
export default Header
