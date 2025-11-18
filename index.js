#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const chalk = require('chalk');
const ora = require('ora');

const questions = [
  {
    type: 'text',
    name: 'projectName',
    message: 'Proje adı nedir?',
    initial: 'my-next-app'
  },
  {
    type: 'select',
    name: 'typescript',
    message: 'TypeScript kullanmak ister misin?',
    choices: [
      { title: 'Evet', value: true },
      { title: 'Hayır', value: false }
    ],
    initial: 0
  },
  {
    type: 'select',
    name: 'srcFolder',
    message: 'src/ klasörü kullanmak ister misin?',
    choices: [
      { title: 'Evet', value: true },
      { title: 'Hayır', value: false }
    ],
    initial: 0
  },
  {
    type: 'select',
    name: 'appRouter',
    message: 'Hangi router yapısını kullanmak istersin?',
    choices: [
      { title: 'App Router (önerilen)', value: 'app' },
      { title: 'Pages Router', value: 'pages' }
    ],
    initial: 0
  },
  {
    type: 'multiselect',
    name: 'features',
    message: 'Hangi klasörleri eklemek istersin?',
    choices: [
      { title: 'components', value: 'components', selected: true },
      { title: 'lib (utility fonksiyonlar)', value: 'lib', selected: true },
      { title: 'hooks', value: 'hooks', selected: true },
      { title: 'styles', value: 'styles', selected: true },
      { title: 'types', value: 'types', selected: false },
      { title: 'utils', value: 'utils', selected: true },
      { title: 'config', value: 'config', selected: false },
      { title: 'constants', value: 'constants', selected: false },
      { title: 'context', value: 'context', selected: false },
      { title: 'api (API helpers)', value: 'api', selected: false }
    ],
    hint: 'Boşluk ile seç/kaldır, Enter ile devam et'
  },
  {
    type: 'select',
    name: 'styling',
    message: 'Hangi styling çözümünü kullanacaksın?',
    choices: [
      { title: 'Tailwind CSS', value: 'tailwind' },
      { title: 'CSS Modules', value: 'modules' },
      { title: 'Styled Components', value: 'styled' },
      { title: 'Sadece CSS', value: 'css' }
    ],
    initial: 0
  },
  {
    type: (prev, values) => values.styling === 'tailwind' ? 'select' : null,
    name: 'shadcn',
    message: 'shadcn/ui eklemek ister misin?',
    choices: [
      { title: 'Evet (önerilen)', value: true },
      { title: 'Hayır', value: false }
    ],
    initial: 0
  },
  {
    type: 'select',
    name: 'eslint',
    message: 'ESLint konfigürasyonu eklemek ister misin?',
    choices: [
      { title: 'Evet (önerilen)', value: true },
      { title: 'Hayır', value: false }
    ],
    initial: 0
  },
  {
    type: (prev) => prev ? 'select' : null,
    name: 'prettier',
    message: 'Prettier eklemek ister misin?',
    choices: [
      { title: 'Evet (önerilen)', value: true },
      { title: 'Hayır', value: false }
    ],
    initial: 0
  },
  {
    type: 'select',
    name: 'envExample',
    message: '.env.example dosyası oluşturmak ister misin?',
    choices: [
      { title: 'Evet', value: true },
      { title: 'Hayır', value: false }
    ],
    initial: 0
  },
  {
    type: 'select',
    name: 'initGit',
    message: 'Git repository başlatmak ister misin?',
    choices: [
      { title: 'Evet', value: true },
      { title: 'Hayır', value: false }
    ],
    initial: 0
  },
  {
    type: 'select',
    name: 'packageManager',
    message: 'Hangi paket yöneticisini kullanacaksın?',
    choices: [
      { title: 'npm', value: 'npm' },
      { title: 'yarn', value: 'yarn' },
      { title: 'pnpm', value: 'pnpm' },
      { title: 'bun', value: 'bun' }
    ],
    initial: 0
  }
];

