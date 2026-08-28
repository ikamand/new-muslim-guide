import type { ContentDict } from '../locales';

/**
 * Spanish translations of the app's content.
 *
 * ⚠️ WHAT IS AND IS NOT HERE.
 *
 * Present: the twelve beginner guides in `src/content/learn/` — original prose
 * written for this app, explaining what Islam is, who the Prophet ﷺ was, what
 * changes at the supermarket. Translating that is ordinary translation.
 *
 * Absent, deliberately: every translation of Qur'an, of dhikr said in prayer,
 * and of the instructions for how to perform wudu and salah. Those are not
 * ordinary prose. Getting one wrong teaches someone to worship incorrectly in
 * a language neither author reads back, and they need a qualified Spanish
 * translator working from `docs/i18n-manifest.csv`.
 *
 * ⚠️ REVIEW REQUIRED — what is here is model-written and needs a native
 * speaker's eye. It is proofreading rather than scholarly review: the claims
 * and their citations were settled in English.
 *
 * ⚠️ FIVE ENTRIES HAVE NOW BEEN DELETED rather than retranslated, each time
 * because the English they were keyed to turned out to be wrong.
 *
 * The first two, in the content audit: the Ramadan lesson said the fast ends
 * "at nightfall" and that zakat al-fitr is "food or its value" — the first is
 * late by roughly an hour, the second states one school's position as the
 * ruling.
 *
 * Three more in the worship-content pass: the sentence saying speech in prayer
 * by mistake means you repeat the prayer (Sahih Muslim 537a shows the opposite
 * — Mu`awiya ibn al-Hakam was not sent back), the four-item list of what
 * breaks the prayer, and the wudu paragraph in `before-prayer` that carried a
 * three-item nullifier list the wudu guide now holds properly.
 *
 * Removing an entry drops that section back to the corrected English rather
 * than replacing a wrong translation with a fresh machine-written one — which
 * is what the fallback is for, and the only honest move without a Spanish
 * reader.
 *
 * ⚠️ 132 MORE WERE DROPPED ON 26 AUG 2026, and not because they were wrong.
 * The English was rewritten to remove em-dashes and read more naturally, and
 * these translations are keyed BY the English text — so every sentence that
 * changed orphaned its translation. `npm run i18n:manifest` exits non-zero
 * while orphans remain, which is what caught them.
 *
 * Nothing was machine-translated to replace them. A section with no entry
 * falls back to the corrected English and `TranslationGap` says so on screen,
 * which is the honest state until a Spanish reader works from
 * `docs/i18n-manifest.csv`.
 *
 * Anything absent falls back to English, so partial delivery is safe to ship.
 */
