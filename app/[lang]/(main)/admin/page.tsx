import { getDictionary, type Locale } from "@/lib/dictionaries";
import { Card } from "@/components/ui/card";
import { Shield, Users, Settings, BarChart3, Database } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { UserRole } from "@/types/roles";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  
  // Ensure only admin users can access this page
  await requireRole(UserRole.ADMIN, lang);
  
  const dict = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 py-8 my-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            {dict.pages.admin.title}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {dict.pages.admin.welcome}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {dict.pages.admin.subtitle}
          </p>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            {dict.pages.admin.description}
          </p>
        </div>

        {/* Admin Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dict.pages.admin.features.userManagement}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Manage all platform users and their permissions
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Settings className="w-8 h-8 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dict.pages.admin.features.systemSettings}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Configure system-wide settings and preferences
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dict.pages.admin.features.reports}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              View comprehensive analytics and reports
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Database className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dict.pages.admin.features.backups}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Manage system backups and data recovery
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
} 