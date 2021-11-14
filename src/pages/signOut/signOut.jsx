import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../redux/userSlice'
import { useEffect } from 'react'
import { post } from '../../utils/apiCall'

const SignOut = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.hr.token)
  useEffect(() => {
    const logout = async () => {
      const res = await post('/hrs/logout', token)
      if (res.ok) {
        dispatch(signOut())
      }
    }
    logout()
  }, [])
  return (
    <Redirect
      to={{
        pathname: '/',
      }}
    />
  )
}

export default SignOut
