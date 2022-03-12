import React, { useEffect, useState } from 'react';
import './DashboardComponent.css';
import UserCardComponent from './UserCardComponent';
import PaginationComponent from './PaginationComponent';
import { UserProvider } from '../UserContext';
import {reactLocalStorage} from 'reactjs-localstorage';

function DashboardComponent() {
  const [sPaginatedUserData, setsPaginatedUserData] = useState([]);
  const [sUserData, setsUserData] = useState([]);
  const [sFilteredData, setsFilteredData] = useState([]);
  const [sSearchValue, setsSearchValue] = useState('');
  const setsPaginatedData = (data) => {
    setsPaginatedUserData(data)
  };

  useEffect(() => {

    fetch("http://localhost:8080/getCustomers")
      .then((res) => res.json())
      .then((json) => {
        setsUserData(json.response);
        setsFilteredData(json.response);
      })
      if(reactLocalStorage.get('searchValue') && reactLocalStorage.get('searchValue') !== ''){
        setsSearchValue(reactLocalStorage.get('searchValue') );
      }
      
  }, []);
  
  const searchUserList = (e) => {
    const value = e.currentTarget.value.replace(/[^a-zA-Z]/ig, '');
    setsSearchValue(value);
  };

  useEffect(() => {
    if (sSearchValue && sSearchValue !== '') {
      reactLocalStorage.set('searchValue', sSearchValue);
      const filterdData = sUserData && sUserData.length > 0 &&
        sUserData.filter((user) => user.userName.toLowerCase().includes(sSearchValue.toString().toLowerCase()));
      setsFilteredData(filterdData);
    } else {
      reactLocalStorage.remove('searchValue');
      setsFilteredData(sUserData);
    }
  }, [sSearchValue]);

  return (
    <div>
      <UserProvider>
        <div className='header'>
          <p className="header-text">User Dashboard</p>
          <div class="searchbox" >
            <input type="text" value={sSearchValue} placeholder="Search.." name="search" onChange={(e) => searchUserList(e)} />
          </div>
        </div>
        <div className="dashboard-body">
          <div className='dashboard-panel'>
            {
              sPaginatedUserData && sPaginatedUserData.length > 0 &&
              sPaginatedUserData.map((userData) => <UserCardComponent pData={userData}  key={userData.id}></UserCardComponent>)
            }
          </div>
          <div className='pagination'>
            <PaginationComponent items={sFilteredData} rowsPerPage={9} paginatedItems={setsPaginatedData} searchActive={sSearchValue !== ''}/>
          </div>
        </div>
      </UserProvider>
    </div>
  )
}

export default DashboardComponent