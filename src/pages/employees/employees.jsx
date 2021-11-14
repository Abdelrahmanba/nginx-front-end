import './employees.styles.scss'
import EmployeesTable from '../../components/employeesTable/employeesTable'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'
import AddEmployee from '../../components/addEmployee/addEmployee'

const Employees = () => {
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reload, setReload] = useState(false)

  return (
    <>
      <AddEmployee visible={visible} setVisible={setVisible} setReload={setReload} />
      <div className='body'>
        <Button
          type='primary'
          onClick={() => setVisible(true)}
          loading={loading}
          icon={<PlusOutlined />}
        >
          Add Employee
        </Button>
        <EmployeesTable reload={reload} setReload={setReload} />
      </div>
    </>
  )
}

export default Employees
