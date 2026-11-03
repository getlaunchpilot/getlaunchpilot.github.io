// Site de téléchargement de LaunchPilot : langue (anglais par défaut, français au choix),
// animations au défilement, ciel étoilé, visite guidée, prix et dernier installateur publié.
// Sans JavaScript, la page reste complète en anglais et les liens mènent à la page des versions.

const REPO = 'JordIOS/launchpilot-releases'
const STORAGE_KEY = 'launchpilot.site.language'
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Mêmes prix que la base de données (private.plan_price_cents) : à garder synchronisés.
const PRICES = {
  starter: { month: 1500, year: 15000 },
  pro: { month: 2900, year: 29000 },
  business: { month: 5900, year: 59000 },
}

const TEXTS = {
  en: {
    documentTitle: 'LaunchPilot — The business copilot for freelancers and small teams',
    description:
      'Clients, sales pipeline, quotes, compliant invoices, payments and cash flow in one fast Windows app. Free 3-day trial.',
    langButton: 'FR',
    langButtonLabel: 'Afficher le site en français',
    skip: 'Skip to content',
    navLabel: 'Main',
    navFeatures: 'Features',
    navTour: 'Tour',
    navPricing: 'Pricing',
    navFaq: 'FAQ',
    navDownload: 'Download',
    announceTag: 'New',
    announce: 'Partial payments & a 90-day cash-flow forecast',
    heroTitle1: 'The business copilot',
    heroTitle2: 'for freelancers & small teams',
    heroLead:
      'Clients, sales pipeline, quotes, compliant invoices, payments and cash flow — in one fast, secure app that tells you what needs your attention.',
    downloadWindows: 'Download for Windows',
    seeFeatures: 'Explore the features',
    requirements: 'Windows 10 and 11 · 64-bit',
    version: (version, size) => `Version ${version} · ${size} MB`,
    trial: 'Free 3-day trial, no credit card',
    altDashboard:
      'LaunchPilot dashboard: open pipeline, revenue won, tasks, billing and a revenue chart.',
    chip1Title: 'Payment recorded',
    chip2Title: 'Follow-up due',
    chip2Text: 'Website redesign · Durand & Fils',
    chip3Title: 'Invoice issued',
    chip3Text: 'Sequential number, locked',
    marqueeTitle: 'What LaunchPilot covers',
    m1: 'Client records',
    m2: 'Sales pipeline',
    m3: 'Quotes',
    m4: 'Compliant invoices',
    m5: 'Credit notes',
    m6: 'Deposits & partial payments',
    m7: 'Recurring billing',
    m8: 'Cash-flow forecast',
    m9: 'Tasks & reminders',
    m10: 'Automations',
    m11: 'Accounting export',
    featuresKicker: 'Everything in one place',
    featuresTitle: 'Run your business without juggling five tools',
    featuresLead:
      'From the first contact to the last payment, every step lives in the same app — and the numbers always add up.',
    kLead: 'Lead',
    kProposal: 'Proposal',
    kWon: 'Won',
    f1Title: 'Clients & pipeline',
    f1Text:
      'Client records with history and attachments, and a drag-and-drop sales pipeline with follow-up dates.',
    stamp: 'Paid',
    f2Title: 'Compliant invoices',
    f2Text: 'Sequential numbering, legal mentions, credit notes and PDF — locked once issued.',
    f3Title: 'Cash-flow forecast',
    f3Text: 'What you will collect over the next 90 days, week by week, with deposits deducted.',
    f5Title: 'Reminders that reach you',
    f5Text: 'Tasks, calendar and Windows notifications when a reminder is due.',
    flowWhen: 'When',
    flowTrigger: 'A quote gets no reply for 7 days',
    flowThen: 'Then',
    flowAction: 'Create a follow-up task',
    f7Title: 'Automations',
    f7Text:
      '“When… then…” rules that create follow-ups and update statuses, with a full run history.',
    f6Title: 'Insights you can trust',
    f6Text: 'Every recommendation shows its source and the rule applied. No guesswork.',
    f8Title: 'Accounting export & backup',
    f8Text:
      'One file per period for your accountant, and a complete backup of your data in one click.',
    t1Title: 'Secure by design',
    t1Text:
      'Each organisation’s data is isolated by the database itself, with roles, an audit log and updates installed only with your consent.',
    tourKicker: 'Product tour',
    tourTitle: 'Built for the way you actually work',
    s1Kicker: 'Sales pipeline',
    s1Title: 'Never lose track of a deal',
    s1Text:
      'See every opportunity by stage, its value and probability. Overdue follow-ups stand out so nothing slips through.',
    altPipeline: 'Sales pipeline in four stages with amounts, probabilities and follow-up alerts.',
    s2Kicker: 'Invoicing',
    s2Title: 'Invoices that follow the rules',
    s2Text:
      'Issue, record deposits, send reminders and cancel with a credit note. The remaining balance is always up to date.',
    altInvoice: 'Invoice with a deposit already paid, balance due and the payments panel.',
    s3Kicker: 'Cash flow',
    s3Title: 'Know what is coming in',
    s3Text:
      'Expected payments week by week over 90 days, calculated from your invoices — with the assumption stated in plain words.',
    altCashflow: 'Cash flow forecast: overdue amount, 30, 60 and 90 day totals and a weekly chart.',
    howKicker: 'Up and running in minutes',
    howTitle: 'Three steps to take off',
    h1Title: 'Download',
    h1Text: 'Install LaunchPilot on Windows in under a minute. Updates are handled for you.',
    h2Title: 'Set up your organisation',
    h2Text:
      'Add your legal details and logo, import your clients from a CSV file, invite your team.',
    h3Title: 'Get paid',
    h3Text: 'Send quotes, issue invoices, record payments and watch your cash flow.',
    pricingKicker: 'Pricing',
    pricingTitle: 'Simple plans that grow with you',
    pricingLead: 'Start with a free 3-day trial. Prices exclude VAT.',
    periodLabel: 'Billing period',
    monthly: 'Monthly',
    yearly: 'Yearly',
    yearlyOffer: '2 months free',
    perMonth: 'excl. VAT / month',
    perYear: 'excl. VAT / year',
    yearNote: (perMonth, saving) => `i.e. ${perMonth} per month · ${saving} saved`,
    popular: 'For growing teams',
    starterTagline: 'To get started as a freelancer.',
    proTagline: 'For small, growing teams.',
    businessTagline: 'For SMBs with high volumes.',
    starter1: '2 members and invitations',
    starter2: '100 clients',
    starter3: '20 quotes per month',
    starter4: '3 automations',
    pro1: '10 members and invitations',
    pro2: '2,000 clients',
    pro3: '500 quotes per month',
    pro4: '25 automations',
    business1: '50 members and invitations',
    business2: 'Unlimited clients',
    business3: 'Unlimited quotes',
    business4: 'Unlimited automations',
    startTrial: 'Start free trial',
    faqKicker: 'Questions',
    faqTitle: 'Frequently asked questions',
    q1: 'What do I need to run LaunchPilot?',
    a1: 'A PC running Windows 10 or 11 (64-bit) and an internet connection: your data is stored on the server so your team works on the same information.',
    q2: 'Windows shows a warning when I run the installer. Is that normal?',
    a2: 'Yes. The installer is not code-signed yet, so Windows SmartScreen may show “Windows protected your PC”. Click “More info”, then “Run anyway”. Only download LaunchPilot from this website.',
    q3: 'How do updates work?',
    a3: 'LaunchPilot checks for new versions automatically. You choose when to download and restart — nothing is installed without your consent.',
    q4: 'Can I get my data out?',
    a4: 'At any time: CSV exports, an accounting export per period and a complete backup file of your organisation’s data.',
    q5: 'What happens when I reach a plan limit?',
    a5: 'New items of that kind are refused (one more client, for example). Your existing data stays intact and editable.',
    finalTitle: 'Ready to take off?',
    finalText: 'Download LaunchPilot and start your free 3-day trial.',
    tagline: 'The copilot for your business.',
    footerProduct: 'Product',
    footerResources: 'Resources',
    allReleases: 'All releases',
  },
  fr: {
    documentTitle: 'LaunchPilot — Le copilote des indépendants et petites équipes',
    description:
      'Clients, pipeline commercial, devis, factures conformes, règlements et trésorerie dans une application Windows rapide. Essai gratuit de 3 jours.',
    langButton: 'EN',
    langButtonLabel: 'Show the website in English',
    skip: 'Aller au contenu',
    navLabel: 'Principal',
    navFeatures: 'Fonctionnalités',
    navTour: 'Visite',
    navPricing: 'Tarifs',
    navFaq: 'Questions',
    navDownload: 'Télécharger',
    announceTag: 'Nouveau',
    announce: 'Paiements partiels et trésorerie à 90 jours',
    heroTitle1: 'Le copilote d’entreprise',
    heroTitle2: 'des indépendants et petites équipes',
    heroLead:
      'Clients, pipeline commercial, devis, factures conformes, règlements et trésorerie — dans une application rapide et sûre qui vous dit ce qui demande votre attention.',
    downloadWindows: 'Télécharger pour Windows',
    seeFeatures: 'Découvrir les fonctionnalités',
    requirements: 'Windows 10 et 11 · 64 bits',
    version: (version, size) => `Version ${version} · ${size} Mo`,
    trial: 'Essai gratuit de 3 jours, sans carte bancaire',
    altDashboard:
      'Tableau de bord de LaunchPilot : pipeline ouvert, chiffre gagné, tâches, facturation et graphique du chiffre d’affaires.',
    chip1Title: 'Règlement enregistré',
    chip2Title: 'Relance à faire',
    chip2Text: 'Refonte du site · Durand & Fils',
    chip3Title: 'Facture émise',
    chip3Text: 'Numéro continu, document figé',
    marqueeTitle: 'Ce que couvre LaunchPilot',
    m1: 'Fiches clients',
    m2: 'Pipeline commercial',
    m3: 'Devis',
    m4: 'Factures conformes',
    m5: 'Avoirs',
    m6: 'Acomptes et paiements partiels',
    m7: 'Facturation récurrente',
    m8: 'Trésorerie prévisionnelle',
    m9: 'Tâches et rappels',
    m10: 'Automatisations',
    m11: 'Export comptable',
    featuresKicker: 'Tout au même endroit',
    featuresTitle: 'Pilotez votre activité sans jongler entre cinq outils',
    featuresLead:
      'Du premier contact au dernier paiement, chaque étape vit dans la même application — et les chiffres tombent toujours juste.',
    kLead: 'Piste',
    kProposal: 'Proposition',
    kWon: 'Gagnée',
    f1Title: 'Clients et pipeline',
    f1Text:
      'Fiches clients avec historique et pièces jointes, et un pipeline commercial en glisser-déposer avec dates de relance.',
    stamp: 'Payée',
    f2Title: 'Factures conformes',
    f2Text:
      'Numérotation continue, mentions légales, avoirs et PDF — documents figés une fois émis.',
    f3Title: 'Trésorerie prévisionnelle',
    f3Text: 'Ce que vous allez encaisser sur 90 jours, semaine par semaine, acomptes déduits.',
    f5Title: 'Des rappels qui vous trouvent',
    f5Text: 'Tâches, agenda et notifications Windows à l’heure du rappel.',
    flowWhen: 'Quand',
    flowTrigger: 'Un devis reste sans réponse 7 jours',
    flowThen: 'Alors',
    flowAction: 'Créer une tâche de relance',
    f7Title: 'Automatisations',
    f7Text:
      'Des règles « quand… alors… » qui créent des relances et mettent à jour les statuts, avec l’historique complet.',
    f6Title: 'Des recommandations fiables',
    f6Text: 'Chaque recommandation cite sa source et la règle appliquée. Aucune devinette.',
    f8Title: 'Export comptable et sauvegarde',
    f8Text:
      'Un fichier par période pour votre expert-comptable, et une sauvegarde complète de vos données en un clic.',
    t1Title: 'Sûr par conception',
    t1Text:
      'Les données de chaque organisation sont isolées par la base elle-même, avec des rôles, un journal d’audit et des mises à jour installées uniquement avec votre accord.',
    tourKicker: 'Visite guidée',
    tourTitle: 'Pensé pour votre façon de travailler',
    s1Kicker: 'Pipeline commercial',
    s1Title: 'Ne perdez plus aucune affaire de vue',
    s1Text:
      'Chaque opportunité par étape, avec son montant et sa probabilité. Les relances en retard ressortent : rien ne vous échappe.',
    altPipeline:
      'Pipeline commercial en quatre étapes avec montants, probabilités et alertes de relance.',
    s2Kicker: 'Facturation',
    s2Title: 'Des factures dans les règles',
    s2Text:
      'Émettez, enregistrez les acomptes, relancez et annulez par avoir. Le reste dû est toujours à jour.',
    altInvoice: 'Facture avec un acompte déjà réglé, le reste dû et le panneau des règlements.',
    s3Kicker: 'Trésorerie',
    s3Title: 'Sachez ce qui va rentrer',
    s3Text:
      'Les encaissements attendus semaine par semaine sur 90 jours, calculés à partir de vos factures — avec l’hypothèse écrite en clair.',
    altCashflow:
      'Trésorerie prévisionnelle : retards, totaux à 30, 60 et 90 jours et graphique hebdomadaire.',
    howKicker: 'Opérationnel en quelques minutes',
    howTitle: 'Trois étapes pour décoller',
    h1Title: 'Téléchargez',
    h1Text:
      'Installez LaunchPilot sur Windows en moins d’une minute. Les mises à jour suivent seules.',
    h2Title: 'Configurez votre organisation',
    h2Text:
      'Ajoutez vos informations légales et votre logo, importez vos clients depuis un CSV, invitez votre équipe.',
    h3Title: 'Encaissez',
    h3Text:
      'Envoyez des devis, émettez vos factures, enregistrez les règlements et suivez votre trésorerie.',
    pricingKicker: 'Tarifs',
    pricingTitle: 'Des offres simples qui grandissent avec vous',
    pricingLead: 'Commencez par un essai gratuit de 3 jours. Prix hors taxes.',
    periodLabel: 'Période de facturation',
    monthly: 'Mensuel',
    yearly: 'Annuel',
    yearlyOffer: '2 mois offerts',
    perMonth: 'HT / mois',
    perYear: 'HT / an',
    yearNote: (perMonth, saving) => `soit ${perMonth} par mois · ${saving} économisés`,
    popular: 'Pour les équipes',
    starterTagline: 'Pour démarrer en indépendant.',
    proTagline: 'Pour les petites équipes qui grandissent.',
    businessTagline: 'Pour les PME aux volumes importants.',
    starter1: '2 membres et invitations',
    starter2: '100 clients',
    starter3: '20 devis par mois',
    starter4: '3 automatisations',
    pro1: '10 membres et invitations',
    pro2: '2 000 clients',
    pro3: '500 devis par mois',
    pro4: '25 automatisations',
    business1: '50 membres et invitations',
    business2: 'Clients illimités',
    business3: 'Devis illimités',
    business4: 'Automatisations illimitées',
    startTrial: 'Commencer l’essai gratuit',
    faqKicker: 'Questions',
    faqTitle: 'Questions fréquentes',
    q1: 'De quoi ai-je besoin pour utiliser LaunchPilot ?',
    a1: 'Un PC sous Windows 10 ou 11 (64 bits) et une connexion Internet : vos données sont stockées sur le serveur pour que toute votre équipe travaille sur les mêmes informations.',
    q2: 'Windows affiche un avertissement au lancement de l’installateur. Est-ce normal ?',
    a2: 'Oui. L’installateur n’est pas encore signé : Windows SmartScreen peut afficher « Windows a protégé votre ordinateur ». Cliquez sur « Informations complémentaires », puis « Exécuter quand même ». Téléchargez LaunchPilot uniquement depuis ce site.',
    q3: 'Comment fonctionnent les mises à jour ?',
    a3: 'LaunchPilot recherche automatiquement les nouvelles versions. Vous choisissez quand télécharger et redémarrer — rien ne s’installe sans votre accord.',
    q4: 'Puis-je récupérer mes données ?',
    a4: 'À tout moment : exports CSV, export comptable par période et fichier de sauvegarde complet des données de votre organisation.',
    q5: 'Que se passe-t-il quand j’atteins une limite de mon offre ?',
    a5: 'Les nouvelles créations concernées sont refusées (un client de plus, par exemple). Vos données existantes restent intactes et modifiables.',
    finalTitle: 'Prêt à décoller ?',
    finalText: 'Téléchargez LaunchPilot et commencez votre essai gratuit de 3 jours.',
    tagline: 'Le copilote de votre activité.',
    footerProduct: 'Produit',
    footerResources: 'Ressources',
    allReleases: 'Toutes les versions',
  },
}

