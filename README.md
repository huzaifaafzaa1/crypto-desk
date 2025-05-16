## CryptoDesk
CryptoDesk is a simple and elegant cryptocurrency dashboard that displays the Top 20 Currencies based on market rank. It leverages modern web technologies including Next.js, Tailwind CSS, TypeScript, and React Query, with a clean and modular project structure.

## Tech Stack
Next.js v15
Tailwind CSS v4
TypeScript v5
ShadCN UI – for accessible and reusable UI components
Axios – for API integration
React Query – for efficient state and server state management

## Project Structure
cryptodesk/
├── public/                        # Static assets
├── src/
│   ├── app/                      # App Router directory 
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Homepage
│   ├── components/               # Reusable UI components
│   ├── hooks/                    # React Query hooks
│   ├── lib/
│   │       └──axiosInstance.ts   # Axios instance 
|   ├── providers                 # this folder is for react query Provider
│   ├── services/                 # API calling logic
│   ├── types/                    # TypeScript type definitions
├── .env.local                    # Environment variables
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md


 ## API Used
 https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd
 

## Project Configuration
Make sure to create a .env.local file at the root of the project with the following:
NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3

### Getting Started
## Install dependencies
npm install
# or
yarn install
# or
pnpm install

## Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev