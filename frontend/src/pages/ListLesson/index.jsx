import React from "react";
import ListLesson from "../../components/ListLesson";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
function ListLes() {
    return (
      <div className="w-screen overflow-hidden relative home-component home-main">
        <Header />
        <main>
          <ListLesson />
        </main>
        <Footer />
      </div>
    );
  }
  
  export default ListLes;