// Textes propres à la page « Nouveautés » (changelog.html).
Object.assign(TEXTS.en, {
  changelogDocumentTitle: 'Changelog — LaunchPilot',
  changelogDescription: 'Every LaunchPilot release and what changed.',
  navChangelog: 'Changelog',
  changelogTag: 'Changelog',
  changelogTitle1: 'Always moving',
  changelogTitle2: 'forward',
  changelogLead:
    'Every release of LaunchPilot and what it changed. Updates install from inside the app, only when you say so.',
  changelogFinal: 'The latest version is one click away.',
  releasesTitle: 'Releases',
  tagNew: 'New',
  tagImproved: 'Improved',
  tagFixed: 'Fixed',
  latestBadge: 'Latest',
  versionLabel: (version) => `Version ${version}`,
  firstRelease: 'First release',
})
Object.assign(TEXTS.fr, {
  changelogDocumentTitle: 'Nouveautés — LaunchPilot',
  changelogDescription: 'Toutes les versions de LaunchPilot et ce qu’elles ont changé.',
  navChangelog: 'Nouveautés',
  changelogTag: 'Nouveautés',
  changelogTitle1: 'Toujours plus',
  changelogTitle2: 'loin',
  changelogLead:
    'Chaque version de LaunchPilot et ce qu’elle a changé. Les mises à jour s’installent depuis l’application, uniquement quand vous le décidez.',
  changelogFinal: 'La dernière version est à un clic.',
  releasesTitle: 'Versions',
  tagNew: 'Nouveau',
  tagImproved: 'Amélioré',
  tagFixed: 'Corrigé',
  latestBadge: 'Dernière version',
  versionLabel: (version) => `Version ${version}`,
  firstRelease: 'Première version',
})

