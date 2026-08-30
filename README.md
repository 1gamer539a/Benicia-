# 💌 Surprise pour Benicia

Site d'anniversaire interactif en une seule page (SPA), en HTML/CSS/JS pur —
aucune dépendance, aucun build, prêt à héberger tel quel sur GitHub Pages.

## 🗂️ Structure

```
benicia-birthday/
├── index.html          → les 7 écrans de la séquence
├── css/style.css        → tout le design (thème bordeaux / rose / or)
├── js/script.js         → navigation, lecteur audio, animations
└── assets/               → tous les médias (à remplacer, voir plus bas)
```

## 🚀 Mettre le site en ligne sur GitHub Pages

1. Crée un nouveau dépôt GitHub (public), par ex. `benicia-surprise`.
2. Mets tout le contenu de ce dossier (`index.html`, `css/`, `js/`, `assets/`)
   à la racine du dépôt — **pas dans un sous-dossier**.
3. Va dans **Settings → Pages** du dépôt.
4. Dans "Build and deployment", choisis **Deploy from a branch**, branche
   `main`, dossier `/ (root)`. Enregistre.
5. Après 1-2 minutes, ton site est en ligne à :
   `https://TON-PSEUDO.github.io/benicia-surprise/`

Tu peux aussi glisser le contenu directement via l'interface web de GitHub
("Add file → Upload files") si tu ne veux pas utiliser `git`.

## 🖼️ Médias

Toutes tes vraies photos et vidéos sont déjà intégrées dans `assets/` :

| Fichier | Contenu |
|---|---|
| `assets/qr_code_heart.png` | QR code / cœur généré pour l'écran d'accueil |
| `assets/benicia_photo_1.jpg` | Photo d'enfance de Benicia — écran "aperçu déplié" |
| `assets/benicia_video_1.mp4` | Vidéo — écran "aperçu déplié" |
| `assets/benicia_photo_2.jpg` | Photo — écran "aperçu déplié" |
| `assets/benicia_photo_3.jpg` à `benicia_photo_8.jpg` | Les 6 photos de la galerie "Journey" |
| `assets/benicia_video_main.mp4` | Vidéo portrait — écran "Moment" (la lettre) |
| `assets/romantic_music.mp3` | Musique douce jouée par le bouton "Play Musik" (à remplacer si tu as un morceau précis en tête) |

Si tu veux réordonner, recadrer ou remplacer une photo/vidéo précise, renvoie-moi
le fichier en me disant à quelle place elle va (ou laisse-moi choisir).

## 🎵 La chanson (écran Playlist)

La vidéo YouTube est "Cinderella" de Mac Miller, réglée pour démarrer à 4:40
(le meilleur passage) jusqu'à la fin — via le paramètre `start=280` dans
l'URL de l'iframe, dans `index.html` (cherche `ytFrame`).


## ✏️ Personnaliser les textes

- **La lettre** : déjà remplie avec ton texte pour Bénicia (dans
  `index.html`, `id="letterBody"`). Modifie-la directement si tu veux
  ajuster un mot.
- **La chanson** : voir section dédiée ci-dessus.
- **Le prénom sur le sceau** : cherche `seal-letter` dans `index.html`
  (actuellement la lettre "B").

## 🎬 Séquence du site

1. **QR / cœur** — écran d'accueil, on touche pour commencer
2. **Enveloppe** — on appuie dessus, elle s'ouvre
3. **Aperçu déplié** — "Happy Birthday" + collage de photos/vidéo
4. **Menu** — 4 choix : Journey / Moment / Playlist / Gift
5. **Journey** — galerie de photos et vidéos flottantes
6. **Moment** — la lettre d'amour + vidéo portrait + musique
7. **Playlist** — vinyle animé + vidéo YouTube

Le bouton "Gift" du menu relance l'animation de l'enveloppe.

## 📱 Compatibilité

Testé responsive du petit mobile (360px) aux écrans larges. Respecte
`prefers-reduced-motion`. Fonctionne sans connexion sauf pour :
- les polices Google Fonts (Dancing Script, Playfair Display, Cormorant
  Garamond) — un fallback cursive/serif système s'affiche sinon ;
- l'intégration YouTube de l'écran "Playlist".

Bon anniversaire à Benicia 🎂💗
