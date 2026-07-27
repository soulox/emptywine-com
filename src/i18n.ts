export type Lang = 'en' | 'fr';

export interface Copy {
  // shared / nav
  navProcess: string; navLabels: string; navDesign: string; navWhyUs: string; navContact: string;
  navCommission: string;            // nav CTA
  // hero
  heroKicker: string; heroTitleHtml: string;   // may contain <br> and <em>
  heroSub: string; heroCtaCommission: string; heroCtaBuilder: string;
  heroMetaOriginLabel: string; heroMetaOriginValue: string;
  heroMetaFormatLabel: string; heroMetaFormatValue: string;
  heroMetaDeliveryLabel: string; heroMetaDeliveryValue: string;
  // marquee (industries)
  marquee: string[];
  // process
  howKicker: string; howTitleHtml: string; howSub: string;
  howStep1Title: string; howStep1Body: string;
  howStep2Title: string; howStep2Body: string;
  howStep3Title: string; howStep3Body: string;
  // gallery
  galKicker: string; galTitleHtml: string; galNote: string;
  galCard1Name: string; galCard1Desc: string;
  galCard2Name: string; galCard2Desc: string;
  galCard3Name: string; galCard3Desc: string;
  // builder CTA band
  bcKicker: string; bcTitleHtml: string; bcSub: string; bcCta: string;
  // ethos
  ethosKicker: string; ethosQuoteHtml: string;
  ethos1Term: string; ethos1Body: string;
  ethos2Term: string; ethos2Body: string;
  ethos3Term: string; ethos3Body: string;
  // trust (hidden section — still translated)
  trustKicker: string; trustTitleHtml: string;
  // contact
  contactKicker: string; contactTitleHtml: string; contactSub: string;
  contactEmailLabel: string; contactResponseLabel: string; contactResponseValue: string;
  cfName: string; cfNamePh: string; cfNameErr: string;
  cfCompany: string; cfCompanyPh: string; cfCompanyErr: string;
  cfEmail: string; cfEmailPh: string; cfEmailErr: string;
  cfPhone: string; cfPhonePh: string;
  cfMessage: string; cfMessagePh: string; cfHint: string;
  cfSubmit: string; cfSending: string; cfSuccess: string; cfError: string;
  // footer
  footerCopy: string;
  // preview / design builder
  pvBack: string; pvKicker: string; pvTitleHtml: string;
  pvBrand: string; pvBrandPh: string; pvCollection: string; pvCollectionPh: string;
  pvVarietal: string; pvVarietalPh: string; pvVintage: string; pvVintagePh: string;
  pvStyle: string; pvStyleCream: string; pvStyleNoir: string; pvStyleBlanc: string;
  pvTextSizes: string; pvSizeBrand: string; pvSizeCollection: string; pvSizeClass: string;
  pvSizeVarietal: string; pvSizeVintage: string;
  pvCommission: string; pvNoteHtml: string;
  // download modal
  dlKicker: string; dlTitle: string; dlNote: string;
  dlPngSub: string; dlPdfSub: string; dlCommission: string; dlRendering: string;
  // <head> per page
  landingTitle: string; landingDesc: string; landingOgTitle: string; landingOgDesc: string;
  designTitle: string; designDesc: string; designOgTitle: string; designOgDesc: string;
}