async function createProject() {
  console.log(chalk.blue.bold('\n🚀 quick-next'));
  console.log(chalk.gray('Next.js projesi oluşturucu - v1.0.8\n'));

  const answers = await prompts(questions, {
    onCancel: () => {
      console.log(chalk.red('\n✖ İşlem iptal edildi'));
      process.exit(0);
    }
  });

  if (!answers.projectName) {
    console.log(chalk.red('\n❌ İşlem iptal edildi'));
    process.exit(1);
  }

  const projectPath = path.join(process.cwd(), answers.projectName);

  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`\n❌ "${answers.projectName}" klasörü zaten mevcut!`));
    process.exit(1);
  }

  console.log('');
  const spinner = ora({
    text: chalk.cyan(`"${answers.projectName}" projesi oluşturuluyor...`),
    spinner: 'dots'
  }).start();

  try {
    createFolderStructure(projectPath, answers);
    spinner.succeed(chalk.green('Proje dosyaları oluşturuldu'));
  } catch (error) {
    spinner.fail(chalk.red('Proje oluşturulurken hata oluştu'));
    console.error(error);
    process.exit(1);
  }

  // Git initialization
  if (answers.initGit) {
    const gitSpinner = ora('Git repository başlatılıyor...').start();
    try {
      const { execSync } = require('child_process');
      execSync('git init', { cwd: projectPath, stdio: 'ignore' });
      execSync('git add .', { cwd: projectPath, stdio: 'ignore' });
      execSync('git commit -m "Initial commit from quick-next"', { cwd: projectPath, stdio: 'ignore' });
      gitSpinner.succeed(chalk.green('Git repository başlatıldı'));
    } catch (error) {
      gitSpinner.warn(chalk.yellow('Git başlatılamadı (git yüklü değil olabilir)'));
    }
  }

  console.log('');
  console.log(chalk.green.bold('✓ Proje başarıyla oluşturuldu!\n'));
  
  console.log(chalk.cyan.bold('Başlamak için:\n'));
  console.log(chalk.white(`  ${chalk.cyan('cd')} ${answers.projectName}`));
  
  const pm = answers.packageManager || 'npm';
  const installCmd = pm === 'npm' ? 'npm install' : pm === 'yarn' ? 'yarn' : pm === 'pnpm' ? 'pnpm install' : 'bun install';
  const devCmd = pm === 'npm' ? 'npm run dev' : pm === 'yarn' ? 'yarn dev' : pm === 'pnpm' ? 'pnpm dev' : 'bun dev';
  
  console.log(chalk.white(`  ${chalk.cyan(installCmd)}`));
  console.log(chalk.white(`  ${chalk.cyan(devCmd)}\n`));
  
  if (answers.shadcn) {
    console.log(chalk.cyan.bold('shadcn/ui komponentleri:\n'));
    console.log(chalk.white(`  ${chalk.cyan('npx shadcn-ui@latest add button')}`));
    console.log(chalk.gray(`  Tüm komponentler: ${chalk.underline('https://ui.shadcn.com')}\n`));
  }
  
  console.log(chalk.gray('─'.repeat(50)));
  console.log(chalk.gray(`Teşekkürler! ${chalk.cyan('quick-next')} kullandığınız için ❤️`));
  console.log(chalk.gray('─'.repeat(50) + '\n'));
}

