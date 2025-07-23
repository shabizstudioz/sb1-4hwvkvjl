# Lobocubs Courier Manager

AI-powered multi-courier management system with GPT integration.

## Features

- 🚀 Multi-tenant architecture
- 📦 10+ courier integrations (PostEx, BlueEx, TCS, Leopards, etc.)
- 🤖 AI-powered data cleaning with GPT
- 📊 Real-time tracking and analytics
- 💼 Sales report management
- 📱 Mobile responsive design
- 🔒 Secure authentication with Supabase
- 🎨 Modern dark UI with Tailwind CSS

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **AI Integration:** OpenAI GPT-4
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key (optional for AI features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shoaiblilcubspk/lobocubs-courier-manager.git
cd lobocubs-courier-manager
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
# Add other courier API keys as needed
```

4. Set up the database:
Run the SQL commands from `schema.sql` in your Supabase SQL editor.

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shoaiblilcubspk/lobocubs-courier-manager)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── admin-dashboard/   # Admin-only pages
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utility functions and types
├── utils/                 # Supabase client setup
└── public/               # Static assets
```

## Features Overview

### Multi-Tenant System
- Each company gets isolated data
- Role-based access control
- Tenant management for admins

### Courier Management
- Create and track shipments
- Support for multiple couriers
- Real-time status updates
- Bulk operations

### AI Integration
- GPT-powered data cleaning
- Smart assistant for queries
- Automated report generation

### Analytics & Reports
- Sales performance tracking
- Delivery analytics
- Custom report generation
- Export capabilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email shoaiblilcubspk@gmail.com or create an issue in the repository.

## Acknowledgments

- Built with ❤️ by Lobocubs Team
- Powered by Next.js and Supabase
- AI capabilities by OpenAI