import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ToastContainer} from 'react-toastify';
import { ProductsProvider } from './context/productContext';
import {Provider} from 'react-redux';
import { store } from './store';
import './index.css'
import { FilterProvider } from './context/FilterContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductsProvider>
      <FilterProvider>
        <Provider store={store}>
          <App />
        </Provider>   
      </FilterProvider>    
    </ProductsProvider>    
    <ToastContainer position='top-center' />
  </React.StrictMode>
);

;