function createFolderStructure(projectPath, config) {
  const ext = config.typescript ? 'tsx' : 'jsx';
  const baseDir = config.srcFolder ? path.join(projectPath, 'src') : projectPath;

  // Ana klasörü oluştur
  fs.mkdirSync(projectPath, { recursive: true });

  // Router yapısına göre klasör oluştur
  if (config.appRouter === 'app') {
    const appDir = path.join(baseDir, 'app');
    fs.mkdirSync(appDir, { recursive: true });
    
    // app/page.tsx
    createFile(appDir, `page.${ext}`, getPageContent(config));
    createFile(appDir, `layout.${ext}`, getLayoutContent(config));
    createFile(appDir, 'globals.css', getGlobalStyles(config));
  } else {
    const pagesDir = path.join(baseDir, 'pages');
    fs.mkdirSync(pagesDir, { recursive: true });
    
    createFile(pagesDir, `index.${ext}`, getIndexPageContent(config));
    createFile(pagesDir, `_app.${ext}`, getAppContent(config));
    createFile(pagesDir, `_document.${ext}`, getDocumentContent(config));
  }

  // Seçilen feature klasörlerini oluştur
  config.features.forEach(feature => {
    const featureDir = path.join(baseDir, feature);
    fs.mkdirSync(featureDir, { recursive: true });
    
    // Her klasöre örnek dosya ekle
    createExampleFile(featureDir, feature, config);
  });

  // public klasörü
  fs.mkdirSync(path.join(projectPath, 'public'), { recursive: true });

  // Config dosyaları
  createFile(projectPath, 'package.json', getPackageJson(config));
  createFile(projectPath, 'next.config.js', getNextConfig(config));
  createFile(projectPath, '.gitignore', getGitignore());
  createFile(projectPath, 'README.md', getReadme(config));

  if (config.typescript || config.shadcn) {
    createFile(projectPath, 'tsconfig.json', getTsConfig(config));
  }

  if (config.styling === 'tailwind') {
    createFile(projectPath, 'tailwind.config.js', getTailwindConfig(config));
    createFile(projectPath, 'postcss.config.js', getPostcssConfig());
    
    if (config.shadcn) {
      createFile(projectPath, 'components.json', getComponentsJson(config));
      const componentsUiDir = path.join(baseDir, 'components', 'ui');
      fs.mkdirSync(componentsUiDir, { recursive: true });
      createFile(componentsUiDir, '.gitkeep', '');
    }
  }

  if (config.eslint) {
    createFile(projectPath, '.eslintrc.json', getEslintConfig(config));
  }

  if (config.prettier) {
    createFile(projectPath, '.prettierrc', getPrettierConfig());
    createFile(projectPath, '.prettierignore', getPrettierIgnore());
  }

  if (config.envExample) {
    createFile(projectPath, '.env.example', getEnvExample());
    createFile(projectPath, '.env.local', getEnvLocal());
  }


}

function createFile(dir, filename, content) {
  fs.writeFileSync(path.join(dir, filename), content);
}

function createExampleFile(dir, feature, config) {
  const ext = config.typescript ? 'ts' : 'js';
  const extx = config.typescript ? 'tsx' : 'jsx';

  switch (feature) {
    case 'components':
      createFile(dir, `Button.${extx}`, getButtonComponent(config));
      break;
    case 'hooks':
      createFile(dir, `useExample.${ext}`, getExampleHook(config));
      break;
    case 'lib':
      createFile(dir, `utils.${ext}`, getLibUtils(config));
      break;
    case 'types':
      if (config.typescript) {
        createFile(dir, 'index.ts', getTypesFile());
      }
      break;
    case 'utils':
      createFile(dir, `helpers.${ext}`, getHelpers(config));
      break;
    case 'constants':
      createFile(dir, `index.${ext}`, getConstants(config));
      break;
    default:
      createFile(dir, '.gitkeep', '');
  }
}

// Template fonksiyonları
function getPageContent(config) {
  if (config.typescript) {
    return `export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">Hoş Geldiniz! 👋</h1>
      <p className="mt-4">Next.js projeniz hazır!</p>
    </main>
  );
}
`;
  }
  return `export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">Hoş Geldiniz! 👋</h1>
      <p className="mt-4">Next.js projeniz hazır!</p>
    </main>
  );
}
`;
}

function getLayoutContent(config) {
  const importStyles = config.appRouter === 'app' ? "import './globals.css';" : '';
  
  if (config.typescript) {
    return `${importStyles}

export const metadata = {
  title: '${config.projectName}',
  description: 'Next.js ile oluşturuldu',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
`;
  }
  return `${importStyles}

export const metadata = {
  title: '${config.projectName}',
  description: 'Next.js ile oluşturuldu',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
`;
}

