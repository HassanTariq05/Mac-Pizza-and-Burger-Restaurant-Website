import React from 'react';
import '../css/style.css';
import '../css/responsive.css';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div id="page" className="page">
      <div id="about-page" className="page-hero-section division" style={{ backgroundImage: 'url("")' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="hero-txt text-center white-color">
                <div id="breadcrumb">
                  <div className="row">
                    <div className="col">
                      <div className="breadcrumb-nav">
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <Link to='/home'>
                                <li className="breadcrumb-item"><a href='/home'>Home</a></li>
                            </Link>
                            <p className='breadcrumb-item'></p>
                            <li className="breadcrumb-item active" aria-current="page">About</li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="h2-xl">About</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="about-3" className="wide-60 about-section division">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-lg-12">
              <div className="about-3-txt mb-40">
                <h2 className="h2-sm">DEAR GUEST!</h2>
                <p className="p-md" style={{ textAlign: 'center' }}>Welcome to “MACBURGER”. Thank you for choosing our establishment for a pleasant pastime. We are always glad to see you as a guest – we invite you to try the dishes Eastern, European and Indo-Pakistani cuisine, prepared specially for to your individual order: each dish is prepared from the moment of your order from fresh selected products.</p>
                <h4>Rules for visiting “MACBURGER”:</h4>
                <p class="mb-15">“MACBURGER” is a private establishment, and the administration may refuse
								to allow a guest to visit Without explaning the reason. Please remember that any
								manifestation of aggression and inappropriate behavior, alcohol intoxication, which
								causes discomfort other guests. Visitors and their personal belongings may be searched
								to ensure the safety of MACBURGER guests.</p>
							<p><strong>The following are not allowed into the cafe area:</strong></p>
							<ul>
								<li>persons under 18 years of age, after 22:00, unaccompanied by adults;</li>
								<li>persons under the influence of alcohol, drugs and toxic substances;</li>
								<li>behaving aggressively towards guests and/or cafe staff</li>
								<li>drinking alcoholic beverages near the entrance to “MACBURGER”</li>
								<li>suspected of using or distributing drugs</li>
								<li>suspected of committing illegal acts against other guests and staff or property of
									“MACBURGER”</li>
							</ul>
							<p><strong>The following is prohibited in the cafe:</strong></p>
							<ul>
								<li>smoking indoors</li>
								<li>use and distribute drugs</li>
								<li>carry bladed weapons and firearms</li>
								<li>lie on the sofa or sleep</li>
								<li>climb up on sofas with your feet</li>
								<li>use obscene language; raise your voice</li>
								<li>sit at a table with other guests without invitation</li>
								<li>bring and consume your own drinks and food</li>
								<li>provoke conflicts and get into fights</li>
							</ul>
							<p><strong>The following are not allowed on the cafe dance floor:</strong></p>
							<ul>
								<li>whistle and shout loudly</li>
								<li>disturb each other, run and push</li>
								<li>sit and lie down</li>
								<li>put each other on each other’s shoulders or lift them into their arms</li>
								<li>undress</li>
							</ul>
							<p>If a guest(s) violates public order (behaves inappropriately towards other guests or
								employees of “MACBURGER”), the administration may take measures to remove guest(s) from
								the establishment, having previously calculated them. “MACBURGER” is not responsible for
								the safety of vehicles, loss of personal things and values. In our “MACBURGER” and on
								its territory, a video surveillance system is installed for security purposes. Visitors
								to “MACBURGER” are responsible for compliance with law and order, rules and conditions
								being in a cafe. While on the territory of “MACBURGER”, you agree to our terms and
								conditions and fully accept the above rules.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
