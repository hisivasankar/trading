import NIFTY50 from "../res/nifty50.json";
import BANKNIFTY from "../res/banknifty.json";
import NIFTYMIDCAP50 from "../res/nifty-midcap50.json";

import "./Symbols.css";

import { useState } from "react";
import TextField from '@material-ui/core/TextField';

const generateMap = (tokens) => {
  tokens = tokens || [];
  return tokens.reduce((acc, symbol) => {
    acc[symbol] = 1;
    return acc;
  }, {}) ;
}

const NIFTY50MAP = generateMap(NIFTY50);
const NIFTYMIDCAP50MAP = generateMap(NIFTYMIDCAP50);
const BANKNIFTYMAP = generateMap(BANKNIFTY);


const Symbol = (props) => {
  const { name, selected } = props;
  const classes = "symbol " + (selected ? "selected" : "");
  return <div className={classes}>
    <span>{name}</span>
  </div>
};

const Group = (props) => {
  let { groupName, tokens, found = {}} = props;
  tokens = tokens || [];
  const symbols = tokens.map((token, i) => <Symbol key={`key-${i}`} name={token} selected={!!found[token]}/>)
  return <div className='group'>
    <div className="group-header">
    <h2 className="group-title">{groupName}</h2>
    <button onClick={() => {
      alert(tokens.join(", "));
    }}>Copy</button>
    </div>
    <div className="symbols">{symbols}</div>
  </div>
};

const Symbols = () => {
  const [stocks, setStocks] = useState([]);
  const unknownSymbols = [];
  let knownSymbols = {};
  console.log("Map", NIFTY50MAP);
  stocks.forEach(stock => {
    console.log("Stock: ", stock);
    console.log( "Found? : ", !!NIFTY50MAP[stock]);
    const isknownStock = !!NIFTY50MAP[stock] || !!BANKNIFTYMAP[stock];
     if (isknownStock) {
      knownSymbols[stock] = 1;
     } else {
      unknownSymbols.push(stock);
     }
  });

  let unknownSymbolsContent = null;

  if(unknownSymbols.length > 0) {
    unknownSymbolsContent = <Group key="unknownsymbols" groupName="Unknown Symbols" tokens={unknownSymbols}/>
  } else {
    unknownSymbolsContent = null;
  }


  console.log("unknown: ", unknownSymbols, "Len: ", unknownSymbols.length)
  console.log ( "unknown content: ", unknownSymbolsContent)

  return (
    <div>
      <h1>Symbols Management</h1>
      <TextField
        id="standard-required"
        label="Enter the symbols"
        defaultValue=""
        style={{ width: "100%" }}
        onChange={(event) => {
          let text = (event.target.value || "").trim().toUpperCase();
          text = text.replace(/\s/gi, "");
          if (text) {
            const currentSymbols = text.split(",");
            console.log("Text: ", text, "sym: ", currentSymbols);
            setStocks(currentSymbols);
          } else {
            setStocks([]);
          }
        }}
      />

      <div>
        {unknownSymbolsContent}
        <Group key="banknifty"  groupName="Bank Nifty" tokens={BANKNIFTY} found={knownSymbols}/>
        <Group key="nifty50" groupName="Nifty 50" tokens={NIFTY50} found={knownSymbols}/>
        <Group key="banknifty-midcap-50"  groupName="Nifty MidCap 50" tokens={NIFTYMIDCAP50} found={knownSymbols}/>
      </div>
    </div>
  );
}

export default Symbols;