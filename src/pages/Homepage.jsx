import React, { useState } from "react";
import './HomePage.css'
import logo from './logo.png';
import ImageSlider from '../component/model/ImageSlider';
export const HomePage = () => {
    const [buttonPopUp, setButtonPopup] = useState(false);
    const [popUp, setPopUp] = useState(true);
    const slides = [
        { url: 'http://localhost:3000/image-2.jpg', title: 'myimaginarycompany' },
        { url: 'http://localhost:3000/image-1.jpg', title: 'me' },

        { url: 'http://localhost:3000/image-3.jpg', title: '.Net' },
        { url: 'http://localhost:3000/image-4.jpg', title: 'EF' },
        { url: 'http://localhost:3000/image-5.jpg', title: 'React' }
    ]

    return (
        <div className="homePage">
            <header>

                <nav >
                    <ul>
                        <img alt="" src={logo} width={50} height={50} />

                        <li><a href="/">Home</a></li>
                        <li><a href="/login">Sign In</a></li>
                        <li><a href="https://github.com/Solak-Suleyman" target="_blank" rel="noreferrer">My GitHub</a></li>
                    </ul>
                </nav>
            </header>

            <main>

                <section id="hero">
                    <h1>Welcome to Meeting Scheduler</h1>
                    <p>Simplify your scheduling process with our powerful tool.</p>
                    <div className="container-slide">
                        <ImageSlider slides={slides} parentWidth={500}></ImageSlider>
                        <div className="container-btn">
                            <a href="/register" className="cta-button">Get Started</a>
                        </div>
                    </div>

                </section>


            </main>

            <footer>
                <p>&copy; 2023 Meeting Scheduler</p> <p>Created by Süleyman Solak</p>

            </footer>
        </div>
    );
}


