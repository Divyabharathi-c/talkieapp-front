import React from 'react'
import moment from 'moment';
import './myStyles.css'

function MessagefromSelf({content}) {
  
  const formattedTimestamp = content.updatedAt
  ? moment(content.updatedAt).format('HH:mm')
  :moment().format('HH:mm');
  
  return (
    <>
    <sup className='me'>you</sup>
    <div className='message-self'>
    
   
    <span>{content.content}
    
    <sub className='time'>{formattedTimestamp}</sub>
    </span>
</div>
</>
  )
}

export default MessagefromSelf