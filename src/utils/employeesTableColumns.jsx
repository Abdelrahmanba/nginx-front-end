import { Button, Tag } from 'antd'
import { getColumnSearchProps } from './helpersFunctions'

const getColumns = (setRecord) => [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => {
      return a.name > b.name
    },
    ...getColumnSearchProps('name'),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    ...getColumnSearchProps('email'),
  },

  {
    title: 'Position',
    dataIndex: 'position',
    ...getColumnSearchProps('position'),
  },

  {
    title: 'Branch',
    dataIndex: 'branch',
    ...getColumnSearchProps('branch'),
  },
  {
    title: 'Action',
    key: 'action',
    fixed: 'right',
    width: 80,

    render: function (text, record) {
      return (
        <div>
          <Button
            type='link'
            onClick={() => {
              setRecord(record)
            }}
          >
            Edit
          </Button>
        </div>
      )
    },
  },
]

export default getColumns
