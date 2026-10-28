import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


interface CustomModalProps{
    show:boolean,
    handleClose: () => void
    content: React.ReactNode;
    title?:string;
    onSave?: () => void;
    saveText?:string;
    showSave?:boolean
    size?: 'lg' | 'sm' | 'xl'
}


export default function CustomModal({
    show,
    handleClose,
    content,
    title = "Modal heading",
    onSave,
    saveText = "Save Changes",
    showSave = true,
    size = "lg"
}:CustomModalProps) {
  return (
    <>
        <Modal size={size} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title style={{fontSize:"20px"}}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
            <Modal.Footer>
            <Button className="btnDefault" onClick={handleClose}>
                Close
            </Button>
            <Button className='btnSuccess' onClick={onSave}>
                {saveText}
            </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

