// src/composants/TableauInventaire.tsx
import React, { useEffect, useState } from 'react';


import './TableauInventaire.css'; // Importer le fichier CSS

const TableauInventaire: React.FC = () => {


  

  return (
    <div>
      <h2>Produits par Magasin</h2>
      <table className="tableau-inventaire">
        <thead>
          <tr>
            <th>Magasin</th>
            <th>Produit</th>
            <th>Stock</th>
            <th>Date d'ajout</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>

      

      {/* Tableau pour lister les produits ajoutés */}
      <h2>Liste des Produits</h2>
      <table className="tableau-produits">
        <thead>
          <tr>
            <th>Nom du Produit</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>

      <div className="boutons">
        <button onClick={() => (true)}>Ajouter Produit</button>
        <button onClick={() => (true)}>Ajouter Inventaire</button>
        <button onClick={() => (true)}>Exporter en CSV</button>
      </div>

      {/* Modal pour ajouter un produit */}
      
      {/* Modal pour ajouter un inventaire */}
              </div>
              
      )};

export default TableauInventaire;