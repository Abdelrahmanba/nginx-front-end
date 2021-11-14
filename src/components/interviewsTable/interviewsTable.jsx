import './interviewsTable.styles.scss'

import { Table, Button, message, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { get, post } from '../../utils/apiCall'
import getColumns from '../../utils/interviewsTableColumns'
import AddInterview from '../addInterview/addInterview'

const InterviewsTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const [interviews, setInterviews] = useState([])
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const [rerender, setRerender] = useState(false)
  const token = useSelector((state) => state.hr.token)
  const columns = getColumns(history)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const res = await get('/interviews/', token)
      if (res.ok) {
        const resJosn = await res.json()
        setInterviews(
          resJosn.map(
            ({ title, startDate, _id, availableTickets, participants, nonMembers }, index) => ({
              key: _id,
              title: title,
              seats: `${participants.length + nonMembers.length} / ${availableTickets} (${
                nonMembers.length
              } Non Members)`,
              date: new Date(startDate).toLocaleDateString(),
            })
          )
        )
      } else {
        message.error('Something Wrong.')
      }
      setLoading(false)
    }
    fetchData()
  }, [rerender, visible]) // eslint-disable-line react-hooks/exhaustive-deps

  const deleteInterview = async () => {
    setLoading(true)
    const res = await post('/event/deleteEvents', token, selectedRowKeys)
    if (res.ok) {
      message.success(`${selectedRowKeys.length} events were deleted Successfully`)
    } else {
      message.error('Something Went Wrong')
    }
    setSelectedRowKeys([])
    setLoading(false)
    setRerender((rerender) => !rerender)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
    },
  }

  return (
    <>
      <AddInterview visible={visible} setVisible={setVisible} />

      <div className='btn-grp'>
        <Button
          type='primary'
          onClick={() => setVisible(true)}
          loading={loading}
          icon={<PlusOutlined />}
        >
          Add Interview
        </Button>
        <Popconfirm
          title='Are you sure to delete the Selected Interviews?'
          onConfirm={deleteInterview}
          okText='Delete'
          okType='danger'
          cancelText='Cancel'
          placement='bottom'
        >
          <Button
            type='danger'
            disabled={!selectedRowKeys.length > 0}
            loading={loading}
            icon={<DeleteOutlined />}
          >
            Remove Selected
          </Button>
        </Popconfirm>
        <span style={{ marginLeft: 8 }}>
          {selectedRowKeys.length > 0 ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table
        className='table'
        rowSelection={rowSelection}
        columns={columns}
        scroll={{ x: 950 }}
        dataSource={interviews}
        bordered
      />
    </>
  )
}

export default InterviewsTable
