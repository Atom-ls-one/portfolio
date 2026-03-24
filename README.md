# Guide de l'Édition du Portfolio

Ce projet est conçu pour être édité sans aucune connaissance en développement. Suivez simplement ces étapes pour mettre à jour votre site.

## Modifier les Textes et le SEO
Tous les textes du site (Français et Anglais) se trouvent dans un seul fichier :
src/lib/data/i18n.json

**Comment faire ?**
1. Ouvrez ce fichier avec un éditeur de texte.
2. Identifiez la clé que vous voulez changer (ex: "catchphrase", "bio", "keywords").
3. Modifiez la valeur entre les guillemets. **Ne changez jamais le nom de la clé (à gauche des deux points).**
4. Enregistrez le fichier.

---

## Ajouter un Match à l'Historique
Chaque match est représenté par un dossier dans le répertoire suivant :
src/lib/history/

**Procédure pour ajouter un nouveau match :**
1. **Copiez** un dossier existant (ex: 2026-03-20).
2. **Renommez** le dossier avec la date du jour (format YYYY-MM-DD). Le site triera automatiquement les matchs du plus récent au plus ancien.
3. À l'intérieur du dossier :
   - Mettez vos captures d'écran dans le dossier images/.
   - Mettez vos clips dans le dossier videos/.
   - Ouvrez details.json pour mettre à jour les statistiques (Champion, KDA, Descriptions fr/en).

---

## Utiliser des Images et Vidéos
Pour que vos médias s'affichent, assurez-vous de mettre le bon chemin dans le fichier details.json de votre match.
*Exemple : $lib/history/2026-03-22/images/mon-image.png*

---

## Mettre à jour le Site en Ligne
Une fois vos modifications terminées :
1. Faites un Commit de vos changements.
2. Faites un Push vers le repository GitHub.
3. Le site se mettra à jour automatiquement après quelques minutes.

test