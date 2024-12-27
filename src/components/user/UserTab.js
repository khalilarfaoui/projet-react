import React from 'react'
import { Tab } from 'semantic-ui-react'
import ClassTable from './ClassTable'
import CongeTable from './CongeTable'
import AttendanceTable from './AttendanceTable'
import TimeSheet from './TimeSheet'

function UserTab(props) {
  const { handleInputChange } = props
  const { isClassLoading, classes, className, classNameSearch, handleAddConge, handleAttendClass, handleSearchClass } = props
  const { classDescription, classFromTime, classToTime, classType, handleGetClasses } = props
  const { reason, status, endDate, startDate } = props

  const {isAttendancesLoading, attendances, handleGetAttendances} = props

  const panes = [
   
    {
      menuItem: { key: 'classes', icon: 'building', content: 'Conges' },
      render: () => (
        <Tab.Pane loading={isClassLoading}>
          <CongeTable
            congees={classes}
            congeNameSearch={classNameSearch}
            handleInputChange={handleInputChange}
            handleAddConge={handleAddConge}
            handleAttendConge={handleAttendClass}
            handleSearchConge={handleSearchClass}
            congeName={className}
            congeDescription={classDescription}
            congeFromTime = {classFromTime}
            congeToTime={classToTime}
            congeType={classType}
            startDate={startDate}
            endDate={endDate}
            status={status}
            reason={reason}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'timesheet', icon: 'tasks', content: 'Time Sheet' },
      render: () => (
        <Tab.Pane loading={isAttendancesLoading}>
          <TimeSheet

          />
        </Tab.Pane>
      )
    },
  
  ]

  return (
    <Tab onTabChange={
      () => {
        handleGetAttendances()
        handleGetClasses()
      }
    } menu={{ attached: 'top' }} panes={panes} />
  )
}

export default UserTab