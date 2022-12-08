'use client'

import { FormEvent, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { Message } from '../typings'
import useSWR from 'swr'
import fetcher from '../utils/fetchMessages'
import { useSession } from 'next-auth/react'

const ChatInput = () => {
  const [input, setInput] = useState('')
  const { data: messages, error, mutate } = useSWR('/api/getMessages', fetcher)
  const session = useSession()

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input) return
    const messageToSend = input
    setInput('')
    const id = uuid()

    const message: Message = {
      id,
      message: messageToSend,
      created_at: Date.now(),
      username: 'Timmy Boy',
      profilePic:
        'https://scontent-dfw5-1.xx.fbcdn.net/v/t1.6435-9/120374288_3539315102785751_2887657623115170850_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=FXthCeZkFhkAX-f6tUf&_nc_ht=scontent-dfw5-1.xx&oh=00_AfCdaUDvyOdtEZl7TeNJ75JACfrlff8ZvM7XAFL0zIuuQw&oe=639CB594',
      email: 'timmchoover@gmail.com',
    }

    const uploadMessageToUpstash = async () => {
      const data = await fetch('/api/addMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      }).then((res) => res.json())

      return [data.message, ...messages!]
    }

    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    })
  }

  return (
    <form
      onSubmit={addMessage}
      className="fixed bottom-0 z-50 bg-white w-full flex px-10 py-5 space-x-2 border-t border-gray-100"
    >
      <input
        type="text"
        value={input}
        disabled={!session.data}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        disabled={!input}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
      >
        Send
      </button>
    </form>
  )
}

export default ChatInput
