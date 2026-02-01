import { MapPin, Users, Calendar, ChevronRight } from 'lucide-react';
import { type Company } from '../../types';
import { Badge } from '../common/Badge';

interface CompanyCardProps {
    company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
    return (
        <div className="group relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-lg font-bold text-slate-700 shadow-sm">
                        {company.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">{company.name}</h3>
                        <Badge variant="purple" className="mt-1 text-[10px] uppercase tracking-wider">
                            {company.industry}
                        </Badge>
                    </div>
                </div>
                <div className="rounded-full p-1 text-slate-300 transition-colors group-hover:bg-slate-50 group-hover:text-slate-600">
                    <ChevronRight className="h-5 w-5" />
                </div>
            </div>

            <p className="mb-4 text-sm text-slate-500 line-clamp-2">
                {company.description}
            </p>

            <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-t border-slate-50 pt-4">
                <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="mr-2 h-4 w-4 text-slate-400" />
                    {company.location}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                    <Users className="mr-2 h-4 w-4 text-slate-400" />
                    {company.size}
                </div>
                <div className="col-span-2 flex items-center text-sm text-slate-600">
                    <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                    Founded {company.founded}
                </div>
            </div>
        </div>
    );
};