// Textes propres à la page « Tarifs » (pricing.html) et à l'aperçu de l'accueil.
Object.assign(TEXTS.en, {
  pricingDocumentTitle: 'Pricing — LaunchPilot',
  pricingDescription:
    'LaunchPilot plans from €15 excl. VAT a month. Every feature in every plan, free 3-day trial.',
  pricingHeroTitle1: 'Simple pricing.',
  pricingHeroTitle2: 'No surprises.',
  pricingHeroLead:
    'Every feature in every plan. Plans differ only by volume: members, clients, quotes and automations.',
  plansTitle: 'Plans',
  billedMonth: 'Billed every month',
  billedYear: 'Billed once a year',
  fitsLabel: 'Fits your needs',
  trust1: 'Free 3-day trial',
  trust2: 'No credit card required',
  trust3: 'Prices excl. VAT',
  trust4: 'Data hosted in the EU',
  finderKicker: 'Plan finder',
  finderTitle: 'Which plan fits you?',
  finderLead: 'Describe your business. We suggest the smallest plan that covers it.',
  needMembers: 'Team members',
  needClients: 'Clients',
  needQuotes: 'Quotes per month',
  needAutomations: 'Automations',
  finderResult: 'Recommended plan',
  atLeast: (value) => `${value}+`,
  finderPrice: (price, per) => `${price} ${per}`,
  finderReason: (members, clients, quotes, automations) =>
    `Up to ${members} members, ${clients} clients, ${quotes} quotes a month and ${automations} automations.`,
  finderReasonUnlimited: (members) =>
    `Up to ${members} members, with unlimited clients, quotes and automations.`,
  meterUsage: (need, limit) => `${need} of ${limit}`,
  meterUnlimited: (need) => `${need} · no limit`,
  compareKicker: 'Compare',
  compareTitle: 'Every plan, side by side',
  compareCaption: 'Plan comparison',
  colFeature: 'Feature',
  groupLimits: 'Limits',
  groupIncluded: 'Included in every plan',
  unlimited: 'Unlimited',
  includedCell: 'Included',
  rowMembers: 'Members and invitations',
  rowClients: 'Clients',
  rowQuotes: 'Quotes per month',
  rowAutomations: 'Automations',
  rowPipeline: 'Client records and sales pipeline',
  rowInvoices: 'Quotes, compliant invoices and credit notes',
  rowRecurring: 'Recurring invoices',
  rowPayments: 'Deposits and partial payments',
  rowCashflow: '90-day cash-flow forecast',
  rowTasks: 'Tasks, calendar and reminders',
  rowInsights: 'Sourced recommendations',
  rowExport: 'Accounting export, CSV import and backup',
  rowRoles: 'Roles and audit log',
  rowApp: 'Windows app in English and French',
  pricingFaqTitle: 'Pricing questions',
  pq1: 'Do I need a credit card for the trial?',
  pa1: 'No. Download LaunchPilot, create your organisation and use it for 3 days without entering any payment details.',
  pq2: 'Are some features reserved for higher plans?',
  pa2: 'No. Every plan includes every feature. Plans differ only by the number of members, clients, quotes per month and automations.',
  pq3: 'How does yearly billing work?',
  pa3: 'You pay for 10 months and get 12: two months free compared with monthly billing.',
  pq4: 'Are prices shown with or without VAT?',
  pa4: 'Without. All prices are shown excluding VAT; VAT is added according to the rules that apply to your business.',
  pq6: 'Where is my data stored?',
  pa6: 'In the European Union (Ireland), in a database where each organisation’s data is isolated from the others.',
  teaserTitle: (price) => `Plans from ${price} excl. VAT a month`,
  teaserLead: 'Every feature in every plan, a free 3-day trial and no credit card required.',
  seePricing: 'See pricing',
})
Object.assign(TEXTS.fr, {
  pricingDocumentTitle: 'Tarifs — LaunchPilot',
  pricingDescription:
    'Les offres LaunchPilot dès 15 € HT par mois. Toutes les fonctionnalités dans chaque offre, essai gratuit de 3 jours.',
  pricingHeroTitle1: 'Des tarifs simples.',
  pricingHeroTitle2: 'Sans surprise.',
  pricingHeroLead:
    'Toutes les fonctionnalités dans chaque offre. Seuls les volumes changent : membres, clients, devis et automatisations.',
  plansTitle: 'Offres',
  billedMonth: 'Facturé chaque mois',
  billedYear: 'Facturé une fois par an',
  fitsLabel: 'Adaptée à vos besoins',
  trust1: 'Essai gratuit de 3 jours',
  trust2: 'Sans carte bancaire',
  trust3: 'Prix hors taxes',
  trust4: 'Données hébergées dans l’UE',
  finderKicker: 'Assistant de choix',
  finderTitle: 'Quelle offre vous correspond ?',
  finderLead: 'Décrivez votre activité : nous vous suggérons la plus petite offre qui la couvre.',
  needMembers: 'Membres de l’équipe',
  needClients: 'Clients',
  needQuotes: 'Devis par mois',
  needAutomations: 'Automatisations',
  finderResult: 'Offre conseillée',
  atLeast: (value) => `${value} et plus`,
  finderPrice: (price, per) => `${price} ${per}`,
  finderReason: (members, clients, quotes, automations) =>
    `Jusqu’à ${members} membres, ${clients} clients, ${quotes} devis par mois et ${automations} automatisations.`,
  finderReasonUnlimited: (members) =>
    `Jusqu’à ${members} membres, avec clients, devis et automatisations illimités.`,
  meterUsage: (need, limit) => `${need} sur ${limit}`,
  meterUnlimited: (need) => `${need} · sans limite`,
  compareKicker: 'Comparer',
  compareTitle: 'Toutes les offres, côte à côte',
  compareCaption: 'Comparaison des offres',
  colFeature: 'Fonctionnalité',
  groupLimits: 'Limites',
  groupIncluded: 'Inclus dans chaque offre',
  unlimited: 'Illimité',
  includedCell: 'Inclus',
  rowMembers: 'Membres et invitations',
  rowClients: 'Clients',
  rowQuotes: 'Devis par mois',
  rowAutomations: 'Automatisations',
  rowPipeline: 'Fiches clients et pipeline commercial',
  rowInvoices: 'Devis, factures conformes et avoirs',
  rowRecurring: 'Factures récurrentes',
  rowPayments: 'Acomptes et paiements partiels',
  rowCashflow: 'Trésorerie prévisionnelle à 90 jours',
  rowTasks: 'Tâches, agenda et rappels',
  rowInsights: 'Recommandations sourcées',
  rowExport: 'Export comptable, import CSV et sauvegarde',
  rowRoles: 'Rôles et journal d’audit',
  rowApp: 'Application Windows en anglais et en français',
  pricingFaqTitle: 'Questions sur les tarifs',
  pq1: 'Faut-il une carte bancaire pour l’essai ?',
  pa1: 'Non. Téléchargez LaunchPilot, créez votre organisation et utilisez-la pendant 3 jours sans saisir aucun moyen de paiement.',
  pq2: 'Certaines fonctionnalités sont-elles réservées aux offres supérieures ?',
  pa2: 'Non. Chaque offre comprend toutes les fonctionnalités. Seuls changent le nombre de membres, de clients, de devis par mois et d’automatisations.',
  pq3: 'Comment fonctionne la facturation annuelle ?',
  pa3: 'Vous payez 10 mois et profitez de 12 : deux mois offerts par rapport à la facturation mensuelle.',
  pq4: 'Les prix sont-ils affichés hors taxes ?',
  pa4: 'Oui. Tous les prix sont hors taxes ; la TVA s’ajoute selon les règles applicables à votre entreprise.',
  pq6: 'Où sont stockées mes données ?',
  pa6: 'Dans l’Union européenne (Irlande), dans une base où les données de chaque organisation sont isolées des autres.',
  teaserTitle: (price) => `Des offres dès ${price} HT par mois`,
  teaserLead:
    'Toutes les fonctionnalités dans chaque offre, un essai gratuit de 3 jours, sans carte bancaire.',
  seePricing: 'Voir les tarifs',
})

