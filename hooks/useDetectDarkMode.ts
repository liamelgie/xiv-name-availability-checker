import { useEffect } from "react";

export default function useDetectDarkMode (onSelectTheme: Function) {
    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').
            addEventListener('change', e => onSelectTheme(e.matches ? 'dark' : 'light'));
        onSelectTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        return () => {
          window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => {
          });
        }
      }, []);
}
