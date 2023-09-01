import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
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
        <div className="btncomponent">
          <DinclMapComponent className="button" />
        </div>
        
        <div className="btncomponent">
          <EntriesCounterComponent className="button"/>
        </div>
      </div>
      <div className="row">
        <div className="btncomponent">
          <Button className="button" onClick={() => openModal(<FillSurveyComponent />)}>Wypełnij ankietę</Button>
        </div>
        <div className="btncomponent">
          <Button className="button" onClick={() => openModal(<AllSurveysDataFetchComponent />)}>Wszystkie ankiety</Button>
        </div>
        <div className="btncomponent">
          <Button className="button" onClick={() => openModal(<Top5WeeklyDataFetchComponent />)}>Top 5 tygodniowo</Button>
        </div>
      </div>
      <div className="row">
        <div className="btncomponent">
          <Button className="button" onClick={() => openModal(<Top5MonthlyDataFetchComponent />)}>Top 5 miesięcznie</Button>
        </div>
        <div className="btncomponent">
          <Button className="button" onClick={() => openModal(<EmoChatComponent />)}>Emo Chat</Button>
        </div>
        <div className="btncomponent">
          <Button className="button" onClick={() => openModal(<AskYourGroupComponent />)}>Zapytaj swoją grupę</Button>
        </div>
      </div>
      <div className="row">
        <div className="btncomponent">
          <Button className="button" onClick={() => openModal(<DonateComponent />)}>Open Donate Modal</Button>
        </div>
        <div className="btncomponent">
          <CBOSReportComponent className="button" />
        </div>
        <div className="btncomponent">
          <Button className="button" onClick={() => openModal(<PolicyComponent />)}>Warunki korzystania i polityka prywatności</Button>
        </div>
      </div>
      <ModalWrapper isOpen={isModalOpen} onClose={closeModal}>
        {modalComponent}
      </ModalWrapper>
    </div>
  )
  
}

export default App
