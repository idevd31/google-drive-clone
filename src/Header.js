import React from 'react'
import "./header.css"
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import App from './App';
import { Avatar } from '@mui/material';

function Header({photoURL}) {
  return (
    <div className='header'>
      <div className='header__logo'>
        <img className='.header__logo img' src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png" 
        alt="users" />
        <span className='.header__logo span'>Drive</span>
      </div>
      <div className='header__search'>
        <SearchIcon />
        <input type="text" placeholder='search in drive'/>
        <FormatAlignCenterIcon/>
      </div>
      <div className='header__icons'>
        <span>
          <HelpOutlineIcon/>
        </span>
        <span>
          <SettingsIcon/>
        </span>
        <span className='different'>
          <AppsIcon/>
          <Avatar src={photoURL}/>
        </span>
      </div>
    </div>
  )
}

export default Header;
