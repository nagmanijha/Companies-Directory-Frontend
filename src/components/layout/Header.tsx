import { Building2, Bell, User } from 'lucide-react';

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white shadow-sm ring-1 ring-slate-900/10">
                        <Building2 className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">Directory</span>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-900/20">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Notifications</span>
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                    </button>

                    <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>

                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 ring-1 ring-slate-200 transition-all hover:bg-slate-200 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900/20">
                        <span className="sr-only">User menu</span>
                        <User className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};