const en: Copy = {
  // shared / nav
  navProcess: 'Process',
  navLabels: 'Labels',
  navDesign: 'Label Builder',
  navWhyUs: 'Why Us',
  navContact: 'Contact',
  navCommission: 'Commission a Label',
  // hero
  heroKicker: 'Bespoke Corporate Wine Gifting',
  heroTitleHtml: 'the label<br>is the <em>gift</em>',
  heroSub: 'Give a bottle no one else can give. We design a wine label around your brand — an original, made only for you — and deliver it, beautifully, to every desk and doorstep that matters.',
  heroCtaCommission: 'Commission a Label',
  heroCtaBuilder: 'Try the label builder →',
  heroMetaOriginLabel: 'Origin',
  heroMetaOriginValue: 'Bordeaux &amp; Burgundy estates',
  heroMetaFormatLabel: 'Format',
  heroMetaFormatValue: '75 cl, corked &amp; waxed',
  heroMetaDeliveryLabel: 'Delivery',
  heroMetaDeliveryValue: 'By name, anywhere',
  // marquee (industries)
  marquee: ['Finance', 'Technology', 'Real Estate', 'Consulting', 'Luxury Retail', 'Private Equity', 'Architecture', 'Law &amp; Advisory'],
  // process
  howKicker: 'The Process',
  howTitleHtml: 'from brief<br>to <em>bottle</em>',
  howSub: 'Three steps, roughly three weeks. You are involved only where it matters — the brief and the final approval.',
  howStep1Title: 'Share Your Brief',
  howStep1Body: 'Tell us your brand, the occasion, and the impression you want to leave. Two minutes. No design experience required.',
  howStep2Title: 'We Design Your Label',
  howStep2Body: 'Our AI generates a bespoke label — refined by our team until it is unmistakably yours. You approve every detail.',
  howStep3Title: 'Delivered to Impress',
  howStep3Body: 'Premium bottles, your label, beautifully packaged. Delivered to your door or directly to each recipient.',
  // gallery
  galKicker: 'Label Design',
  galTitleHtml: 'every label,<br>a <em>story</em>',
  galNote: 'Each design is generated uniquely for your brand. No templates. No off-the-shelf.',
  galCard1Name: 'Aldergate &amp; Co',
  galCard1Desc: 'A heritage law firm’s ivory classic — bronze rules, estate-pressed restraint.',
  galCard2Name: 'Vireon',
  galCard2Desc: 'A technology company in matte black and gold — commanding and modern.',
  galCard3Name: 'Solstice Partners',
  galCard3Desc: 'A consulting firm’s pure-white minimal — precise type, a single wax seal.',
  // builder CTA band
  bcKicker: 'Live Preview',
  bcTitleHtml: 'see it <em>before</em><br>you commission',
  bcSub: 'Type your company name, pick a style, and watch your label appear on the bottle — in seconds. Download it print-ready, or send it straight to us.',
  bcCta: 'Open the Label Builder →',
  // ethos
  ethosKicker: 'Why emptywine',
  ethosQuoteHtml: 'A bottle is poured and forgotten.\n          <em>A gift with their name on it is kept.</em>',
  ethos1Term: 'No two alike',
  ethos1Body: 'Every label is generated for your brand alone — no templates, no stock art, nothing another company could ever receive.',
  ethos2Term: 'Finished by hand',
  ethos2Body: 'AI gives us the first draft in seconds. Our designers refine it until it looks like it was pressed by a century-old estate.',
  ethos3Term: 'Delivered anywhere',
  ethos3Body: 'Premium wine, your label, presentation packaging. Sent to your office in one crate or to each recipient by name.',
  // trust (hidden section — still translated)
  trustKicker: 'In Their Words',
  trustTitleHtml: 'gifts that <em>get remembered</em>',
  // contact
  contactKicker: 'Get in Touch',
  contactTitleHtml: 'commission<br>your <em>label</em>',
  contactSub: 'Tell us about your gifting needs and we will respond within 24 hours with a proposal and sample designs.',
  contactEmailLabel: 'Email',
  contactResponseLabel: 'Response Time',
  contactResponseValue: 'Within 24 hours',
  cfName: 'Full Name',
  cfNamePh: 'Rosalind Achebe',
  cfNameErr: 'Please enter your name.',
  cfCompany: 'Company',
  cfCompanyPh: 'Larkfield &amp; Voss',
  cfCompanyErr: 'Please enter your company.',
  cfEmail: 'Email',
  cfEmailPh: 'rosalind@larkfield.co',
  cfEmailErr: 'Please enter a valid email address.',
  cfPhone: 'Phone (optional)',
  cfPhonePh: '+1 (415) 662-0473',
  cfMessage: 'Occasion &amp; Details',
  cfMessagePh: 'e.g. 200 bottles for our annual client dinner in November. Dark label, company logo, Bordeaux preferred.',
  cfHint: 'The more you tell us, the closer the first sample lands.',
  cfSubmit: 'Send Inquiry',
  cfSending: 'Sending...',
  cfSuccess: 'Thank you — we will be in touch within 24 hours.',
  cfError: 'Something went wrong sending your inquiry. Please try again, or email hello@emptywine.com directly.',
  // footer
  footerCopy: '© 2026 emptywine. All rights reserved.',
  // preview / design builder
  pvBack: '← Back to site',
  pvKicker: 'Live Preview',
  pvTitleHtml: 'design<br>your <em>label</em>',
  pvBrand: 'Brand / Company Name',
  pvBrandPh: 'Larkfield &amp; Voss',
  pvCollection: 'Collection Name',
  pvCollectionPh: 'The Heritage Reserve',
  pvVarietal: 'Wine / Varietal',
  pvVarietalPh: 'Burgundy · Pinot Noir',
  pvVintage: 'Vintage Year',
  pvVintagePh: '2025',
  pvStyle: 'Label Style',
  pvStyleCream: 'Cream Classic',
  pvStyleNoir: 'Noir Prestige',
  pvStyleBlanc: 'Blanc Épuré',
  pvTextSizes: 'Text Sizes',
  pvSizeBrand: 'Brand',
  pvSizeCollection: 'Collection',
  pvSizeClass: 'Réserve',
  pvSizeVarietal: 'Varietal',
  pvSizeVintage: 'Vintage',
  pvCommission: 'Commission This Label',
  pvNoteHtml: '<b>Updates live</b> as you type. Download a print-ready file, or commission us to produce the finished bottle.',
  // download modal
  dlKicker: 'Print-Ready Artwork',
  dlTitle: 'Download your label',
  dlNote: 'High-resolution label artwork, ready for the printer. Choose a format:',
  dlPngSub: '300 DPI image',
  dlPdfSub: 'print document',
  dlCommission: 'Prefer we print &amp; deliver it? Commission us →',
  dlRendering: 'rendering…',
  // <head> per page
  landingTitle: 'emptywine — Bespoke Corporate Wine Gifts',
  landingDesc: 'Custom AI-designed wine labels for corporate gifting. Your brand on every bottle. An unforgettable impression.',
  landingOgTitle: 'emptywine — Bespoke Corporate Wine Gifts',
  landingOgDesc: 'We design a bespoke wine label around your brand — an original, made only for you — and deliver it, beautifully, to every desk and doorstep that matters.',
  designTitle: 'Design Your Label — emptywine',
  designDesc: 'Preview a bespoke wine label for your brand, live. Type your name, pick a style, and see it on the bottle.',
  designOgTitle: 'Design Your Label — emptywine',
  designOgDesc: 'Preview a bespoke wine label for your brand, live. Type your name, pick a style, and see it on the bottle.',
};

