import React, { useEffect, useState } from 'react'
import './Data.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
import InfoIcon from '@mui/icons-material/Info';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import  { db } from './Firebase';

function Data() {
  const [files,setFiles]= useState([]);

  useEffect(() => {
    db.collection("myfiles").onSnapshot(snapshot => {
      setFiles(snapshot.docs.map(doc => ({
        id : doc.id,
        data : doc.data()
      })))
    })
  },[])

  function formatbytes(bytes, decimals = 2){
    if(bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 :decimals;
    const sizes = ['Bytes','Kb','Mb','Gb','Tb','Pb','Eb','Zb','Yb'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k , i)).toFixed(dm)) + ' ' + sizes[i]
  }

  return (

    <div className='data'>
      <div className='data__header'>
        <div className='data__headerleft'>
        <p>My Drive</p>
        <ArrowDropDownIcon/>
        </div>
        <div className='data__headerright'>
            <ListIcon/>
            <InfoIcon/>
        </div>
      </div>
      <div className='data__content'>
      <div className='data__grid'>
        {
          files.map((file) => {
           return <div className='data__file'>
            <InsertDriveFileIcon/>
            <p>{file.data.filename}</p>
        </div>

          })
        }
      
      </div>
        <div className='data__list'>
            <div className='detailsrow'>
                <p><b>Name <ArrowDownwardIcon/></b></p>
                <p><b>Owner </b></p>
                <p><b>Last Modified </b></p>
                <p><b>File Size </b></p>
                
            </div>
            {
              files.map((file)=>{
                return <div className='detailsrow'>
                  <a href={file.data.fileUrl} target="_blank">
                <p>{file.data.filename}<InsertDriveFileIcon/></p>
                </a>
                <p>Me </p>
                <p>{new Date(file.data.timesstamp?.seconds*1000).toUTCString()}</p>
                <p>{formatbytes(file.data.size)}</p>
                
            </div>
              })
            }

            
        </div>
      </div>
    </div>
    
  )
}

export default Data
