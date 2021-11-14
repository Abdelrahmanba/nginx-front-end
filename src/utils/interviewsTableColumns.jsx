import { EditOutlined } from '@ant-design/icons'
import { Button, Divider } from 'antd'

const getColumns = (history) => [
  {
    title: 'Room',
    dataIndex: 'room',
  },
  {
    title: 'Strat Time',
    dataIndex: 'startTime',
    sorter: (a, b) => {
      return new Date(a.date) - new Date(b.date)
    },
  },
  {
    title: 'End Time',
    dataIndex: 'endTime',
    sorter: (a, b) => {
      return new Date(a.date) - new Date(b.date)
    },
  },
  {
    title: 'interviewer',
    dataIndex: 'interviewer',
  },
  {
    title: 'interviewee',
    dataIndex: 'interviewee',
  },
  {
    title: 'Position',
    dataIndex: 'position',
  },
  {
    title: 'Branch',
    dataIndex: 'branch',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    key: 'action',
    render: function (text, record) {
      return (
        <div style={{ display: 'flex', flexWrap: 'nowrap' }}>
          <Button type='link' onClick={() => history.push('/admin/event/Statistics/' + text.key)}>
            Statistics
          </Button>
          <Divider type='vertical' />
          <Button
            type='link'
            icon={<EditOutlined />}
            onClick={() => history.push('/Admin/EditEvent/' + text.key)}
          >
            Edit
          </Button>
          <Divider type='vertical' />
          <Button type='link' onClick={() => history.push('/event/' + text.key)}>
            View
          </Button>
        </div>
      )
    },
    width: '35%',
  },
]

export default getColumns
