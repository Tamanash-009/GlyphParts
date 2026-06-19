import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { getDatabaseState } from '../data/database';
import { BookmarkMinus, Smartphone, Search } from 'lucide-react';
import { OptimizedImage } from '../components/OptimizedImage';

export function SavedDevicesPage() {
  const { savedDevices, removeSavedDevice } = useUser();
  const { phones } = getDatabaseState();

  const savedPhones = savedDevices
    .map(id => phones.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  return (
    <div className="animate-fadeIn pb-24 max-w-[1000px] mx-auto px-4 sm:px-6">
      <h1 className="text-3xl md:text-5xl font-display font-medium tracking-tighter text-foreground uppercase leading-none mb-4">
        Saved Devices
      </h1>
      <p className="text-base text-muted-foreground font-sans font-light mb-12">
        Manage and compare your favorite devices here.
      </p>

      {savedPhones.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center gap-4 text-muted-foreground bg-card border border-border rounded-3xl">
          <BookmarkMinus className="h-12 w-12 opacity-20 mb-2" />
          <p className="text-lg">No saved devices found.</p>
          <Link to="/devices" className="mt-4 px-6 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
            Explore Archive
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {savedPhones.map(phone => (
            <div key={phone.id} className="group flex flex-col gap-4 bg-transparent border border-border p-5 rounded-3xl hover:border-foreground/50 transition-colors h-full card-shadow hover-lift">
              <Link to={`/device/${phone.id}`} className="w-full aspect-[4/5] sm:aspect-square bg-muted rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-6 transition-transform duration-500">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity blur-[40px]" style={{ backgroundColor: phone.imageColor }} />
                {phone.official_image_source ? (
                  <OptimizedImage src={phone.official_image_source} alt={phone.name} className="w-full h-full object-contain pointer-events-none drop-shadow-2xl z-10" />
                ) : (
                  <Smartphone className="w-12 h-12 text-foreground/40 group-hover:text-foreground/80 group-hover:scale-110 transition-all duration-500 z-10" strokeWidth={1} />
                )}
              </Link>
              <div className="px-2 pb-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="block text-lg font-medium text-foreground tracking-tight leading-tight mb-0.5">{phone.name}</span>
                  <span className="text-xs text-muted-foreground font-light">{phone.series} • {phone.release_date}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link to={`/device/${phone.id}`} className="flex-1 flex items-center justify-center py-2 px-4 rounded-xl bg-muted text-foreground text-xs font-medium hover:bg-muted/80 transition-colors">
                    View
                  </Link>
                  <button onClick={() => removeSavedDevice(phone.id)} className="flex items-center justify-center p-2 rounded-xl border border-border text-red-500 hover:bg-red-500/10 transition-colors" aria-label="Remove device">
                    <BookmarkMinus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
