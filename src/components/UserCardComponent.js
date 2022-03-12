import React, {useContext, useState} from 'react'
import { SRLWrapper } from "simple-react-lightbox";
import './UserCardComponent.css';
import UserModalComponent from './UserModalComponent';
import { UserContext } from '../UserContext';

function UserCardComponent(props) {
  const { pData } = props;
  const [sModal, setsModal] = useState(false);
  const {setUser} = useContext(UserContext);

  const viewDetail = () => {
    setUser(pData);
    setsModal(true);
  };


  return (
    <div className="user-container">
      <SRLWrapper className="user-image">
        <a href={pData.url}>
          <img src={pData.thumbUrl} alt={pData.userName} className="profile-img"/>
        </a>
      </SRLWrapper>

      <div className="user-info-container">
        <p className='user-info-head'> Full Name : <span className='user-info'>{pData.name}</span></p>
        <p className='user-info-head'> User Name : <span className='user-info'>{pData.userName}</span></p>
        <p className='user-info-head'> Email : <span className='user-info'>{pData.email}</span></p>
        <button type='button' className='btn-primary buttonStyle' onClick={viewDetail}>
          view More
        </button>
      </div>
      {sModal && <UserModalComponent modalOpen={sModal} modalClose={(data) => setsModal(data)}/>}

    </div >
  )
}

export default UserCardComponent