function getGlobalStyles(config) {
  if (config.styling === 'tailwind') {
    let styles = `@tailwind base;
@tailwind components;
@tailwind utilities;
`;
    
    if (config.shadcn) {
      styles += `
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;
    }
    
    return styles;
  }
  return `* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}
`;
}

function getIndexPageContent(config) {
  return `export default function Home() {
  return (
    <div>
      <h1>Hoş Geldiniz! 👋</h1>
      <p>Next.js projeniz hazır!</p>
    </div>
  );
}
`;
}

function getAppContent(config) {
  return `export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
`;
}

function getDocumentContent(config) {
  return `import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="tr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
`;
}

function getButtonComponent(config) {
  if (config.typescript) {
    return `interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded">
      {children}
    </button>
  );
}
`;
  }
  return `export default function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="px-4 py-2 bg-blue-500 text-white rounded">
      {children}
    </button>
  );
}
`;
}

function getExampleHook(config) {
  if (config.typescript) {
    return `import { useState, useEffect } from 'react';

export function useExample() {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    // Hook mantığı
  }, []);

  return { value, setValue };
}
`;
  }
  return `import { useState, useEffect } from 'react';

export function useExample() {
  const [value, setValue] = useState('');

  useEffect(() => {
    // Hook mantığı
  }, []);

  return { value, setValue };
}
`;
}

function getLibUtils(config) {
  return `export function formatDate(date${config.typescript ? ': Date' : ''}) {
  return new Intl.DateTimeFormat('tr-TR').format(date);
}
`;
}

function getHelpers(config) {
  return `export const capitalize = (str${config.typescript ? ': string' : ''}) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
`;
}

function getConstants(config) {
  return `export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
`;
}

function getTypesFile() {
  return `export interface User {
  id: string;
  name: string;
  email: string;
}
`;
}

function getPackageJson(config) {
  const deps = {
    "next": "^16.0.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  };

  if (config.styling === 'tailwind') {
    deps.tailwindcss = "^3.4.0";
    deps.autoprefixer = "^10.4.20";
    deps.postcss = "^8.4.47";
  }

  if (config.shadcn) {
    deps['class-variance-authority'] = "^0.7.1";
    deps['clsx'] = "^2.1.1";
    deps['tailwind-merge'] = "^2.5.0";
    deps['lucide-react'] = "^0.460.0";
    deps['tailwindcss-animate'] = "^1.0.7";
  }

  if (config.styling === 'styled') {
    deps['styled-components'] = "^6.1.0";
  }

  const devDeps = {};
  if (config.typescript) {
    devDeps['@types/node'] = "^22";
    devDeps['@types/react'] = "^19";
    devDeps['@types/react-dom'] = "^19";
    devDeps.typescript = "^5";
  }

  if (config.shadcn && !config.typescript) {
    devDeps['@types/node'] = "^22";
    devDeps['@types/react'] = "^19";
    devDeps['@types/react-dom'] = "^19";
  }

  if (config.eslint) {
    devDeps['eslint'] = "^8";
    devDeps['eslint-config-next'] = "^16.0.3";
    if (config.typescript) {
      devDeps['@typescript-eslint/eslint-plugin'] = "^6.0.0";
      devDeps['@typescript-eslint/parser'] = "^6.0.0";
    }
  }

  if (config.prettier) {
    devDeps['prettier'] = "^3.1.0";
    if (config.eslint) {
      devDeps['eslint-config-prettier'] = "^9.1.0";
      devDeps['eslint-plugin-prettier'] = "^5.0.1";
    }
    if (config.styling === 'tailwind') {
      devDeps['prettier-plugin-tailwindcss'] = "^0.5.9";
    }
  }

  return JSON.stringify({
    name: config.projectName,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint"
    },
    dependencies: deps,
    devDependencies: devDeps
  }, null, 2);
}

function getNextConfig(config) {
  return `/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;
`;
}

function getTsConfig(config) {
  const paths = config.srcFolder ? { "@/*": ["./src/*"] } : { "@/*": ["./*"] };
  
  return JSON.stringify({
    compilerOptions: {
      target: "es5",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [{ name: "next" }],
      paths: paths
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"]
  }, null, 2);
}

function getTailwindConfig(config) {
  if (config.shadcn) {
    return `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
