import { unstable_getServerSession } from 'next-auth'
import React from 'react'
import { Message } from '../typings'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import Providers from './providers'

const HomePage = async () => {
  const data = await fetch(
    `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/getMessages`
  ).then((res) => res.json())
  const session = await unstable_getServerSession()

  const messages: Message[] = data.messages

  return (
    <Providers session={session}>
      <main>
        {/* MessageList */}
        <MessageList initialMessages={messages} />
        {/* ChatInput */}
        <ChatInput />
      </main>
    </Providers>
  )
}

export default HomePage
