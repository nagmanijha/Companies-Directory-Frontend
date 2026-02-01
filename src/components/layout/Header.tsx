import { Building2, Bell, User } from 'lucide-react';

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <Building2 className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">Directory</span>
                </div>

                <div className="flex items-center gap-4">
                    <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                    </button>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                        <User className="h-5 w-5" />
                    </div>
                </div>
            </div>
        </header>
    );
};
