import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Shield application from third-party browser extensions or injected scripts
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    const msg = event?.message || '';
    const file = event?.filename || '';
    const err = event?.error ? String(event.error) : '';
    if (
      msg.includes('fetch of #<Window>') ||
      msg.includes('chrome-extension://') ||
      file.includes('chrome-extension://') ||
      err.includes('fetch of #<Window>') ||
      err.includes('chrome-extension://')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation?.();
      return true;
    }
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    const reasonStr = event?.reason ? String(event.reason) : '';
    if (
      reasonStr.includes('chrome-extension://') ||
      reasonStr.includes('fetch of #<Window>')
    ) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(<App />);
