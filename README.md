# Sports Nutrition & Recovery Tracker

A personal journey turned into an app - built by an athlete for athletes. This application helps football players and gym enthusiasts optimize their nutrition for better performance, recovery, and muscle development.

## Why I Built This

I created this tracker during my journey to understand proper nutrition for football games and gym training. What started as a personal tool helped me make significant progress in:
- Pre-game meal optimization
- Post-workout recovery nutrition
- Daily protein intake management
- Overall healthier eating habits

## Key Features

### Sports-Specific Nutrition Planning
- Pre-game meal recommendations
- Post-workout recovery nutrition guidelines
- Hydration tracking for training days
- Sport-specific calorie and macro targets

### Performance Tracking
- Daily protein intake monitoring
- Energy levels correlation with nutrition
- Recovery quality metrics
- Game-day nutrition planning

### Smart Calculations
- Sport-specific calorie targets:
  - Football training days (18x weight)
  - Gym days (16x weight)
  - Rest days (14x weight)
- Protein recommendations (1.6g/kg body weight)
- Personalized hydration goals

### User Features
- Secure authentication via Supabase
- Personal food database
- Progress visualization
- Historical performance data

## Tech Stack

- **Frontend:** Next.js 14, React, TypeScript
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Auth & PostgreSQL)
- **Data Visualization:** Recharts
- **UI Components:** shadcn/ui

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```
4. Run development server: `npm run dev`

## Personal Tips

Based on my experience using this app:
- Track pre-game meals 3-4 hours before kickoff
- Focus on post-workout protein intake within 30 minutes
- Monitor water intake on training days
- Adjust calorie intake based on training intensity

## Contributing

Found this useful? Contributions are welcome! Feel free to submit PRs or suggest features that could help other athletes.

## License

MIT License - See LICENSE file for details