import React from 'react'
import ImageGallery from '../../components/ImageIntro'
import Banner from '../../components/Banner'
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FavoriteRoom from '../../components/PopularLesson';
function Home() {

  return (
    <div className="w-screen overflow-hidden relative home-component home-main">
      <main>
        <Banner />
        <ImageGallery></ImageGallery>
        <FavoriteRoom></FavoriteRoom>
      </main>
    </div>
  );
}

export default Home;

