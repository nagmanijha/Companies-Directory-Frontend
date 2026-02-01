import { type Company } from '../../types';
import { Badge } from '../common/Badge';

interface CompanyTableProps {
    companies: Company[];
}

export const CompanyTable = ({ companies }: CompanyTableProps) => {
    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50/50">
                    <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Company
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Industry
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Size
                        </th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Founded
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {companies.map((company) => (
                        <tr key={company.id} className="group transition-colors hover:bg-slate-50/80">
                            <td className="whitespace-nowrap px-6 py-4">
                                <div className="flex items-center">
                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-base font-bold text-slate-700 shadow-sm transition-transform group-hover:scale-105">
                                        {company.name.charAt(0)}
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-semibold text-slate-900">{company.name}</div>
                                        <div className="text-xs text-slate-500 max-w-[200px] truncate">{company.description}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                                <Badge variant="purple" className="font-medium text-[11px] uppercase tracking-wide">
                                    {company.industry}
                                </Badge>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-600">
                                {company.location}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                                {company.size}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 tabular-nums">
                                {company.founded}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
