/*
  ENERGIKER – Inhalte der Website
  Hier pflegt ihr alles, was sich oft ändert. Die Seite baut sich daraus automatisch auf.

  Datenschutz: Bei Minderjährigen am besten nur Vornamen verwenden und vorher die Einwilligung einholen.

  projekt  = "solar" | "fahrrad" | "sonstiges"
  status   = "offen" | "arbeit" | "erledigt"
  datum    = "JJJJ-MM-TT" (vergangene Termine werden automatisch ausgeblendet)
*/
window.AG_DATA = {
  woche: {
    zeitraum: '23.–27. November 2026',
    thema: 'Aufräumen unseres Raums',
    punkte: [
      'Planen',
      'Debattieren',
      'Anpacken'
    ]
  },

  termine: [
    { datum: '2026-11-21', titel: 'Tag der offenen Tür', zeit: '10:00 Uhr', ort: 'Raum folgt' }
  ],

  team: [
    { name: 'Henry Hammer', klasse: 'Q1', projekt: 'solar' },
    { name: 'Henrik Jakubowski', klasse: 'Q1', projekt: 'solar' },
    { name: 'Yawar Javed', klasse: 'Q1', projekt: 'fahrrad' },
    { name: 'Niclas Reiche', klasse: 'Q1', projekt: 'sonstiges' },
    { name: 'Arda Parlak', klasse: 'Q1', projekt: 'sonstiges' },
    { name: 'Devansh Gautam', klasse: 'Q1', projekt: 'sonstiges' }
  ],

  todos: [
    { text: 'Genehmigung der Schulleitung einholen', projekt: 'Website', status: 'arbeit' },
    { text: 'Solar-Panels aus den Katakomben befördern', projekt: 'Solar', status: 'offen' },
    { text: 'Den Energiker-Raum aufräumen', projekt: 'Raum', status: 'offen' }
  ]
};
