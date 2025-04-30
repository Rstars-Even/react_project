
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './assets/main.css'
import router from './router'
import { MantineProvider } from '@mantine/core';
import { ContextMenuProvider } from 'mantine-contextmenu';

import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="auto">
      <ContextMenuProvider>
        <RouterProvider router={router} />
      </ContextMenuProvider>
    </MantineProvider>
  </React.StrictMode>
)