export const ES: ContentDict = {
  "Cover at least from the navel to the knee, keep clothing loose enough not to be revealing, and avoid pure silk and gold jewellery, which the Prophet ﷺ restricted for men. In ordinary Western dress this changes very little in practice.":
    "Cubre al menos desde el ombligo hasta la rodilla, lleva ropa lo bastante holgada como para no ser reveladora, y evita la seda pura y las joyas de oro, que el Profeta ﷺ restringió para los hombres. Con la ropa occidental corriente esto cambia muy poco en la práctica.",
  "The Qur’an instructs believing women to guard their modesty, to draw their head-coverings over the chest, and to draw their outer garments about them. The commonly taught result is loose clothing covering the body, with the head covered, in front of men outside the immediate family.":
    "El Corán ordena a las mujeres creyentes guardar su modestia, llevar el velo sobre el pecho y cubrirse con sus mantos. Lo que se enseña habitualmente es ropa holgada que cubra el cuerpo, con la cabeza cubierta, ante hombres ajenos a la familia inmediata.",
  "Whether the face and hands must also be covered is a long-standing point of scholarly difference, not a settled question.":
    "Si el rostro y las manos deben cubrirse también es un punto de diferencia entre los sabios desde hace siglos, no una cuestión zanjada.",
  "Nobody has the right to pressure you, and starting is often gradual. If covering would put you in danger or out you before you are ready, that is a real circumstance to discuss with someone knowledgeable rather than a rule you are breaking.":
    "Nadie tiene derecho a presionarte, y empezar suele ser gradual. Si cubrirte te pondría en peligro o te expondría antes de que estés preparada, eso es una circunstancia real que hablar con alguien con conocimiento, no una regla que estés incumpliendo.",
  "The instruction to lower the gaze and guard modesty is given to men first and then to women, in consecutive verses. That order is worth noticing: modesty in Islam is not a set of rules aimed only at women, and men have their own covering to observe.":
    "La orden de bajar la mirada y guardar la modestia se dirige primero a los hombres y luego a las mujeres, en versículos consecutivos. Ese orden merece notarse: la modestia en el islam no es un conjunto de reglas dirigidas solo a las mujeres, y los hombres tienen su propia parte que cubrir.",
  "The Prophet ﷺ said the strong person is not the one who overpowers others, but the one who controls himself when angry. It is a redefinition rather than a rule, and it comes up more often than most of the rules do.":
    "El Profeta ﷺ dijo que el fuerte no es quien vence a los demás, sino quien se domina a sí mismo cuando está enfadado. Es una redefinición más que una regla, y aparece más a menudo que la mayoría de las reglas.",
  "One of the shortest things the Prophet ﷺ said and one of the hardest: none of you truly believes until he wants for his brother what he wants for himself. It is the test to apply when a situation is not covered by anything you have learned yet.":
    "Una de las cosas más breves que dijo el Profeta ﷺ y de las más difíciles: ninguno de vosotros cree de verdad hasta que quiera para su hermano lo que quiere para sí mismo. Es la prueba que aplicar cuando una situación no está cubierta por nada de lo que has aprendido todavía.",
  "You will get things wrong, in front of people, for a while. Everyone did. Being embarrassed about it is not a sign you are doing badly.":
    "Te equivocarás, delante de otros, durante un tiempo. A todos les pasó. Que te dé vergüenza no es señal de que lo estés haciendo mal.",
  "Becoming Muslim does not cancel a family. Converts are sometimes told to distance themselves from non-Muslim relatives; that is not what the text says.":
    "Hacerse musulmán no anula una familia. A veces se dice a los conversos que se distancien de sus parientes no musulmanes; no es lo que dice el texto.",
  "The Qur’an places kindness to parents immediately after worshipping God alone, in the same sentence. When a man asked the Prophet ﷺ who most deserved his good company, the answer was \"your mother\", three times, before \"your father\".":
    "El Corán sitúa la bondad hacia los padres justo después de adorar solo a Dios, en la misma frase. Cuando un hombre preguntó al Profeta ﷺ quién merecía más su buena compañía, la respuesta fue «tu madre», tres veces, antes de «tu padre».",
  "There is no requirement to announce it, and no deadline. Some people tell everyone the same week; others wait months, or years, because the cost at home would be serious. Nothing in your prayer or your standing with God depends on who knows.":
    "No hay obligación de anunciarlo ni plazo alguno. Unos se lo cuentan a todos la misma semana; otros esperan meses, o años, porque el coste en casa sería serio. Nada en tu oración ni en tu situación ante Dios depende de quién lo sepa.",
  "If it is not safe to tell your family, that is a real situation many converts are in and not a failure of courage. Find one person who knows before you tell anyone who might react badly.":
    "Si no es seguro contárselo a tu familia, esa es una situación real en la que están muchos conversos y no una falta de valor. Busca a una persona que lo sepa antes de decírselo a alguien que pueda reaccionar mal.",
  "You do not have to stop eating with people who are not Muslim, and you do not have to make a scene. Eat what you can, quietly leave what you cannot, and answer questions if they come. Most families adjust faster when the change is undramatic.":
    "No tienes que dejar de comer con quienes no son musulmanes, ni montar una escena. Come lo que puedas, deja discretamente lo que no, y responde si preguntan. La mayoría de las familias se adapta antes cuando el cambio no es dramático.",
  "Utensils that touched pork, or a shared roasting tin, worry converts far more than they worry most scholars. Wash it and move on.":
    "Los cubiertos que tocaron cerdo, o una bandeja de horno compartida, preocupan a los conversos mucho más que a la mayoría de los sabios. Lávalo y sigue adelante.",
  "Muslims in Western countries genuinely differ on supermarket meat, and you will be told opposite things with equal confidence.":
    "Los musulmanes en países occidentales difieren de verdad sobre la carne del supermercado, y te dirán cosas opuestas con la misma seguridad.",
  "The Prophet ﷺ said the lawful is clear and the unlawful is clear, and between them are matters that are unclear, which many people do not know about. Someone who stays away from what is doubtful protects their faith and their honour. That middle ground is where most real questions live.":
    "El Profeta ﷺ dijo que lo lícito está claro y lo ilícito está claro, y entre ambos hay asuntos poco claros que muchos desconocen. Quien se aparta de lo dudoso protege su religión y su honra. En ese terreno intermedio viven casi todas las preguntas reales.",
  "This is guidance for your own choices, not a licence to police anyone else’s. Being cautious about a doubtful thing for yourself is careful; declaring it forbidden for other people is a different act entirely.":
    "Esto orienta tus propias decisiones; no es licencia para vigilar las de nadie más. Ser prudente con algo dudoso por tu cuenta es cuidado; declararlo prohibido para otros es otra cosa muy distinta.",
  "This is the part people get backwards. Things are permitted unless there is a clear reason otherwise, and the Qur’an describes the Prophet’s ﷺ message as making good things lawful rather than piling on prohibitions. You do not need to find permission for ordinary life.":
    "Esta es la parte que la gente entiende al revés. Las cosas están permitidas salvo que haya una razón clara en contra, y el Corán describe el mensaje del Profeta ﷺ como algo que hace lícitas las cosas buenas, no que acumula prohibiciones. No necesitas buscar permiso para la vida corriente.",
  "Not fasting when you are exempt is not a failure and not something to feel guilty about. The exemption is part of the instruction, not a loophole in it.":
    "No ayunar cuando estás exento no es un fracaso ni algo por lo que sentirse culpable. La exención forma parte de la indicación, no es un resquicio en ella.",
  "The Qur’an gives the reason directly: so that you may become mindful of God. It is not endurance for its own sake, and it is not a diet. Being hungry at four in the afternoon is a reminder of who provides, and of people for whom that hunger is not a choice.":
    "El Corán da la razón directamente: para que seáis conscientes de Dios. No es resistencia por sí misma, y no es una dieta. Tener hambre a las cuatro de la tarde recuerda quién provee, y a quienes esa hambre no la eligen.",
  "Clothing":
    "Ropa",
  "What is asked, and what is a choice":
    "Qué se pide y qué es elección",
  "Everyday manners":
    "Modales del día a día",
  "The part of Islam people actually see":
    "La parte del islam que la gente ve de verdad",
  "Family":
    "La familia",
  "Parents, home, and telling people":
    "Padres, hogar y contarlo",
  "Food and drink":
    "Comida y bebida",
  "What changes at the supermarket, and what does not":
    "Qué cambia en el supermercado y qué no",
  "Halal and haram":
    "Halal y haram",
  "How the categories actually work":
    "Cómo funcionan de verdad las categorías",
  "Ramadan":
    "Ramadán",
  "What happens, and what is asked of you":
    "Qué ocurre y qué se te pide",
  "What is Islam?":
    "¿Qué es el islam?",
  "The shape of it, in a few minutes":
    "Su forma, en unos minutos",
  "What is the Qur’an?":
    "¿Qué es el Corán?",
  "What it is, and how to start with it":
    "Qué es y cómo empezar con él",
  "What is the Sunnah?":
    "¿Qué es la Sunna?",
  "The Prophet’s ﷺ way, and how it reaches us":
    "El modo del Profeta ﷺ y cómo nos llega",
  "Who is Allah?":
    "¿Quién es Allah?",
  "What Muslims believe about God":
    "Lo que los musulmanes creen sobre Dios",
  "Who is Muhammad ﷺ?":
    "¿Quién es Muhammad ﷺ?",
  "The man Muslims follow, and why":
    "El hombre al que siguen los musulmanes, y por qué",
  "Work and money":
    "Trabajo y dinero",
  "Earning, and the two things to watch for":
    "Ganarse la vida, y las dos cosas a vigilar",
  "When the angel Jibril asked the Prophet ﷺ about this in front of his companions, the answer came in two parts: what you believe, and what you do. Neither stands alone. That is why this app teaches the prayer and the belief side by side rather than one first and one later.":
    "Cuando el ángel Yibril preguntó al Profeta ﷺ sobre esto delante de sus compañeros, la respuesta llegó en dos partes: lo que crees y lo que haces. Ninguna se sostiene sola. Por eso esta aplicación enseña la oración y la creencia a la vez, en lugar de una primero y otra después.",
  "Nobody can be forced into this. The Qur’an says plainly that there is no compulsion in religion.":
    "Nadie puede ser forzado a esto. El Corán dice con claridad que no hay coacción en la religión.",
  "Until you know it, say what you can and keep learning. Nobody starts fluent, and the Practice screen exists to take it a line at a time.":
    "Hasta que la sepas, di lo que puedas y sigue aprendiendo. Nadie empieza con soltura, y la pantalla de práctica existe para tomarla línea a línea.",
  "Sahih al-Bukhari and Sahih Muslim are the two collections Sunni scholars regard as the most rigorously authenticated. Other collections contain both strong and weak reports, which is why a grading matters there and not in these two.":
    "Sahih al-Bujari y Sahih Muslim son las dos colecciones que los sabios sunníes consideran las más rigurosamente autentificadas. Otras colecciones contienen relatos fuertes y débiles, y por eso allí importa la clasificación y en estas dos no.",
  "The Qur’an gives the command and the Sunnah usually gives the method. \"Establish the prayer\" appears again and again; how many units, when, and what to say in them comes from watching him. The Qur’an itself instructs Muslims to take what the Messenger gives them.":
    "El Corán da la orden y la Sunna suele dar el método. «Estableced la oración» aparece una y otra vez; cuántas unidades, cuándo y qué decir en ellas viene de observarlo a él. El propio Corán instruye a los musulmanes a tomar lo que el Mensajero les da.",
  "You will see ﷺ written after his name throughout this app and everywhere else. It stands for an Arabic phrase asking God to bless him and grant him peace. Muslims say it aloud out of respect whenever he is mentioned. Nobody will mind if you forget at first.":
    "Verás ﷺ escrito tras su nombre en toda esta aplicación y en todas partes. Representa una frase árabe que pide a Dios que lo bendiga y le conceda la paz. Los musulmanes la dicen en voz alta por respeto cada vez que se le menciona. A nadie le importará si al principio se te olvida.",
  "Because the Qur’an tells them to. It calls him an excellent example, and says that obeying him is obeying God. In practice this is very concrete: the Qur’an commands prayer without describing how, and the answer to \"how\" is that he said, \"Pray as you have seen me praying.\"":
    "Porque el Corán se lo dice. Lo llama un excelente ejemplo y dice que obedecerle es obedecer a Dios. En la práctica esto es muy concreto: el Corán ordena la oración sin describir cómo, y la respuesta al «cómo» es que él dijo: «Orad como me habéis visto orar».",
  "Loving and following him is not the same as worshipping him. The distinction matters to Muslims and is worth being clear about early.":
    "Amarlo y seguirlo no es lo mismo que adorarlo. La distinción importa a los musulmanes y conviene tenerla clara pronto.",
  "Scholars differ on how much distance from a prohibited thing is enough, so answers vary by how central it is to the job.":
    "Los sabios difieren sobre cuánta distancia de lo prohibido basta, así que las respuestas varían según lo central que sea en el trabajo.",
  "Do not quit your job the week you become Muslim. Find out what your options are first.":
    "No dejes tu trabajo la semana en que te haces musulmán. Averigua primero qué opciones tienes.",
  "There is no ideal of poverty here. The Prophet ﷺ said nobody has eaten better food than what he earned by his own hands, and noted that the Prophet Dawud ate from his own labour. The Qur’an tells people to disperse and seek God’s bounty as soon as the Friday prayer ends.":
    "Aquí no hay un ideal de pobreza. El Profeta ﷺ dijo que nadie ha comido mejor alimento que el que ganó con sus propias manos, y señaló que el profeta Dawud comía de su propio trabajo. El Corán dice a la gente que se disperse y busque el favor de Dios en cuanto termina la oración del viernes.",
  "Until you have it, say what you know and keep going. Nobody expects a first-week Muslim to have memorised it, and the prayer you pray while learning is still your prayer.":
    "Hasta que la tengas, di lo que sepas y sigue. Nadie espera que un musulmán de su primera semana la haya memorizado, y la oración que haces mientras aprendes sigue siendo tu oración.",
  "Because without it there is no prayer. The Prophet ﷺ said that whoever does not recite Al-Fatihah in their prayer, their prayer is invalid. Of everything a new Muslim could memorise, this is the one that changes what they are able to do today.":
    "Porque sin ella no hay oración. El Profeta ﷺ dijo que quien no recita Al-Fatiha en su oración, su oración es inválida. De todo lo que un musulmán nuevo podría memorizar, esta es la que cambia lo que puede hacer hoy.",
  "You do not need Arabic for this. The memorised duʿas are worth learning because they are the Prophet’s ﷺ wording, not because your own words would be rejected.":
    "No necesitas árabe para esto. Los duʿas memorizados merecen aprenderse porque son las palabras del Profeta ﷺ, no porque las tuyas fueran a ser rechazadas.",
  "The Prophet ﷺ compared the person who remembers their Lord to the living, and the one who does not to the dead. He also said that whoever says subḥāna-llāhi wa bi-ḥamdih a hundred times in a day has their sins forgiven though they were like the foam of the sea.":
    "El Profeta ﷺ comparó a quien recuerda a su Señor con los vivos, y a quien no lo hace con los muertos. También dijo que quien dice subḥāna-llāhi wa bi-ḥamdih cien veces al día tiene sus faltas perdonadas aunque fueran como la espuma del mar.",
  "The Prophet ﷺ said the believer’s situation is remarkable, because everything that happens to them is good: when something pleasant comes they are grateful and that is good for them, and when something painful comes they are patient and that is good for them. Nobody else, he said, is in that position.":
    "El Profeta ﷺ dijo que la situación del creyente es admirable, porque todo lo que le ocurre es bueno: cuando llega algo agradable da gracias y eso es bueno para él, y cuando llega algo doloroso tiene paciencia y eso es bueno para él. Nadie más, dijo, está en esa posición.",
  "Al-Fatihah":
    "Al-Fatiha",
  "The one thing the prayer cannot do without":
    "Lo único sin lo que la oración no puede ser",
  "Duʿa and dhikr":
    "Duʿa y dhikr",
  "Talking to God outside the prayer":
    "Hablar con Dios fuera de la oración",
  "Patience and gratitude":
    "Paciencia y gratitud",
  "The two halves of getting through a life":
    "Las dos mitades de atravesar una vida",
  "The Muslim year":
    "El año musulmán",
  "Why the dates move, and what falls where":
    "Por qué se mueven las fechas y qué cae dónde",
  "What breaks the prayer":
    "Qué rompe la oración",
  "And what only feels like it does":
    "Y qué solo lo parece",
  "What you need before you pray":
    "Qué necesitas antes de rezar",
  "The five things to have in place":
    "Las cinco cosas que deben estar en su sitio",
  "When you get it wrong":
    "Cuando te equivocas",
  "Repentance, and why it is not a big ceremony":
    "El arrepentimiento, y por qué no es una gran ceremonia",
  "Whether a month begins by sighting the moon locally or by astronomical calculation is a live question, and communities in the same country sometimes start Ramadan on different days.":
    "Si un mes empieza por la observación local de la luna o por cálculo astronómico es una cuestión viva, y comunidades del mismo país empiezan Ramadán a veces en días distintos.",
  "Both approaches are argued from evidence and neither community is being careless. As a beginner the practical answer is to follow the mosque or community you pray with. Scholars have discussed this in more detail.":
    "Ambos enfoques se argumentan con pruebas y ninguna comunidad está siendo descuidada. Para un principiante la respuesta práctica es seguir a la mezquita o comunidad con la que reza. Los sabios han tratado esto con más detalle.",
  "Follow the sighting of the moon, as reported locally or regionally.":
    "Seguir la observación de la luna, según se informe localmente o en la región.",
  "Some bodies accept astronomical calculation to fix the date in advance.":
    "Algunos organismos aceptan el cálculo astronómico para fijar la fecha por adelantado.",
  "The most common beginner mistake is starting the prayer over. Almost nothing requires that, and restarting turns a small slip into a long one.":
    "El error más común del principiante es volver a empezar la oración. Casi nada lo exige, y reiniciar convierte un desliz pequeño en uno largo.",
  "Doubt does not. Someone asked the Prophet ﷺ about feeling as though they had passed wind mid-prayer, and he said not to leave the prayer unless they heard a sound or smelled something. Uncertainty is not enough. Carry on.":
    "La duda no. Alguien preguntó al Profeta ﷺ sobre la sensación de haber expulsado gases en plena oración, y dijo que no dejara la oración a menos que oyera un sonido u oliera algo. La incertidumbre no basta. Sigue.",
  "This is the hadith to remember if you find yourself checking constantly. The rule is deliberately strict about certainty, because doubt would otherwise end every prayer.":
    "Este es el hadiz que recordar si te encuentras comprobándolo constantemente. La regla es deliberadamente estricta con la certeza, porque de otro modo la duda acabaría con cada oración.",
  "How much has to be covered differs a little between men and women and is set out in the clothing guide. Ordinary loose clothes cover it for most people.":
    "Cuánto hay que cubrir varía un poco entre hombres y mujeres y está explicado en la guía de ropa. La ropa holgada corriente lo cubre para la mayoría.",
  "The intention is a thought, not a sentence: knowing which prayer you are about to pray. You do not say it out loud, and you do not need a formula. If you are standing on a mat about to pray Maghrib, you have already intended it.":
    "La intención es un pensamiento, no una frase: saber qué oración estás a punto de hacer. No se dice en voz alta y no hace falta una fórmula. Si estás de pie sobre una esterilla a punto de rezar el Magrib, ya la has intentado.",
  "Some people are taught to say the intention aloud. Scholars differ on whether that is recommended, and nobody holds that the prayer fails without it.":
    "A algunas personas se les enseña a decir la intención en voz alta. Los sabios difieren sobre si eso es recomendable, y ninguno sostiene que la oración falle sin ello.",
  "The Prophet ﷺ described God as more pleased with a person’s repentance than someone would be who lost their camel in the desert and then found it. The image is not of a grudging pardon. It is relief and delight.":
    "El Profeta ﷺ describió a Dios como más complacido con el arrepentimiento de una persona que alguien que perdió su camello en el desierto y luego lo encontró. La imagen no es de un perdón a regañadientes. Es alivio y alegría.",
  "Nobody is owed an account of your sins. You do not have to tell an imam, a friend, or anyone at the mosque.":
    "A nadie se le debe un relato de tus faltas. No tienes que contárselo a un imán, a un amigo ni a nadie de la mezquita.",
  "Washing before prayer":
    "El lavado antes de la oración",
  "The full wash, and when you need it":
    "El lavado completo, y cuándo hace falta",
  "When you cannot use water":
    "Cuando no puedes usar agua",
  "Becoming Muslim":
    "Hacerse musulmán",
  "What to say, and what it means":
    "Qué decir y qué significa",
  "2 rakʿah · Dawn, before sunrise":
    "2 rakʿas · Al alba, antes del amanecer",
  "4 rakʿah · After midday":
    "4 rakʿas · Después del mediodía",
  "4 rakʿah · Late afternoon":
    "4 rakʿas · A media tarde",
  "3 rakʿah · Just after sunset":
    "3 rakʿas · Justo después de la puesta del sol",
  "4 rakʿah · Night":
    "4 rakʿas · De noche",
  "Wudu":
    "Wudu",
  "Ghusl":
    "Ghusl",
  "Tayammum":
    "Tayammum",
  "After eating":
    "Después de comer",
  "Two wordings are commonly said after a meal. This one carries the stronger grading; the other is below. Either is said, and many people know only one of them.":
    "Después de comer se dicen habitualmente dos fórmulas. Esta tiene la clasificación más fuerte; la otra está debajo. Se dice cualquiera de las dos, y mucha gente solo conoce una.",
  "All praise is for Allah, who fed me this and provided it for me, with no strength or power of my own.":
    "Toda alabanza es para Allah, que me dio de comer esto y me lo proveyó, sin fuerza ni poder míos.",
};
