import { Outlet } from 'react-router-dom'
import { MantineProvider } from '@mantine/core';
import { ContextMenuProvider } from 'mantine-contextmenu';

import '@mantine/core/styles.layer.css';
import 'mantine-contextmenu/styles.layer.css';

export default function Config() {
    return (
        <MantineProvider defaultColorScheme="auto">
            <ContextMenuProvider>
                <main className='container'>
                    <Outlet />
                </main>
            </ContextMenuProvider>
        </MantineProvider>
    )
}