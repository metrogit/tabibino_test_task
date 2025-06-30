import { getDictionary, type Locale } from "@/lib/dictionaries";
import { Card } from "@/components/ui/card";
import { Stethoscope, Calendar, Users2, FileText, Clock } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { UserRole } from "@/types/roles";

export default async function DoctorPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  
  // Ensure only doctor users can access this page
  await requireRole(UserRole.DOCTOR, lang);
  
  const dict = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 py-8 my-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Stethoscope className="w-4 h-4" />
            {dict.pages.doctor.title}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {dict.pages.doctor.welcome}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {dict.pages.doctor.subtitle}
          </p>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            {dict.pages.doctor.description}
          </p>
        </div>

        {/* Doctor Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dict.pages.doctor.features.appointments}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              View and manage your daily appointments
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Users2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dict.pages.doctor.features.patients}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Access patient files and medical history
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dict.pages.doctor.features.schedule}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your availability and working hours
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dict.pages.doctor.features.prescriptions}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Create and manage patient prescriptions
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
} 