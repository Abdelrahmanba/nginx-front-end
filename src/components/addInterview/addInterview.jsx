import './addInterview.styles.scss'
import {
  Modal,
  DatePicker,
  Button,
  Input,
  Select,
  Switch,
  message,
} from 'antd'
import { useState } from 'react'
import Textfield from '../textfield/textfield'
import Form from '../form/form'
import { useSelector } from 'react-redux'
import { post, get } from '../../utils/apiCall.js'
const { TextArea } = Input
const { Option } = Select
const { RangePicker } = DatePicker

const AddInterview = ({ visible, setVisible, id }) => {
  const token = useSelector((state) => state.hr.token)
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const [availableTickets, setAvailableTickets] = useState(50)
  const [date, setDate] = useState(null)
  const [society, setSociety] = useState('wie')
  const [nonMembers, setNonMembers] = useState(true)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const handleAdd = async () => {
    
    setConfirmLoading(true)
    const eventInfo = {
      title,
      duration,
      price,
      location,
      link,
     
      allowNonMembers: nonMembers,
      startDate: date[0].toDate(),
      endDate: date[1].toDate(),
    }

    const res = await post('/event/', token, eventInfo)
    if (res.ok) {
      setVisible(false)
    } else {
      message.error('Something went wrong.')
    }
    setConfirmLoading(false)
  }

  return (
    <>
      <Modal
        title='Add Event'
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
            text='Title'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textfield
            type='text'
            text='Duration'
            name='duration'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <Textfield
            type='text'
            text='Price'
            name='price'
            value={price}
            placeholder='Numbers Only (in Shekels), if free type 0'
            onChange={(e) => setPrice(e.target.value)}
          />
          <Textfield
            type='text'
            text='Location'
            name='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Textfield
            type='text'
            text='Link'
            name='link'
            placeholder='Optional'
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <TextArea
            rows={4}
            className='text-area'
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className='form-row'>
            <label>Date And Time</label>
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format='YYYY-MM-DD HH:mm'
              onChange={(v) => {
                setDate(v)
              }}
              value={date}
              allowEmpty={false}
              use12Hours
              inputReadOnly
            />
          </div>
          <div className='form-row'>
            <label>Society</label>
            <Select defaultValue={society} className='select' onChange={(e) => setSociety(e)}>
              <Option value='wie'>Wie</Option>
              <Option value='computer'>Computer</Option>
              <Option value='pes'>PES</Option>
              <Option value='ras'>RAS</Option>
            </Select>
          </div>
          <div className='form-row'>
            <label>Allow Non Members to Register</label>
            <Switch
              defaultChecked
              onChange={(e) => {
                setNonMembers(e)
              }}
            />
          </div>

          <Button block type='primary' onClick={handleAdd}>
            Add Interview
          </Button>
        </Form>
      </Modal>
    </>
  )
}

export default AddInterview
