import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function ChatWidget({ open, setOpen }) {
  const [session] = useState(() => {
    let s = localStorage.getItem('localup-chat');
    if (!s) {
      s = crypto.randomUUID();
      localStorage.setItem('localup-chat', s);
    }
    return s;
  });
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [faq, setFaq] = useState('');
  const client = useQueryClient();
  const bottom = useRef(null);

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', session],
    queryFn: () => base44.entities.SupportMessage.filter({ session }, 'created_date', 100),
    enabled: open,
  });

  useEffect(
    () =>
      base44.entities.SupportMessage.subscribe((e) => {
        if (e.data?.session === session) client.invalidateQueries({ queryKey: ['messages', session] });
      }),
    [session, client]
  );

  useEffect(() => {
    bottom.current?.scrollIntoView({ block: 'nearest' });
  }, [messages.length, faq, open]);

  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setBusy(true);
    setError('');
    try {
      await base44.entities.SupportMessage.create({
        session,
        text: text.trim(),
        sender: 'customer',
      });
      setText('');
      client.invalidateQueries({ queryKey: ['messages', session] });
    } catch {
      setError('Não foi possível enviar. Tente novamente.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="chat-root">
      {open && (
        <section className="chat-panel" aria-label="Chat de atendimento">
          <div className="chat-heading">
            <div>
              <MessageCircle size={20} />
              <b>LOCALUP ATENDIMENTO</b>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fechar atendimento">
              <X size={16} />
            </button>
          </div>

          <div className="chat-messages">
            <div className="chat-bubble staff">
              Olá! Vamos deixar seu pedido do seu jeito? Envie uma mensagem e nossa equipe responde
              por aqui.
            </div>

            <div className="faq-buttons">
              <button
                type="button"
                onClick={() =>
                  setFaq(
                    'Escolha entrega até 3 km (R$ 7,90), de 3 a 6 km (R$ 12,90) ou retirada gratuita. A equipe confirma a disponibilidade após receber seu endereço.'
                  )
                }
              >
                Como funciona a entrega?
              </button>
              <button
                type="button"
                onClick={() =>
                  setFaq(
                    'Clique em Adicionar no seu favorito para escolher o ponto, retirar ingredientes e adicionar bacon ou queijo extra.'
                  )
                }
              >
                Posso personalizar?
              </button>
            </div>

            {faq && <div className="chat-bubble staff">{faq}</div>}

            {messages.map((m) => (
              <div key={m.id} className={`chat-bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}
            <div ref={bottom} />
          </div>

          <form onSubmit={send} className="chat-input">
            <input
              aria-label="Sua mensagem"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escreva sua mensagem…"
              maxLength={1000}
            />
            <button type="submit" disabled={busy || !text.trim()} aria-label="Enviar mensagem">
              <Send size={18} />
            </button>
          </form>

          {error && (
            <p className="error-text" role="alert">
              {error}
            </p>
          )}
          <small className="chat-disclaimer">A resposta da equipe pode não ser imediata.</small>
        </section>
      )}

      <button
        type="button"
        className="chat-launcher"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Fechar atendimento' : 'Abrir atendimento'}
        aria-expanded={open}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
