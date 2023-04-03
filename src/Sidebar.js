import React, { useState } from 'react'
import './Sidebar.css'
import AddIcon from '@mui/icons-material/Add';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { Modal } from '@mui/material';
import  { db , storage } from './Firebase';
import firebase from "firebase";

function Sidebar() {
  const [open , setOpen ] =useState(false);
  const [uploading, setUploading ] = useState(false);
  const [file,setFile] = useState(null);
  const handleclose = () => {
    setOpen(false);
  }
  const handleopen = () => {
    setOpen(true);
  }
  const handlechange = (e) => {
    if(e.target.files[0]){
      setFile(e.target.files[0]);
    }
  }

  const handleupload = (event) => {
    event.preventDefault();
    setUploading(true);

    storage.ref(`files/${file.name}`).put(file).then(snapshot => {
      storage.ref("files").child(file.name).getDownloadURL().then(url => {
        db.collection("myfiles").add({
          timesstamp:firebase.firestore.FieldValue.serverTimestamp(),
          filename:file.name,
          fileUrl: url,
          size : snapshot._delegate.bytesTransferred
        })

        setUploading(false);
        setFile(null);
        setOpen(false);
      })
    })

  }

  return (
    <>
    <Modal open = {open} onClose = {handleclose}>
      <div className='modal__pop'>
        <form>
          <div className='modalheading'>
            <h3>Select file you want to upload</h3>
          </div>
           
          <div className='modalbody'>
            {
              uploading ? (<p className='uploading'>uploading</p>) : 
              (
              <>
              <input type="file"  onChange={handlechange} />
              <input type = "submit" className='post__submit' onClick={handleupload}/> 
              </>
              )
            }
            
          </div>

        </form>
      </div>
    </Modal>
    <div className='sidebar'>
      <div className='sidebar_btn'>
        <button onClick={handleopen}>
            <AddIcon/>
            <span>New</span>
        </button>
      </div>
      <div className='sidebar__options'>
        <div className='sidebar__option sidebar__option-Active'>
          <MobileScreenShareIcon/>
          <span>My Drive</span>
        </div>
        <div className='sidebar__option'>
          <DevicesIcon/>
          <span>Computers</span>
        </div>
        <div className='sidebar__option'>
          <PeopleAltIcon/>
          <span>Shared with me</span>
        </div>
        <div className='sidebar__option'>
          <QueryBuilderIcon/>
          <span>Recent</span>
        </div>
        <div className='sidebar__option'>
          <StarBorderIcon/>
          <span>Starred</span>
        </div>
        <div className='sidebar__option'>
          <DeleteIcon/>
          <span>Trash</span>
        </div>
      </div>
     <br/>
      <hr/>
      <div className='sidebar__option'>
          <CloudQueueIcon/>
          <span>Storage</span>
        </div>

        <div className='progress__bar'>
          <progress size="tiny" value="50" max="100"/>
          <span>6.45 GB of  15 GB used</span>
        </div>
    </div>
    </>
  )
}

export default Sidebar