// Page de retour après un paiement Stripe (billing.html?status=success|cancel|portal).
Object.assign(TEXTS.en, {
  billingDocumentTitle: 'Subscription — LaunchPilot',
  billingDescription: 'Return to LaunchPilot after payment.',
  billingBack: 'Back to LaunchPilot',
  billingNote: 'You can close this tab. LaunchPilot updates on its own.',
  billing: {
    success: [
      'Thank you!',
      'Your payment has been received. Go back to LaunchPilot: your subscription appears there within a few seconds.',
    ],
    cancel: [
      'Payment cancelled',
      'Nothing was charged. You can choose a plan again from LaunchPilot whenever you like.',
    ],
    portal: ['All set', 'Your changes are saved. Go back to LaunchPilot to continue.'],
  },
})
Object.assign(TEXTS.fr, {
  billingDocumentTitle: 'Abonnement — LaunchPilot',
  billingDescription: 'Retour dans LaunchPilot après le paiement.',
  billingBack: 'Retourner dans LaunchPilot',
  billingNote: 'Vous pouvez fermer cet onglet. LaunchPilot se met à jour tout seul.',
  billing: {
    success: [
      'Merci !',
      'Votre paiement est bien reçu. Retournez dans LaunchPilot : votre abonnement y apparaît en quelques secondes.',
    ],
    cancel: [
      'Paiement annulé',
      'Rien n’a été prélevé. Vous pouvez choisir une offre depuis LaunchPilot quand vous le souhaitez.',
    ],
    portal: [
      'C’est enregistré',
      'Vos modifications sont prises en compte. Retournez dans LaunchPilot pour continuer.',
    ],
  },
})

