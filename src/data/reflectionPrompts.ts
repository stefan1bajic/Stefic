import { DailyReflectionPrompt, EraCategory } from '../types/philosophy';

export const REFLECTION_PROMPTS: DailyReflectionPrompt[] = [
  // Stoicism Prompts
  {
    id: 'rp-marko-kontrola',
    question: 'Koji događaj dana te je najviše uznemirio, i da li je on bio pod tvojom kontrolom ili u tvojoj percepciji?',
    philosophicalContext: 'Marko Aurelije u "Samom sebi" beleži: „Imaš vlast nad svojim umom, ne nad spoljašnjim stvarima. Shvati ovo i naći ćeš neizmernu snagu.“',
    sourcePhilosopherId: 'marko-aurelije',
    sourcePhilosopherName: 'Marko Aurelije',
    sourceTermId: 'dihotomija-kontrole',
    sourceTerm: 'Dihotomija kontrole',
    category: 'stoicizam',
    suggestedAction: 'Razdvoji činjenicu koja se desila od tvog suda o njoj.',
  },
  {
    id: 'rp-epiktet-prihvatanje',
    question: 'Gde si danas pokušao da nateraš svet da bude po tvome, umesto da prihvatiš stvari onakve kakve jesu?',
    philosophicalContext: 'Epiktet nas uči: „Nemoj tražiti da se događaji odvijaju onako kako želiš, već želi da se odvijaju onako kako se odvijaju — i imaćeš miran život.“',
    sourcePhilosopherId: 'epiktet',
    sourcePhilosopherName: 'Epiktet',
    sourceTermId: 'ataraksija',
    sourceTerm: 'Ataraksija',
    category: 'stoicizam',
    suggestedAction: 'Prepoznaj trenutak kada si se opirao realnosti i oslobodi taj teret.',
  },
  {
    id: 'rp-seneka-vreme',
    question: 'Koliko si sati danas zaista pripadao samom sebi, a koliko si rasuo na nevažne tuđe zahteve i distrakcije?',
    philosophicalContext: 'Seneka u eseju "O kratkoći života" piše: „Nije da imamo malo vremena za život, već da ga mnogo gubimo.“',
    sourcePhilosopherId: 'seneka',
    sourcePhilosopherName: 'Seneka',
    sourceTermId: 'memento-mori',
    sourceTerm: 'Memento Mori',
    category: 'stoicizam',
    suggestedAction: 'Zapitaj se na šta bi potrošio preostale sate da je ovo tvoj poslednji dan.',
  },
  // Classical Greek Prompts
  {
    id: 'rp-sokrat-ispitivanje',
    question: 'U koje uverenje o sebi ili drugima si danas bio potpuno siguran, a koje bi zapravo vredelo preispitati?',
    philosophicalContext: 'Sokratova čuvena izreka glasi: „Neistražen i nepreispitan život nije vredan življenja.“ Mudrost počinje kada priznamo sopstveno neznanje.',
    sourcePhilosopherId: 'sokrat',
    sourcePhilosopherName: 'Sokrat',
    sourceTermId: 'aporija',
    sourceTerm: 'Aporija',
    category: 'antička',
    suggestedAction: 'Pronađi jedno svoje kruto pravilo i zapitaj se: Zašto zapravo verujem u ovo?',
  },
  {
    id: 'rp-aristotel-cvetanje',
    question: 'Koji postupak koji si danas učinio je doprineo tvom dugoročnom ljudskom cvetanju (Eudaimoniji), a koji je bio samo prolazno zadovoljstvo?',
    philosophicalContext: 'Aristotel razlikuje prolaznu hedoniju (užitak) od eudaimonije — trajnog ispunjenja koje dolazi kroz razvoj vrlina, razuma i pravičnosti.',
    sourcePhilosopherId: 'aristotel',
    sourcePhilosopherName: 'Aristotel',
    sourceTermId: 'eudaimonija',
    sourceTerm: 'Eudaimonija',
    category: 'antička',
    suggestedAction: 'Uoči razliku između onoga što ti trenutno prija i onoga što te čini boljim čovekom.',
  },
  {
    id: 'rp-epikur-jednostavnost',
    question: 'Koja nepotrebna želja ili strah ti danas remeti unutrašnji mir, i da li možeš da je svedeš na ono osnovno i prirodno?',
    philosophicalContext: 'Epikurov Tetrafarmakos poručuje: „Boga se ne treba bojati, smrt ne osećamo, ono što je dobro lako se postiže, a ono što je strašno lako se podnosi.“',
    sourcePhilosopherId: 'epikur',
    sourcePhilosopherName: 'Epikur',
    sourceTermId: 'tetrafarmakos',
    sourceTerm: 'Tetrafarmakos',
    category: 'antička',
    suggestedAction: 'Zapiši tri jednostavne stvari koje su ti danas donele mir.',
  },
  {
    id: 'rp-heraklit-promena',
    question: 'Koji deo tvog života se trenutno neminovno menja, i zašto se tome opireš umesto da plivaš sa tokom reke?',
    philosophicalContext: 'Heraklitov princip „Panta Rei“ (Sve teče): ne može se dva puta ući u istu reku, jer ni reka ni čovek nisu više isti.',
    sourcePhilosopherId: 'heraklit',
    sourcePhilosopherName: 'Heraklit',
    sourceTermId: 'panta-rei',
    sourceTerm: 'Panta Rei',
    category: 'antička',
    suggestedAction: 'Prihvati nestalnost jedne situacije bez pokušaja da je nasilno zamrzneš u vremenu.',
  },
  // Existentialism Prompts
  {
    id: 'rp-nice-amor-fati',
    question: 'Zamisli da moraš proživeti današnji dan još bezbroj puta u večnosti. Koji trenutak bi poželeo da prigrliš sa punom ljubavlju prema sudbini (Amor Fati)?',
    philosophicalContext: 'Fridrih Niče je formule za veličinu čoveka video u „Amor Fati“: ne želeti ništa drugačije, ni napred, ni nazad, u celoj večnosti.',
    sourcePhilosopherId: 'nice',
    sourcePhilosopherName: 'Fridrih Niče',
    sourceTermId: 'amor-fati',
    sourceTerm: 'Amor Fati',
    category: 'egzistencijalizam',
    suggestedAction: 'Pronađi skriveni smisao u jednoj današnjoj prepreci ili neprijatnosti.',
  },
  {
    id: 'rp-sartr-autenticnost',
    question: 'U kojoj situaciji si danas glumio ulogu i ugađao očekivanjima drugih („loša vera“), umesto da budeš iskreno svoj?',
    philosophicalContext: 'Žan-Pol Sartr nas podseća: „Čovek je osuđen na slobodu.“ Kada se pretvaramo da nemamo izbor, bežimo od sopstvene odgovornosti.',
    sourcePhilosopherId: 'sartr',
    sourcePhilosopherName: 'Žan-Pol Sartr',
    sourceTermId: 'egzistencija-esencija',
    sourceTerm: 'Egzistencija pre esencije',
    category: 'egzistencijalizam',
    suggestedAction: 'Zapiši šta bi uradio da ne postoji strah od tuđeg osuđivanja.',
  },
  {
    id: 'rp-kami-apsurd',
    question: 'Pred monotonijom i ponavljanjem svakodnevnih obaveza, gde si danas pronašao svoju iskrenu radost, poput Sizifa koji se osmehuje svom kamenu?',
    philosophicalContext: 'Alber Kami zaključuje esej o Sizifu: „Treba zamisliti Sizifa srećnim.“ Smisao ne leži u konačnom cilju, već u hrabrosti da se živi sa strašću.',
    sourcePhilosopherId: 'kami',
    sourcePhilosopherName: 'Alber Kami',
    sourceTermId: 'nihilizam',
    sourceTerm: 'Apsurd i Pobuna',
    category: 'egzistencijalizam',
    suggestedAction: 'Pronađi poetsku lepotu u jednom sasvim običnom, rutinskom zadatku.',
  },
  {
    id: 'rp-kjerkegor-teskoba',
    question: 'Pred kojom odlukom si danas osetio oklevanje ili strah, i šta bi za tebe značio hrabri „skok vere“?',
    philosophicalContext: 'Seren Kjerkegor piše: „Teskoba je vrtoglavica slobode.“ Strah nastaje onda kada shvatimo da imamo beskonačnu mogućnost izbora.',
    sourcePhilosopherId: 'kjerkegor',
    sourcePhilosopherName: 'Seren Kjerkegor',
    sourceTermId: 'skok-vere',
    sourceTerm: 'Skok Vere',
    category: 'egzistencijalizam',
    suggestedAction: 'Imenuj strah koji te koči i razmotri prvi hrabri korak.',
  },
  // Niche & Paradoxes Prompts
  {
    id: 'rp-cioran-pesimizam',
    question: 'Kada odbaciš potrebu da sve mora imati grandiozan i večan smisao, koliku lakoću i rasterećenje osećaš u ovom trenutku?',
    philosophicalContext: 'Emil Sioran beleži sa ironičnim osmehom: „Knjiga mora biti sekira za zaleđeno more u nama. Nakon što shvatimo uzaludnost svega, možemo početi da se smejemo i živimo bez teškog tereta.“',
    sourcePhilosopherId: 'cioran',
    sourcePhilosopherName: 'Emil Sioran',
    sourceTermId: 'nihilizam',
    sourceTerm: 'Lekoviti skepticizam',
    category: 'nise_i_paradoksi',
    suggestedAction: 'Oslobodi se pritiska da sve u tvom životu mora biti savršeno i trajno.',
  },
  {
    id: 'rp-zapffe-tisina',
    question: 'Gde tvoj um stvara nepotrebnu dramu i prekomernu refleksiju, i kako danas možeš pronaći sidro u fizičkom svetu?',
    philosophicalContext: 'Peter Vesel Zapfe je uočio da ljudska svest pati od "viška zvezda" — tražimo odgovore tamo gde priroda ćuti, a lek je često u prizemljenju i fizičkoj akciji.',
    sourcePhilosopherId: 'zapffe',
    sourcePhilosopherName: 'Peter Vesel Zapfe',
    sourceTermId: 'zapffe-mehanizmi',
    sourceTerm: 'Biosofska sublimacija',
    category: 'nise_i_paradoksi',
    suggestedAction: 'Izađi u šetnju, udahni vazduh i posmatraj drveće bez reči.',
  },
  {
    id: 'rp-bataille-rasipanje',
    question: 'U šta si danas uložio svoju energiju, ljubav ili pažnju bez ikakve računice, očekivanja uzvrata ili koristi?',
    philosophicalContext: 'Žorž Bataj u teoriji opšte ekonomije uči da sunce daje energiju bez traženja naplate: najuzvišeniji trenuci čoveka su u slobodnom, radosnom rasipanju dobra.',
    sourcePhilosopherId: 'bataj',
    sourcePhilosopherName: 'Žorž Bataj',
    sourceTermId: 'opsta-ekonomija',
    sourceTerm: 'Opšta ekonomija i Suverenost',
    category: 'nise_i_paradoksi',
    suggestedAction: 'Učini jedno malo dobro delo u potpunoj tajnosti.',
  },
  {
    id: 'rp-zenon-proces',
    question: 'Da li si danas bio toliko opsednut konačnim ciljem da si zaboravio da je svaki tvoj korak polovina puta koji vredi iskusiti?',
    philosophicalContext: 'Zenonovi paradoksi o beskonačnom deljenju prostora podsećaju nas da se svaki put sastoji od bezbroj mikroskopskih sadašnjosti.',
    sourcePhilosopherId: 'zenon-elejski',
    sourcePhilosopherName: 'Zenon iz Eleje',
    sourceTermId: 'ahil-kornjaca',
    sourceTerm: 'Aporije beskonačnosti',
    category: 'nise_i_paradoksi',
    suggestedAction: 'Uspori i osmotri samo jedan trenutni korak koji imaš pred sobom.',
  },
  // Eastern & Rationalism Prompts
  {
    id: 'rp-tao-vu-vej',
    question: 'Gde si danas pokušavao da na silu poguraš tok reke, umesto da primeniš princip nenasilnog delanja (Vu-Vej)?',
    philosophicalContext: 'Lao Ce u Knjizi o Putu i Vrlini savetuje: „Voda je meka i popustljiva, pa ipak savladava i najtvrđu stenu. Delaj bez nametanja svoje volje.“',
    sourcePhilosopherId: 'laoce',
    sourcePhilosopherName: 'Lao Ce',
    sourceTermId: 'vu-vej',
    sourceTerm: 'Vu-Vej (Nenaporno delanje)',
    category: 'istočna',
    suggestedAction: 'Dopusti jednoj situaciji da se sama rasplete bez tvog nepotrebnog uplitanja.',
  },
  {
    id: 'rp-spinoza-razum',
    question: 'Koju si negativnu emociju (strah, bes, zavist) danas osetio, i kako razumevanje njenih pravih korena može da je ublaži?',
    philosophicalContext: 'Spinoza u "Etici" dokazuje: „Afekt koji je strast prestaje da bude strast onog trenutka kada o njemu formiramo jasnu i razgovetnu ideju.“',
    sourcePhilosopherId: 'spinoza',
    sourcePhilosopherName: 'Baruh Spinoza',
    sourceTermId: 'amor-dei-intellectualis',
    sourceTerm: 'Amor Dei Intellectualis',
    category: 'racionalizam',
    suggestedAction: 'Pogledaj svoj bes kao prirodni fenomen, poput kiše ili vetra, bez krivice.',
  },
];

