import { useContext, useState } from "react";
import { Modal } from "../../Providers/Modals/Modal";
import "./index.scss";
import { RightComponent } from "./RightComponent";
import { ModalContext } from "../../Providers/ModalProvider";
import { v4 as uuidv4 } from "uuid";

export const HomeScreen = () => {
  const modalFeatures = useContext(ModalContext);

  const openCreatePlaygroundModal = () => {
    const playgroundID = uuidv4();
    console.log("in index.js playgroundID:"+playgroundID);
    modalFeatures.setModalPayload({ playgroundID });
    modalFeatures.openModal("CREATE_PLAYGROUND");
  };

  const openJoinPlaygroundModal = () => {};

  return (
    <div className="home-container">
      <div className="left-container">
        <div className="items-container">
          <img
            src="/logo.webp"
            alt="LiveCodeHub Logo"
            style={{ borderRadius: "20%" }}
          />
          <h1>LiveCode Hub</h1>
          <h3>Code.Compile.Debug</h3>
          <button onClick={openCreatePlaygroundModal}>
            <span className="material-icons">add</span>
            <span>Create Playground</span>
          </button>
          <button onClick={openJoinPlaygroundModal}>
            <span className="material-icons">add</span>
            <span>Join Playground</span>
          </button>
        </div>
      </div>
      <RightComponent />
      <Modal />
    </div>
  );
};
