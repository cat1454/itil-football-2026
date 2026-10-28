'use client';

import React from 'react';
import { Team, Match } from '@/types/tournament';
import { Grid, ArrowUpRight } from 'lucide-react';
import { sound } from '@/lib/sound';

interface CrossMatrixProps {
  teams: Team[];
  matches: Match[];
  onSelectMatch: (matchId: string) => void;
}

export default function CrossMatrix({ teams, matches, onSelectMatch }: CrossMatrixProps) {
  const getMatchBetween = (teamA: number, teamB: number) => {
    return matches.find(
      m => (m.home === teamA && m.away === teamB) || (m.home === teamB && m.away === teamA)
    );
  };

  return (
    <div className="bg-white border border-[#141413] hard-shadow overflow-hidden flex flex-col justify-between">
      <div>
        <div className="px-4 py-3 bg-[#EAE8E0] border-b border-[#141413] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Grid className="w-4 h-4 text-[#16422B]" />
            <span className="font-mono text-xs font-bold uppercase text-[#141413]">
              MA TRẬN ĐỐI ĐẦU 4×4
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#61605B] flex items-center gap-1">
            <span>Bấm ô để xem trận</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>

        <div className="p-3 sm:p-4 overflow-x-auto">
          <table className="w-full border-collapse border border-[#141413] text-center font-mono text-xs">
            <thead>
              <tr className="bg-[#F6F5F0] border-b border-[#141413]">
                <th className="p-2.5 border-r border-[#141413] text-left text-[10px] text-[#61605B] uppercase">
                  Đội \ Đối thủ
                </th>
                {teams.map(t => (
                  <th key={t.id} className="p-2.5 border-r border-[#141413] font-bold text-[#141413]">
                    {t.code}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teams.map(rowTeam => (
                <tr key={rowTeam.id}>
                  <td className="p-2.5 border-r border-b border-[#141413] bg-[#F6F5F0] font-bold text-left whitespace-nowrap">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full mr-1.5 align-middle border border-[#141413]"
                      style={{ backgroundColor: rowTeam.kitColor }}
                    />
                    <span>{rowTeam.code}</span>
                  </td>

                  {teams.map(colTeam => {
                    if (rowTeam.id === colTeam.id) {
                      return (
                        <td
                          key={colTeam.id}
                          className="p-3 border-r border-b border-[#141413] matrix-self-cell text-[#61605B]"
                        >
                          —
                        </td>
                      );
                    }

                    const m = getMatchBetween(rowTeam.id, colTeam.id);
                    if (!m) {
                      return (
                        <td key={colTeam.id} className="p-2.5 border-r border-b border-[#141413] text-[#61605B]">
                          -
                        </td>
                      );
                    }

                    if (!m.played) {
                      return (
                        <td
                          key={colTeam.id}
                          onClick={() => {
                            sound.playClick();
                            onSelectMatch(m.id);
                          }}
                          className="p-2 border-r border-b border-[#141413] bg-white hover:bg-[#EAE8E0] cursor-pointer transition group"
                          title={`Xem chi tiết trận ${rowTeam.name} vs ${colTeam.name}`}
                        >
                          <div className="text-[10px] text-[#61605B]">Vòng {m.round}</div>
                          <div className="font-semibold text-[#141413] group-hover:underline">Chưa đá</div>
                        </td>
                      );
                    }

                    const rowGoals = m.home === rowTeam.id ? m.homeGoals : m.awayGoals;
                    const colGoals = m.home === rowTeam.id ? m.awayGoals : m.homeGoals;

                    let badgeClass = 'bg-[#EAE8E0] text-[#141413]';
                    if (rowGoals > colGoals) badgeClass = 'bg-[#E8F0EB] text-[#16422B] font-bold';
                    if (rowGoals < colGoals) badgeClass = 'bg-[#FCECE9] text-[#D9381E]';

                    return (
                      <td
                        key={colTeam.id}
                        onClick={() => {
                          sound.playClick();
                          onSelectMatch(m.id);
                        }}
                        className={`p-2 border-r border-b border-[#141413] ${badgeClass} hover:opacity-80 cursor-pointer transition`}
                        title={`${rowTeam.name} ${rowGoals} - ${colGoals} ${colTeam.name}`}
                      >
                        <div className="text-sm font-black">{rowGoals} - {colGoals}</div>
                        <div className="text-[10px] opacity-75">Vòng {m.round}</div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-4 py-2.5 bg-[#F6F5F0] border-t border-[#141413] text-[11px] font-mono text-[#61605B] flex items-center justify-between">
        <span>Đọc ngang: Đội hàng ngang vs Đội cột dọc</span>
        <span className="text-[#141413] font-bold">3 Vòng • 6 Trận đấu</span>
      </div>
    </div>
  );
}
