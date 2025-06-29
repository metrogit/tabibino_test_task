import { memo } from 'react';
import type { Dictionary } from '@/lib/dictionaries';

interface DoctorHomeProps {
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
    <div className={`text-3xl font-bold ${color} mb-2`} aria-hidden="true">
      {value}
    </div>
    <div 
      id={`stat-${label.replace(/\s+/g, '-').toLowerCase()}`}
      className="text-gray-600 dark:text-gray-400"
    >
      {label}
    </div>
  </div>
));

StatCard.displayName = 'StatCard';

const DoctorHome = memo(({ dictionary }: DoctorHomeProps) => {
  const stats = [
    { value: '12', label: dictionary.doctorHome.stats.todayAppointments, color: 'text-blue-600' },
    { value: '248', label: dictionary.doctorHome.stats.activePatients, color: 'text-green-600' },
    { value: '6.5h', label: dictionary.doctorHome.stats.hoursToday, color: 'text-purple-600' },
  ];

  return (
    <section 
      className="py-8 min-h-screen flex items-center justify-center pt-20 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-gray-950"
      aria-labelledby="doctor-title"
      role="main"
    >
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          
          <div 
            className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-8"
            role="status"
            aria-label="Doctor portal indicator"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" aria-hidden="true"></div>
            {dictionary.doctorHome.badge}
          </div>

          <h1 
            id="doctor-title"
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            {dictionary.doctorHome.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12 max-w-2xl mx-auto">
            {dictionary.doctorHome.description}
          </p>

          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            role="region"
            aria-label="Practice statistics"
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

DoctorHome.displayName = 'DoctorHome';

export default DoctorHome; 