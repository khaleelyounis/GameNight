import React from 'react';
import '../assets/css/about.css';
import familyphoto from '../assets/images/familyphoto.jpg'

export default () => {
    return (
        <div className='aboutUs'>
            <div className='row'>
                <div className='col l6 s8 offset-l3 offset-s2'>
                    <h2 className='aboutTitle center center-align'>Meet the Team!</h2>
                    <div className='card contentBorder'>
                        <div className='card-content'>
                            <img src={familyphoto} className='aboutUsImage col s12 z-depth-5' id='aboutUsImage' />
                            <h6 className='figCaptionText center center-align'><strong>From left to right:</strong> Crystal Navarro, Khaleel Younis, Paul Lee, Shawn Levin</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col l12 s12'>
                    <div className='col l6'>
                        <div className='backEnd col s12 l12'>
                            <h3 className='frontAndBack center center-align'>Back End Developers</h3>
                        </div>
                        <div className='aboutUsText col s6 l6'>
                            <div className='card contentBorder'>
                                <div className='card-content cardBox'>
                                    <h4 className='aboutUsNames center center-align'>Crystal Navarro</h4>
                                    <p>During this project, I had the wonderful opportunity to learn and implement: Node.js, Express, Mongo DB, Socket.io, and a bit of React. Working with these guys was a great experience because individuality did not exist. We all worked collectively and learned a vast amount of concepts from the front to the back end. My greatest challenge was learning how the technologies in the MERN stack tied in together. Overcoming our bugs and walls was such a great pay off. There is no other way I would have wanted to learn.</p>
                                </div>
                                <div className='row'>
                                    <div className='center center-align col s12' id='icons'>
                                        <a href='https://github.com/xoxocrystyle' target='_blank'><i className='contactIcon fab fa-github'></i></a>
                                        <a href='https://crystalnavarro.com' target='_blank'><i className='contactIcon fas fa-id-card'></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='aboutUsText col s6 l6'>
                            <div className='card contentBorder'>
                                <div className='card-content cardBox'>
                                    <h4 className='aboutUsNames center center-align'>Khaleel Younis</h4>
                                    <p>I had the pleasure of working with Node.js, Express, Passport, MongoDB, Socket.io and plenty more to build, alongside my partner Crystal, the backend portion of Live Face Off. Correctly implementing a system that would track wins, games played, lowest score, and more through Socket.io was definitely a challenge, but also a very rewarding experience. Continuously building the database as the project evolved, gave me insight on what it would take to scale future applications to larger heights.</p>
                                </div>
                                <div className='row'>
                                    <div className='center center-align col s12' id='icons'>
                                        <a href='https://github.com/stallenvp' target='_blank'><i className='contactIcon fab fa-github'></i></a>
                                        <a href='https://khaleelyounis.com' target='_blank'><i className='contactIcon fas fa-id-card'></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col l6'>
                        <div className='frontEnd col s12 l12'>
                            <h3 className='frontAndBack center center-align'>Front End Developers</h3>
                        </div>
                        <div className='aboutUsText col s6 l6'>
                            <div className='card contentBorder'>
                                <div className='card-content cardBox'>
                                    <h4 className='aboutUsNames center center-align'>Paul Lee</h4>
                                    <p>It was an awesome experience working with this team of talented developers and I'm very proud of how we collaborated to bring this application to life. Implementing React and Redux for our front end was challenging but it was an invaluable experience.</p>
                                </div>
                                <div className='row'>
                                    <div className='center center-align col s12' id='icons'>
                                        <a href='https://github.com/fedrius' target='_blank'><i className='contactIcon fab fa-github'></i></a>
                                        <a href='https://paulmlee.live' target='_blank'><i className='contactIcon fas fa-id-card'></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='aboutUsText col s6 l6'>
                            <div className='card contentBorder'>
                                <div className='card-content cardBox'>
                                    <h4 className='aboutUsNames center center-align'>Shawn Levin</h4>
                                    <p>On this project, I was most excited to utilize more modern technologies such as React and Materialize CSS. The most challenging portion was implementing the web cam on each of the game modes seperately. We utilized a WebRTC api from TokBox, that worked especially well with React. Paul and I worked diligently together on the frontend splitting the workload, but also helping each other along the way.</p>
                                </div>
                                <div className='row'>
                                    <div className='center center-align col s12' id='icons'>
                                        <a href='https://github.com/slevin222' target='_blank'><i className='contactIcon fab fa-github'></i></a>
                                        <a href='https://shawndlevin.com' target='_blank'><i className='contactIcon fas fa-id-card'></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}