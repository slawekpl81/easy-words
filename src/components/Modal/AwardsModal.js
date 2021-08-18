import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

import useStore from "../../zustand/useStore";
import { getRandomInd } from "../random";
import awards from "../../data/awards";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('AwardsModal');

function AwardsModal() {
  const points = useStore((state) => state.points);
  let subtitle;
  const [award, setAward] = useState({url:'', text:''})

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function getAward() {
    const awardId = getRandomInd(0, awards.length);
    setAward(awards[awardId]);
  }

  useEffect(() => {
    if (points % 25 === 0 && points !== 0) {
      getAward();
      setIsOpen(true);
    }
  }, [points]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="AWARDS !!!"
    >
      
      <button onClick={closeModal}>close</button>
      <h2 className="text-danger">{award.text}</h2>
      <div>
        <img className="award-img" alt="ups" src={award.url}></img>
      </div>
   
    </Modal>
  );
}

export default AwardsModal;
// ReactDOM.render(<App />, appElement);
