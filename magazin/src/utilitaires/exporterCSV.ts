
export const exporterEnCSV = (inventaires: any[], nomFichier: string) => {
            const contenuCSV = inventaires.map((inventaire) => {
                        const idMagasin = Object.keys(inventaire.stock)[0];
                        const nomMagasin = inventaire.magasinNom; // Nom du magasin
                        const nomProduit = inventaire.produitNom; // Nom du produit
                        const quantiteStock = inventaire.stock[idMagasin];
                        const dateAjout = inventaire.date; // Date d'ajout

                        return [nomMagasin, nomProduit, quantiteStock, dateAjout].join(",");
            }).join("\n");

            const blob = new Blob([contenuCSV], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.setAttribute('download', nomFichier);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
};