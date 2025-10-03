import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  const profileItems = [
    {
      icon: User,
      label: 'Full Name',
      value: user.fullName,
    },
    {
      icon: user.email ? Mail : Phone,
      label: user.email ? 'Email Address' : 'Phone Number',
      value: user.email || user.phone || 'Not provided',
    },
    {
      icon: MapPin,
      label: 'District',
      value: user.district,
    },
    {
      icon: Calendar,
      label: 'Member Since',
      value: 'Recently Joined',
    },
  ];

  return (
    <div className="pb-20 md:pb-8">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-lg opacity-90">Manage your account information</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4">
              <User className="w-12 h-12 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{user.fullName}</h2>
            <p className="text-white opacity-90">{user.email || user.phone}</p>
          </div>

          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Account Details</h3>
            <div className="space-y-4">
              {profileItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mr-4">
                      <Icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                      <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">
                    Service Available in Your Area
                  </h4>
                  <p className="text-green-700 text-sm">
                    You can order from any restaurant in {user.district} district.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
