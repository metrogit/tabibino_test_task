import { getDictionary, type Locale } from "@/lib/dictionaries";
import { Card } from "@/components/ui/card";
import { Heart, Calendar, FileText, Pill, Plus } from "lucide-react";

export default async function ClientPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 py-8 my-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-rose-100 dark:bg-rose-900/20 text-rose-800 dark:text-rose-200 px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            {dict.pages.client.title}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {dict.pages.client.welcome}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {dict.pages.client.subtitle}
          </p>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            {dict.pages.client.description}
          </p>
        </div>

        {/* Client Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dict.pages.client.features.myAppointments}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              View your upcoming and past appointments
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dict.pages.client.features.healthRecords}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Access your personal health records and test results
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Pill className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dict.pages.client.features.prescriptions}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              View your current and past prescriptions
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Plus className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {dict.pages.client.features.bookNew}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Schedule a new appointment with available doctors
            </p>
          </Card>
        </div>

  
      </div>
    </div>
  );
} 