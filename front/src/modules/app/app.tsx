import React from 'react';

import { Search } from "../search";
import { Transactions } from "../transactions";

import 'bootstrap/dist/css/bootstrap.min.css';


export const App = () => (
  <div>
    <Search />
    <Transactions />  
  </div>
);
