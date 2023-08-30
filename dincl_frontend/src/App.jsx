import { useState } from 'react'
import ModalWrapper from './components/ModalWrapper';
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);

  const openModal = (component) => {
    setModalComponent(component);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalComponent(null);
    setIsModalOpen(false);
  };


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
        <button onClick={() => openModal(<DonateComponent className="component"/>)}>Open Donate Modal</button>
        <PolicyComponent className="component" />
      </div>
      <ModalWrapper isOpen={isModalOpen} onClose={closeModal}>
        {modalComponent}
      </ModalWrapper>
    </div>
  )
}

export default App
