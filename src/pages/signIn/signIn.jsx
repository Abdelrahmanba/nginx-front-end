import { ReactComponent as Particels } from '../../assets/paricles.svg'

import './signIn.styles.scss'
import logo from '../../assets/logo.png'
import { useState } from 'react'
import { signIn } from '../../redux/userSlice.js'
import { useDispatch } from 'react-redux'
import { Button, Alert } from 'antd'
import Textfield from '../../components/textfield/textfield'
import Form from '../../components/form/form'
import { post } from '../../utils/apiCall'

const SignIn = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const submit = async (e) => {
    e.preventDefault()
    props.location.state = undefined
    setLoading(true)
    const res = await post('/hrs/login', undefined, { email, password })
    const jsonRes = await res.json()
    if (jsonRes.token) {
      dispatch(signIn(jsonRes))
      props.history.push('/HR/')
    } else {
      setLoading(false)
      setError(jsonRes)
    }
  }

  const onChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else {
      setPassword(e.target.value)
    }
  }
  return (
    <>
      <section className='sign-in'>
        <div className='signin-box'>
          <div className='box-header'>
            <Particels className='Particels' />
          </div>
          <Form onSubmit={submit}>
            <h1 className='signin-header'>Welcome Back</h1>
            <Textfield
              type='text'
              name='email'
              text='Email Address'
              value={email}
              autocomplete='email'
              onChange={onChange}
            />
            <Textfield
              type='password'
              name='password'
              text='Password'
              value={password}
              autocomplete='current-password'
              onChange={onChange}
            />
            <Button block type='primary' htmlType='submit' loading={loading}>
              Sign In
            </Button>
            {error && (
              <Alert
                message='Login Failed'
                description={error.message}
                type='error'
                showIcon
                className={'alert'}
              />
            )}
            {props.location && props.location.state && (
              <Alert
                message='Sign In Required'
                description='Please Sign In to view this page.'
                type='info'
                showIcon
                className='alert'
              />
            )}
          </Form>
        </div>
        <img src={logo} className='logo' />
      </section>
    </>
  )
}
export default SignIn
