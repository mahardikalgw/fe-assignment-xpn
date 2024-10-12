import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const tokenStore = create<{setToken: (tokenAuth: string) => void, token: string}>()(
  persist(
    (set) => ({
      token: '',
      setToken: (tokenAuth: string) => {
        set(() => ({ token: tokenAuth }))
        return tokenAuth
      },
    }),
    {
      name: 'token-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
