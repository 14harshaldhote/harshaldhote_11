import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';

export function mount(page) {
  createRoot(document.getElementById('root')).render(<StrictMode>{page}</StrictMode>);
}
