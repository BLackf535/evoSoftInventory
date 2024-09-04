import React from 'react';
import FormulaireInventaire from './composants/FormulaireInventaire';

const App: React.FC = () => {
  return (
    <div>
      <h1>Gestion d'inventaire</h1>
      <FormulaireInventaire />
    </div>
  );
};

export default App;