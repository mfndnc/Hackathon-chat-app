import React from 'react'
import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';
import { useConversations } from '../contexts/ConversationsProvider';

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations()

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div className="d-flex" style={{ height: '80vh', maxHeight: '800px', margin: '100px', width: '1000px', maxWidth: '1200px', backgroundColor: 'white', borderRadius: '5px' }}>
        <Sidebar id={id} />
        {selectedConversation && <OpenConversation />}
      </div>
    </div>
  )
}
