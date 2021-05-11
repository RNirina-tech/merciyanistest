import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Table } from "antd";
import { StarFilled } from '@ant-design/icons';

const Purchase = () => {
  const [albums, setAlbums] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [keyCart, setKeyCart] = useState(0);

  /*Colonnes à afficher pour les albums*/
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <a>{rating} <StarFilled /></a>/**J'ai essayé de mettre un switch afin d'affiche le nombre d'étoiles en fonction de la note */
    },
    {
      title: "Prices",
      dataIndex: "price",
      key: "price",
      render: (price) => <a>{price} €</a>,
    },
    {
      key: "add",
      render: (record) => (
        <Button
          className="btn-data"
          onClick={(e) => {
            handleClick(record);
          }}
        >
          Add to cart
        </Button>
      ),
    },
  ];

  /*Colonne à afficher pour le panier */
  const colCart = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
    },
    {
      title: "Prices",
      dataIndex: "price",
      key: "price",
      render: (price) => <a>{price} €</a>,
    },
    {
      title: "Copies",
      dataIndex: "copies",
      key: "copies",
      render: (copies) => <a>x {copies}</a>,
    },
    {
      key: "add",
      render: (record) => (
        <>
          <Button
            className="btn-cart"
            onClick={(e) => {
              addOne(record._id);
            }}
          >
            +
          </Button>
          <Button
            className="btn-cart"
            onClick={(e) => {
              decrementOne(record);
            }}
          >
            -
          </Button>
        </>
      ),
    },
  ];

  /*Calcul le prix total*/
  const calculTotal = () => {
    if (cart.length !== 0) {
      let tmpTotal = 0;
      cart.map((e) => {
        tmpTotal += e.price;
      });
      setTotal(tmpTotal);
    }
  };

  /*J'essaie avec la clé de la row correspondant à l'album à supprimer de supprimer de l'occurence du panier*/
  const handleDelete = (key) =>{
    let dataSource = [...cart]
    let index = dataSource.findIndex((item) => key === item.key)
    dataSource.splice(index, 1);
    setCart(dataSource)
  }

  /*Le nombre de copies, le prix de l'album et le prix total diminue correctement mais pas le handleDelete quand le nombres de copies atteint 0 */
  /*Diminue de un le nombre de copie lorsque l'on appuie sur -*/
  const decrementOne = (album) => {
    cart.map((e, index) => {
      if (e._id === album._id) {
        album.copies === 1 ? handleDelete(album.key) : void 0;
        let tmpC = e;
        let tmp = [...cart];
        tmpC.copies -= 1;
        tmpC.price -= tmpC.originalPrice;
        tmp[index] = tmpC;
        setCart(tmp);
      }
    });
    calculTotal()
  };

  /*Ajoute une copie lorsque l'on appuie sur +*/
  const addOne = (id) => {
    cart.map((e, index) => {
      e._id === id ? addOneInCart(index) : void 0;
    });
  };

  /*Ajoute une copie lorsque l'on appuie sur le bouton Add to cart ou sur le + */
  const addOneInCart = (ind) => {
    let tmpC = cart[ind];
    let tmp = [...cart];
    tmpC.copies += 1;
    tmpC.price += tmpC.originalPrice;
    tmp[ind] = tmpC;
    setCart(tmp);
    calculTotal();
  };

  /*Vérifie si l'album est déja présent ou non dans le panier*/
  /*Renvoie l'index si présent, renvoie false si non présent*/
  const isInCart = (id) => {
    let isIn = false;
    let i = 0;
    cart.map((e, index) => {
      if (e._id === id) {
        isIn = true;
        i = index;
      }
    });
    if (isIn === true) {
      return i;
    } else {
      return false;
    }
  };

  /*Si l'album n'est pas dans le panier, rajoute l'album dedans avec une copie et une key pour le delete(ne fonctionne pas)*/
  const addInCart = (album) => {
    let tmpCart = { ...album, copies: 1, originalPrice: album.price, key: keyCart };
    let k = keyCart + 1;
    let tmp = [...cart];
    tmp.push(tmpCart);
    setCart(tmp);
    setKeyCart(k)
    cart.length !== 0 ? setTotal(tmpCart.price + total) : setTotal(tmpCart.price);
  };

  /*Rajoute une copie ou une nouvelle occurrence lorsque l'user appuie sur le bouton Add to cart*/
  const handleClick = (album) => {
    if (cart.length !== 0) {
      let i = isInCart(album._id);
      i === false ? addInCart(album) : addOneInCart(i);
    } else {
      addInCart(album);
    }
  };

  /*Connexion à l'api et à la base de données pour récupérer les stubs d'albums*/
  useEffect(() => {
    axios
      .get("http://localhost:7000/api/albums")
      .then((res) => {
        const data = res.data;
        setAlbums(data);
        console.log("Data fetched");
      })
      .catch((e) => {
        alert("error");
      });
  }, []);

  return (
    <body>
      <div className="container">
        <div className="header-purchase">
          <Fade bottom>
            <Link className="responsive-headline" to="/">
              <img
                className="logo"
                src="https://uploads-ssl.webflow.com/5e21dacb31c76fac21d9a660/5fb397a581782a26d328a58a_Logo.png"
                alt="logo_merci_yanis"
              />
            </Link>
          </Fade>
        </div>
        <div className="centerColumn">
          <Fade bottom>
            <Table dataSource={albums} columns={columns} size="middle" />
          </Fade>
        </div>
        <div className="leftColumn">
          <Table
            dataSource={cart}
            columns={colCart}
            size="small"
            pagination={false}
          />
          <Button className="btn-data">Total : {total.toFixed(2)} € </Button>
        </div>
      </div>
    </body>
  );
};

export default Purchase;
