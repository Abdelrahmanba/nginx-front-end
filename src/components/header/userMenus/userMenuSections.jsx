import HeaderItem from '../header-item/headerItem'
import './userMenuSections.scss'
import { Space, Tooltip } from 'antd'
import { ExportOutlined, TeamOutlined, CalendarOutlined, KeyOutlined } from '@ant-design/icons'

const UserHeaderSections = ({ visible }) => {
  const touchScreen = 'ontouchstart' in document.documentElement
  return (
    <>
      <ul className={`header__menu header__user__menu ${visible ? 'header__menu--visible' : ''}`}>
        <Space size={35}>
          
          <HeaderItem
            location={'/HR/Interviews'}
            text={
              touchScreen ? (
                <CalendarOutlined style={{ fontSize: '24px' }} />
              ) : (
                <Tooltip placement='bottom' title={'Interviews'}>
                  <CalendarOutlined style={{ fontSize: '24px' }} />
                </Tooltip>
              )
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
          <HeaderItem
            location={'/HR/Employees'}
            text={
              touchScreen ? (
                <TeamOutlined style={{ fontSize: '24px' }} />
              ) : (
                <Tooltip placement='bottom' title={'Employees'}>
                  <TeamOutlined style={{ fontSize: '24px' }} />
                </Tooltip>
              )
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
          <HeaderItem
            location={'/HR/Rooms'}
            text={
              touchScreen ? (
                <KeyOutlined style={{ fontSize: '24px' }} />
              ) : (
                <Tooltip placement='bottom' title={'Rooms'}>
                  <KeyOutlined style={{ fontSize: '24px' }} />
                </Tooltip>
              )
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
        </Space>
      </ul>
      <ul className='header__menu header__user__menu header__menu--user'>
        <Space size={20}>
          <HeaderItem
            location={'/signout'}
            text={
              touchScreen ? (
                <ExportOutlined style={{ fontSize: '24px' }} />
              ) : (
                <Tooltip placement='bottom' title={'Log Out'}>
                  <ExportOutlined style={{ fontSize: '24px' }} />
                </Tooltip>
              )
            }
            extraClass={'menu-list user-list'}
            type='private'
          />
        </Space>
      </ul>
    </>
  )
}

export default UserHeaderSections
