// src/composants/TableauInventaire.tsx
import React, { useEffect, useState } from 'react';
import {  magasins } from '../donnees';
import { Inventaire } from '../interfaces/Inventaire';

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

      {/* Modal pour éditer le stock */}
      {modalStockOuvert && (
        <div className="modal">
          <div className="modal-contenu">
            <h2>Éditer le Stock</h2>
            <label>Nouvelle Valeur de Stock:</label>
            <input
              type="number"
              value={nouveauStock}
              onChange={(e) => (Number(e.target.value))}
            />
            <button onClick={gererMiseAJourStock}>Soumettre</button>
            <button onClick={() => (false)}>Annuler</button>
          </div>
        </div>
      )}

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
      {modalProduitOuvert && (
        <div className="modal">
          <div className="modal-contenu">
            <h2>Ajouter un Produit</h2>
            <label>Nom du Produit:</label>
            <input
              type="text"
              value={nouveauProduitNom}
              onChange={(e) => (e.target.value)}
            />
            <label>Prix du Produit:</label>
            <input
              type="number"
              value={nouveauProduitPrix}
              onChange={(e) => (Number(e.target.value))}
            />
            <button onClick={gererAjoutProduit}>Ajouter</button>
            <button onClick={() => (false)}>Annuler</button>
          </div>
        </div>
      )}

      {/* Modal pour ajouter un inventaire */}
      {modalInventaireOuvert && (
        <div className="modal">
          <div className="modal-contenu">
            <h2>Ajouter un Inventaire</h2>
            <label>Magasin:</label>
            <select value={idMagasin} onChange={(e) => (Number(e.target.value))}>
              {magasins.map((magasin) => (
                <option key={magasin.id} value={magasin.id}>
                  {magasin.nom}
                </option>
              ))}
            </select>
            <label>Produit:</label>
            <select value={idProduit} onChange={(e) => (Number(e.target.value))}>
              {produitsListes.map((produit) => (
                <option key={produit.id} value={produit.id}>
                  {produit.nom}
                </option>
              ))}
            </select>
            <label>Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => (Number(e.target.value))}
            />
            <label>Date d'ajout:</label>
            <input
              type="date"
              value={dateAjout}
              onChange={(e) => (e.target.value)}
            />
            <button onClick={gererAjoutInventaire}>Soumettre</button>
            <button onClick={() => (false)}>Annuler</button>
          </div>
        </div>
      )}

      {/* Modal pour exporter les données */}
      {modalExportationOuvert && (
        <div className="modal">
          <div className="modal-contenu">
            <h2>Exporter les données</h2>
            <label>Magasin:</label>
            <select value={idMagasin} onChange={(e) => (Number(e.target.value))}>
              {magasins.map((magasin) => (
                <option key={magasin.id} value={magasin.id}>
                  {magasin.nom}
                </option>
              ))}
            </select>
            <label>Date:</label>
            <input
              type="date"
              value={dateAjout}
              onChange={(e) => }
            />
           
            <button onClick={() => }>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableauInventaire;