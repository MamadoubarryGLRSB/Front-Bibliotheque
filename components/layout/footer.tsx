const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center text-sm p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-gray-700">
        <div className="mb-2 sm:mb-0">
          <p>© 2024 ZELIBRARY - Gestion de bibliothèque</p>
          <p>Tous droits réservés.</p>
        </div>

        <div className="mb-2 sm:mb-0">
          <p>
            <strong>Adresse :</strong> 123 Rue des Bibliothèques, 75001 Paris, France
          </p>
          <p>
            <strong>Téléphone :</strong> +33 1 23 45 67 89
          </p>
          <p>
            <strong>Email :</strong> contact@zelibrary.com
          </p>
        </div>

        <div>
          <p>
            <strong>Horaires :</strong>
          </p>
          <p>Lundi - Vendredi : 9h00 - 18h00</p>
          <p>Samedi : 10h00 - 14h00</p>
          <p>Dimanche : Fermé</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
