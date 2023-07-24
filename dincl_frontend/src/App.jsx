import { useState } from 'react'
import DonateComponent from './components/Donate'
import DinclMapComponent from './components/DinclMap'
import CBOSReportComponent from './components/CBOSReport'
import EntriesCounterComponent from './components/EntriesCounter'
import FillSurveyComponent from './components/FillSurvey'
import Top5WeeklyDataFetchComponent from './components/Top5WeekLocalDataFetch'
import Top5MonthlyDataFetchComponent from './components/Top5MoLocalDataFetch'
import EmoChatComponent from './components/EmoChat'
import AskYourGroupComponent from './components/AskYourGroup'
import PolicyComponent from './components/Policy'
import AllSurveysDataFetchComponent from './components/AllSurveysDataFetch'


function App() {

  return (
    <div className="container">
      <div className="row">
        <DinclMapComponent className="component" />
        <CBOSReportComponent className="component" />
        <EntriesCounterComponent className="component" />
      </div>
      <div className="row">
        <FillSurveyComponent className="component" />
        <AllSurveysDataFetchComponent className="component" />
        <Top5WeeklyDataFetchComponent className="component" />
      </div>
      <div className="row">
        <Top5MonthlyDataFetchComponent className="component" />
        <EmoChatComponent className="component" />
        <AskYourGroupComponent className="component" />
      </div>
      <div className="row">
        <DonateComponent className="component" />
        <PolicyComponent className="component" />
      </div>
    </div>
  )
}

export default App
