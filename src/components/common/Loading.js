import React,{ useEffect } from 'react'

export default function Loading({ isLoading }) {
    useEffect(() => {
        const body = document.getElementById("outer-wrapper");
        if(isLoading) {
            window.scrollTo(0,0);
            if (body && body.style) {
                body.style.height = '100vh';
                body.style.overflow = 'hidden';
            }            
        } else {
            if(body && body.style) {
                body.style.overflow = 'auto';
                body.style.height = 'scroll';
            }
        }
    },[isLoading])
    return (
        <div className='loading-wrapper'>
            <div className="loading">
                <h2>Loading...</h2>
            </div>
        </div>
    )
}
