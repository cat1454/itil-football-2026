'use client';

import React, { useState, useEffect } from 'react';
import { Team } from '@/types/tournament';
import { X, Check } from 'lucide-react';
import { sound } from '@/lib/sound';

interface EditTeamsModalProps {
  isOpen: boolean;
  teams: Team[];
  onClose: () => void;
  onSave: (updatedTeams: Team[]) => void;
}

export default function EditTeamsModal({
  isOpen,
  teams,
  onClose,
  onSave,
}: EditTeamsModalProps) {
  const [formData, setFormData] = useState<Team[]>([]);

  useEffect(() => {
    if (teams.length > 0) {
      setFormData(JSON.parse(JSON.stringify(teams)));
    }
  }, [teams, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playGoal();
    onSave(formData);
    onClose();
  };

  const updateField = (index: number, field: 'code' | 'name', value: string) => {
    const updated = [...formData];
    updated[index] = {
      ...updated[index],
      [field]: field === 'code' ? value.toUpperCase() : value,
    };
    setFormData(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md bg-white border-2 border-[#141413] p-6 hard-shadow">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#141413] pb-3 mb-4">
          <h3 className="font-extrabold text-2xl uppercase text-[#141413]" style={{ fontFamily: 'Oswald, sans-serif' }}>
            ĐỔI TÊN 4 ĐỘI THAM DỰ
          </h3>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 border border-[#141413] bg-[#F6F5F0] font-mono font-bold hover:bg-[#D9381E] hover:text-white transition flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {formData.map((t, idx) => (
            <div key={t.id}>
              <label className="block font-mono text-xs font-bold mb-1 text-[#141413]">
                ĐỘI {idx + 1} (MÃ &amp; TÊN ĐỘI)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  maxLength={5}
                  required
                  value={t.code}
                  onChange={e => updateField(idx, 'code', e.target.value)}
                  className="col-span-1 px-3 py-2 bg-[#F6F5F0] border border-[#141413] font-mono text-xs font-bold uppercase focus:outline-none focus:ring-2 focus:ring-[#16422B]"
                  placeholder="Mã"
                />
                <input
                  type="text"
                  maxLength={24}
                  required
                  value={t.name}
                  onChange={e => updateField(idx, 'name', e.target.value)}
                  className="col-span-2 px-3 py-2 bg-[#F6F5F0] border border-[#141413] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#16422B]"
                  placeholder="Tên đội"
                />
              </div>
            </div>
          ))}

          <div className="pt-3 flex justify-end gap-2 border-t border-[#141413]/20">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-2 bg-[#F6F5F0] border border-[#141413] font-mono text-xs font-semibold hover:bg-[#EAE8E0] cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-[#16422B] text-white border border-[#141413] font-mono text-xs font-bold hard-btn cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>LƯU THAY ĐỔI</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
