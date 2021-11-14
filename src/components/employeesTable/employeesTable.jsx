import { Modal, Table, Switch, message, Tooltip, Select, Button, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Form from '../form/form'
import './employeesTable.style.scss'
import { deleteCall, get, patch, post } from '../../utils/apiCall'
import { LoadingOutlined } from '@ant-design/icons'
import getColumns from '../../utils/employeesTableColumns'
import Textfield from '../textfield/textfield'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const EmployeesTable = ({ reload, setReload }) => {
  const [employees, setEmployees] = useState([])
  const [loadingConfirm, setLoadingConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [record, setRecord] = useState(undefined)
  const token = useSelector((state) => state.hr.token)

  useEffect(() => {
    if (!record) {
      return
    }
    let { branch, name, position, email } = record
    const removeUser = async () => {
      const res = await deleteCall('/employee/' + record.key, token)
      if (res.ok) {
        message.success('Removed Successfully.')
        setReload((reload) => !reload)
        Modal.destroyAll()
      } else {
        message.error('Something Went Wrong.')
      }
    }

    Modal.confirm({
      title: <h1 className='sub-title'>{record.name}</h1>,
      icon: null,
      okButtonProps: { loading: loadingConfirm },
      onOk: async () => {
        setLoadingConfirm(true)
        const res = await patch('/employee/' + record.key, token, {
          branch,
          position,
          email,
          name,
        })
        if (res.ok) {
          message.success('Updated Successfully')
          setReload((reload) => !reload)
        } else {
          message.error('Something Went Worng')
        }
        setLoadingConfirm(false)
      },
      afterClose: () => {
        setRecord(undefined)
      },

      content: (
        <Form>
          <Textfield
            type='text'
            name='email'
            text='Email'
            defaultValue={email}
            onChange={(e) => {
              email = e.target.value
              console.log(email)
            }}
          />
          <Textfield
            type='text'
            name='branch'
            text='Branch'
            defaultValue={branch}
            onChange={(e) => (branch = e.target.value)}
          />
          <Textfield
            type='text'
            name='name'
            text='Name'
            defaultValue={name}
            onChange={(e) => (name = e.target.value)}
          />
          <Textfield
            type='text'
            name='position'
            text='Position'
            defaultValue={position}
            onChange={(e) => {
              position = e.target.value
            }}
          />
          <Popconfirm onConfirm={() => removeUser()} title="Are You Sure, THIS CAN'T BE UNDONE!">
            <Button block type='danger'>
              Remove Member
            </Button>
          </Popconfirm>
        </Form>
      ),
    })
  }, [record]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const res = await get('/employee/', token)
      const resJosn = await res.json()
      if (res.ok) {
        setEmployees(
          resJosn.map(({ _id, name, email, branch, position }) => ({
            key: _id,
            name,
            email,
            position,
            branch,
          }))
        )
      }
      setLoading(false)
    }
    fetchData()
  }, [reload]) // eslint-disable-line react-hooks/exhaustive-deps

  const columns = getColumns(setRecord)

  return (
    <>
      <h1 className='title' style={{ textAlign: 'left', width: '100%' }}>
        All Employees
      </h1>
      <Table
        className='table'
        columns={columns}
        dataSource={employees}
        bordered
        scroll={{ x: 950 }}
        loading={{ spinning: loading, indicator: antIcon }}
      />
    </>
  )
}

export default EmployeesTable
