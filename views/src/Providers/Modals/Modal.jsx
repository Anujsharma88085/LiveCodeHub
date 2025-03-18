import { useContext } from "react"
import { ModalContext } from "../ModalProvider"
import { CreatePlaygroundModal } from "./CreatePlaygroundModal";

export const Modal = () => {
  const modalFeatures = useContext(ModalContext);

  return <>
    {modalFeatures.activeModal === "CREATE_PLAYGROUND" && <CreatePlaygroundModal/> }
  </>
}