import React, { useState } from "react";
import { Link } from "react-router-dom";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";
import Button from "react-bootstrap/Button";
import { Modal } from 'antd'

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setIsVisible(true);
  }

  const handleOk = () => {
    setIsVisible(false);
  }

  return (
    <div className="container">
      <ParticlesBg type="circle" num={200} bg={true} />
      <div className="header">
        <Fade bottom duration={1200}>
          <h1>MozikApp</h1>
        </Fade>
      </div>
      <div className="centerColumn">
        <Fade bottom>
          <Link className="responsive-headline" to="/">
            <img
              className="logo"
              src="https://uploads-ssl.webflow.com/5e21dacb31c76fac21d9a660/5fb397a581782a26d328a58a_Logo.png"
              alt="logo_merci_yanis"
            />
          </Link>
        </Fade>
        <Fade bottom duration={2000}>
          <ul>
            <Button as={Link} to="/purchase" className="custom-btn btn-1">
              Purchase an album
            </Button>
            <Button className="custom-btn btn-1 ml-1" onClick={showModal}>Credits</Button>
            <Modal title="" visible={isVisible} onOk={handleOk} centered width={1000} cancelButtonProps onCancel={handleOk}>
              <a>@Realised by Nirina Ratovomanana</a>
            </Modal>
          </ul>
        </Fade>
      </div>
    </div>
  );
};

export default Home;
