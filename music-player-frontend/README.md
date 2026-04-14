# Music Player Frontend (TypeScript + Lista Doble)

Aplicación frontend para gestionar una lista de reproducción de canciones usando TypeScript y una estructura de lista doblemente enlazada.

## Ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Levantar en desarrollo:

```bash
npm run dev
```

3. Compilar:

```bash
npm run build
```

## Arquitectura resumida

- Dominio de lista doble:
  - src/domain/structures/SongNode.ts
  - src/domain/structures/Playlist.ts
- Modelo de canción:
  - src/domain/models/Song.ts
- Lógica de aplicación:
  - src/application/PlayerController.ts
- Reproductor local:
  - src/domain/player/LocalAudioPlayer.ts
- Interfaz de usuario:
  - src/App.tsx
  - src/components/PlaylistView.tsx
  - src/components/SongForm.tsx
  - src/components/NowPlayingCard.tsx

## Mapeo de requisitos del taller a funcionalidades implementadas

### 1) Crear una app en TypeScript aplicando conceptos de listas dobles

- Implementado con TypeScript en todo el proyecto (archivos .ts y .tsx).
- La lista doble está implementada con nodo propio SongNode (prev y next) y Playlist (head, tail, current).
- Evidencia:
  - src/domain/structures/SongNode.ts
  - src/domain/structures/Playlist.ts

### 2) Simular una lista de reproducción de canciones

- Playlist gestiona canciones, canción actual y navegación entre canciones.
- Evidencia:
  - src/domain/structures/Playlist.ts
  - src/application/PlayerController.ts

### 3) Frontend para interacción del usuario

- Interfaz React que permite agregar, seleccionar, eliminar, mover y reproducir canciones.
- Evidencia:
  - src/App.tsx
  - src/components/PlaylistView.tsx
  - src/components/SongForm.tsx
  - src/components/NowPlayingCard.tsx

### 4) Agregar canción al inicio

- Botón Add Files to Start en SongForm.
- Flujo: SongForm -> App -> PlayerController.addSongToStart -> Playlist.addFirst.
- Evidencia:
  - src/components/SongForm.tsx
  - src/application/PlayerController.ts
  - src/domain/structures/Playlist.ts

### 5) Agregar canción al final

- Botón Add Files to End en SongForm.
- Flujo: SongForm -> App -> PlayerController.addSongToEnd -> Playlist.addLast.
- Evidencia:
  - src/components/SongForm.tsx
  - src/application/PlayerController.ts
  - src/domain/structures/Playlist.ts

### 6) Agregar canción en cualquier posición

- Implementación lógica disponible en PlayerController.addSongToPosition y Playlist.addAt.
- Nota: la UI actual no expone un campo directo para insertar nueva canción por índice.
- Evidencia:
  - src/application/PlayerController.ts
  - src/domain/structures/Playlist.ts

### 7) Eliminar canción de la lista

- Botón de eliminar por cada ítem en PlaylistView.
- Flujo: PlaylistView -> App.handleDeleteSong -> PlayerController.deleteSongAt -> Playlist.removeAt.
- Evidencia:
  - src/components/PlaylistView.tsx
  - src/application/PlayerController.ts
  - src/domain/structures/Playlist.ts

### 8) Adelantar canción

- Botón Next en NowPlayingCard.
- Flujo: NowPlayingCard -> App.handleNext -> PlayerController.playNext -> Playlist.nextSong.
- Evidencia:
  - src/components/NowPlayingCard.tsx
  - src/application/PlayerController.ts
  - src/domain/structures/Playlist.ts

### 9) Retroceder canción

- Botón Previous en NowPlayingCard.
- Flujo: NowPlayingCard -> App.handlePrevious -> PlayerController.playPrevious -> Playlist.previousSong.
- Evidencia:
  - src/components/NowPlayingCard.tsx
  - src/application/PlayerController.ts
  - src/domain/structures/Playlist.ts

### 10) Funcionalidades adicionales pertinentes

- Reordenamiento con drag and drop en la playlist.
- Barra de progreso (seek) y control de volumen.
- Autoavance al terminar una canción.
- Cambios visuales de interfaz (tema claro/oscuro, visualizador).

## Notas académicas de sustentación

- La implementación de lista doble es real y no depende de arrays como estructura primaria.
- toArray en Playlist se usa para presentar datos en frontend.
- Si se requiere cumplimiento estricto del punto agregar en cualquier posición desde UI, se recomienda añadir campo de índice en SongForm y llamar a addSongToPosition.
