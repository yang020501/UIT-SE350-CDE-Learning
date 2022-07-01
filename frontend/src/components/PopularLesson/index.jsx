import React from "react";
import "./styles.css";
function FavoriteLesson() {

  
  return (
    <div className="favorite_lesson-container body-container">
      <div className="favorite_lesson_header">
        <h2 className="favorite_lesson_header-title">OUR FAVORITE LESSON</h2>
      </div>
       <div className="favorite-list" style={{ display: 'flex'}}>
        <div className="favorite-list-item" style={{ width: "33.33%" }}>
          <article className="favorite-lesson">
            <figure className="favorite-fg" style={{ position: "relative" }}>
              <a className="hover-effect">
                <img
                  src="https://hanoispiritofplace.com/wp-content/uploads/2017/12/hinh-anh-cuon-sach-dep-10.jpg"
                  className="img-responsive"
                  alt="Image"
                />
              </a>
              <figcaption className="favorite-figcaption">
                <h4 className="favorite-figcaption-h4">
                  <a href="/ListLesson">Môn Vật Lí</a>
                </h4>
                <span className="f_right">
                  <a href="/ListLesson" className="button btn_sm btn_blue">
                    VIEW DETAILS
                  </a>
                </span>
              </figcaption>
            </figure>
          </article>
        </div>
        <div className="favorite-list-item" style={{ width: "33.33%" }}>
          <article className="favorite-lesson">
            <figure className="favorite-fg" style={{ position: "relative" }}>
             
              <a className="hover-effect">
                <img
                  src="https://hanoispiritofplace.com/wp-content/uploads/2017/12/hinh-anh-cuon-sach-dep-11.jpg"
                  className="img-responsive"
                  alt="Image"
                />
              </a>
              <figcaption className="favorite-figcaption">
                <h4 className="favorite-figcaption-h4">
                  <a href="/ListLesson">Môn Toán </a>
                </h4>
                <span className="f_right">
                  <a href="/ListLesson" className="button btn_sm btn_blue">
                    VIEW DETAILS
                  </a>
                </span>
              </figcaption>
            </figure>
          </article>
        </div>
        <div className="favorite-list-item" style={{ width: "33.33%" }}>
          <article className="favorite-lesson">
            <figure className="favorite-fg" style={{ position: "relative" }}>
              
              <a className="hover-effect">
                <img
                  src="https://hanoispiritofplace.com/wp-content/uploads/2017/12/hinh-anh-cuon-sach-dep-7.jpg"
                  className="img-responsive"
                  alt="Image"
                />
              </a>
              <figcaption className="favorite-figcaption">
                <h4 className="favorite-figcaption-h4">
                  <a href="/ListLesson">Môn Hóa Học</a>
                </h4>
                <span className="f_right">
                  <a href="/ListLesson" className="button btn_sm btn_blue">
                    VIEW DETAILS
                  </a>
                </span>
              </figcaption>
            </figure>
          </article>
        </div>
      </div>
      <div className="mt40 a_center">
<a className="button btn_sm btn_yellow" href="/ListLesson">VIEW MORE</a>
</div>
    </div>
  );
}

export default FavoriteLesson;