/** Texte de la page de retour selon le paramètre status (valeurs inconnues : succès exclu). */
function renderBilling() {
  const title = document.getElementById('billing-title')
  if (!title) return
  const status = new URLSearchParams(location.search).get('status')
  const key = status === 'success' || status === 'portal' ? status : 'cancel'
  const [heading, text] = TEXTS[state.language].billing[key]
  title.textContent = heading
  document.getElementById('billing-text').textContent = text
  document.getElementById('billing-icon').dataset.status = key === 'cancel' ? 'cancel' : 'success'
}

// Mêmes limites que la base de données (private.plan_limit) : à garder synchronisées.
// null = illimité.
const LIMITS = {
  starter: { members: 2, clients: 100, quotes: 20, automations: 3 },
  pro: { members: 10, clients: 2000, quotes: 500, automations: 25 },
  business: { members: 50, clients: null, quotes: null, automations: null },
}
const PLAN_ORDER = ['starter', 'pro', 'business']
const PLAN_NAMES = { starter: 'Starter', pro: 'Pro', business: 'Business' }

/**
 * Historique des versions (la plus récente en premier). À compléter à chaque publication :
 * uniquement ce qui a réellement changé pour l'utilisateur.
 */
const CHANGELOG = [
  {
    version: '0.8.1',
    date: '2026-11-03',
    title: {
      en: 'Email links that open the app',
      fr: 'Des liens d’e-mail qui ouvrent l’application',
    },
    changes: [
      {
        type: 'new',
        en: 'Account confirmation and password reset links open LaunchPilot directly.',
        fr: 'Les liens de confirmation de compte et de nouveau mot de passe ouvrent directement LaunchPilot.',
      },
      {
        type: 'improved',
        en: 'Sign-in links are single-use and only work on the computer that asked for them.',
        fr: 'Les liens de connexion ne servent qu’une fois et ne fonctionnent que sur l’ordinateur qui les a demandés.',
      },
    ],
  },
  {
    version: '0.8.0',
    date: '2026-11-03',
    title: { en: 'LaunchPilot goes online', fr: 'LaunchPilot passe en ligne' },
    changes: [
      {
        type: 'new',
        en: 'Your data is hosted online in the European Union: no local server to install.',
        fr: 'Vos données sont hébergées en ligne dans l’Union européenne : plus aucun serveur local à installer.',
      },
      {
        type: 'improved',
        en: 'Your whole team works on the same information from any computer.',
        fr: 'Toute votre équipe travaille sur les mêmes informations, depuis n’importe quel ordinateur.',
      },
    ],
  },
  {
    version: '0.7.0',
    date: '2026-11-03',
    title: { en: 'Payments and cash flow', fr: 'Règlements et trésorerie' },
    changes: [
      {
        type: 'new',
        en: 'Partial payments and deposits on invoices, with the balance due always up to date.',
        fr: 'Règlements partiels et acomptes sur les factures, avec un reste dû toujours à jour.',
      },
      {
        type: 'new',
        en: '90-day cash-flow forecast, week by week, based on your invoices.',
        fr: 'Trésorerie prévisionnelle sur 90 jours, semaine par semaine, à partir de vos factures.',
      },
      {
        type: 'fixed',
        en: 'Removing a member no longer fails when they created issued documents.',
        fr: 'Retirer un membre n’échoue plus lorsqu’il a créé des documents émis.',
      },
    ],
  },
  {
    version: '0.6.0',
    date: '2026-11-03',
    title: { en: 'English and French', fr: 'Anglais et français' },
    changes: [
      {
        type: 'new',
        en: 'The interface is available in English (default) and French, in Settings → Language.',
        fr: 'L’interface est disponible en anglais (par défaut) et en français, dans Paramètres → Langue.',
      },
      {
        type: 'improved',
        en: 'Window buttons redesigned to match the theme.',
        fr: 'Boutons de la fenêtre redessinés, assortis au thème.',
      },
    ],
  },
  {
    version: '0.5.5',
    date: '2026-11-03',
    title: { en: 'Updates, startup and subscription', fr: 'Mises à jour, démarrage et abonnement' },
    changes: [
      {
        type: 'new',
        en: 'Updates are offered inside the app; nothing downloads or installs without your consent.',
        fr: 'Les mises à jour sont proposées dans l’application ; rien ne se télécharge ni ne s’installe sans votre accord.',
      },
      {
        type: 'new',
        en: 'Notification area icon and optional launch with Windows.',
        fr: 'Icône dans la zone de notification et lancement avec Windows au choix.',
      },
      {
        type: 'new',
        en: 'Subscription page: plan, usage, monthly and yearly prices, plan comparison.',
        fr: 'Page Abonnement : offre, utilisation, prix mensuels et annuels, comparaison des offres.',
      },
      {
        type: 'improved',
        en: 'Animated loading screen at launch.',
        fr: 'Écran de chargement animé au lancement.',
      },
    ],
  },
  {
    version: '0.4.0',
    date: '2026-11-01',
    title: { en: 'Recurring billing', fr: 'Facturation récurrente' },
    changes: [
      {
        type: 'new',
        en: 'Recurring invoices: a draft is prepared at every due date.',
        fr: 'Factures récurrentes : un brouillon est préparé à chaque échéance.',
      },
      {
        type: 'new',
        en: 'Accounting export of invoices and credit notes by period.',
        fr: 'Export comptable des factures et avoirs par période.',
      },
      {
        type: 'new',
        en: 'Your company logo on quotes and invoices.',
        fr: 'Le logo de votre entreprise sur les devis et factures.',
      },
      {
        type: 'improved',
        en: 'Clearer messages when the connection is lost.',
        fr: 'Messages plus clairs en cas de perte de connexion.',
      },
    ],
  },
  {
    version: '0.3.2',
    date: '2026-11-01',
    title: { en: 'Credit notes and reminders', fr: 'Avoirs et relances' },
    changes: [
      {
        type: 'new',
        en: 'Credit notes, email payment reminders and a billing overview on the dashboard.',
        fr: 'Avoirs, relances de paiement par e-mail et synthèse de facturation au tableau de bord.',
      },
      {
        type: 'new',
        en: 'Full backup of your organization’s data in one click.',
        fr: 'Sauvegarde complète des données de votre organisation en un clic.',
      },
      {
        type: 'improved',
        en: 'Official logo everywhere, with a crisp taskbar icon.',
        fr: 'Logo officiel partout, avec une icône nette dans la barre des tâches.',
      },
    ],
  },
  {
    version: '0.2.0',
    date: '2026-10-31',
    title: { en: 'Compliant invoicing', fr: 'Facturation conforme' },
    changes: [
      {
        type: 'new',
        en: 'Compliant invoices with sequential numbering, a product catalogue and PDF export.',
        fr: 'Factures conformes à numérotation continue, catalogue de produits et export PDF.',
      },
      {
        type: 'new',
        en: 'Client import from CSV (Excel, Google Contacts, other CRMs) and attachments on client records.',
        fr: 'Import de clients par CSV (Excel, Google Contacts, autres CRM) et pièces jointes sur les fiches clients.',
      },
      {
        type: 'new',
        en: 'Windows notifications for task reminders.',
        fr: 'Notifications Windows pour les rappels de tâches.',
      },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-10-31',
    first: true,
    title: { en: 'LaunchPilot takes off', fr: 'LaunchPilot décolle' },
    changes: [
      {
        type: 'new',
        en: 'Clients, sales pipeline, tasks, quotes and calendar in one app.',
        fr: 'Clients, pipeline commercial, tâches, devis et agenda dans une seule application.',
      },
      {
        type: 'new',
        en: 'Dashboard, sourced recommendations and “when… then…” automations.',
        fr: 'Tableau de bord, recommandations sourcées et automatisations « quand… alors… ».',
      },
      {
        type: 'new',
        en: 'Teams with roles, each organization’s data isolated by the database.',
        fr: 'Équipes avec rôles, données de chaque organisation isolées par la base.',
      },
      {
        type: 'new',
        en: 'Windows desktop app.',
        fr: 'Application de bureau pour Windows.',
      },
    ],
  },
]

const LOCALES = { en: 'en-GB', fr: 'fr-FR' }

const state = {
  language: readLanguage(),
  period: 'month',
  /** Dernière version publiée, une fois connue. */
  release: null,
}

function readLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'fr' ? 'fr' : 'en'
  } catch {
    return 'en'
  }
}

