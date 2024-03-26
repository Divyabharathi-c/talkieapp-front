import React from 'react'
import moment from 'moment';
import './myStyles.css'

function MessagetoOthers({content}) {

  const formattedTimestamp = content.updatedAt
  ? moment(content.updatedAt).format('HH:mm')
  :moment().format('HH:mm');
  
 

  return (
    <>
    <sup className='other'>{content.sender.name}</sup>
    <div className='message-other'>
    <span>{content.content}
    <span className='time'>{formattedTimestamp}</span>
    </span>
   
   
    
    </div>
    </>
  )
}

export default MessagetoOthers