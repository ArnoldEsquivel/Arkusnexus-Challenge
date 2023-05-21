import { useState, useEffect } from 'react';

export default function Sidebar({ children }) {
    return(
        <div>
            <h1>Sidebar</h1>
            {children}
        </div>
    )
}