function formatPrice(cents) {
  const whole = cents % 100 === 0
  return new Intl.NumberFormat(LOCALES[state.language], {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(cents / 100)
}

/* ------------------------------ Langue ------------------------------ */

function formatNumber(value) {
  return new Intl.NumberFormat(LOCALES[state.language]).format(value)
}

/** Titre et description de chaque page, dans la langue choisie. */
const PAGE_META = {
  changelog: ['changelogDocumentTitle', 'changelogDescription'],
  pricing: ['pricingDocumentTitle', 'pricingDescription'],
  billing: ['billingDocumentTitle', 'billingDescription'],
}

function render() {
  const text = TEXTS[state.language]
  const [titleKey, descriptionKey] = PAGE_META[document.body.dataset.page] ?? [
    'documentTitle',
    'description',
  ]
  document.documentElement.lang = state.language
  document.title = text[titleKey]
  document.querySelector('meta[name="description"]')?.setAttribute('content', text[descriptionKey])

  for (const element of document.querySelectorAll('[data-i18n]')) {
    const value = text[element.dataset.i18n]
    if (typeof value === 'string') element.textContent = value
  }
  for (const element of document.querySelectorAll('[data-i18n-alt]')) {
    element.setAttribute('alt', text[element.dataset.i18nAlt])
  }
  for (const element of document.querySelectorAll('[data-i18n-aria]')) {
    element.setAttribute('aria-label', text[element.dataset.i18nAria])
  }

  const toggle = document.getElementById('lang-toggle')
  toggle.textContent = text.langButton
  toggle.setAttribute('aria-label', text.langButtonLabel)

  const teaser = document.querySelector('.teaser-title')
  if (teaser) teaser.textContent = text.teaserTitle(formatPrice(PRICES.starter.month))

  fillMarquee()
  renderPrices(false)
  renderCompare()
  renderChangelog()
  renderBilling()

  if (state.release) {
    const label = `${text.version(state.release.version, state.release.size)} · ${text.requirements}`
    for (const element of document.querySelectorAll('.release-meta')) element.textContent = label
  }
}

/* ------------------------------ Prix ------------------------------ */

const shown = new Map()

/** Fait défiler un prix jusqu'à sa nouvelle valeur (immédiat si mouvements réduits). */
function animateAmount(element, target) {
  const from = shown.get(element) ?? target
  shown.set(element, target)
  if (reducedMotion || from === target) {
    element.textContent = formatPrice(target)
    return
  }
  const start = performance.now()
  const duration = 700
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - Math.pow(1 - t, 4)
    const value = Math.round((from + (target - from) * eased) / 100) * 100
    element.textContent = formatPrice(t === 1 ? target : value)
    if (t < 1 && shown.get(element) === target) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function renderPrices(animate) {
  const text = TEXTS[state.language]
  for (const plan of document.querySelectorAll('.plan')) {
    const price = PRICES[plan.dataset.plan]
    const amount = plan.querySelector('.amount')
    if (animate) animateAmount(amount, price[state.period])
    else {
      shown.set(amount, price[state.period])
      amount.textContent = formatPrice(price[state.period])
    }
    plan.querySelector('.per').textContent = state.period === 'month' ? text.perMonth : text.perYear
    plan.querySelector('.price-note').textContent =
      state.period === 'year'
        ? text.yearNote(
            formatPrice(Math.round(price.year / 12)),
            formatPrice(price.month * 12 - price.year),
          )
        : ' '
    const billed = plan.querySelector('.billed')
    if (billed) billed.textContent = state.period === 'year' ? text.billedYear : text.billedMonth
  }
  for (const cell of document.querySelectorAll('.compare-price')) {
    const plan = cell.closest('[data-plan]').dataset.plan
    const per = state.period === 'month' ? text.perMonth : text.perYear
    cell.textContent = `${formatPrice(PRICES[plan][state.period])} ${per}`
  }
  if (document.getElementById('finder-plan')) renderFinder()
  for (const button of document.querySelectorAll('.period-btn')) {
    button.setAttribute('aria-pressed', String(button.dataset.period === state.period))
  }
  moveIndicator()
}

/** Pastille glissante sous le bouton de période actif. */
function moveIndicator() {
  const indicator = document.querySelector('.period-indicator')
  const active = document.querySelector('.period-btn[aria-pressed="true"]')
  if (!indicator || !active) return
  indicator.style.width = `${active.offsetWidth}px`
  indicator.style.transform = `translateX(${active.offsetLeft}px)`
}

for (const button of document.querySelectorAll('.period-btn')) {
  button.addEventListener('click', () => {
    state.period = button.dataset.period
    renderPrices(true)
  })
}
window.addEventListener('resize', moveIndicator)

/* ------------------------------ Dernière version ------------------------------ */

async function loadRelease() {
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
    if (!response.ok) return
    const release = await response.json()
    const installer = release.assets?.find((asset) => /\.exe$/i.test(asset.name))
    if (!installer) return
    for (const link of document.querySelectorAll('.download-link')) {
      link.href = installer.browser_download_url
    }
    state.release = {
      version: String(release.tag_name ?? '').replace(/^v/, ''),
      size: Math.round(installer.size / 1024 / 1024),
    }
    render()
  } catch {
    // Hors ligne ou limite de l'API atteinte : les liens mènent à la page des versions.
  }
}

/* ------------------------------ Bandeau défilant ------------------------------ */

/** La seconde liste (masquée aux lecteurs d'écran) recopie la première : boucle sans saut. */
function fillMarquee() {
  const [first, second] = document.querySelectorAll('.marquee-list')
  if (!first || !second) return
  second.replaceChildren(...[...first.children].map((item) => item.cloneNode(true)))
}

/* ------------------------------ Tableau comparatif ------------------------------ */

function limitLabel(value) {
  return value === null ? TEXTS[state.language].unlimited : formatNumber(value)
}

function renderCompare() {
  const text = TEXTS[state.language]
  for (const row of document.querySelectorAll('.compare tr[data-limit]')) {
    ;[...row.querySelectorAll('td')].forEach((cell, index) => {
      const value = LIMITS[PLAN_ORDER[index]][row.dataset.limit]
      cell.textContent = limitLabel(value)
      cell.classList.toggle('is-unlimited', value === null)
    })
  }
  for (const row of document.querySelectorAll('.compare tr[data-included]')) {
    for (const cell of row.querySelectorAll('td')) {
      const mark = document.createElement('span')
      mark.className = 'check'
      mark.setAttribute('role', 'img')
      mark.setAttribute('aria-label', text.includedCell)
      cell.replaceChildren(mark)
    }
  }
}

/* ------------------------------ Assistant de choix ------------------------------ */

const NEEDS = ['members', 'clients', 'quotes', 'automations']
let lastPlan = null

/** Plus petite offre dont toutes les limites couvrent les besoins (null = illimité). */
function planFor(needs) {
  return (
    PLAN_ORDER.find((plan) =>
      NEEDS.every((need) => LIMITS[plan][need] === null || needs[need] <= LIMITS[plan][need]),
    ) ?? 'business'
  )
}

function readNeeds() {
  const needs = {}
  for (const need of NEEDS) needs[need] = Number(document.getElementById(`need-${need}`).value)
  return needs
}

function renderFinder() {
  const planElement = document.getElementById('finder-plan')
  if (!planElement) return
  const text = TEXTS[state.language]
  const needs = readNeeds()

  for (const need of NEEDS) {
    const input = document.getElementById(`need-${need}`)
    const value = Number(input.value)
    const max = Number(input.max)
    const label =
      value >= max && need !== 'members' ? text.atLeast(formatNumber(value)) : formatNumber(value)
    input.closest('.range').querySelector('.range-value').textContent = label
    input.setAttribute('aria-valuetext', label)
    input.style.setProperty(
      '--fill',
      `${((value - Number(input.min)) / (max - Number(input.min))) * 100}%`,
    )
  }

  const plan = planFor(needs)
  const limits = LIMITS[plan]
  planElement.textContent = PLAN_NAMES[plan]
  const per = state.period === 'month' ? text.perMonth : text.perYear
  document.getElementById('finder-price').textContent = text.finderPrice(
    formatPrice(PRICES[plan][state.period]),
    per,
  )
  document.getElementById('finder-reason').textContent =
    limits.clients === null
      ? text.finderReasonUnlimited(formatNumber(limits.members))
      : text.finderReason(
          formatNumber(limits.members),
          formatNumber(limits.clients),
          formatNumber(limits.quotes),
          formatNumber(limits.automations),
        )

  // Jauges : part de chaque limite de l'offre conseillée utilisée par les besoins saisis.
  const meters = document.getElementById('finder-meters')
  meters.replaceChildren(
    ...NEEDS.map((need) => {
      const row = document.createElement('div')
      row.className = 'meter'
      const name = document.createElement('span')
      name.className = 'meter-name'
      name.textContent = text[`need${need[0].toUpperCase()}${need.slice(1)}`]
      const usage = document.createElement('span')
      usage.className = 'meter-usage'
      usage.textContent =
        limits[need] === null
          ? text.meterUnlimited(formatNumber(needs[need]))
          : text.meterUsage(formatNumber(needs[need]), formatNumber(limits[need]))
      const bar = document.createElement('span')
      bar.className = 'meter-bar'
      const fill = document.createElement('i')
      const ratio = limits[need] === null ? 0.06 : Math.min(1, needs[need] / limits[need])
      fill.style.transform = `scaleX(${ratio})`
      bar.append(fill)
      row.append(name, usage, bar)
      return row
    }),
  )

  // Offre conseillée mise en évidence dans la liste ; petite animation quand elle change.
  for (const card of document.querySelectorAll('.plan')) {
    card.classList.toggle('match', card.dataset.plan === plan)
  }
  if (lastPlan !== null && lastPlan !== plan && !reducedMotion) {
    const result = planElement.closest('.finder-result')
    result.classList.remove('swap')
    void result.offsetWidth
    result.classList.add('swap')
  }
  lastPlan = plan
}

for (const need of NEEDS) {
  document.getElementById(`need-${need}`)?.addEventListener('input', renderFinder)
}

/* ------------------------------ Nouveautés ------------------------------ */

const TAG_KEYS = { new: 'tagNew', improved: 'tagImproved', fixed: 'tagFixed' }

/** Construit la frise (textContent uniquement : aucune insertion de HTML). */
function renderChangelog() {
  const list = document.getElementById('releases')
  if (!list) return
  const text = TEXTS[state.language]
  const dateFormat = new Intl.DateTimeFormat(LOCALES[state.language], { dateStyle: 'long' })
  const visible = new Set(
    [...list.children]
      .filter((item) => item.classList.contains('in'))
      .map((item) => item.dataset.version),
  )

  const make = (tag, className, content) => {
    const element = document.createElement(tag)
    if (className) element.className = className
    if (content !== undefined) element.textContent = content
    return element
  }

  const items = CHANGELOG.map((release, index) => {
    const item = make('li', 'release reveal')
    item.dataset.version = release.version
    item.style.setProperty('--delay', '0ms')
    if (visible.has(release.version)) item.classList.add('in')
    if (index === 0) item.classList.add('latest')

    item.append(make('span', 'release-dot'))

    const card = make('article', 'release-card spot')
    const head = make('header', 'release-head')
    const meta = make('p', 'release-version')
    meta.append(make('span', 'release-number', text.versionLabel(release.version)))
    if (index === 0) meta.append(make('span', 'release-badge', text.latestBadge))
    else if (release.first)
      meta.append(make('span', 'release-badge release-badge-first', text.firstRelease))
    const time = make(
      'time',
      'release-date',
      dateFormat.format(new Date(`${release.date}T12:00:00`)),
    )
    time.dateTime = release.date
    head.append(meta, make('h3', 'release-title', release.title[state.language]), time)

    const changes = make('ul', 'changes')
    release.changes.forEach((change, i) => {
      const row = make('li', 'change')
      row.style.setProperty('--i', String(i))
      row.append(make('span', `tag tag-${change.type}`, text[TAG_KEYS[change.type]]))
      row.append(make('span', 'change-text', change[state.language]))
      changes.append(row)
    })

    card.append(head, changes)
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--x', `${event.clientX - rect.left}px`)
      card.style.setProperty('--y', `${event.clientY - rect.top}px`)
    })
    item.append(card)
    return item
  })

  list.replaceChildren(...items)
  // render() n'est appelé qu'en fin de script, une fois revealObserver défini.
  for (const item of items) revealObserver.observe(item)
  fillTimeline()
}

