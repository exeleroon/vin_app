# VIN Decoder

Вебзастосунок для розшифровки автомобільних VIN-кодів через відкритий API агенції NHTSA.

🔗 **[Демо](https://your-deploy-url.vercel.app)** ← замініть після деплою

## Getting Started

- Node Version: 24.4.1
- Package manager: Yarn

```bash
yarn install
yarn dev
```

Dev server: http://localhost:3000

## Architecture

Runtime: Node.js v24.4.1  
Framework: Vite + React 19 + TypeScript  
Package manager: Yarn  
Routing: React Router DOM v7  
HTTP: Axios  
Styles: Pure CSS (no UI frameworks)  
API: [NHTSA Vehicle API](https://vpic.nhtsa.dot.gov/api/)

## Функціонал

- **`/`** — форма введення VIN з валідацією, історія 3 останніх запитів (localStorage), таблиця результатів
- **`/variables`** — список змінних VIN (sessionStorage кеш, оновлення щогодини, пагінація по 20)
- **`/variables/:id`** — деталі конкретної змінної

## Build

```bash
yarn build
yarn preview
```