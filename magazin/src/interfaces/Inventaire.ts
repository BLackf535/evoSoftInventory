
export interface Produit {
            id: number;
            nom: string;
            prix: number;
          }
          
    export interface Magasin {
      id: number;
      nom: string;
      adresse: string;
    }
          
          export interface Inventaire {
            date: string;
            idProduit: number;
            stock: Record<number, number>;
          }