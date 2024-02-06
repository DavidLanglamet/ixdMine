import React from 'react'
import { Link } from 'react-router-dom';


const Settings = () => {
  return (
    <>
        <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
          <Link to="/">
            <button style={{ background: 'transparent', width: '110px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
            </button>
          </Link>
        </div>
    </>
  )
}

export default Settings