import { MapPin, Users, Calendar, ChevronRight } from 'lucide-react';
import { Company } from '../../types';
import { Badge } from '../common/Badge';

interface CompanyCardProps {
    company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600 ring-1 ring-blue-100">
                        {company.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">{company.name}</h3>
                        <span className="text-sm text-gray-500">{company.industry}</span>
                    </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{company.size} employees</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Founded {company.founded}</span>
                </div>
            </div>

            <div className="mt-2 text-sm text-gray-500 line-clamp-2">
                {company.description}
            </div>

            <div className="mt-auto">
                <Badge variant="info" className="uppercase tracking-wider font-semibold opacity-80">
                    {company.industry}
                </Badge>
            </div>
        </div>
    );
};
