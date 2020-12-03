import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCripto from "../hooks/useCriptomoneda";
import Axios from "axios";
import Error1 from "./Error";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = () => {
  const [listacripto, guardarCripto] = useState([]);
  const [error, guardarError] = useState(false);
  const MONEDAS = [
    {
      codigo: "USD",
      nombre: "Dolar de Estados Unidos",
    },
    {
      codigo: "MXN",
      nombre: "Peso  Mexicano",
    },
    {
      codigo: "EUR",
      nombre: "Euro",
    },
    {
      codigo: "GBP",
      nombre: "Libra Esterlina",
    },
  ];
  //use moneda
  const [moneda, SelectMonedas] = useMoneda("Elige tu Moneda", "", MONEDAS);

  //use cripto

  const [criptomoneda, SelectCripto] = useCripto(
    "Elige tu Criptomoneda",
    "",
    listacripto
  );

  useEffect(() => {
    const consulltarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD";

      const resultado = await Axios.get(url);

      guardarCripto(resultado.data.Data);
    };
    consulltarAPI();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (moneda === "" || criptomoneda === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error1 mensaje={"Seleccionar todas las opciones"} /> : null}
      <SelectCripto />
      <SelectMonedas />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
