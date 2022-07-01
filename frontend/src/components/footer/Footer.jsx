import React from 'react'
import './footer.css'
import logo from '../../Logo/logo_chu.png'
export default function Footer() {
  return (
    <div className='footer-container' style={{ background: 'antiquewhite' }}>
      <div className="Footer-component">
        <div class="col-md-3 col-sm-6 widget">
          {/* <div class="Footer-about">
            <a href="/">
              <img class="logo" src={logo} height="50" alt="Logo"></img>
            </a>
            <p> Education is the most powerful weapon we can use to change the world</p>
          </div> */}
        </div>
        <div className="Footer-infor">
          <div class="col-md-3 col-sm-6 widget">
            <h5>Latest News</h5>
            <ul class="blog_posts">
              <li><a href="">Devolopment Team</a>
                <small>Mr.Xuân Tâm, Mr.Quốc Khanh, Mr.Thái Dương</small>
              </li>
              <li><a href="">Day start</a>
                <small>MARCH 5, 2022</small>
              </li>
              <li><a href="/">Day end</a>
                <small>MAY 20, 2022</small>
              </li>
            </ul>
          </div>
          <div class="col-md-3 col-sm-6 widget">
            <h5>Useful Links</h5>
            <ul class="useful_links">
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">History</a></li>
              <li><a href="#">Gallery</a></li>
              <li><a href="#">Location</a></li>
            </ul>
          </div>
          <div class="col-md-3 col-sm-6 widget">
            <h5>Contact Us</h5>
            <address>
              <ul class="address_details">
                <li><i class="glyphicon glyphicon-map-marker">
                </i> ĐẠI HỌC CÔNG NGHỆ THÔNG TIN, LINH TRUNG ,THỦ ĐỨC
                </li>
                <li><i class="glyphicon glyphicon-phone-alt">
                </i> Phone: +84 0763638074
                </li>
                <li><i class="fa fa-fax">
                </i> Fax:  123 3456
                </li>
                <li><i class="fa fa-envelope">
                </i> Email: <a href="">19522167@gm.uit.edu.vn</a>
                </li>
              </ul>
            </address>
          </div>
        </div>
        <div className="Footer-final">
          <div class="col-md-6 col-sm-6">
            <div class="copyrights">
              Copyright 2022 <a href="/"> Simple Code </a> All Rights Reserved.
            </div>
          </div>
          <div class="col-md-6 col-sm-6">
            <div className="social_media">
              <a href=""><i className="icon ion-social-instagram"></i></a>
              <a href=""><i className="icon ion-social-twitter"></i></a>
              <a href="https://www.youtube.com/channel/UCrNQuKrnsk0mNJjcVbUPHCA" ><i className="icon ion-social-youtube"></i></a>
              <a href="https://www.facebook.com/E-learning-study-and-connect-102460449156930" ><i className="icon ion-social-facebook"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
