
import React, { useEffect, useState } from 'react';
import { magasins } from '../donnees';
import { Inventaire } from '../interfaces/Inventaire';

import './TableauInventaire.css'; 

const TableauInventaire: React.FC = () => {
            // ici pour gérer les inventaires et les modals
            const [inventaires, setInventaires] = useState<Inventaire[]>([]);
            const [modalInventaireOuvert, setModalInventaireOuvert] = useState<boolean>(false);
            const [modalProduitOuvert, setModalProduitOuvert] = useState<boolean>(false);
            const [modalExportationOuvert, setModalExportationOuvert] = useState<boolean>(false);
            const [modalStockOuvert, setModalStockOuvert] = useState<boolean>(false);

            // ici pour gérer les informations sur les produits et les inventaires
            const [idMagasin, setIdMagasin] = useState<number>(1);
            const [idProduit, setIdProduit] = useState<number>(1);
            const [stock, setStock] = useState<number>(0);
            const [dateAjout, setDateAjout] = useState<string>(''); // Date d'ajout
            const [nouveauProduitNom, setNouveauProduitNom] = useState<string>('');
            const [nouveauProduitPrix, setNouveauProduitPrix] = useState<number>(0);
            const [produitsListes, setProduitsListes] = useState<any[]>([]); // ici pour stocker la liste des produits
            const [indexEdite, setIndexEdite] = useState<number | null>(null);
            const [nouveauStock, setNouveauStock] = useState<number>(0);

            // ici pour faire le localStorage
            useEffect(() => {
                        const inventairesStockes = JSON.parse(localStorage.getItem('inventaires') || '[]');
                        setInventaires(inventairesStockes);
                        const produitsExistants = JSON.parse(localStorage.getItem('produits') || '[]');
                        setProduitsListes(produitsExistants); // Charger la liste des produits
            }, []);

            // Fonction pour ajouter un produit
            const gererAjoutProduit = () => {
                        if (!nouveauProduitNom.trim() || nouveauProduitPrix <= 0) {
                                    alert("Veuillez entrer un nom valide et un prix supérieur à 0.");
                                    return;
                        }

                        const nouvelProduit = { id: Date.now(), nom: nouveauProduitNom, prix: nouveauProduitPrix };

                        const produitsExistants = JSON.parse(localStorage.getItem('produits') || '[]');
                        localStorage.setItem('produits', JSON.stringify([...produitsExistants, nouvelProduit]));

                        // Mettre à jour l'état local pour afficher le produit ajouté
                        setProduitsListes([...produitsListes, nouvelProduit]);
                        setNouveauProduitNom('');
                        setNouveauProduitPrix(0);
                        setModalProduitOuvert(false);
            };

            // Fonction pour ajouter un inventaire
            const gererAjoutInventaire = () => {
                        if (stock <= 0 || !dateAjout) {
                                    alert("Veuillez entrer un stock supérieur à 0 et une date valide.");
                                    return;
                        }

                        const nouvelInventaire: Inventaire = {
                                    date: dateAjout,
                                    idProduit,
                                    stock: { [idMagasin]: stock },
                        };

                        const inventairesExistants = JSON.parse(localStorage.getItem('inventaires') || '[]');
                        localStorage.setItem('inventaires', JSON.stringify([...inventairesExistants, nouvelInventaire]));
                        setInventaires([...inventaires, nouvelInventaire]);
                        setModalInventaireOuvert(false);
                        setStock(0);
                        setDateAjout('');
            };

            // Fonction pour supprimer un inventaire
            const supprimerProduit = (index: number) => {
                        const nouveauxInventaires = inventaires.filter((_, i) => i !== index);
                        localStorage.setItem('inventaires', JSON.stringify(nouveauxInventaires));
                        setInventaires(nouveauxInventaires);
            };

            // Fonction pour ouvrir le modal d'édition du stock
            const ouvrirModalStock = (index: number, stock: number) => {
                        setIndexEdite(index);
                        setNouveauStock(stock);
                        setModalStockOuvert(true);
            };

            // Fonction pour soumettre la mise à jour du stock
            const gererMiseAJourStock = () => {
                        if (nouveauStock <= 0) {
                                    alert("Veuillez entrer une valeur de stock supérieure à 0.");
                                    return;
                        }

                        if (indexEdite !== null) {
                                    const nouveauxInventaires = [...inventaires];
                                    const idMagasinInventaire = Object.keys(nouveauxInventaires[indexEdite].stock)[0];
                                    nouveauxInventaires[indexEdite].stock[Number(idMagasinInventaire)] = nouveauStock;

                                    localStorage.setItem('inventaires', JSON.stringify(nouveauxInventaires));
                                    setInventaires(nouveauxInventaires);
                                    setModalStockOuvert(false);
                                    setIndexEdite(null);
                                    setNouveauStock(0);
                        }
            };

            

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
                                                            {inventaires.map((inventaire, index) => {
                                                                        const idMagasinInventaire = Object.keys(inventaire.stock)[0];
                                                                        const nomProduit = produitsListes.find(p => p.id === inventaire.idProduit)?.nom;

                                                                        return (
                                                                                    <tr key={index}>
                                                                                                <td>{magasins.find(m => m.id === Number(idMagasinInventaire))?.nom}</td>
                                                                                                <td>{nomProduit || "Produit non trouvé"}</td>
                                                                                                <td>{inventaire.stock[Number(idMagasinInventaire)]}</td>
                                                                                                <td>{inventaire.date}</td>
                                                                                                <td>
                                                                                                            <button onClick={() => ouvrirModalStock(index, inventaire.stock[Number(idMagasinInventaire)])}>
                                                                                                                        Éditer Stock
                                                                                                            </button>
                                                                                                            <button onClick={() => supprimerProduit(index)}>Supprimer</button>
                                                                                                </td>
                                                                                    </tr>
                                                                        );
                                                            })}
                                                </tbody>
                                    </table>

                                    {/* le Modal pour éditer le stock */}
                                    {modalStockOuvert && (
                                                <div className="modal">
                                                            <div className="modal-contenu">
                                                                        <h2>Éditer le Stock</h2>
                                                                        <label>Nouvelle Valeur de Stock:</label>
                                                                        <input
                                                                                    type="number"
                                                                                    value={nouveauStock}
                                                                                    onChange={(e) => setNouveauStock(Number(e.target.value))}
                                                                        />
                                                                        <button onClick={gererMiseAJourStock}>Soumettre</button>
                                                                        <button onClick={() => setModalStockOuvert(false)}>Annuler</button>
                                                            </div>
                                                </div>
                                    )}

                                    {/* ici le tableau Tableau pour lister les produits ajoutés */}
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
                                                            {produitsListes.map((produit, index) => (
                                                                        <tr key={produit.id}>
                                                                                    <td>{produit.nom}</td>
                                                                                    <td>{produit.prix} €</td>
                                                                                    <td>
                                                                                                <button onClick={() => {
                                                                                                            const nouveauNom = prompt("Nouveau nom du produit :", produit.nom);
                                                                                                            const nouveauPrix = prompt("Nouveau prix du produit :", String(produit.prix));

                                                                                                            if (nouveauNom && nouveauPrix) {
                                                                                                                        const produitsMisAJour = produitsListes.map((p, i) => {
                                                                                                                                    if (i === index) {
                                                                                                                                                return { ...p, nom: nouveauNom, prix: Number(nouveauPrix) };
                                                                                                                                    }
                                                                                                                                    return p;
                                                                                                                        });

                                                                                                                        localStorage.setItem('produits', JSON.stringify(produitsMisAJour));
                                                                                                                        setProduitsListes(produitsMisAJour);
                                                                                                            }
                                                                                                }}>
                                                                                                            Éditer
                                                                                                </button>
                                                                                                <button onClick={() => {
                                                                                                            const nouveauxProduits = produitsListes.filter((_, i) => i !== index);
                                                                                                            localStorage.setItem('produits', JSON.stringify(nouveauxProduits));
                                                                                                            setProduitsListes(nouveauxProduits);
                                                                                                }}>
                                                                                                            Supprimer
                                                                                                </button>
                                                                                    </td>
                                                                        </tr>
                                                            ))}
                                                </tbody>
                                    </table>

                                    <div className="boutons">
                                                <button onClick={() => setModalProduitOuvert(true)}>Ajouter Produit</button>
                                                <button onClick={() => setModalInventaireOuvert(true)}>Ajouter Inventaire</button>
                                                <button onClick={() => setModalExportationOuvert(true)}>Exporter en CSV</button>
                                    </div>

                                    {/* le Modal pour ajouter un produit */}
                                    {modalProduitOuvert && (
                                                <div className="modal">
                                                            <div className="modal-contenu">
                                                                        <h2>Ajouter un Produit</h2>
                                                                        <label>Nom du Produit:</label>
                                                                        <input
                                                                                    type="text"
                                                                                    value={nouveauProduitNom}
                                                                                    onChange={(e) => setNouveauProduitNom(e.target.value)}
                                                                        />
                                                                        <label>Prix du Produit:</label>
                                                                        <input
                                                                                    type="number"
                                                                                    value={nouveauProduitPrix}
                                                                                    onChange={(e) => setNouveauProduitPrix(Number(e.target.value))}
                                                                        />
                                                                        <button onClick={gererAjoutProduit}>Ajouter</button>
                                                                        <button onClick={() => setModalProduitOuvert(false)}>Annuler</button>
                                                            </div>
                                                </div>
                                    )}

                                    {/* le Modal pour ajouter un inventaire */}
                                    {modalInventaireOuvert && (
                                                <div className="modal">
                                                            <div className="modal-contenu">
                                                                        <h2>Ajouter un Inventaire</h2>
                                                                        <label>Magasin:</label>
                                                                        <select value={idMagasin} onChange={(e) => setIdMagasin(Number(e.target.value))}>
                                                                                    {magasins.map((magasin) => (
                                                                                                <option key={magasin.id} value={magasin.id}>
                                                                                                            {magasin.nom}
                                                                                                </option>
                                                                                    ))}
                                                                        </select>
                                                                        <label>Produit:</label>
                                                                        <select value={idProduit} onChange={(e) => setIdProduit(Number(e.target.value))}>
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
                                                                                    onChange={(e) => setStock(Number(e.target.value))}
                                                                        />
                                                                        <label>Date d'ajout:</label>
                                                                        <input
                                                                                    type="date"
                                                                                    value={dateAjout}
                                                                                    onChange={(e) => setDateAjout(e.target.value)}
                                                                        />
                                                                        <button onClick={gererAjoutInventaire}>Soumettre</button>
                                                                        <button onClick={() => setModalInventaireOuvert(false)}>Annuler</button>
                                                            </div>
                                                </div>
                                    )}

                                    {/*le  Modal pour exporter les données */}
                                    {modalExportationOuvert && (
                                                <div className="modal">
                                                            <div className="modal-contenu">
                                                                        <h2>Exporter les données</h2>
                                                                        <label>Magasin:</label>
                                                                        <select value={idMagasin} onChange={(e) => setIdMagasin(Number(e.target.value))}>
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
                                                                                    onChange={(e) => setDateAjout(e.target.value)}
                                                                        />
                                                                        
                                                                        <button onClick={() => setModalExportationOuvert(false)}>Annuler</button>
                                                            </div>
                                                </div>
                                    )}
                        </div>
            );
};

export default TableauInventaire;