`;
  }
  
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
}

function getPostcssConfig() {
  return `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
}

function getGitignore() {
  return `# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage

# next.js
.next
out
build

# production
dist

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`;
}

function getReadme(config) {
  let readme = `# ${config.projectName}

Next.js projesi - quick-next ile oluşturuldu

## Başlangıç

\`\`\`bash
npm install
npm run dev
\`\`\`

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

## Özellikler

- ${config.typescript ? 'TypeScript' : 'JavaScript'}
- ${config.appRouter === 'app' ? 'App Router' : 'Pages Router'}
- ${config.styling === 'tailwind' ? 'Tailwind CSS' : config.styling}
`;

  if (config.shadcn) {
    readme += `- shadcn/ui

## shadcn/ui Kullanımı

Yeni komponent eklemek için:

\`\`\`bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
\`\`\`

Tüm komponentler için: https://ui.shadcn.com/docs/components
`;
  }

  return readme;
}

function getComponentsJson(config) {
  const style = "default";
  const baseColor = "slate";
  const cssVars = true;
  
  return JSON.stringify({
    "$schema": "https://ui.shadcn.com/schema.json",
    "style": style,
    "rsc": config.appRouter === 'app',
    "tsx": config.typescript,
    "tailwind": {
      "config": "tailwind.config.js",
      "css": config.appRouter === 'app' ? 
        (config.srcFolder ? "src/app/globals.css" : "app/globals.css") :
        (config.srcFolder ? "src/styles/globals.css" : "styles/globals.css"),
      "baseColor": baseColor,
      "cssVariables": cssVars
    },
    "aliases": {
      "components": config.srcFolder ? "@/components" : "@/components",
      "utils": config.srcFolder ? "@/lib/utils" : "@/lib/utils"
    }
  }, null, 2);
}

function getLibUtils(config) {
  if (config.shadcn) {
    if (config.typescript) {
      return `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('tr-TR').format(date);
}
`;
    }
    return `import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('tr-TR').format(date);
}
`;
  }
  
  return `export function formatDate(date${config.typescript ? ': Date' : ''}) {
  return new Intl.DateTimeFormat('tr-TR').format(date);
}
`;
}

function getEslintConfig(config) {
  const eslintConfig = {
    extends: ['next/core-web-vitals']
  };

  if (config.typescript) {
    eslintConfig.extends.push('plugin:@typescript-eslint/recommended');
    eslintConfig.parser = '@typescript-eslint/parser';
    eslintConfig.plugins = ['@typescript-eslint'];
  }

  if (config.prettier) {
    eslintConfig.extends.push('prettier');
    eslintConfig.plugins = eslintConfig.plugins || [];
    eslintConfig.plugins.push('prettier');
    eslintConfig.rules = {
      'prettier/prettier': 'error'
    };
  }

  return JSON.stringify(eslintConfig, null, 2);
}

function getPrettierConfig() {
  return JSON.stringify({
    semi: true,
    trailingComma: 'es5',
    singleQuote: true,
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    plugins: []
  }, null, 2);
}

function getPrettierIgnore() {
  return `node_modules
.next
out
build
dist
*.log
.DS_Store
package-lock.json
yarn.lock
pnpm-lock.yaml
`;
}

function getEnvExample() {
  return `# Next.js Environment Variables
# Copy this file to .env.local and fill in your values

# App
NEXT_PUBLIC_APP_NAME=my-app
NEXT_PUBLIC_APP_URL=http://localhost:3000

# API
# NEXT_PUBLIC_API_URL=https://api.example.com
# API_SECRET_KEY=your-secret-key

# Database (if needed)
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Authentication (if needed)
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=your-nextauth-secret

# Third-party services
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
`;
}

function getEnvLocal() {
  return `# Local Environment Variables
# This file is gitignored by default

NEXT_PUBLIC_APP_NAME=my-app
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;
}

createProject().catch(console.error);