const fr: Copy = {
  ...en,
  // nav
  navProcess: 'Processus',
  navLabels: 'Étiquettes',
  navDesign: 'Design',
  navWhyUs: 'Pourquoi nous',
  navContact: 'Contact',
  navCommission: 'Commander une étiquette',
  // hero
  heroKicker: 'Cadeaux d’entreprise en vin sur mesure',
  heroTitleHtml: 'l’étiquette<br>est le <em>cadeau</em>',
  heroSub: 'Offrez une bouteille que personne d’autre ne peut offrir. Nous concevons une étiquette de vin à l’image de votre marque — une création originale, faite pour vous seul — et la livrons, avec élégance, sur chaque bureau et à chaque porte qui compte.',
  heroCtaCommission: 'Commander une étiquette',
  heroCtaBuilder: 'Essayer le générateur →',
  heroMetaOriginLabel: 'Origine',
  heroMetaOriginValue: 'Domaines de Bordeaux et Bourgogne',
  heroMetaFormatLabel: 'Format',
  heroMetaFormatValue: '75 cl, bouché et ciré',
  heroMetaDeliveryLabel: 'Livraison',
  heroMetaDeliveryValue: 'Nominative, partout',
  // marquee
  marquee: ['Finance', 'Technologie', 'Immobilier', 'Conseil', 'Luxe', 'Capital-investissement', 'Architecture', 'Droit & Conseil'],
  // process
  howKicker: 'Le Processus',
  howTitleHtml: 'du brief<br>à la <em>bouteille</em>',
  howSub: 'Trois étapes, environ trois semaines. Vous n’intervenez que là où cela compte — le brief et l’approbation finale.',
  howStep1Title: 'Partagez votre brief',
  howStep1Body: 'Dites-nous votre marque, l’occasion et l’impression que vous souhaitez laisser. Deux minutes. Aucune expérience en design requise.',
  howStep2Title: 'Nous concevons votre étiquette',
  howStep2Body: 'Notre IA génère une étiquette sur mesure — affinée par notre équipe jusqu’à ce qu’elle soit incontestablement la vôtre. Vous validez chaque détail.',
  howStep3Title: 'Livrée pour impressionner',
  howStep3Body: 'Des bouteilles premium, votre étiquette, un écrin soigné. Livrées à votre porte ou directement à chaque destinataire.',
  // gallery
  galKicker: 'Design d’étiquette',
  galTitleHtml: 'chaque étiquette,<br>une <em>histoire</em>',
  galNote: 'Chaque design est généré uniquement pour votre marque. Aucun modèle. Rien de tout fait.',
  galCard1Name: 'Aldergate &amp; Co',
  galCard1Desc: 'Le classique ivoire d’un cabinet d’avocats de tradition — filets de bronze, sobriété d’un grand domaine.',
  galCard2Name: 'Vireon',
  galCard2Desc: 'Une entreprise technologique en noir mat et or — affirmée et moderne.',
  galCard3Name: 'Solstice Partners',
  galCard3Desc: 'Le blanc épuré d’un cabinet de conseil — typographie précise, un seul sceau de cire.',
  // builder CTA
  bcKicker: 'Aperçu en direct',
  bcTitleHtml: 'voyez-la <em>avant</em><br>de commander',
  bcSub: 'Saisissez le nom de votre entreprise, choisissez un style et regardez votre étiquette apparaître sur la bouteille — en quelques secondes. Téléchargez-la prête à imprimer, ou envoyez-la-nous directement.',
  bcCta: 'Ouvrir le générateur →',
  // ethos
  ethosKicker: 'Pourquoi emptywine',
  ethosQuoteHtml: 'Une bouteille se boit et s’oublie.\n      <em>Un cadeau qui porte leur nom se garde.</em>',
  ethos1Term: 'Aucune ne se ressemble',
  ethos1Body: 'Chaque étiquette est générée pour votre marque seule — aucun modèle, aucune image de banque, rien qu’une autre entreprise pourrait recevoir.',
  ethos2Term: 'Finie à la main',
  ethos2Body: 'L’IA nous donne la première ébauche en quelques secondes. Nos designers l’affinent jusqu’à ce qu’elle semble pressée par un domaine centenaire.',
  ethos3Term: 'Livrée partout',
  ethos3Body: 'Vin premium, votre étiquette, emballage de présentation. Envoyé à votre bureau en une caisse, ou à chaque destinataire nommément.',
  // trust (hidden)
  trustKicker: 'En leurs mots',
  trustTitleHtml: 'des cadeaux dont <em>on se souvient</em>',
  // contact
  contactKicker: 'Nous contacter',
  contactTitleHtml: 'commandez<br>votre <em>étiquette</em>',
  contactSub: 'Parlez-nous de vos besoins en cadeaux et nous répondrons sous 24 heures avec une proposition et des designs d’exemple.',
  contactEmailLabel: 'E-mail',
  contactResponseLabel: 'Délai de réponse',
  contactResponseValue: 'Sous 24 heures',
  cfName: 'Nom complet',
  cfNamePh: 'Rosalind Achebe',
  cfNameErr: 'Veuillez saisir votre nom.',
  cfCompany: 'Entreprise',
  cfCompanyPh: 'Larkfield &amp; Voss',
  cfCompanyErr: 'Veuillez saisir votre entreprise.',
  cfEmail: 'E-mail',
  cfEmailPh: 'rosalind@larkfield.co',
  cfEmailErr: 'Veuillez saisir une adresse e-mail valide.',
  cfPhone: 'Téléphone (facultatif)',
  cfPhonePh: '+33 1 42 68 53 00',
  cfMessage: 'Occasion & détails',
  cfMessagePh: 'ex. 200 bouteilles pour notre dîner client annuel en novembre. Étiquette sombre, logo de l’entreprise, Bordeaux de préférence.',
  cfHint: 'Plus vous nous en dites, plus le premier échantillon sera juste.',
  cfSubmit: 'Envoyer la demande',
  cfSending: 'Envoi…',
  cfSuccess: 'Merci — nous vous recontacterons sous 24 heures.',
  cfError: 'Une erreur est survenue lors de l’envoi. Réessayez, ou écrivez-nous directement à hello@emptywine.com.',
  // footer
  footerCopy: '© 2026 emptywine. Tous droits réservés.',
  // <head>
  landingTitle: 'emptywine — Cadeaux d’entreprise en vin sur mesure',
  landingDesc: 'Des étiquettes de vin sur mesure conçues par IA pour vos cadeaux d’entreprise. Votre marque sur chaque bouteille. Une impression inoubliable.',
  landingOgTitle: 'emptywine — Cadeaux d’entreprise en vin sur mesure',
  landingOgDesc: 'Une étiquette de vin sur mesure à l’image de votre marque, livrée avec élégance sur chaque bureau et à chaque porte qui compte.',
  // preview / design builder
  pvBack: '← Retour au site',
  pvKicker: 'Aperçu en direct',
  pvTitleHtml: 'concevez<br>votre <em>étiquette</em>',
  pvBrand: 'Marque / nom de l’entreprise', pvBrandPh: 'Larkfield &amp; Voss',
  pvCollection: 'Nom de la cuvée', pvCollectionPh: 'The Heritage Reserve',
  pvVarietal: 'Vin / cépage', pvVarietalPh: 'Bourgogne · Pinot Noir',
  pvVintage: 'Millésime', pvVintagePh: '2025',
  pvStyle: 'Style d’étiquette', pvStyleCream: 'Ivoire classique', pvStyleNoir: 'Noir prestige', pvStyleBlanc: 'Blanc épuré',
  pvTextSizes: 'Tailles de texte', pvSizeBrand: 'Marque', pvSizeCollection: 'Cuvée', pvSizeClass: 'Réserve',
  pvSizeVarietal: 'Cépage', pvSizeVintage: 'Millésime',
  pvCommission: 'Commander cette étiquette',
  pvNoteHtml: '<b>Mise à jour en direct</b> pendant que vous tapez. Téléchargez un fichier prêt à imprimer, ou confiez-nous la production de la bouteille finale.',
  // download modal
  dlKicker: 'Fichier prêt à imprimer', dlTitle: 'Téléchargez votre étiquette',
  dlNote: 'Visuel d’étiquette haute résolution, prêt pour l’impression. Choisissez un format :',
  dlPngSub: 'image 300 DPI', dlPdfSub: 'document d’impression',
  dlCommission: 'Vous préférez qu’on l’imprime et la livre ? Commandez →', dlRendering: 'rendu…',
  // <head> design
  designTitle: 'Concevez votre étiquette — emptywine',
  designDesc: 'Prévisualisez une étiquette de vin sur mesure pour votre marque, en direct. Saisissez votre nom, choisissez un style et voyez-la sur la bouteille.',
  designOgTitle: 'Concevez votre étiquette — emptywine',
  designOgDesc: 'Prévisualisez une étiquette de vin sur mesure pour votre marque, en direct — saisissez votre nom, choisissez un style, téléchargez-la prête à imprimer.',
};

