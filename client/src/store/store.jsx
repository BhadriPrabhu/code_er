import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      email: '',
      preferredLang: '',
      questions: [],
      totalMarks: 0,
      isFinish: false,
      isMalpractice: false,
      isCopy: false,
      isTabChange: false,
      isEnd: false,
      isFullscreenOut: false,
      role: 'user',
      password: '',
      isParticipate: false,
      isAttended: false,
      
      // NEW
      isAuth: false,

      setEmail: (email) => set({ email }),
      setPreferredLang: (lang) => set({ preferredLang: lang }),
      setQuestions: (questions) => set({ questions }),
      updateTotalMarks: (marks) => set((state) => ({ totalMarks: state.totalMarks + marks })),
      markFinish: () => set({ isFinish: true }),
      setMalpractice: (value) => set({ isMalpractice: value }),
      setCopy: (value) => set({ isCopy: value }),
      setTabChange: (value) => set({ isTabChange: value }),
      setEnd: (value) => set({ isEnd: value }),
      setFullscreenOut: (value) => set({ isFullscreenOut: value }),
      setRole: (value) => set({ role: value}),
      setPassword: (value) => set({ password: value }),
      setParticipate: (value) => set({ isParticipate: value }),
      setAttended: (value) => set({ isAttended: value }),

      // NEW
      login: () => set({ isAuth: true }),
      logout: () => set({ isAuth: false }),

      resetUser: () =>
        set({
          questions: [],
          totalMarks: 0,
          isFinish: false,
          isMalpractice: false,
          isCopy: false,
          isTabChange: false,
          isEnd: false,
          isFullscreenOut: false,
          isAuth: false,
        }),
    }),
    {
      name: 'Code_ER',
      partialize: (state) => ({ 
        email: state.email, 
        preferredLang: state.preferredLang,
        role: state.role,
        isAuth: state.isAuth,
        password: state.password,
        isParticipate: state.isParticipate,
        isAttended: state.isAttended,
      }),
    }
  )
);


export default useUserStore;
