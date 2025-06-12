# Knotty AI Generator

Knotty AI Generator is a React-based web application designed to generate images using prompts. It provides a user-friendly interface for creating, saving, and managing prompts, as well as generating images with customizable settings.

## Features

- **User Authentication**: Register, login, and manage user sessions.
- **Prompt Management**: Create, save, and load prompts for image generation.
- **Image Generation**: Generate images using positive and negative prompts with customizable settings like samplers, schedulers, and CFG scale.
- **Image History**: View and download previously generated images.
- **Token Management**: Track and update token counts in real-time.
- **Responsive Design**: Fully responsive layout for desktop and mobile devices.
- **Dark Mode**: Modern dark-themed UI for better user experience.

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Build Tool**: Vite
- **State Management**: React Context API
- **API Integration**: Fetch API and Axios
- **Icons**: Lucide React
- **Utilities**: clsx for conditional class management

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/clean128/knotty-ai.git
   cd knotty-ai
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser at `http://localhost:5173`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code quality issues.

## Project Structure

```
knotty-ai/
├── src/
│   ├── components/       # Reusable UI components
│   ├── contexts/         # Context API for state management
│   ├── pages/            # Application pages
│   ├── services/         # API service logic
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # TailwindCSS configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_API_BASE_URL=https://your-api-url.com
```

### TailwindCSS

TailwindCSS is configured in `tailwind.config.js` and `postcss.config.js`. You can customize the theme and plugins as needed.

## Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Serve the `dist` folder using a static file server or deploy it to a hosting platform like Vercel, Netlify, or AWS S3.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Lucide React](https://lucide.dev/)
- [js-md5](https://github.com/emn178/js-md5)

## Contact

For questions or support, please contact the project maintainers:

- **Telegram**: [@clean1280](https://t.me/clean1280)
- **Website**: [Beast Generator](https://beastgenerator.xyz)