export const COPY: Record<Lang, Copy> = {
  en,
  fr,
};

export function otherLang(l: Lang): Lang { return l === 'en' ? 'fr' : 'en'; }
export function ogLocale(l: Lang): string { return l === 'en' ? 'en_US' : 'fr_FR'; }
// path is the English canonical path ('/' or '/design'); fr prefixes with /fr
function urlFor(lang: Lang, path: string): string {
  const base = 'https://emptywine.com';
  if (lang === 'en') return base + path;
  return base + '/fr' + (path === '/' ? '' : path);
}
export function headTags(o: { lang: Lang; path: string; title: string; description: string; ogTitle: string; ogDescription: string }): string {
  const en = urlFor('en', o.path), fr = urlFor('fr', o.path), self = urlFor(o.lang, o.path);
  return [
    '<title>' + o.title + '</title>',
    '<meta name="description" content="' + o.description + '" />',
    '<link rel="canonical" href="' + self + '" />',
    '<link rel="alternate" hreflang="en" href="' + en + '" />',
    '<link rel="alternate" hreflang="fr" href="' + fr + '" />',
    '<link rel="alternate" hreflang="x-default" href="' + en + '" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="emptywine" />',
    '<meta property="og:url" content="' + self + '" />',
    '<meta property="og:title" content="' + o.ogTitle + '" />',
    '<meta property="og:description" content="' + o.ogDescription + '" />',
    '<meta property="og:image" content="https://emptywine.com/og.jpg" />',
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="' + (o.lang === 'fr' ? 'Une bouteille de vin et deux verres de vin rouge sur une table devant un vignoble toscan ensoleillé' : 'A wine bottle and two glasses of red wine on a table overlooking a sunlit Tuscan vineyard') + '" />',
    '<meta property="og:locale" content="' + ogLocale(o.lang) + '" />',
    '<meta property="og:locale:alternate" content="' + ogLocale(otherLang(o.lang)) + '" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:title" content="' + o.ogTitle + '" />',
    '<meta name="twitter:description" content="' + o.ogDescription + '" />',
    '<meta name="twitter:image" content="https://emptywine.com/og.jpg" />'
  ].join('\n');
}