/** La ligne de la frise se remplit jusqu'au milieu de l'écran. */
function fillTimeline() {
  const fill = document.getElementById('timeline-fill')
  if (!fill) return
  const rect = fill.parentElement.getBoundingClientRect()
  const ratio = Math.min(1, Math.max(0, (window.innerHeight * 0.6 - rect.top) / rect.height))
  fill.style.transform = `scaleY(${reducedMotion ? 1 : ratio})`
  for (const item of document.querySelectorAll('.release')) {
    const dot = item.querySelector('.release-dot').getBoundingClientRect()
    item.classList.toggle('reached', reducedMotion || dot.top < window.innerHeight * 0.6)
  }
}

/* ------------------------------ Apparitions ------------------------------ */

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in')
        if (entry.target.classList.contains('how')) entry.target.classList.add('drawn')
      } else if (entry.target.classList.contains('card')) {
        // Les animations des cartes s'arrêtent hors de l'écran.
        entry.target.classList.remove('in')
      }
    }
  },
  { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
)

for (const group of document.querySelectorAll('.bento, .plans, .how')) {
  ;[...group.children].forEach((child, index) =>
    child.style.setProperty('--delay', `${index * 90}ms`),
  )
}
for (const element of document.querySelectorAll('.reveal, .how')) revealObserver.observe(element)

