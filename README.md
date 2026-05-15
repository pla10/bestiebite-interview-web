# BestieBite — Interview exercise (NestJS)

Mini-app NestJS usata nello Stage 2 del colloquio tecnico. Branch `exercise-1` contiene un bug realistico sulla gestione della cache.

## Setup

Servono **Node 20+** e **pnpm**.

```bash
pnpm install
pnpm dev
```

Il server parte su `http://localhost:3000`.

## Endpoint

```bash
# Leggi un ristorante
curl http://localhost:3000/restaurants/1

# Aggiungi una review (rating 1-5)
curl -X POST http://localhost:3000/restaurants/1/reviews \
  -H 'content-type: application/json' \
  -d '{"rating":5}'
```

Restaurant disponibili nel seed: `1` (Trattoria da Mario, Milano), `2` (Pizzeria Sorbillo, Napoli).

---

# Esercizio 1 — Bug cache stale (20 min)

## Sintomo

Esegui la seguente sequenza, **in quest'ordine**:

```bash
# 1) Primo GET: ti ritorna l'avgRating attuale
curl http://localhost:3000/restaurants/1
# → avgRating: 4.5

# 2) Aggiungi una review da 5 stelle
curl -X POST http://localhost:3000/restaurants/1/reviews \
  -H 'content-type: application/json' \
  -d '{"rating":5}'
# → 200 OK, la response mostra avgRating: ~4.6

# 3) Rifai il GET
curl http://localhost:3000/restaurants/1
# → avgRating: 4.5  ❌ (atteso ~4.6)
```

Riavviando il server (`Ctrl+C` e poi `pnpm dev`), il GET successivo ritorna correttamente `4.6`.

## Il tuo task

Trova la root cause e applica la fix minima.

## Vincoli

- **Non modificare** `src/restaurants/restaurants.controller.ts`
- **Non modificare** `src/restaurants/restaurants.repository.ts`
- **La cache deve restare**: serve a deduplicare richieste concorrenti (protezione "thundering herd"). Il problema **non è** che la cache esiste, è come viene gestita.
- Il fix va in `src/restaurants/restaurants.service.ts`

## Atteso

1. Esegui la sequenza di sintomo e mostra che il bug è riproducibile **prima** di iniziare a scrivere codice
2. Diagnosi parlata: spiega ad alta voce cosa pensi che succeda **prima** di proporre una soluzione
3. Applica la fix
4. Riverifica la sequenza (deve ritornare 4.6 al secondo GET, senza restart)
5. **Bonus**: scrivi un test in `restaurants.service.spec.ts` che fallisce sul codice rotto e passa dopo il fix

## Tip

Hai Claude Code installato? Usalo liberamente. Ci interessa **come** lo usi.
