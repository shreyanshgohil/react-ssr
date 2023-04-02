import React from "react";
import { demo } from "../data/dummy";
const Home = () => {
  return (
    <div>
      {demo.map((el,index) => {
       return <h1 key={index}>{el.name}</h1>;
      })}
    </div>
  );
};

export default Home;
