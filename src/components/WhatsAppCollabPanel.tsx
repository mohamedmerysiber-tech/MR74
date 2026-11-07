import React, { useState } from 'react';
import { ChatMessage, Collaborator } from '../types';
import {
  X,
  Send,
  UserPlus,
  Paperclip,
  Mic,
  CheckCheck,
  Phone,
  Video,
  Smile,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';

interface WhatsAppCollabPanelProps {
  isOpen: boolean;
  onClose: () => void;
  collaborators: Collaborator[];
  messages: ChatMessage[];
  onSendMessage: (content: string, type?: 'text' | 'script' | 'audio') => void;
  onAddCollaborator: (name: string, role: string) => void;
}

export const WhatsAppCollabPanel: React.FC<WhatsAppCollabPanelProps> = ({
  isOpen,
  onClose,
  collaborators,
  messages,
  onSendMessage,
  onAddCollaborator,
}) => {
  const [inputText, setInputText] = useState('');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Animateur 2D Tokyo');
  const [inviteCopied, setInviteCopied] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleCopyLink = () => {
    setInviteCopied(true);
    setTimeout(() => setInviteCopied(false), 2000);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    const name = inviteEmail.split('@')[0];
    onAddCollaborator(name, inviteRole);
    setInviteModalOpen(false);
    setInviteEmail('');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-[#0c1317] border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* WhatsApp Header */}
      <div className="px-4 py-3 bg-[#1f2c34] border-b border-white/5 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white shadow">
              神
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1f2c34]" />
          </div>
          <div>
            <div className="text-sm font-bold flex items-center gap-1.5">
              <span>Studio Kamui · Équipe Production</span>
            </div>
            <div className="text-[11px] text-emerald-400">
              {collaborators.filter((c) => c.status === 'online').length} en ligne · Projet #04
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <button
            onClick={() => setInviteModalOpen(true)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-400 hover:text-emerald-300 transition-colors"
            title="Inviter un collaborateur"
          >
            <UserPlus className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Collaborators horizontal avatars ribbon */}
      <div className="px-3 py-2 bg-[#111b21] border-b border-white/5 flex items-center gap-3 overflow-x-auto text-[11px] text-slate-400">
        <span className="text-[10px] uppercase font-mono tracking-wider shrink-0 text-slate-500">
          Membres :
        </span>
        {collaborators.map((c) => (
          <div key={c.id} className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded bg-[#1f2c34]/70 border border-white/5">
            <span
              className={`w-2 h-2 rounded-full ${
                c.status === 'online' ? 'bg-emerald-500' : 'bg-slate-500'
              }`}
            />
            <span className="text-white font-medium">{c.name.split(' ')[0]}</span>
          </div>
        ))}
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#0b141a]/90">
        {/* Timestamp separator */}
        <div className="text-center my-2">
          <span className="px-3 py-1 rounded-md bg-[#182229] text-[10px] font-mono text-slate-400">
            Aujourd'hui · Session Collaborative Studio
          </span>
        </div>

        {messages.map((msg) => {
          const isMe = msg.senderId === 'me' || msg.senderRole === 'Vous';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs shadow-md relative ${
                  isMe
                    ? 'bg-[#005c4b] text-white rounded-tr-none'
                    : 'bg-[#202c33] text-slate-100 rounded-tl-none'
                }`}
              >
                {!isMe && (
                  <div className="flex items-center gap-1.5 mb-1 text-[11px]">
                    <span className="font-bold text-emerald-400">{msg.senderName}</span>
                    <span className="text-[9px] text-slate-400">({msg.senderRole})</span>
                  </div>
                )}

                <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-300 font-mono">
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3.5 h-3.5 text-cyan-300" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Form Bar */}
      <form onSubmit={handleSend} className="p-3 bg-[#202c33] border-t border-white/5 flex items-center gap-2">
        <button
          type="button"
          onClick={() =>
            onSendMessage(
              '« Scène 04 : Le vent se lève sur Tokyo. Les deux rivaux se saluent avant le combat. »',
              'script'
            )
          }
          className="p-2 rounded-full hover:bg-white/10 text-amber-400 transition-colors"
          title="Partager un extrait de script"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Message aux animateurs & co-créateurs..."
          className="flex-1 py-2 px-3.5 rounded-xl bg-[#2a3942] border border-transparent focus:border-emerald-500 text-xs text-white placeholder-slate-400 focus:outline-none"
        />

        <button
          type="submit"
          className="p-2 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white transition-all shadow cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

      {/* Invite Collaborator Modal */}
      {inviteModalOpen && (
        <div className="absolute inset-0 bg-black/85 backdrop-blur-sm p-6 flex flex-col justify-center z-50 animate-in fade-in">
          <div className="p-5 rounded-2xl bg-[#1f2c34] border border-white/10 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h4 className="font-bold text-white text-sm">
                Inviter un collaborateur sur Kamui
              </h4>
              <button
                onClick={() => setInviteModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-3">
              <div>
                <label className="text-slate-300 block mb-1">Email du collaborateur</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="collaborateur@tokyo-anime.com"
                  required
                  className="w-full p-2 rounded-lg bg-[#2a3942] border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Rôle dans le projet</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full p-2 rounded-lg bg-[#2a3942] border border-white/10 text-white text-xs"
                >
                  <option value="Directeur d'Animation">Directeur d'Animation (Tokyo)</option>
                  <option value="Character Designer">Lead Character Designer</option>
                  <option value="Ingénieur Son & Doublage">Ingénieur Son & Doublage</option>
                  <option value="Scénariste / Storyboarder">Scénariste / Storyboarder</option>
                </select>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow"
                >
                  Envoyer l'invitation instantanée
                </button>
              </div>
            </form>

            <div className="pt-2 border-t border-white/10">
              <div className="text-[11px] text-slate-400 mb-1.5">Ou partagez le lien du studio :</div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-black/40 border border-white/10">
                <span className="text-[10px] text-slate-300 font-mono truncate flex-1">
                  https://kamuistudio.ai/join/prj-tokyo-4k-9812
                </span>
                <button
                  onClick={handleCopyLink}
                  className="p-1.5 rounded hover:bg-white/10 text-emerald-400 shrink-0"
                >
                  {inviteCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
