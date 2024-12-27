import React from 'react'
import { Tab } from 'semantic-ui-react'
import UserTable from './UserTable'
import CongeDemande from './CongeDemande'
import TimeSheetAdmin from './TimeSheetAdmin'
import NoteList from './NoteList'
import CalenderAdmin from './CalenderAdmin'

function AdminTab(props) {
  const { handleInputChange } = props
  const { isUsersLoading, users, userUsernameSearch, handleDeleteUser, handleSearchUser } = props
  const { isClassLoading, classes, className, classNameSearch, handleAddClass, handleDeleteClass, handleSearchClass } = props
  const { classDescription, classFromTime, classToTime, classType } = props
  const { isAttendancesLoading, attendances} = props
  const { handleGetUsers, handleGetAttendances} = props

  const panes = [
    {
      menuItem: { key: 'users', icon: 'users', content: 'Employes' },
      render: () => (
        <Tab.Pane loading={isUsersLoading}>
          <UserTable
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleInputChange={handleInputChange}
            handleDeleteUser={handleDeleteUser}
            handleSearchUser={handleSearchUser}
          />
        </Tab.Pane>
      )
    },
 
    {
      menuItem: { key: 'attendances', icon: 'tasks', content: 'All TimeSheeet' },
      render: () => (
        <Tab.Pane loading={isAttendancesLoading}>
          <TimeSheetAdmin
          
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'Conge Request', icon: 'tasks', content: 'All Demandes' },
      render: () => (
        <Tab.Pane loading={isAttendancesLoading}>
          <CongeDemande
            
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'Note', icon: 'tasks', content: 'All Note' },
      render: () => (
        <Tab.Pane loading={isAttendancesLoading}>
          <NoteList />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'calender', icon: 'tasks', content: 'Calender' },
      render: () => (
        <Tab.Pane loading={isAttendancesLoading}>
          <CalenderAdmin />
        </Tab.Pane>
      )
    }
  ]

  return (
    <Tab onTabChange={() => {
      handleGetUsers()
      handleGetAttendances()
    }} menu={{ attached: 'top' }} panes={panes} />
  )
}

export default AdminTab