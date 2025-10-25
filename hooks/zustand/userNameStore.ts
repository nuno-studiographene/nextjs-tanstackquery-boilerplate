import { create } from 'zustand'

interface UserNameStore {
  userName: string;
  setUserName: (name: string) => void;
}

const useUserNameStore = create<UserNameStore>((set) => ({
  userName: '',
  setUserName: (name: string) => set({ userName: name }),
}))

export { useUserNameStore }