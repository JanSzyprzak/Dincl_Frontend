import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";

import ModalWrapper from "./components/ModalWrapper";
import DonateComponent from "./components/Donate";
import DinclMapComponent from "./components/DinclMap";
import CBOSReportComponent from "./components/CBOSReport";
import EntriesCounterComponent from "./components/EntriesCounter";
import FillSurveyComponent from "./components/FillSurvey";
import Top5WeeklyDataFetchComponent from "./components/Top5WeekLocalDataFetch";
import Top5MonthlyDataFetchComponent from "./components/Top5MoLocalDataFetch";
import EmoChatComponent from "./components/EmoChat";
import AskYourGroupComponent from "./components/AskYourGroup";
import PolicyComponent from "./components/Policy";
import DataFetcherForm from "./components/SelectedDataFetch";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalComponent, setModalComponent] = useState(null);
    const [showFlash, setShowFlash] = useState(false);

    const handleShowFlash = () => {
        setShowFlash(true);
        setTimeout(() => {
            setShowFlash(false);
        }, 3000);
    };

    const openModal = (component) => {
        setModalComponent(component);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalComponent(null);
        setIsModalOpen(false);
    };

    return (
        <div className="main">
            <div className="main2">
                <div className="container">
                    <div className="row">
                        <div className="btncomponent flex1">
                            <DinclMapComponent className="button" />
                        </div>
                        <div
                            className="btncomponent flex2"
                            style={{
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                
                            }}
                        >
                            <div className="btncomponent2 flex1">
                                <div className="btncomponent3">
                                    <EntriesCounterComponent className="button" />
                                </div>

                                <div className="btncomponent3">
                                    <Button
                                        className="button"
                                        onClick={() =>
                                            openModal(
                                                <FillSurveyComponent
                                                    onSurveySubmit={
                                                        handleShowFlash
                                                    }
                                                    closeModal={closeModal}
                                                />
                                            )
                                        }
                                    >
                                        Wypełnij ankietę
                                    </Button>
                                </div>
                            </div>
                            {showFlash && (
                                <div className="flash-modal-backdrop">
                                    <div
                                        className="alert alert-success flash-modal-message"
                                        role="alert"
                                    >
                                        Dziękujemy za wypełnienie ankiety!
                                    </div>
                                </div>
                            )}
                            <div className="btncomponent2 flex1">
                                <div className="btncomponent3">
                                    <Button
                                        className="button"
                                        onClick={() =>
                                            openModal(<DataFetcherForm />)
                                        }
                                    >
                                        Przeglądaj bazę
                                    </Button>
                                </div>
                                <div className="btncomponent3">
                                    <Button
                                        className="button"
                                        onClick={() =>
                                            openModal(
                                                <Top5WeeklyDataFetchComponent />
                                            )
                                        }
                                    >
                                        Top 5 tygodniowo
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="btncomponent flex1">
                            <Button
                                className="button"
                                onClick={() =>
                                    openModal(<Top5MonthlyDataFetchComponent />)
                                }
                            >
                                Top 5 miesięcznie
                            </Button>
                        </div>

                        <div className="btncomponent flex1">
                            <Button
                                className="button"
                                onClick={() => openModal(<EmoChatComponent />)}
                            >
                                Emo Chat
                            </Button>
                        </div>
                        <div className="btncomponent flex1">
                            <Button
                                className="button"
                                onClick={() =>
                                    openModal(<AskYourGroupComponent />)
                                }
                            >
                                Zapytaj swoją grupę
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="btncomponent flex1">
                            <Button
                                className="button"
                                onClick={() => openModal(<DonateComponent />)}
                            >
                                Open Donate Modal
                            </Button>
                        </div>
                        <div className="btncomponent flex1">
                            <CBOSReportComponent className="button" />
                        </div>
                        <div className="btncomponent flex1">
                            <Button
                                className="button"
                                onClick={() => openModal(<PolicyComponent />)}
                            >
                                Warunki korzystania i polityka prywatności
                            </Button>
                        </div>
                    </div>
                    <ModalWrapper isOpen={isModalOpen} onClose={closeModal}>
                        {modalComponent}
                    </ModalWrapper>
                </div>
            </div>
        </div>
    );
}

export default App;
