import React from "react";
import Banner from "../../components/Banner";
import Contact_Component from "../../components/Conntact";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
function Contact() {
    return (
      <div className="w-screen overflow-hidden relative home-component home-main">
       
        <main>
            <Header></Header>
            <Banner isContact = {true}  />
            <Contact_Component />
            <Footer></Footer>
        </main>
    
      </div>
    );
  }
  
  export default Contact;