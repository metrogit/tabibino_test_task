import { memo } from 'react';
import type { Dictionary } from '@/lib/dictionaries';

interface AdminHomeProps {
  dictionary: Dictionary;
}

const StatCard = memo(({ 
  value, 
  label, 
  color 
}: { 
  value: string; 
  label: string; 
  color: string; 
}) => (
  <div 
    className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
    role="article"
    aria-labelledby={`stat-${label.replace(/\s+/g, '-').toLowerCase()}`}
  >
    <div className={`text-2xl font-bold ${color} mb-2`} aria-hidden="true">
      {value}
    </div>
    <div 
      id={`stat-${label.replace(/\s+/g, '-').toLowerCase()}`}
      className="text-sm text-gray-600 dark:text-gray-400"
    >
      {label}
    </div>
  </div>
));

StatCard.displayName = 'StatCard';

const AdminHome = memo(({ dictionary }: AdminHomeProps) => {
  const stats = [
    { value: '1,248', label: dictionary.adminHome.stats.totalUsers, color: 'text-blue-600' },
    { value: '156', label: dictionary.adminHome.stats.activeDoctors, color: 'text-green-600' },
    { value: '99.9%', label: dictionary.adminHome.stats.systemHealth, color: 'text-purple-600' },
    { value: '432', label: dictionary.adminHome.stats.activeSessions, color: 'text-orange-600' },
  ];

  return (
    <section 
      className="py-8 min-h-screen flex items-center justify-center pt-20 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/20 dark:to-gray-950"
      aria-labelledby="admin-title"
      role="main"
    >
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          
          <div 
            className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-8"
            role="status"
            aria-label="Admin portal indicator"
          >
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" aria-hidden="true"></div>
            {dictionary.adminHome.badge}
          </div>

          <h1 
            id="admin-title"
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {dictionary.adminHome.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12 max-w-2xl mx-auto">
            {dictionary.adminHome.description}
          </p>

          <div 
            className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            role="region"
            aria-label="System statistics"
          >
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                color={stat.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

AdminHome.displayName = 'AdminHome';

export default AdminHome; 