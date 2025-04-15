## Social Media Engagement Tracker

A comprehensive application for tracking and analyzing social media engagement metrics across multiple platforms.

### Features
- Track engagement metrics across different social media platforms
- Monitor competitor performance and benchmarking
- Real-time analytics and reporting
- Automated data collection and analysis
- Custom dashboard creation
- Export reports in multiple formats

### Tech Stack
- [Next.js](https://nextjs.org/) 14.1.0 - React framework for production
- [TypeScript](https://www.typescriptlang.org/) 5.3.3 - Type-safe JavaScript
- [Prisma](https://www.prisma.io/) 5.10.0 - Type-safe ORM
- [NextAuth.js](https://next-auth.js.org/) 4.24.11 - Authentication
- [React Query](https://tanstack.com/query/latest) 5.0.0 - Data fetching and caching
- [Tailwind CSS](https://tailwindcss.com/) 3.4.1 - Utility-first CSS framework
- [Jest](https://jestjs.io/) 29.7.0 - Testing framework
- [Stripe](https://stripe.com/) 14.18.0 - Payment processing
- [Redis](https://redis.io/) via ioredis 5.6.1 - Caching and session management

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/socialmt.git
cd socialmt
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Edit `.env.local` with your configuration. Required environment variables include:

```plaintext
# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=your_database_url

# Stripe (for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Redis
REDIS_URL=your_redis_url
```

⚠️ **Security Note**: Never commit your `.env` or `.env.local` files to version control. Make sure these files are listed in your `.gitignore`.

4. Set up the database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### Project Structure
```
socialmt/
├── app/                # Next.js app directory
├── components/         # React components
├── lib/               # Utility functions and shared code
├── prisma/            # Database schema and migrations
├── public/            # Static files
└── __tests__/         # Test files
```

### Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Troubleshooting

#### Tailwind CSS Issues
If you encounter the error `Module not found: Can't resolve 'tailwindcss'`, run:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

This will install the required dependencies and create the necessary configuration files.

#### Environment Variables
If you encounter issues with environment variables:
1. Make sure all required variables are set in your `.env.local` file
2. Restart your development server after making changes to environment variables
3. Check that your `.env.local` file is not being tracked by Git

For other issues, please check the [Issues](https://github.com/yourusername/socialmt/issues) page or create a new issue.