/* ------------------------------ Défilement : barre, menu, capture inclinée ------------------------------ */

const nav = document.getElementById('nav')
const progress = document.getElementById('progress')
const tilt = document.getElementById('tilt')
let ticking = false

function onScroll() {
  const y = window.scrollY
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`
  nav.classList.toggle('scrolled', y > 24)
  fillTimeline()
  if (!reducedMotion && tilt) {
    tilt.style.setProperty('--tilt', String(Math.max(0, 1 - y / 520)))
  }
  ticking = false
}

window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(onScroll)
    }
  },
  { passive: true },
)

/* ------------------------------ Halo qui suit la souris ------------------------------ */

for (const card of document.querySelectorAll('.spot')) {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--x', `${event.clientX - rect.left}px`)
    card.style.setProperty('--y', `${event.clientY - rect.top}px`)
  })
}

/* ------------------------------ Visite guidée ------------------------------ */

const steps = [...document.querySelectorAll('.tour-step')]
const shots = [...document.querySelectorAll('.tour-shot')]
const dots = [...document.querySelectorAll('.tour-dots i')]

function activateStep(index) {
  steps.forEach((step, i) => step.classList.toggle('active', i === index))
  shots.forEach((shot, i) => shot.classList.toggle('active', i === index))
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index))
}

const stepObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) activateStep(Number(entry.target.dataset.step))
    }
  },
  { rootMargin: '-45% 0px -45% 0px' },
)
steps.forEach((step) => stepObserver.observe(step))
activateStep(0)

/* ------------------------------ Questions ------------------------------ */

for (const button of document.querySelectorAll('.faq-q')) {
  button.addEventListener('click', () => {
    button.setAttribute('aria-expanded', String(button.getAttribute('aria-expanded') !== 'true'))
  })
}

/* ------------------------------ Ciel étoilé ------------------------------ */

function starfield(canvas) {
  const context = canvas.getContext('2d')
  if (!context) return
  let stars = []
  let width = 0
  let height = 0
  let visible = false
  let frame = 0

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    width = canvas.clientWidth
    height = canvas.clientHeight
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    const count = Math.round((width * height) / 9000)
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 1.2,
      drift: 0.02 + Math.random() * 0.06,
      tint:
        Math.random() < 0.18
          ? Math.random() < 0.5
            ? '177,150,255'
            : '122,176,255'
          : '255,255,255',
    }))
    draw(0)
  }

  const draw = (time) => {
    context.clearRect(0, 0, width, height)
    for (const star of stars) {
      const alpha = reducedMotion
        ? 0.6
        : 0.25 + 0.75 * (0.5 + 0.5 * Math.sin((time / 1000) * star.speed + star.phase))
      const y = reducedMotion ? star.y : (star.y - (time / 1000) * star.drift * 8 + height) % height
      context.beginPath()
      context.arc(star.x, y, star.r, 0, Math.PI * 2)
      context.fillStyle = `rgba(${star.tint},${alpha * 0.85})`
      context.fill()
    }
  }

  const loop = (time) => {
    draw(time)
    if (visible && !reducedMotion) frame = requestAnimationFrame(loop)
  }

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    cancelAnimationFrame(frame)
    if (visible && !reducedMotion) frame = requestAnimationFrame(loop)
  }).observe(canvas)

  window.addEventListener('resize', resize)
  resize()
}

document.querySelectorAll('[data-stars]').forEach(starfield)

/* ------------------------------ Langue : bouton ------------------------------ */

document.getElementById('lang-toggle').addEventListener('click', () => {
  state.language = state.language === 'en' ? 'fr' : 'en'
  try {
    localStorage.setItem(STORAGE_KEY, state.language)
  } catch {
    // Stockage indisponible : la langue ne sera pas mémorisée.
  }
  render()
})

document.documentElement.classList.remove('no-js')
const year = document.getElementById('year')
if (year) year.textContent = String(new Date().getFullYear())
render()
onScroll()
void loadRelease()
