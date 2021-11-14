import './addEmployee.styles.scss'
import { Modal, Button, message } from 'antd'
import { useState } from 'react'
import Textfield from '../textfield/textfield'
import Form from '../form/form'
import { useSelector } from 'react-redux'
import { post } from '../../utils/apiCall.js'

const AddEmployee = ({ visible, setVisible, setReload }) => {
  const token = useSelector((state) => state.hr.token)
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [email, setEmail] = useState('')
  const [branch, setBranch] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleAdd = async () => {
    setConfirmLoading(true)
    const employeeInfo = {
      name,
      position,
      email,
      branch,
    }

    const res = await post('/employee/', token, employeeInfo)
    if (res.ok) {
      setVisible(false)
      setReload((reload) => !reload)
    } else {
      message.error('Something went wrong.')
    }
    setConfirmLoading(false)
  }

  return (
    <>
      <Modal
        title='Add Employee'
        visible={visible}
        confirmLoading={confirmLoading}
        className='add-event'
        width='80vw'
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Form type='POST'>
          <Textfield
            type='text'
            text='Name'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textfield
            type='text'
            text='Email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Textfield
            type='text'
            text='Position'
            name='position'
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
          <Textfield
            type='text'
            text='Branch'
            name='branch'
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />

          <Button block type='primary' onClick={handleAdd}>
            Add Employee
          </Button>
        </Form>
      </Modal>
    </>
  )
}

export default AddEmployee
