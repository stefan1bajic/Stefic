import { AudioLesson } from '../types/philosophy';

export const AUDIO_LESSONS: AudioLesson[] = [
  {
    id: 'audio-stoicizam-nepokolebljivost',
    title: 'Umetnost nepokolebljivosti: Stoicizam u haosu',
    subtitle: 'Kako sagraditi unutrašnju tvrđavu u svetu koji ne možemo kontrolisati',
    category: 'stoicizam',
    categoryLabel: 'Stoicizam & Unutrašnji mir',
    durationMinutes: 9,
    narratorTitle: 'Filozofski vodič kroz stoicizam',
    description:
      'Smirite dah, stavite slušalice i zakoračite u misli Marka Aurelija, Epikteta i Seneke. Otkrijte kako razlikovati ono što je pod našom kontrolom od onoga što nije, i kako preokrenuti svaku prepreku u pogonsko gorivo za karakter.',
    keyTakeaways: [
      'Dihotomija kontrole: Fokusiraj energiju samo na sopstvene odluke i reakcije.',
      'Amor Fati: Ne samo prihvatati sudbinu, već je prigrliti kao nužnu i dobru.',
      'Unutrašnja tvrđava (arx interior): Mir je tvoj izbor, a ne spoljašnja okolnost.',
    ],
    associatedPhilosopherIds: ['marcus-aurelius', 'epictetus', 'seneca'],
    associatedPhilosopherNames: ['Marko Aurelije', 'Epiktet', 'Seneka'],
    associatedTermIds: ['dihotomija-kontrole', 'amor-fati', 'ataraksija'],
    associatedTermNames: ['Dihotomija kontrole', 'Amor Fati', 'Ataraksija'],
    bgAtmosphereRecommendation: 'binaural_theta',
    reflectionQuestion:
      'Koji te problem danas najviše troši, i šta bi se desilo kada bi ga posmatrao isključivo kroz sočivo dihotomije kontrole?',
    sections: [
      {
        id: 'stoic-1',
        title: '1. Unutrašnja tvrđava i buka sveta',
        durationSec: 100,
        quoteHighlight: '„Imaš vlast nad svojim umom, a ne nad spoljašnjim događajima. Shvati ovo, i naći ćeš snagu.“ — Marko Aurelije',
        text:
          'Dobrodošli u filozofsko predavanje o stoicizmu. Stavite slušalice, opustite ramena i udahnite duboko. Živimo u svetu neprekidnih stimulacija, zahteva i nepredvidivih obrta. Pre dve hiljade godina, rimski car Marko Aurelije sedeo je u svom vojnom šatoru kraj Dunava i suočavao se sa istim nemirima uma kao i mi danas. Njegov ključni uvid bio je jednostavan: svet spolja može biti buran, ali u dubini svakog čoveka leži neosvojiva tvrđava. Mir nije odsustvo problema, već stabilnost posmatrača koji gleda te probleme.',
      },
      {
        id: 'stoic-2',
        title: '2. Dihotomija kontrole — Temelj slobode',
        durationSec: 120,
        quoteHighlight: '„Od stvari koje postoje, jedne su u našoj moći, druge nisu.“ — Epiktet',
        text:
          'Bivši rob Epiktet pretvorio je ovu ideju u vrhunski praktični zakon koji zovemo dihotomija kontrole. Postoje samo dve kategorije stvari. U prvoj su tvoje misli, tvoji izbori, tvoje namere i tvoje reakcije. U drugoj je sve ostalo: vreme napolju, tuđa mišljenja, ekonomija, bolest i tuđi postupci. Gotovo sva ljudska teskoba potiče iz jedne greške: pokušavamo da kontrolišemo ono što nije naše, dok zanemarujemo ono što jeste. Kada sledeći put osetiš bes ili nervozu, postavi sebi samo jedno pitanje: Da li je ovo direktno pod mojom voljom? Ako nije, podseti se sa smirenošću: To se ne tiče mog unutrašnjeg integriteta.',
      },
      {
        id: 'stoic-3',
        title: '3. Amor Fati — Voleti ono što jeste',
        durationSec: 110,
        quoteHighlight: '„Ne traži da se događaji odvijaju onako kako želiš, već želi da se odvijaju onako kako se odvijaju.“ — Epiktet',
        text:
          'Stoici nisu zagovarali pasivno mirenje sa sudbinom, već koncept koji je Fridrih Niče kasnije nazvao Amor Fati — ljubav prema sudbini. To znači da kada se plan izjalovi, voz zakasni ili projekat propadne, stoik ne kune univerzum. Umesto toga, on kaže: Ovo je teren koji mi je dat. Prepreka na putu postaje sam put. Vatra ne kuka kada na nju baciš teško drvo; ona to drvo pretvara u sopstveni plamen i svetlost.',
      },
      {
        id: 'stoic-4',
        title: '4. Večernja revizija i mir uma',
        durationSec: 95,
        quoteHighlight: '„Kada se svetla ugase, pitam svoju dušu: Koju si lošu naviku danas savladala? U čemu si bolja?“ — Seneka',
        text:
          'Seneka nas uči noćnom ritualu smirenja. Pre nego što zaspiš, zatvori oči i mirno pregledaj protekli dan kao nepristrasan sudija. Nemoj se mučiti krivicom, već zabeleži lekcije. Gde si odreagovao prebrzo? Gde si sačuvao dostojanstvo? Sa svakim dahom otpusti potrebu za perfekcijom i seti se da je svaki novi dan nova prilika za praktikovanje mudrosti. Sada, dok slušaš ovaj ton u slušalicama, dozvoli svom umu da se potpuno odmori.',
      },
    ],
  },
  {
    id: 'audio-sizif-egzistencijalizam',
    title: 'Sizifova pobuna: Smisao u svetu apsurda',
    subtitle: 'Kako živeti hrabro i strastveno kada kosmos ćuti',
    category: 'egzistencijalizam',
    categoryLabel: 'Egzistencijalizam',
    durationMinutes: 8,
    narratorTitle: 'Egzistencijalni mislilac',
    description:
      'Zašto je Alber Kami tvrdio da Sizifa moramo zamisliti kao srećnog čoveka? Predavanje o apsurdu, slobodi i stvaranju sopstvene svrhe kada univerzum ne nudi gotove odgovore.',
    keyTakeaways: [
      'Apsurd nastaje iz sudara ljudske želje za smislom i tišine hladnog kosmosa.',
      'Pobuna: Umesto očaja ili lažnih uteha, živeti punim intenzitetom ovde i sada.',
      'Sizif je gospodar svog kamena — tvoj život pripada tebi, ne tvojim teretima.',
    ],
    associatedPhilosopherIds: ['camus', 'sartre', 'kierkegaard'],
    associatedPhilosopherNames: ['Alber Kami', 'Žan-Pol Sartr', 'Seren Kjerkegor'],
    associatedTermIds: ['apsurd', 'egzistencija-pre-esencije', 'volja-za-moc'],
    associatedTermNames: ['Apsurd', 'Egzistencija prethodi esenciji'],
    bgAtmosphereRecommendation: 'rain_library',
    reflectionQuestion:
      'Koji je tvoj lični kamen koji svakodnevno guraš uz brdo, i kako mu možeš dati dostojanstvo umesto frustracije?',
    sections: [
      {
        id: 'sizif-1',
        title: '1. Tišina svemira i ljudski vapaj',
        durationSec: 105,
        quoteHighlight: '„Apsurd se rađa iz ovog sukoba između ljudskog poziva i nerazumne tišine sveta.“ — Alber Kami',
        text:
          'Čovek se budi, ide na posao, obeduje, vraća se kući, spava. I tako danima, mesecima. A onda se jednog jutra pojavi pitanje: Zašto? U tom trenutku zavesa pada. Alber Kami naziva ovo buđenjem pred osećanjem apsurda. Apsurd nije ni u nama, ni u zvezdama; on se rađa iz nepremostivog jaza između naše duboke ljudske gladi za trajnim smislom i ravnodušnog, nemog svemira koji na ta pitanja ne odgovara.',
      },
      {
        id: 'sizif-2',
        title: '2. Izbori pred ponorom',
        durationSec: 110,
        quoteHighlight: '„Osuđeni smo na slobodu.“ — Žan-Pol Sartr',
        text:
          'Kada čovek shvati da kosmos ne sadrži priručnik sa uputstvima za upotrebu, šta mu preostaje? Neki beže u iluzije, tražeći nekritičke autoritete koji će odlučivati umesto njih. Drugi padaju u nihilizam. Ali Kami i Sartr predlažu treći, najhrabriji put: pobunu. Ako smisao nije zapisan na nebu, to znači da smo mi tvorci sopstvenog značenja. Egzistencija prethodi esenciji. Prvo postojimo, a onda sopstvenim delima i odlukama klesamo ko smo.',
      },
      {
        id: 'sizif-3',
        title: '3. Sizif na vrhu planine',
        durationSec: 120,
        quoteHighlight: '„Sama borba prema vrhuncu dovoljna je da ispuni ljudsko srce. Sizifa moramo zamisliti kao srećnog.“ — Alber Kami',
        text:
          'Zamislite Sizifa. Osuđen od bogova da gura ogromnu stenu do vrha planine, samo da bi gledao kako se ona ponovo kotrlja u dolinu. Besmisleno? Možda spolja. Ali obratite pažnju na trenutak kada Sizif silazi niz padinu da ponovo uzme kamen u ruke. U tom silasku, on je svestan svog položaja. On ne kuka, ne klanja se bogovima. On bira da ponovo gurne kamen. U tom svesnom činu leži pobeda. Njegova sudbina pripada njemu. I svako od nas, suočen sa svakodnevnim naporima, može pronaći radost u samom činu stvaranja, udisanja i koračanja.',
      },
    ],
  },
  {
    id: 'audio-sokratova-agora',
    title: 'Sokratova agora: Umetnost postavljanja pitanja',
    subtitle: 'Kako prepoznati sopstveno neznanje i osloboditi se zabluda',
    category: 'antička',
    categoryLabel: 'Antička Grčka',
    durationMinutes: 9,
    narratorTitle: 'Atinski sagovornik',
    description:
      'Zakoračite na sunčanu atinsku agoru. Poslušajte kako je bosonogi Sokrat preispitivao najmoćnije političare i mudrace svoga doba i zašto je pravo pitanje vrednije od deset gotovih dogmi.',
    keyTakeaways: [
      'Sokratovsko neznanje: Priznanje da ne znamo je jedini preduslov za učenje.',
      'Majeutika (porođajna veština duha): Istina se ne nameće, već se rađa kroz dijalog.',
      'Neispitan život nije vredan življenja.',
    ],
    associatedPhilosopherIds: ['socrates', 'plato'],
    associatedPhilosopherNames: ['Sokrat', 'Platon'],
    associatedTermIds: ['majeutika', 'ironija', 'eudaimonia'],
    associatedTermNames: ['Majeutika', 'Sokratovska ironija', 'Eudajmonija'],
    bgAtmosphereRecommendation: 'agora_wind',
    reflectionQuestion:
      'Koje duboko uverenje u svom životu uzimaš zdravo za gotovo, a nikada ga nisi podvrgao sokratovskom preispitivanju?',
    sections: [
      {
        id: 'sokr-1',
        title: '1. Bosonogi mudrac i proročište u Delfima',
        durationSec: 110,
        quoteHighlight: '„Znam samo jedno, a to je da ništa ne znam.“ — Sokrat',
        text:
          'Zamislite buku atinske pijace pre dve i po hiljade godina. Trgovci viču, mirišu masline i začini, a među njima šeta čovek u gruboj tunici bez cipela. Kada je proročište u Delfima objavilo da u čitavoj Grčkoj nema mudrijeg čoveka od Sokrata, on je bio zaprepašćen. Kako je to moguće, kada on oseća da ništa ne zna sa sigurnošću? Odlučio je da ispita najučenije ljude Atine — političare, pesnike i zanatlije. I tada je došao do zapanjujućeg otkrića: svi su oni mislili da znaju mnogo o pravdi, hrabrosti i dobru, a nisu znali ništa. Sokratova mudrost bila je samo u tome što je bio svestan granica svog znanja.',
      },
      {
        id: 'sokr-2',
        title: '2. Majeutika — Porođaj duše',
        durationSec: 115,
        quoteHighlight: '„Moja veština je poput babice: ona ne rađa decu, već pomaže drugima da porode istinu.“ — Sokrat',
        text:
          'Sokratova majka Fenareta bila je babica. Sokrat je tvrdio da je on nasledio njen zanat, ali za ljudske duše. Njegova metoda nije bila držanje dugačkih predavanja, već postavljanje niza jednostavnih, preciznih pitanja. Kada bi neko rekao: „Pravda je pomoći prijateljima i naškoditi neprijateljima“, Sokrat bi pitao: „A šta ako je tvoj prijatelj učinio nepravdu? Da li je pravedno pomoći mu u zlu?“ Kroz seriju pitanja, sagovornik bi uvideo kontradiktornosti sopstvenih dogmi. Lažno znanje bi se raspalo, otvarajući prostor za istinsku svest.',
      },
      {
        id: 'sokr-3',
        title: '3. Suđenje i neustrašivost pred smrću',
        durationSec: 110,
        quoteHighlight: '„Neispitan život nije vredan življenja.“ — Sokrat na suđenju',
        text:
          'Atinskim vlastima je dosadilo da ih neko stalno podseća na njihove slabosti. Optužili su ga za kvarenje omladine i uvođenje novih božanstava. Ponudili su mu da zaćuti i ode u progonstvo. Sokrat je odbio. Ispijajući pehar kukute u atinskom zatvoru okružen prijateljima, bio je mirniji od svojih krvnika. Znao je da je telo smrtno, ali da ideja istine i dostojanstva nadilazi pojedinačni život. Slušajući ovaj vetar Agore u slušalicama, zapitajte se: gde u svom životu branite kompromis umesto istine?',
      },
    ],
  },
  {
    id: 'audio-platonska-pecina',
    title: 'Platonova pećina: Iluzija senki i svetlost ideja',
    subtitle: 'Alegorija o zarobljeništvu uma i hrabrosti za prosvetljenje',
    category: 'antička',
    categoryLabel: 'Platonizam',
    durationMinutes: 8,
    narratorTitle: 'Čuvar Platonove akademije',
    description:
      'Jedna od najslavnijih metafora u istoriji civilizacije. Da li je svet koji vidimo očima stvarna realnost ili samo projekcija senki na zidu podzemne pećine?',
    keyTakeaways: [
      'Svet čula naspram sveta ideja: Senke nisu suština stvari.',
      'Buđenje uma je bolan proces prilagođavanja na jaku svetlost istine.',
      'Dužnost filozofa: Vratiti se u pećinu i pomoći drugima da se oslobode lanaca.',
    ],
    associatedPhilosopherIds: ['plato', 'socrates'],
    associatedPhilosopherNames: ['Platon', 'Sokrat'],
    associatedTermIds: ['svet-ideja', 'ontologija', 'epistemologija'],
    associatedTermNames: ['Teorija Ideja', 'Ontologija', 'Epistemologija'],
    bgAtmosphereRecommendation: 'temple_silence',
    reflectionQuestion:
      'Koje savremene „senke na zidu“ (društvene mreže, status, tuđa očekivanja) najviše brkaš sa stvarnom realnošću?',
    sections: [
      {
        id: 'pecina-1',
        title: '1. Zatočenici u podzemlju',
        durationSec: 105,
        quoteHighlight: '„Zamislite ljude u podzemnoj pećini sa nogama i vratom u okovima od detinjstva...“ — Platon, Država',
        text:
          'Zatvorite oči. Zamislite mračnu pećinu. Na dnu pećine sede ljudi vezani lancima od rođenja, tako da mogu gledati samo u zid ispred sebe. Iza njihovih leđa gori velika vatra, a između vatre i njih prolaze nosači noseći razne figure ljudi, životinja i predmeta od drveta i kamena. Vatra baca senke ovih predmeta na zid pećine. Zatočenici nikada nisu videli ništa drugo osim tih senki. Kada senka prođe, oni joj daju imena. Kada odjekne glas, oni misle da senka govori. Za njih su te dvodimenzionalne siluete jedina i apsolutna stvarnost.',
      },
      {
        id: 'pecina-2',
        title: '2. Izlazak na sunčevu svetlost',
        durationSec: 110,
        quoteHighlight: '„Kada bi neko bio oslobođen i prinuđen da ustane i pogleda u svetlost, osećao bi bol u očima...“ — Platon',
        text:
          'Šta se dešava kada se jedan zarobljenik oslobodi okova? Kada se okrene, svetlost vatre ga zaslepljuje. Ako ga neko povuče naviše, uz strmi izlaz iz pećine na otvoreno polje, sunčeva svetlost biće nepodnošljiva. Prvo će moći da gleda samo senke noću, zatim odraze u vodi, a tek na kraju sam izvor svetlosti — Sunce. U tom trenutku on shvata: zid pećine bio je puka iluzija. Sunce omogućava rast, vid i život.',
      },
      {
        id: 'pecina-3',
        title: '3. Povratak među okovane',
        durationSec: 100,
        quoteHighlight: '„Ako bi se vratio i seo na staro mesto, njegove oči, naviknute na sunce, bile bi slepe u tami pećine...“ — Platon',
        text:
          'Najtragičniji deo Platonove priče je povratak. Prosvetljeni čovek ne može ostati sam u blaženstvu sunca; oseća samilost prema braći u tami. Ali kada se vrati, njegove oči više ne vide dobro u mraku pećine. Zatočenici mu se podsmevaju: „Otišao je gore i vratio se slep! Bolje je ne izlaziti!“ A ako pokuša da im skine lance, spremni su i da ga ubiju — što je aluzija na sudbinu Sokrata. Ova alegorija nas podseća da je buđenje svesti retko udobno, ali je to jedini put ka istinskoj slobodi.',
      },
    ],
  },
  {
    id: 'audio-wu-wei-taoizam',
    title: 'Wu Wei: Umetnost delovanja bez napora',
    subtitle: 'Istočnjačka mudrost toka, tišine i ne-prisiljavanja',
    category: 'istočna',
    categoryLabel: 'Istočna filozofija & Taoizam',
    durationMinutes: 9,
    narratorTitle: 'Taoistički kontemplativac',
    description:
      'Kako postati poput vode koja savladava najtvrđi kamen bez ijednog udarca? Uronite u tišinu Lao Cea i Džuangcea uz umirujuće zvuke za slušalice.',
    keyTakeaways: [
      'Wu Wei nije lenjost ili pasivnost, već delovanje u savršenom skladu sa prirodom stvari.',
      'Paradoks vode: Meko i popustljivo uvek pobeđuje kruto i tvrdo na duge staze.',
      'Otpuštanje kontrole: Kada prestaneš da forsiraš, stvari se slažu na svoje mesto.',
    ],
    associatedPhilosopherIds: ['lao-tzu'],
    associatedPhilosopherNames: ['Lao Ce'],
    associatedTermIds: ['wu-wei', 'sunjata', 'ataraksija'],
    associatedTermNames: ['Wu Wei', 'Šunjata (Praznina)', 'Ataraksija'],
    bgAtmosphereRecommendation: 'binaural_theta',
    reflectionQuestion:
      'Gde u svom životu trenutno ulažeš previše grčevitog otpora i forsiranja, umesto da pustiš da stvari teku svojim prirodnim tokom?',
    sections: [
      {
        id: 'wu-1',
        title: '1. Voda kao najviši učitelj',
        durationSec: 110,
        quoteHighlight: '„Ništa na svetu nije mekše i popustljivije od vode, ali za savladavanje tvrdog i krutog ništa je ne može nadmašiti.“ — Lao Ce, Tao Te Đing',
        text:
          'Duboko izdahnite. Zamislite planinski potok. Voda ne raspravlja sa stenom koja joj stoji na putu. Ona se ne ljuti, ne udara glavom o nju. Voda jednostavno teče oko nje, obavija je, i tokom vremena zaobljuje najoštrije ivice kamena. Lao Ce nas uči da je u prirodi najveća snaga u prividnoj mekoći. Drvo koje je kruto i suvo lako puca na jakom vetru; vlat trave ili bambus koji se savijaju opstaju i posle najstrašnije oluje.',
      },
      {
        id: 'wu-2',
        title: '2. Wu Wei u svakodnevnim delima',
        durationSec: 115,
        quoteHighlight: '„Deluj bez delovanja; radi bez napora; okušaj ono što nema ukusa.“ — Lao Ce',
        text:
          'Kineski pojam Wu Wei se često pogrešno prevodi kao nerad ili apatija. Ali to je suprotno od istine. Wu Wei znači delovanje koje ne pruža veštački otpor prirodnom toku stvari. To je stanje u psihologiji poznato kao flow — stanje vrhunskog sportiste, muzičara ili umetnika koji više ne razmišlja o pokretima prstiju, već je postao sama melodija. Kada prestanemo da namećemo svoj tvrdoglavi ego svakoj situaciji, naša energija se ne troši na unutrašnji konflikt.',
      },
      {
        id: 'wu-3',
        title: '3. Džuangce i leptirov san',
        durationSec: 100,
        quoteHighlight: '„Jednom je Džuangce sanjao da je leptir... Probudivši se, nije znao da li je čovek koji je sanjao da je leptir, ili leptir koji sada sanja da je čovek.“',
        text:
          'Džuangce nas uči lakoći postojanja. Ne shvatajte sebe preozbiljno. Granice između naših briga, naših identiteta i sveta su mnogo poroznije nego što naš um zamišlja. Dok slušate ovaj ritam u slušalicama, otpustite potrebu da uvek pobedite u raspravi, potrebu da sve kontrolišete. Budite poput praznog čamca koji pluta niz reku.',
      },
    ],
  },
  {
    id: 'audio-nice-vecni-povratak',
    title: 'Niče i Večni Povratak: Najteži teret volje',
    subtitle: 'Misaoni eksperiment koji radikalno menja tvoj pogled na svaki minut života',
    category: 'nise_i_paradoksi',
    categoryLabel: 'Egzistencija & Duboki Paradoksi',
    durationMinutes: 8,
    narratorTitle: 'Filozof sa čekićem',
    description:
      'Šta ako bi se tvoj život — sa svakim bolom, radošću i sramotom — morao ponavljati iznova, u beskonačnoj petlji? Da li bi to bila tvoja kletva ili tvoje najveće spasenje?',
    keyTakeaways: [
      'Večni povratak istog kao ultimativni etički i psihološki test svakog izbora.',
      'Prevazilaženje samosažaljenja i kajanja: Ako želiš jedan trenutak ponovo, moraš želeti čitav univerzum.',
      'Ljubav prema sopstvenoj sudbini (Amor Fati) na najvišem stepenu heroizma.',
    ],
    associatedPhilosopherIds: ['nietzsche', 'spinoza'],
    associatedPhilosopherNames: ['Fridrih Niče', 'Baruh Spinoza'],
    associatedTermIds: ['vecni-povratak', 'volja-za-moc', 'amor-fati'],
    associatedTermNames: ['Večni povratak', 'Volja za moć', 'Amor Fati'],
    bgAtmosphereRecommendation: 'agora_wind',
    reflectionQuestion:
      'Da li živiš svoj današnji dan na način na koji bi pristao da ga proživljavaš bezbroj puta zauvek?',
    sections: [
      {
        id: 'nice-1',
        title: '1. Demon u najusamljenijoj noći',
        durationSec: 110,
        quoteHighlight: '„Šta ako bi ti se jednog dana ili noći demon prikrao u tvoju najusamljeniju samoću...“ — Fridrih Niče, Vesela nauka',
        text:
          'U avgustu 1881. godine, šetajući pored jezera Silvaplana u Švajcarskoj, Fridrih Niče je doživeo viziju koja ga je potresla do srži. Zamislite da vam noćas, dok ležite u tami sa slušalicama, priđe demon i šapne: „Ovaj život, kakvim ga sada živiš i kakvim si ga proživeo, moraćeš da proživiš još jednom i bezbroj puta ponovo. I u njemu neće biti ničeg novog, već svaki bol i svaka radost, svaka misao i uzdah moraće da ti se vrate u potpuno istom redosledu.“ Da li biste se bacili na pod škripeći zubima i proklinjali tog demona? Ili ste doživeli bar jedan trenutak toliko čudesan da biste odgovorili: „Ti si bog i nikada nisam čuo ništa božanskije!“',
      },
      {
        id: 'nice-2',
        title: '2. Kraj bezvrednog kajanja',
        durationSec: 110,
        quoteHighlight: '„Moja formula za veličinu u čoveku jeste Amor fati: da se ne želi ništa drugačije, ni unapred, ni unazad, ni u celoj večnosti.“ — Fridrih Niče',
        text:
          'Ovaj misaoni eksperiment nije astrološka tvrdnja o fizici kosmosa; to je najradikalniji test svesti. Većina ljudi živi u trajnom odlaganju života: „Biću srećan kada završim fakultet, kada kupim stan, kada prođe ova kriza.“ Niče kaže: Ako bi se svaki trenutak vraćao večno, onda sadašnji trenutak nosi beskonačnu težinu. Ne možeš ga tretirati kao bezvrednu čekaonicu za neku zamišljenu budućnost. Tvoja tuga, tvoji padovi i tvoje pobede neraskidivo su povezani u jedno tkivo.',
      },
      {
        id: 'nice-3',
        title: '3. Afirmacija postojanja',
        durationSec: 95,
        quoteHighlight: '„Biti onaj koji blagosilja i govori DA svemu.“ — Niče',
        text:
          'Kada prihvatite večni povratak, kajanje nestaje. Ne postoji više „eh, da sam barem tada postupio drugačije“. Postoji samo svesna odluka: „Tako sam hteo, tako hoću, i tako ću ponovo hteti.“ Ova vrsta hrabrosti preobražava teret u krila. Dok slušate ove reči, osetite težinu i lepotu svog daha u ovom jedinstvenom deliću večnosti.',
      },
    ],
  },
  {
    id: 'audio-brod-tezeja-identitet',
    title: 'Brod Tezeja: Tajna onoga ko sluša ove reči',
    subtitle: 'Paradoks ličnog identiteta, rečnog toka i iluzije trajnog ega',
    category: 'nise_i_paradoksi',
    categoryLabel: 'Misaoni eksperimenti & Svest',
    durationMinutes: 8,
    narratorTitle: 'Istraživač paradoksa svesti',
    description:
      'Ako se svaka ćelija u tvom telu obnovi svakih sedam godina, ko je onda „ja“ koje se seća detinjstva? Fascinantno istraživanje od Heraklita do savremene neuronauke.',
    keyTakeaways: [
      'Brod Tezeja: Ako zameniš sve delove broda jedan po jedan, u kom momentu on prestaje da bude isti brod?',
      'Heraklit: Ne možeš dva puta stupiti u istu reku — ni reka nije ista, ni ti nisi isti.',
      'Svest kao rečni tok percepcija, a ne kruti monolit.',
    ],
    associatedPhilosopherIds: ['heraclitus', 'zeno-elea', 'parmenides'],
    associatedPhilosopherNames: ['Heraklit', 'Zenon iz Eleje', 'Parmenid'],
    associatedTermIds: ['brod-tezeja', 'sorit-paradoks', 'kineska-soba'],
    associatedTermNames: ['Brod Tezeja', 'Paradoks gomile (Sorit)', 'Kineska soba'],
    bgAtmosphereRecommendation: 'rain_library',
    reflectionQuestion:
      'Koji deo tvoje ličnosti grčevito braniš kao „to sam ja“, a zapravo je samo stara navika ili zamenjena daska na tvom brodu?',
    sections: [
      {
        id: 'tezej-1',
        title: '1. Tezejeva drvena galija',
        durationSec: 105,
        quoteHighlight: '„Brod na kome su Tezej i atinska omladina doplovili sa Krita čuvali su Atinjani vekovima...“ — Plutarh',
        text:
          'Plutarh prenosi čuvenu zagonetku. Atinjani su u luci držali brod kojim se junak Tezej vratio iz borbe sa Minotaurom. Kako bi koja daska istrulila, tesari bi je izvadili i stavili novu od zdravog hrasta. Posle nekoliko stotina godina, na brodu nije ostala nijedna originalna daska. Filozofi su se sporili: Da li je to i dalje isti brod? A onda je Tomas Hobs dodao još teže pitanje: Šta ako je neki lukavi čuvar sakupljao sve one stare, trule daske na otpadu i od njih ponovo sastavio brod — koji od ta dva broda je pravi Tezejev brod?',
      },
      {
        id: 'tezej-2',
        title: '2. Tvoje telo i tvoj um kao brod Tezeja',
        durationSec: 110,
        quoteHighlight: '„Niko ne ulazi u istu reku dvaput, jer to više nije ista reka, i on nije isti čovek.“ — Heraklit',
        text:
          'Ovo nije samo zabavna mozgalica za moreplovce. To je pitanje tvoje sopstvene suštine. Biolozi znaju da se gotovo svaka ćelija u tvom telu zameni tokom sedam do deset godina. Čak se i atomi u tvojim kostima i mozgu neprekidno recikliraju kroz hranu, vazduh i vodu. Tvoje uspomene iz osnovne škole nosi mozak čija materija tada uopšte nije postojala. Ako tvoje telo nije isto, jesu li tvoje misli iste? Da li si ti ista osoba koja je započela slušanje ove lekcije pre pet minuta?',
      },
      {
        id: 'tezej-3',
        title: '3. Oslobađanje od fiksnog kaveza ega',
        durationSec: 100,
        quoteHighlight: '„Čovek je most, a ne cilj.“ — Fridrih Niče',
        text:
          'Istočni mislioci i zapadni skeptici poput Dejvida Hjuma dolaze do istog zaključka: „Ja“ nije statična granitna statua. „Ja“ je proces, muzička kompozicija koja traje u vremenu. Brod Tezeja nije stvar — on je obrazac, plovidba. Kada ovo shvatite, oslobađate se tereta da morate zauvek biti zarobljeni u greškama iz svoje prošlosti. Svakog jutra vaš brod isplovljava iznova, sa novim vetrom u jedrima.',
      },
    ],
  },
];
