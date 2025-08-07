import React from 'react'
import { Link } from 'react-router-dom'

const TeamSection = () => {
  return (
    <div className="fz-team-member-section">
        <div className="container">
            <h2 className="section-title">Our Team Member</h2>

            <div className="row g-3 g-md-4 justify-content-center">
                <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
                    <div className="fz-single-team-member">
                        <div className="fz-single-team-member__img">
                            <img src="assets/images/member-1.png" alt="Person Picture"/>
                        </div>

                        <div className="fz-single-team-member__txt">
                            <div className="fz-single-team-member__info">
                                <h5 className="fz-single-team-member__name">Akyssa kinley</h5>
                                <span className="fz-single-team-member__label">Founder</span>
                            </div>

                            <ul className="fz-single-team-member__socials">
                                <li><Link to="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                <li><Link to="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                <li><Link to="#"><i className="fa-brands fa-instagram"></i></Link></li>
                                <li><Link to="#"><i className="fa-brands fa-youtube"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
                    <div className="fz-single-team-member">
                        <div className="fz-single-team-member__img">
                            <img src="assets/images/member-2.png" alt="Person Picture"/>
                        </div>

                        <div className="fz-single-team-member__txt">
                            <div className="fz-single-team-member__info">
                                <h5 className="fz-single-team-member__name">Abu Amer</h5>
                                <span className="fz-single-team-member__label">Manager</span>
                            </div>

                            <ul className="fz-single-team-member__socials">
                                <li><Link to="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                <li><Link to="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                <li><Link to="#"><i className="fa-brands fa-instagram"></i></Link></li>
                                <li><Link to="#"><i className="fa-brands fa-youtube"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
                    <div className="fz-single-team-member">
                        <div className="fz-single-team-member__img">
                            <img src="assets/images/member-3.png" alt="Person Picture"/>
                        </div>

                        <div className="fz-single-team-member__txt">
                            <div className="fz-single-team-member__info">
                                <h5 className="fz-single-team-member__name">Sarah sheila</h5>
                                <span className="fz-single-team-member__label">Ceo</span>
                            </div>

                            <ul className="fz-single-team-member__socials">
                                <li><Link to="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                <li><Link to="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                <li><Link to="#"><i className="fa-brands fa-instagram"></i></Link></li>
                                <li><Link to="#"><i className="fa-brands fa-youtube"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-4 col-6 col-xxs-12">
                    <div className="fz-single-team-member">
                        <div className="fz-single-team-member__img">
                            <img src="assets/images/member-4.png" alt="Person Picture"/>
                        </div>

                        <div className="fz-single-team-member__txt">
                            <div className="fz-single-team-member__info">
                                <h5 className="fz-single-team-member__name">Aksaya khurana</h5>
                                <span className="fz-single-team-member__label">Acountant</span>
                            </div>

                            <ul className="fz-single-team-member__socials">
                                <li><Link to="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                <li><Link to="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                <li><Link to="#"><i className="fa-brands fa-instagram"></i></Link></li>
                                <li><Link to="#"><i className="fa-brands fa-youtube"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TeamSection