/**
 * Generates an intelligent, tailored philosophical reflection prompt
 * based on the user's explored content and current date.
 */
export function getDailyReflectionPrompt(
  exploredPhilosopherIds: string[],
  exploredTermIds: string[],
  favoriteQuoteIds: string[],
  shuffleOffset: number = 0
): DailyReflectionPrompt {
  const todayStr = new Date().toISOString().split('T')[0];
  // Simple deterministic day-hash
  let dayHash = 0;
  for (let i = 0; i < todayStr.length; i++) {
    dayHash = (dayHash << 5) - dayHash + todayStr.charCodeAt(i);
    dayHash |= 0;
  }
  const effectiveSeed = Math.abs(dayHash + shuffleOffset);

  // Filter prompts that match what the user has explored
  const matchingPrompts = REFLECTION_PROMPTS.filter((prompt) => {
    const philMatch = prompt.sourcePhilosopherId && exploredPhilosopherIds.includes(prompt.sourcePhilosopherId);
    const termMatch = prompt.sourceTermId && exploredTermIds.includes(prompt.sourceTermId);
    return philMatch || termMatch;
  });

  // If user has explored relevant content, prioritize personalized prompts
  if (matchingPrompts.length > 0) {
    const idx = effectiveSeed % matchingPrompts.length;
    return matchingPrompts[idx];
  }

  // Fallback to pool of all rich philosophical prompts
  const fallbackIdx = effectiveSeed % REFLECTION_PROMPTS.length;
  return REFLECTION_PROMPTS[fallbackIdx];
}
