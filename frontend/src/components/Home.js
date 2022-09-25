import React from "react";

function Home() {
  return (
    <div className="home">
      <figure className="home-image">
        <img src={require("../about-us.jpg")} alt="" />
      </figure>
      <h2>We keep industry working</h2>
      <p>
        Cromwell has grown from humble beginnings over 50 years ago to become a
        trusted source of MRO supplies and industrial products.
      </p>
      <p>
        With a network of branches and offices in the UK and across the globe,we
        help keep the vital cogs of industry turning. Supporting those who make
        and manufacture the world around us. Going above and beyond to keep
        operations running and people safe.{" "}
      </p>
      <p>
        We do this by not only providing easy access to an extensive range of
        great value, high-quality products, but also through exceptional
        customer service and a wealth of technical expertise to help you get the
        job done.{" "}
      </p>
      <p>
        Since becoming part of the W.W. Grainger, Inc. family in 2015, we’re
        stronger than ever. Always ready to serve. Always committed to
        supporting our customers as they rise to new challenges – today,
        tomorrow and beyond.
      </p>
    </div>
  );
}

export default Home;
