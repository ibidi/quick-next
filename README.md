# quick-next ⚡

<div align="center">

![npm version](https://img.shields.io/npm/v/quick-next?style=flat-square)
![npm downloads](https://img.shields.io/npm/dm/quick-next?style=flat-square)
![license](https://img.shields.io/npm/l/quick-next?style=flat-square)
![node version](https://img.shields.io/node/v/quick-next?style=flat-square)

**Quick and customizable Next.js project scaffolding CLI tool**

Next.js projeleri için hızlı ve özelleştirilebilir proje oluşturucu

[English](#english) • [Türkçe](#türkçe)

</div>

---

## English

### 🚀 Quick Start

Create a new Next.js project in seconds:

```bash
npx quick-next
```

### 📦 Installation

#### Global Installation (Optional)

```bash
npm install -g quick-next
quick-next
```

#### One-time Use with npx

```bash
npx quick-next
```

### ✨ Features

- ⚡ **Lightning Fast** - Create production-ready Next.js projects in seconds
- 🎨 **Project Templates** - Quick start with Minimal, Full Stack, or shadcn/ui presets (New in v1.1.0!)
- 🎨 **shadcn/ui Integration** - Beautiful, accessible components out of the box
- 📝 **TypeScript/JavaScript** - Choose your preferred language
- 🎯 **App Router & Pages Router** - Support for both Next.js routing systems
- 🎨 **Multiple Styling Options** - Tailwind CSS, CSS Modules, Styled Components, or plain CSS
- 📁 **Customizable Structure** - Choose exactly which folders you need
- 🌙 **Dark Mode Ready** - Built-in dark mode support with shadcn/ui
- ✨ **ESLint & Prettier** - Code quality and formatting tools
- 📦 **Package Manager Choice** - npm, yarn, pnpm, or bun support
- 🔧 **Environment Variables** - Pre-configured .env files
- 🎯 **Git Integration** - Optional Git initialization with first commit
- 🎭 **Beautiful CLI** - Loading spinners, colors, and professional output
- ✅ **Input Validation** - Smart validation with helpful error messages
- 🇹🇷 **Turkish Interface** - Native Turkish language support
- 🔧 **Zero Configuration** - Works out of the box with sensible defaults
- 📚 **Best Practices** - Follows Next.js and React best practices

### 🎯 What You Get

#### Project Options

- **Project Name** - Custom folder name for your project
- **TypeScript/JavaScript** - Full TypeScript support or classic JavaScript
- **src/ Directory** - Optional src folder for better organization
- **Router Type** - Choose between App Router (recommended) or Pages Router
- **Folder Structure** - Select from:
  - `components` - React components
  - `lib` - Utility functions and helpers
  - `hooks` - Custom React hooks
  - `styles` - Style files
  - `types` - TypeScript type definitions
  - `utils` - Helper utilities
  - `config` - Configuration files
  - `constants` - App constants
  - `context` - React context providers
  - `api` - API helpers and services

#### Styling Solutions

- **Tailwind CSS** - Utility-first CSS framework (with optional shadcn/ui)
- **CSS Modules** - Scoped CSS with module system
- **Styled Components** - CSS-in-JS solution
- **Plain CSS** - Traditional CSS files

#### shadcn/ui Integration

When you select Tailwind CSS, you can optionally add shadcn/ui which includes:

- ✅ Automatic `components.json` configuration
- ✅ Pre-configured Tailwind theme with CSS variables
- ✅ Dark mode support out of the box
- ✅ `cn()` utility function for className merging
- ✅ Ready-to-use `components/ui` folder structure
- ✅ All necessary dependencies installed

After project creation, add components easily:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

Browse all components at [ui.shadcn.com](https://ui.shadcn.com)

### 📖 Usage Example

```bash
$ npx quick-next

🚀 quick-next
Next.js projesi oluşturucu - v1.1.0
──────────────────────────────────────────────────

✔ Proje adı nedir? … my-awesome-app
✔ Hangi şablonu kullanmak istersin? › Full Stack (tüm özellikler)
✔ TypeScript kullanmak ister misin? › Evet
✔ src/ klasörü kullanmak ister misin? › Evet
✔ Hangi router yapısını kullanmak istersin? › App Router (önerilen)
✔ Hangi klasörleri eklemek istersin? › components, lib, hooks, utils
✔ Hangi styling çözümünü kullanacaksın? › Tailwind CSS
✔ shadcn/ui eklemek ister misin? › Evet (önerilen)
✔ ESLint konfigürasyonu eklemek ister misin? › Evet (önerilen)
✔ Prettier eklemek ister misin? › Evet (önerilen)
✔ .env.example dosyası oluşturmak ister misin? › Evet
✔ Git repository başlatmak ister misin? › Evet
✔ Hangi paket yöneticisini kullanacaksın? › npm

✨ "my-awesome-app" projesi oluşturuluyor...

✅ Proje başarıyla oluşturuldu!

Başlamak için:
  cd my-awesome-app
  npm install
  npm run dev

shadcn/ui komponent eklemek için:
  npx shadcn-ui@latest add button
  Daha fazla: https://ui.shadcn.com
```

### 🛠️ Tech Stack

Projects created with quick-next include:

- **Next.js 16.0.3** - The React Framework for Production
- **React 19** - Latest React with Server Components
- **TypeScript 5** - Optional, with full type safety
- **Tailwind CSS 3.4** - Modern utility-first CSS
- **shadcn/ui** - Beautiful, accessible component library
- **ESLint** - Code quality and consistency

### 📋 Requirements

- Node.js 14.0.0 or higher
- npm, yarn, or pnpm

### 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

### 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

### 🔗 Links

- [GitHub Repository](https://github.com/ibidi/quick-next)
- [npm Package](https://www.npmjs.com/package/quick-next)
- [Report Issues](https://github.com/ibidi/quick-next/issues)

### 👨‍💻 Author

**İhsan Baki Doğan (ibidi)**

- LinkedIn: [linkedin.com/in/ibidi](https://linkedin.com/in/ibidi)
- Instagram: [instagram.com/ihsanbakidogann](https://instagram.com/ihsanbakidogann)
- X (Twitter): [x.com/ihsanbakidogan](https://x.com/ihsanbakidogan)
- GitHub: [github.com/ibidi](https://github.com/ibidi)

---

## Türkçe

### 🚀 Hızlı Başlangıç

Saniyeler içinde yeni bir Next.js projesi oluşturun:

```bash
npx quick-next
```

### 📦 Kurulum

#### Global Kurulum (Opsiyonel)

```bash
npm install -g quick-next
quick-next
```

#### npx ile Tek Seferlik Kullanım

```bash
npx quick-next
```

### ✨ Özellikler

- ⚡ **Çok Hızlı** - Saniyeler içinde production-ready Next.js projeleri
- 🎨 **shadcn/ui Entegrasyonu** - Hazır, erişilebilir komponentler
- 📝 **TypeScript/JavaScript** - Tercih ettiğiniz dili seçin
- 🎯 **App Router & Pages Router** - Her iki Next.js routing sistemi için destek
- 🎨 **Çoklu Styling Seçenekleri** - Tailwind CSS, CSS Modules, Styled Components veya sade CSS
- 📁 **Özelleştirilebilir Yapı** - İhtiyacınız olan klasörleri seçin
- 🌙 **Dark Mode Hazır** - shadcn/ui ile yerleşik dark mode desteği
- 🇹🇷 **Türkçe Arayüz** - Tamamen Türkçe dil desteği
- 🔧 **Sıfır Konfigürasyon** - Akıllı varsayılanlarla hemen çalışır
- 📚 **En İyi Pratikler** - Next.js ve React best practice'lerini takip eder

### 🎯 Neler Sunuyor

#### Proje Seçenekleri

- **Proje Adı** - Projeniz için özel klasör adı
- **TypeScript/JavaScript** - Tam TypeScript desteği veya klasik JavaScript
- **src/ Dizini** - Daha iyi organizasyon için opsiyonel src klasörü
- **Router Tipi** - App Router (önerilen) veya Pages Router arasında seçim
- **Klasör Yapısı** - Şunlardan seçim yapın:
  - `components` - React komponentleri
  - `lib` - Yardımcı fonksiyonlar
  - `hooks` - Özel React hook'ları
  - `styles` - Stil dosyaları
  - `types` - TypeScript tip tanımlamaları
  - `utils` - Yardımcı araçlar
  - `config` - Konfigürasyon dosyaları
  - `constants` - Uygulama sabitleri
  - `context` - React context provider'ları
  - `api` - API yardımcıları ve servisleri

#### Styling Çözümleri

- **Tailwind CSS** - Utility-first CSS framework (opsiyonel shadcn/ui ile)
- **CSS Modules** - Modül sistemi ile scope'lanmış CSS
- **Styled Components** - CSS-in-JS çözümü
- **Sade CSS** - Geleneksel CSS dosyaları

#### shadcn/ui Entegrasyonu

Tailwind CSS seçtiğinizde, opsiyonel olarak shadcn/ui ekleyebilirsiniz:

- ✅ Otomatik `components.json` yapılandırması
- ✅ CSS değişkenleri ile önceden yapılandırılmış Tailwind teması
- ✅ Hazır dark mode desteği
- ✅ className birleştirme için `cn()` yardımcı fonksiyonu
- ✅ Kullanıma hazır `components/ui` klasör yapısı
- ✅ Tüm gerekli bağımlılıklar yüklü

Proje oluşturduktan sonra kolayca komponent ekleyin:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

Tüm komponentlere [ui.shadcn.com](https://ui.shadcn.com) adresinden göz atın.

### 📖 Kullanım Örneği

```bash
$ npx quick-next

🚀 quick-next
Next.js projesi oluşturucu - v1.1.0
──────────────────────────────────────────────────

✔ Proje adı nedir? … harika-projem
✔ Hangi şablonu kullanmak istersin? › Full Stack (tüm özellikler)
✔ TypeScript kullanmak ister misin? › Evet
✔ src/ klasörü kullanmak ister misin? › Evet
✔ Hangi router yapısını kullanmak istersin? › App Router (önerilen)
✔ Hangi klasörleri eklemek istersin? › components, lib, hooks, utils
✔ Hangi styling çözümünü kullanacaksın? › Tailwind CSS
✔ shadcn/ui eklemek ister misin? › Evet (önerilen)
✔ ESLint konfigürasyonu eklemek ister misin? › Evet (önerilen)
✔ Prettier eklemek ister misin? › Evet (önerilen)
✔ .env.example dosyası oluşturmak ister misin? › Evet
✔ Git repository başlatmak ister misin? › Evet
✔ Hangi paket yöneticisini kullanacaksın? › npm

✨ "harika-projem" projesi oluşturuluyor...

✅ Proje başarıyla oluşturuldu!

Başlamak için:
  cd harika-projem
  npm install
  npm run dev

shadcn/ui komponent eklemek için:
  npx shadcn-ui@latest add button
  Daha fazla: https://ui.shadcn.com
```

### 🛠️ Teknoloji Yığını

quick-next ile oluşturulan projeler şunları içerir:

- **Next.js 16.0.3** - Production için React Framework
- **React 19** - Server Components ile en son React
- **TypeScript 5** - Opsiyonel, tam tip güvenliği ile
- **Tailwind CSS 3.4** - Modern utility-first CSS
- **shadcn/ui** - Güzel, erişilebilir komponent kütüphanesi
- **ESLint** - Kod kalitesi ve tutarlılığı

### 📋 Gereksinimler

- Node.js 14.0.0 veya üzeri
- npm, yarn veya pnpm

### 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Şunları yapabilirsiniz:

- Hata bildirin
- Yeni özellikler önerin
- Pull request gönderin
- Dokümantasyonu geliştirin

### 📄 Lisans

MIT Lisansı - bu projeyi kişisel veya ticari amaçlarla özgürce kullanabilirsiniz.

### 🔗 Bağlantılar

- [GitHub Deposu](https://github.com/ibidi/quick-next)
- [npm Paketi](https://www.npmjs.com/package/quick-next)
- [Sorun Bildir](https://github.com/ibidi/quick-next/issues)

### 👨‍💻 Geliştirici

**İhsan Baki Doğan (ibidi)**

- LinkedIn: [linkedin.com/in/ibidi](https://linkedin.com/in/ibidi)
- Instagram: [instagram.com/ihsanbakidogann](https://instagram.com/ihsanbakidogann)
- X (Twitter): [x.com/ihsanbakidogan](https://x.com/ihsanbakidogan)
- GitHub: [github.com/ibidi](https://github.com/ibidi)

---

<div align="center">

**Made with ❤️ by [ibidi](https://github.com/ibidi)**

If you find this project helpful, please give it a ⭐️

</div>
