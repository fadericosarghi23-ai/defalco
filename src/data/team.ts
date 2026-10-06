/**
 * Team: il titolare (nome VERO dalla scheda Google). Nessun collaboratore inventato.
 * Foto: monogramma provvisorio delle misure del ritratto (1000x1500) → sostituire con un ritratto vero.
 */
import { tav } from '../lib/tavole';
import type { Img } from '../lib/media';

export type Membro = { id: string; nome: string; ruolo: string; foto: Img };

export const team: Membro[] = [
  {
    id: 'giovanni-de-falco',
    nome: 'Giovanni De Falco',
    ruolo: 'Geometra',
    foto: tav('team-giovanni-de-falco', 1000, 1500, 'ritratto', 'blu', 'Geom. Giovanni De Falco, titolare dello studio (ritratto da inserire)'),
  },
];

export const membro = (id: string) => team.find((m) => m.id === id);
