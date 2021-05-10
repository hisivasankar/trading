import NIFTY_50 from "../res/nifty50.json";
import NIFTY_BANK from "../res/banknifty.json";
import NIFTY_MIDCAP_50 from "../res/nifty-midcap50.json";
import NIFTY_AUTO from "../res/nifty-auto.json"
import NIFTY_FINSERV from "../res/nifty-fin-serv.json";
import NIFTY_FMCG from "../res/nifty-fmcg.json";
import NIFTY_IT from "../res/nifty-it.json";
import NIFTY_PHARMA from "../res/nifty-pharma.json";
import NIFTY_PSU from "../res/nifty-psu.json";

import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import "./Symbols.css";

const generateMap = (tokens) => {
  tokens = tokens || [];
  return tokens.reduce((acc, symbol) => {
    acc[symbol] = 1;
    return acc;
  }, {}) ;
}

const INDICES = {
  "NIFTY_BANK": {
    title: "Bank Nifty",
    symbols: NIFTY_BANK,
    map: generateMap(NIFTY_BANK)
  },
  "NIFTY_50": {
    title: "Nifty 50",
    symbols: NIFTY_50,
    map: generateMap(NIFTY_50)
  },
  "NIFTY_MIDCAP_50": {
    title: "Nifty Midcap 50",
    symbols: NIFTY_MIDCAP_50,
    map: generateMap(NIFTY_MIDCAP_50)
  },
  "NIFTY_AUTO": {
    title: "Nifty Auto",
    symbols: NIFTY_AUTO,
    map: generateMap(NIFTY_AUTO)
  },
  "NIFTY_FINSERV": {
    title: "Nifty Financial Service",
    symbols: NIFTY_FINSERV,
    map: generateMap(NIFTY_FINSERV)
  },
  "NIFTY_IT": {
    title: "Nifty IT",
    symbols: NIFTY_IT,
    map: generateMap(NIFTY_IT)
  },
  "NIFTY_PHARMA": {
    title: "Nifty Pharma",
    symbols: NIFTY_PHARMA,
    map: generateMap(NIFTY_PHARMA)
  },
  "NIFTY_PSU": {
    title: "Nifty PSU Bank",
    symbols: NIFTY_PSU,
    map: generateMap(NIFTY_PSU)
  },
  "NIFTY_FMCG": {
    title: "Nifty FMCG",
    symbols: NIFTY_FMCG,
    map: generateMap(NIFTY_FMCG)
  },
};

const isKnownStock = (symbol) => {
  for(let index in INDICES) {
    console.log("Find: ", symbol, "Index: ", index);
    const { map } = INDICES[index];
    if (!!map[symbol]) {
      return true;
    }
  }
  return false;
};

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
  const symbolCount = `(${tokens.length})`;
  const symbols = tokens.map((token, i) => <Symbol key={`key-${i}`} name={token} selected={!!found[token]}/>)
  return <div className='group'>
    <div className="group-header">
    <h2 className="group-title">{groupName}<span>{symbolCount}</span></h2>
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
  stocks.forEach(stock => {
    console.log("Stock: ", stock);
    const foundSymbol = isKnownStock(stock);
    console.log( "Found? : ", foundSymbol);
     if (foundSymbol) {
      knownSymbols[stock] = 1;
     } else {
      unknownSymbols.push(stock);
     }
  });

  let unknownSymbolsContent = null;

  if(unknownSymbols.length > 0) {
    unknownSymbolsContent = <Group key="unknown-symbols" groupName="Unknown Symbols" tokens={unknownSymbols}/>
  } else {
    unknownSymbolsContent = null;
  }

  console.log("unknown: ", unknownSymbols, "Len: ", unknownSymbols.length)
  console.log ( "unknown content: ", unknownSymbolsContent)

  const groups = [];

  for (let index of Object.keys(INDICES)) {
    const { title, symbols } = INDICES[index];
    groups.push(<Group key={index}  groupName={title} tokens={symbols} found={knownSymbols}/>);
  }

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
        {groups}
      </div>
    </div>
  );
}

export default Symbols;