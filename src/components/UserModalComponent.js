import React, { useContext, useEffect } from 'react'
import Modal from 'react-modal';
import { UserContext } from '../UserContext';
import './UserModalcomponent.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function UserModalComponent(props) {
  const { modalOpen , modalClose}= props;
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const { user } = useContext(UserContext);

  const closeModal = () => {
    modalClose(false);
    setIsOpen(false);
  }

  useEffect(()=>{
    if(modalOpen){
      setIsOpen(true);
    }
  },[modalOpen]);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="user-modal-container">
          <div className="user-image-holder">
            <img className="user-img" src={`../images/thumbnail/${user.userName}.jpg`} alt={user.userName} />
          </div>

          <div className="user-info-container">
            <p className='user-info-head'> Full Name : <span className='user-info'>{user.name}</span></p>
            <p className='user-info-head'> User Name : <span className='user-info'>{user.userName}</span></p>
            <p className='user-info-head'> Email : <span className='user-info'>{user.email}</span></p>
            <p className='user-info-head'> Gender : <span className='user-info'>{user.name}</span></p>
            <p className='user-info-head'> Address : <span className='user-info'>{user.userName}</span></p>
            <p className='user-info-head'> Phone : <span className='user-info'>{user.email}</span></p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UserModalComponent