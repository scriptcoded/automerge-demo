import { DocHandle, DocHandleEphemeralMessagePayload } from '@automerge/automerge-repo';
import { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';

type OtherUser = {
  name: string
  lastSeen: number
}

type BroadcastMessage = {
  type: string
  userName: string
}

const HEARTBEAT_INTERVAL = 1000
const CLEANUP_INTERVAL = 2000
const DEAD_TIMEOUT = 1500

/**
 * Tracks which users are currently visiting the document using ephemeral
 * messages.
 */
export const usePresence = (doc: DocHandle<unknown>, userName: string) => {
  const [otherUsers, setOtherUsers] = useState<Record<string, OtherUser>>({})

  const onHeartbeat = (data: DocHandleEphemeralMessagePayload<unknown>) => {
    const { type, userName } = data.message as BroadcastMessage
    if (type !== 'heartbeat') return

    setOtherUsers(users => {
      return {
        ...users,
        [data.senderId]: {
          name: userName,
          lastSeen: new Date().getTime()
        }
      }
    })
  }

  useEffect(() => {
    doc.on('ephemeral-message', onHeartbeat)
    return () => void doc.off('ephemeral-message', onHeartbeat)
  })


  const sendHeartbeat = () => {
    doc.broadcast({
      type: 'heartbeat',
      userName
    } satisfies BroadcastMessage)
  }

  useInterval(sendHeartbeat, HEARTBEAT_INTERVAL)
  useEffect(sendHeartbeat)

  
  const clearDead = () => {
    for (const [senderId, user] of Object.entries(otherUsers)) {
      const limit = new Date().getTime() - DEAD_TIMEOUT
      if (user.lastSeen < limit) {
        setOtherUsers(users => {
          const copy = { ...users }
          delete copy[senderId]
          return copy
        })
      }
    }
  }
  useInterval(clearDead, CLEANUP_INTERVAL)

  return otherUsers
}
