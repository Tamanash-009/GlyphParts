/**
 * NOTHING PARTS ARCHIVE - COMPARISON ENGINE
 * Premium dot-matrix inspired comparison grid for Nothing & CMF devices.
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeftRight, Trash2, ShieldAlert } from 'lucide-react';
import { getDatabaseState, Phone, SparePart } from '../data/database';
import { useSettings } from '../contexts/SettingsContext';

interface CompareToolProps {
    initialPhoneAId?: string;
    initialPhoneBId?: string;
    onClose?: () => void;
    onPhoneSelect?: (id: string) => void;
}

export const CompareTool: React.FC<CompareToolProps> = ({
    initialPhoneAId,
    initialPhoneBId,
    onClose,
    onPhoneSelect
}) => {
    const { phones, parts, categories } = getDatabaseState();
    const { formatPrice } = useSettings();

    const [phoneAId, setPhoneAId] = useState<string>('');
    const [phoneBId, setPhoneBId] = useState<string>('');

    useEffect(() => {
        if (initialPhoneAId) {
            setPhoneAId(initialPhoneAId);
        }
        if (initialPhoneBId) {
            setPhoneBId(initialPhoneBId);
        }
    }, [initialPhoneAId, initialPhoneBId]);

    const phoneA = phones.find(p => p.id === phoneAId) || null;
    const phoneB = phones.find(p => p.id === phoneBId) || null;

    const getPriceForPhoneAndCategory = (phoneId: string, categoryId: string): SparePart | undefined => {
        // Return first matching part under this category (could look for Default color first)
        const matches = parts.filter(p => p.phone_id === phoneId && p.category_id === categoryId);
        if (matches.length === 0) return undefined;
        const defaultColor = matches.find(m => m.color === 'Default' || m.color === 'Black' || m.color === 'Dark Gray');
        return defaultColor || matches[0];
    };

    const getPartPriceStr = (phoneId: string, categoryId: string) => {
        const part = getPriceForPhoneAndCategory(phoneId, categoryId);
        return part ? `${part.currency}${part.price.toLocaleString()}` : '—';
    };

    const getPartPriceRaw = (phoneId: string, categoryId: string): number | null => {
        const part = getPriceForPhoneAndCategory(phoneId, categoryId);
        return part ? part.price : null;
    };

    const getPriceDisplays = (phoneId: string, categoryId: string) => {
        const part = getPriceForPhoneAndCategory(phoneId, categoryId);
        if (!part) return null;
        return formatPrice(part.price);
    };

    // Focus on top part categories for screen-wise comparisons
    const includedCategoryIds = ['display', 'battery', 'back-cover', 'camera-module', 'mainboard', 'charging-port', 'speaker', 'vibrator-motor', 'fingerprint', 'volume-buttons'];
    const compareCategories = categories.filter(c => includedCategoryIds.includes(c.id));

    return (
        <div className="glass-panel text-foreground rounded-[2rem] border border-border p-6 md:p-10 shadow-sm relative overflow-hidden font-sans">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#E5E5E5] dark:bg-white/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex justify-between items-center mb-8 border-b border-zinc-100 border-border pb-6">
                <div>
                    <span className="text-[10px] md:text-[11px] font-dot tracking-widest text-muted-foreground uppercase flex items-center gap-2">
                        Comparison Tool
                    </span>
                    <h2 className="text-2xl md:text-3xl font-medium font-display tracking-tight text-foreground flex items-center gap-3 mt-1">
                        <ArrowLeftRight className="h-6 w-6 text-foreground " strokeWidth={1.5} />
                        Device Part Comparison
                    </h2>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-[11px] uppercase font-dot border border-border px-4 py-2 rounded-full hover:bg-background dark:hover:bg-white/5 transition-colors"
                    >
                        Dismiss
                    </button>
                )}
            </div>

            {/* Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Device A Selector */}
                <div className="rounded-2xl border border-border p-5 bg-muted bg-muted">
                    <label className="block text-[11px] font-dot text-muted-foreground uppercase mb-3">Primary Device</label>
                    <div className="flex gap-2">
                        <select
                            id="compare-select-a"
                            role="combobox"
                            aria-label="Compare Phone A"
                            value={phoneAId}
                            onChange={(e) => {
                                setPhoneAId(e.target.value);
                            }}
                            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/10 text-foreground appearance-none"
                        >
                            <option value="">Select primary device</option>
                            {phones.map(phone => (
                                <option key={phone.id} value={phone.id}>
                                    {phone.name} ({phone.series})
                                </option>
                            ))}
                        </select>
                        {phoneA && (
                            <button
                                onClick={() => setPhoneAId('')}
                                aria-label="Clear selection A"
                                className="cursor-pointer px-4 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20 bg-card transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Device B Selector */}
                <div className="rounded-2xl border border-border p-5 bg-muted bg-muted">
                    <label className="block text-[11px] font-dot text-muted-foreground uppercase mb-3">Comparison Device</label>
                    <div className="flex gap-2">
                        <select
                            id="compare-select-b"
                            role="combobox"
                            aria-label="Compare Phone B"
                            value={phoneBId}
                            onChange={(e) => {
                                setPhoneBId(e.target.value);
                            }}
                            className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/10 text-foreground appearance-none"
                        >
                            <option value="">Select comparison device</option>
                            {phones.map(phone => (
                                <option key={phone.id} value={phone.id}>
                                    {phone.name} ({phone.series})
                                </option>
                            ))}
                        </select>
                        {phoneB && (
                            <button
                                onClick={() => setPhoneBId('')}
                                aria-label="Clear selection B"
                                className="cursor-pointer px-4 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground border border-border hover:border-foreground/20 bg-card transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Comparison Grid */}
            {phoneA || phoneB ? (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse text-left text-sm text-muted-foreground font-sans">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="py-4 font-dot text-[11px] text-muted-foreground uppercase tracking-widest w-[30%] pl-4">Specification</th>
                                <th className="py-4 font-display font-medium text-foreground px-4 w-[35%]">
                                    {phoneA ? (
                                        <button onClick={() => onPhoneSelect(phoneA.id)} className="cursor-pointer hover:text-red-500 text-left transition underline decoration-dotted decoration-1 hover:decoration-solid">
                                            {phoneA.name}
                                        </button>
                                    ) : <span className="text-muted-foreground font-light italic">No selection</span>}
                                </th>
                                <th className="py-4 font-display font-medium text-foreground px-4 w-[35%]">
                                    {phoneB ? (
                                        <button onClick={() => onPhoneSelect(phoneB.id)} className="cursor-pointer hover:text-red-500 text-left transition underline decoration-dotted decoration-1 hover:decoration-solid">
                                            {phoneB.name}
                                        </button>
                                    ) : <span className="text-muted-foreground font-light italic">No selection</span>}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {/* Technical Specifications */}
                            <tr>
                                <td colSpan={3} className="py-4 font-dot text-[11px] text-muted-foreground uppercase tracking-widest bg-muted pl-4 rounded-t-xl">
                                    Hardware Specifications
                                </td>
                            </tr>
                            <tr className="hover:bg-muted">
                                <td className="py-4 font-dot text-[11px] uppercase tracking-widest text-muted-foreground pl-4">Release Date</td>
                                <td className="py-4 font-medium text-foreground px-4">{phoneA?.release_date || '—'}</td>
                                <td className="py-4 font-medium text-foreground px-4">{phoneB?.release_date || '—'}</td>
                            </tr>
                            <tr className="hover:bg-muted">
                                <td className="py-4 font-dot text-[11px] uppercase tracking-widest text-muted-foreground pl-4">Series Tier</td>
                                <td className="py-4 font-medium px-4">
                                    {phoneA?.series ? (
                                        <span className="text-[10px] font-dot tracking-widest uppercase bg-muted border border-border rounded-full px-3 py-1 text-muted-foreground">
                                            {phoneA.series}
                                        </span>
                                    ) : '—'}
                                </td>
                                <td className="py-4 font-medium px-4">
                                    {phoneB?.series ? (
                                        <span className="text-[10px] font-dot tracking-widest uppercase bg-muted border border-border rounded-full px-3 py-1 text-muted-foreground">
                                            {phoneB.series}
                                        </span>
                                    ) : '—'}
                                </td>
                            </tr>
                            <tr className="hover:bg-muted">
                                <td className="py-4 font-dot text-[11px] uppercase tracking-widest text-muted-foreground pl-4">Chipset SOC</td>
                                <td className="py-4 text-foreground px-4 font-medium">{phoneA?.chipset || '—'}</td>
                                <td className="py-4 text-foreground px-4 font-medium">{phoneB?.chipset || '—'}</td>
                            </tr>
                            <tr className="hover:bg-muted">
                                <td className="py-4 font-dot text-[11px] uppercase tracking-widest text-muted-foreground pl-4">Display Panel</td>
                                <td className="py-4 text-foreground px-4 font-medium">{phoneA?.display_size || '—'}</td>
                                <td className="py-4 text-foreground px-4 font-medium">{phoneB?.display_size || '—'}</td>
                            </tr>
                            <tr className="hover:bg-muted">
                                <td className="py-4 font-dot text-[11px] uppercase tracking-widest text-muted-foreground pl-4">Battery Capacity</td>
                                <td className="py-4 text-foreground px-4 font-medium">{phoneA?.battery_capacity || '—'}</td>
                                <td className="py-4 text-foreground px-4 font-medium">{phoneB?.battery_capacity || '—'}</td>
                            </tr>

                            {/* Spare Parts Cost Comparison */}
                            <tr>
                                <td colSpan={3} className="py-4 mt-4 font-dot text-[11px] text-muted-foreground uppercase tracking-widest bg-muted pl-4">
                                    Component Pricing
                                </td>
                            </tr>
                            {compareCategories.map(cat => {
                                const aVal = phoneA ? getPartPriceRaw(phoneA.id, cat.id) : null;
                                const bVal = phoneB ? getPartPriceRaw(phoneB.id, cat.id) : null;

                                const aPricing = phoneA ? getPriceDisplays(phoneA.id, cat.id) : null;
                                const bPricing = phoneB ? getPriceDisplays(phoneB.id, cat.id) : null;

                                // Highlight budget friendly options
                                const isABetter = aVal !== null && bVal !== null && aVal < bVal;
                                const isBBetter = aVal !== null && bVal !== null && bVal < aVal;

                                return (
                                    <tr key={cat.id} className="hover:bg-muted">
                                        <td className="py-4 pl-4 text-foreground font-sans font-medium flex items-center gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground"></span> {cat.name}
                                        </td>
                                        <td className="py-4 px-4">
                                            {phoneA && aPricing ? (
                                                <div className="flex flex-col gap-1 items-start">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                        <span className={`font-sans text-base ${isABetter ? 'text-foreground font-semibold' : 'text-muted-foreground font-medium'}`}>
                                                            {aPricing.converted || aPricing.original}
                                                        </span>
                                                        {isABetter && (
                                                            <span className="text-[10px] uppercase font-dot px-2 py-0.5 rounded-full bg-muted text-muted-foreground bg-muted text-muted-foreground max-w-fit">
                                                                Lower Cost
                                                            </span>
                                                        )}
                                                    </div>
                                                    {aPricing.converted && (
                                                        <span className="text-xs text-muted-foreground font-medium tracking-tight">≈ {aPricing.original}</span>
                                                    )}
                                                </div>
                                            ) : '—'}
                                        </td>
                                        <td className="py-4 px-4">
                                            {phoneB && bPricing ? (
                                                <div className="flex flex-col gap-1 items-start">
                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                        <span className={`font-sans text-base ${isBBetter ? 'text-foreground font-semibold' : 'text-muted-foreground dark:text-muted-foreground font-medium'}`}>
                                                            {bPricing.converted || bPricing.original}
                                                        </span>
                                                        {isBBetter && (
                                                            <span className="text-[10px] uppercase font-dot px-2 py-0.5 rounded-full bg-muted text-muted-foreground bg-muted text-muted-foreground max-w-fit">
                                                                Lower Cost
                                                            </span>
                                                        )}
                                                    </div>
                                                    {bPricing.converted && (
                                                        <span className="text-xs text-muted-foreground font-medium tracking-tight">≈ {bPricing.original}</span>
                                                    )}
                                                </div>
                                            ) : '—'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-16 rounded-2xl bg-muted bg-muted border border-border">
                    <span className="inline-block p-4 rounded-full bg-card border border-border text-muted-foreground mb-4 shadow-sm">
                        <ArrowLeftRight className="h-6 w-6" />
                    </span>
                    <p className="font-display font-medium text-lg text-foreground tracking-tight mb-2">Select devices to compare</p>
                    <p className="text-sm font-light text-muted-foreground max-w-sm mx-auto">Choose primary and comparison devices from the dropdowns above to view their hardware details side-by-side.</p>
                </div>
            )}
        </div>
    );
};
