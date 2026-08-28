import type { ContentDict } from '../locales';

/**
 * French translations of the app's content.
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
 * a language neither author reads back, and they need a qualified French
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
 * is what the fallback is for, and the only honest move without a French
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
 * which is the honest state until a French reader works from
 * `docs/i18n-manifest.csv`.
 *
 * Anything absent falls back to English, so partial delivery is safe to ship.
 */
export const FR: ContentDict = {
  "Cover at least from the navel to the knee, keep clothing loose enough not to be revealing, and avoid pure silk and gold jewellery, which the Prophet ﷺ restricted for men. In ordinary Western dress this changes very little in practice.":
    "Couvrez au moins du nombril au genou, portez des vêtements assez amples pour ne rien révéler, et évitez la soie pure et les bijoux en or, que le Prophète ﷺ a interdits aux hommes. Avec des vêtements occidentaux ordinaires, cela change très peu de choses en pratique.",
  "The Qur’an instructs believing women to guard their modesty, to draw their head-coverings over the chest, and to draw their outer garments about them. The commonly taught result is loose clothing covering the body, with the head covered, in front of men outside the immediate family.":
    "Le Coran ordonne aux femmes croyantes de préserver leur pudeur, de rabattre leur voile sur leur poitrine et de se couvrir de leurs grands vêtements. Ce que l’on enseigne habituellement : des vêtements amples couvrant le corps, la tête couverte, devant les hommes extérieurs à la famille proche.",
  "Whether the face and hands must also be covered is a long-standing point of scholarly difference, not a settled question.":
    "Savoir si le visage et les mains doivent aussi être couverts est un point de divergence ancien entre les savants, non une question tranchée.",
  "Nobody has the right to pressure you, and starting is often gradual. If covering would put you in danger or out you before you are ready, that is a real circumstance to discuss with someone knowledgeable rather than a rule you are breaking.":
    "Personne n’a le droit de vous faire pression, et cela se fait souvent progressivement. Si vous couvrir vous mettait en danger ou vous exposait avant que vous soyez prête, c’est une situation réelle à discuter avec quelqu’un de compétent, non une règle que vous enfreignez.",
  "The instruction to lower the gaze and guard modesty is given to men first and then to women, in consecutive verses. That order is worth noticing: modesty in Islam is not a set of rules aimed only at women, and men have their own covering to observe.":
    "L’ordre de baisser le regard et de préserver la pudeur s’adresse d’abord aux hommes, puis aux femmes, dans des versets qui se suivent. Cet ordre mérite d’être remarqué : la pudeur en islam n’est pas un ensemble de règles visant uniquement les femmes, et les hommes ont leur propre part à couvrir.",
  "The Prophet ﷺ said the strong person is not the one who overpowers others, but the one who controls himself when angry. It is a redefinition rather than a rule, and it comes up more often than most of the rules do.":
    "Le Prophète ﷺ a dit que le fort n’est pas celui qui terrasse les autres, mais celui qui se maîtrise dans la colère. C’est une redéfinition plus qu’une règle, et elle se présente plus souvent que la plupart des règles.",
  "One of the shortest things the Prophet ﷺ said and one of the hardest: none of you truly believes until he wants for his brother what he wants for himself. It is the test to apply when a situation is not covered by anything you have learned yet.":
    "L’une des paroles les plus brèves du Prophète ﷺ et l’une des plus exigeantes : nul d’entre vous ne croit vraiment tant qu’il n’aime pas pour son frère ce qu’il aime pour lui-même. C’est le test à appliquer quand une situation n’est couverte par rien de ce que vous avez appris.",
  "You will get things wrong, in front of people, for a while. Everyone did. Being embarrassed about it is not a sign you are doing badly.":
    "Vous vous tromperez, devant des gens, pendant un temps. Tout le monde est passé par là. En être gêné n’est pas le signe que vous vous en sortez mal.",
  "Becoming Muslim does not cancel a family. Converts are sometimes told to distance themselves from non-Muslim relatives; that is not what the text says.":
    "Devenir musulman n’annule pas une famille. On dit parfois aux convertis de s’éloigner de leurs proches non musulmans ; ce n’est pas ce que dit le texte.",
  "The Qur’an places kindness to parents immediately after worshipping God alone, in the same sentence. When a man asked the Prophet ﷺ who most deserved his good company, the answer was \"your mother\", three times, before \"your father\".":
    "Le Coran place la bonté envers les parents immédiatement après l’adoration de Dieu seul, dans la même phrase. Quand un homme demanda au Prophète ﷺ qui méritait le plus sa bonne compagnie, la réponse fut « ta mère », trois fois, avant « ton père ».",
  "There is no requirement to announce it, and no deadline. Some people tell everyone the same week; others wait months, or years, because the cost at home would be serious. Nothing in your prayer or your standing with God depends on who knows.":
    "Rien ne vous oblige à l’annoncer, et il n’y a aucun délai. Certains le disent à tout le monde la même semaine ; d’autres attendent des mois, ou des années, parce que le coût à la maison serait lourd. Ni votre prière ni votre situation devant Dieu ne dépendent de qui le sait.",
  "If it is not safe to tell your family, that is a real situation many converts are in and not a failure of courage. Find one person who knows before you tell anyone who might react badly.":
    "S’il n’est pas sûr de le dire à votre famille, c’est une situation réelle que vivent beaucoup de convertis et non un manque de courage. Trouvez une personne qui le sache avant d’en parler à quelqu’un qui pourrait mal réagir.",
  "You do not have to stop eating with people who are not Muslim, and you do not have to make a scene. Eat what you can, quietly leave what you cannot, and answer questions if they come. Most families adjust faster when the change is undramatic.":
    "Vous n’avez pas à cesser de manger avec des personnes non musulmanes, ni à en faire toute une histoire. Mangez ce que vous pouvez, laissez discrètement ce que vous ne pouvez pas, et répondez si on vous questionne. La plupart des familles s’adaptent plus vite quand le changement est discret.",
  "Utensils that touched pork, or a shared roasting tin, worry converts far more than they worry most scholars. Wash it and move on.":
    "Les ustensiles qui ont touché du porc, ou un plat à four partagé, inquiètent les convertis bien plus que la plupart des savants. Lavez-les et passez à autre chose.",
  "Muslims in Western countries genuinely differ on supermarket meat, and you will be told opposite things with equal confidence.":
    "Les musulmans des pays occidentaux divergent réellement sur la viande de supermarché, et on vous dira des choses opposées avec la même assurance.",
  "The Prophet ﷺ said the lawful is clear and the unlawful is clear, and between them are matters that are unclear, which many people do not know about. Someone who stays away from what is doubtful protects their faith and their honour. That middle ground is where most real questions live.":
    "Le Prophète ﷺ a dit que le licite est clair et l’illicite est clair, et qu’entre les deux se trouvent des questions ambiguës que beaucoup ignorent. Celui qui s’écarte du douteux préserve sa religion et son honneur. C’est dans cet entre-deux que vivent la plupart des vraies questions.",
  "This is guidance for your own choices, not a licence to police anyone else’s. Being cautious about a doubtful thing for yourself is careful; declaring it forbidden for other people is a different act entirely.":
    "Ceci oriente vos propres choix ; ce n’est pas un permis de surveiller ceux des autres. Être prudent pour soi face à une chose douteuse relève du soin ; la déclarer interdite aux autres est tout autre chose.",
  "This is the part people get backwards. Things are permitted unless there is a clear reason otherwise, and the Qur’an describes the Prophet’s ﷺ message as making good things lawful rather than piling on prohibitions. You do not need to find permission for ordinary life.":
    "C’est la partie que l’on comprend à l’envers. Les choses sont permises sauf raison claire du contraire, et le Coran décrit le message du Prophète ﷺ comme rendant licites les bonnes choses plutôt que comme un empilement d’interdits. Vous n’avez pas à chercher une permission pour la vie ordinaire.",
  "Not fasting when you are exempt is not a failure and not something to feel guilty about. The exemption is part of the instruction, not a loophole in it.":
    "Ne pas jeûner quand vous en êtes dispensé n’est pas un échec et n’a pas à vous culpabiliser. La dispense fait partie de la consigne, ce n’est pas une faille dedans.",
  "The Qur’an gives the reason directly: so that you may become mindful of God. It is not endurance for its own sake, and it is not a diet. Being hungry at four in the afternoon is a reminder of who provides, and of people for whom that hunger is not a choice.":
    "Le Coran en donne directement la raison : afin que vous deveniez conscients de Dieu. Ce n’est pas de l’endurance pour elle-même, et ce n’est pas un régime. Avoir faim à quatre heures de l’après-midi rappelle qui pourvoit, et rappelle ceux pour qui cette faim n’est pas un choix.",
  "Clothing":
    "Vêtements",
  "What is asked, and what is a choice":
    "Ce qui est demandé, et ce qui relève du choix",
  "Everyday manners":
    "Le savoir-vivre au quotidien",
  "The part of Islam people actually see":
    "La part de l’islam que les gens voient vraiment",
  "Family":
    "La famille",
  "Parents, home, and telling people":
    "Les parents, le foyer, et en parler",
  "Food and drink":
    "Nourriture et boisson",
  "What changes at the supermarket, and what does not":
    "Ce qui change au supermarché, et ce qui ne change pas",
  "Halal and haram":
    "Halal et haram",
  "How the categories actually work":
    "Comment ces catégories fonctionnent vraiment",
  "Ramadan":
    "Ramadan",
  "What happens, and what is asked of you":
    "Ce qui se passe, et ce qui vous est demandé",
  "What is Islam?":
    "Qu’est-ce que l’islam ?",
  "The shape of it, in a few minutes":
    "Sa forme, en quelques minutes",
  "What is the Qur’an?":
    "Qu’est-ce que le Coran ?",
  "What it is, and how to start with it":
    "Ce qu’il est, et comment l’aborder",
  "What is the Sunnah?":
    "Qu’est-ce que la Sunna ?",
  "The Prophet’s ﷺ way, and how it reaches us":
    "La voie du Prophète ﷺ, et comment elle nous parvient",
  "Who is Allah?":
    "Qui est Allah ?",
  "What Muslims believe about God":
    "Ce que les musulmans croient au sujet de Dieu",
  "Who is Muhammad ﷺ?":
    "Qui est Muhammad ﷺ ?",
  "The man Muslims follow, and why":
    "L’homme que les musulmans suivent, et pourquoi",
  "Work and money":
    "Travail et argent",
  "Earning, and the two things to watch for":
    "Gagner sa vie, et les deux points de vigilance",
  "When the angel Jibril asked the Prophet ﷺ about this in front of his companions, the answer came in two parts: what you believe, and what you do. Neither stands alone. That is why this app teaches the prayer and the belief side by side rather than one first and one later.":
    "Quand l’ange Jibril interrogea le Prophète ﷺ à ce sujet devant ses compagnons, la réponse vint en deux parties : ce que l’on croit, et ce que l’on fait. Ni l’une ni l’autre ne tient seule. C’est pourquoi cette application enseigne la prière et la croyance côte à côte, plutôt que l’une d’abord et l’autre ensuite.",
  "Nobody can be forced into this. The Qur’an says plainly that there is no compulsion in religion.":
    "Nul ne peut y être contraint. Le Coran dit clairement qu’il n’y a pas de contrainte en religion.",
  "Until you know it, say what you can and keep learning. Nobody starts fluent, and the Practice screen exists to take it a line at a time.":
    "En attendant de la savoir, dites ce que vous pouvez et continuez d’apprendre. Personne ne commence à l’aise, et l’écran de pratique existe pour l’aborder ligne par ligne.",
  "Sahih al-Bukhari and Sahih Muslim are the two collections Sunni scholars regard as the most rigorously authenticated. Other collections contain both strong and weak reports, which is why a grading matters there and not in these two.":
    "Sahih al-Bukhari et Sahih Muslim sont les deux recueils que les savants sunnites tiennent pour les plus rigoureusement authentifiés. D’autres recueils contiennent des rapports forts et faibles, et c’est pourquoi la classification y compte, alors qu’elle ne s’impose pas dans ces deux-là.",
  "The Qur’an gives the command and the Sunnah usually gives the method. \"Establish the prayer\" appears again and again; how many units, when, and what to say in them comes from watching him. The Qur’an itself instructs Muslims to take what the Messenger gives them.":
    "Le Coran donne l’ordre et la Sunna donne généralement la méthode. « Accomplissez la prière » revient sans cesse ; combien d’unités, à quel moment et que dire dedans vient de l’avoir observé. Le Coran lui-même ordonne aux musulmans de prendre ce que le Messager leur donne.",
  "You will see ﷺ written after his name throughout this app and everywhere else. It stands for an Arabic phrase asking God to bless him and grant him peace. Muslims say it aloud out of respect whenever he is mentioned. Nobody will mind if you forget at first.":
    "Vous verrez ﷺ écrit après son nom dans toute cette application et partout ailleurs. Cela représente une formule arabe demandant à Dieu de le bénir et de lui accorder la paix. Les musulmans la prononcent par respect chaque fois qu’il est mentionné. Personne ne vous en voudra si vous l’oubliez au début.",
  "Because the Qur’an tells them to. It calls him an excellent example, and says that obeying him is obeying God. In practice this is very concrete: the Qur’an commands prayer without describing how, and the answer to \"how\" is that he said, \"Pray as you have seen me praying.\"":
    "Parce que le Coran le leur dit. Il l’appelle un excellent modèle et dit que lui obéir, c’est obéir à Dieu. En pratique, c’est très concret : le Coran ordonne la prière sans en décrire la forme, et la réponse au « comment » est qu’il a dit : « Priez comme vous m’avez vu prier ».",
  "Loving and following him is not the same as worshipping him. The distinction matters to Muslims and is worth being clear about early.":
    "L’aimer et le suivre n’est pas la même chose que l’adorer. La distinction compte pour les musulmans et il vaut mieux la clarifier tôt.",
  "Scholars differ on how much distance from a prohibited thing is enough, so answers vary by how central it is to the job.":
    "Les savants divergent sur la distance suffisante par rapport à une chose interdite, si bien que les réponses varient selon la place qu’elle occupe dans le travail.",
  "Do not quit your job the week you become Muslim. Find out what your options are first.":
    "Ne quittez pas votre emploi la semaine où vous devenez musulman. Renseignez-vous d’abord sur vos options.",
  "There is no ideal of poverty here. The Prophet ﷺ said nobody has eaten better food than what he earned by his own hands, and noted that the Prophet Dawud ate from his own labour. The Qur’an tells people to disperse and seek God’s bounty as soon as the Friday prayer ends.":
    "Il n’y a pas ici d’idéal de pauvreté. Le Prophète ﷺ a dit que personne n’a mangé meilleure nourriture que celle gagnée de ses propres mains, et a rappelé que le prophète Dawud mangeait du fruit de son travail. Le Coran dit aux gens de se disperser et de rechercher la faveur de Dieu dès que la prière du vendredi s’achève.",
  "Until you have it, say what you know and keep going. Nobody expects a first-week Muslim to have memorised it, and the prayer you pray while learning is still your prayer.":
    "En attendant de la savoir, dites ce que vous connaissez et continuez. Personne n’attend d’un musulman de sa première semaine qu’il l’ait mémorisée, et la prière que vous faites en apprenant reste votre prière.",
  "Because without it there is no prayer. The Prophet ﷺ said that whoever does not recite Al-Fatihah in their prayer, their prayer is invalid. Of everything a new Muslim could memorise, this is the one that changes what they are able to do today.":
    "Parce que sans elle il n’y a pas de prière. Le Prophète ﷺ a dit que celui qui ne récite pas Al-Fatiha dans sa prière, sa prière est invalide. De tout ce qu’un nouveau musulman pourrait mémoriser, c’est elle qui change ce qu’il peut faire aujourd’hui.",
  "You do not need Arabic for this. The memorised duʿas are worth learning because they are the Prophet’s ﷺ wording, not because your own words would be rejected.":
    "Vous n’avez pas besoin d’arabe pour cela. Les duʿas mémorisées valent la peine d’être apprises parce que ce sont les mots du Prophète ﷺ, non parce que les vôtres seraient rejetés.",
  "The Prophet ﷺ compared the person who remembers their Lord to the living, and the one who does not to the dead. He also said that whoever says subḥāna-llāhi wa bi-ḥamdih a hundred times in a day has their sins forgiven though they were like the foam of the sea.":
    "Le Prophète ﷺ a comparé celui qui se souvient de son Seigneur aux vivants, et celui qui ne le fait pas aux morts. Il a aussi dit que celui qui dit subḥāna-llāhi wa bi-ḥamdih cent fois par jour voit ses fautes pardonnées, seraient-elles comme l’écume de la mer.",
  "The Prophet ﷺ said the believer’s situation is remarkable, because everything that happens to them is good: when something pleasant comes they are grateful and that is good for them, and when something painful comes they are patient and that is good for them. Nobody else, he said, is in that position.":
    "Le Prophète ﷺ a dit que la situation du croyant est remarquable, car tout ce qui lui arrive est un bien : quand vient une chose agréable il remercie, et c’est un bien pour lui ; quand vient une chose douloureuse il patiente, et c’est un bien pour lui. Personne d’autre, a-t-il dit, n’est dans cette situation.",
  "Al-Fatihah":
    "Al-Fatiha",
  "The one thing the prayer cannot do without":
    "La seule chose dont la prière ne peut se passer",
  "Duʿa and dhikr":
    "Duʿa et dhikr",
  "Talking to God outside the prayer":
    "Parler à Dieu en dehors de la prière",
  "Patience and gratitude":
    "Patience et gratitude",
  "The two halves of getting through a life":
    "Les deux moitiés d’une vie que l’on traverse",
  "The Muslim year":
    "L’année musulmane",
  "Why the dates move, and what falls where":
    "Pourquoi les dates bougent, et ce qui tombe quand",
  "What breaks the prayer":
    "Ce qui rompt la prière",
  "And what only feels like it does":
    "Et ce qui en donne seulement l’impression",
  "What you need before you pray":
    "Ce qu’il vous faut avant de prier",
  "The five things to have in place":
    "Les cinq choses à avoir en place",
  "When you get it wrong":
    "Quand vous vous trompez",
  "Repentance, and why it is not a big ceremony":
    "Le repentir, et pourquoi ce n’est pas une grande cérémonie",
  "Whether a month begins by sighting the moon locally or by astronomical calculation is a live question, and communities in the same country sometimes start Ramadan on different days.":
    "Savoir si un mois commence par l’observation locale de la lune ou par le calcul astronomique est une question vive, et des communautés d’un même pays commencent parfois le Ramadan à des jours différents.",
  "Both approaches are argued from evidence and neither community is being careless. As a beginner the practical answer is to follow the mosque or community you pray with. Scholars have discussed this in more detail.":
    "Les deux approches s’argumentent par des preuves et aucune communauté n’est négligente. Pour un débutant, la réponse pratique est de suivre la mosquée ou la communauté avec laquelle il prie. Les savants ont traité cela plus en détail.",
  "Follow the sighting of the moon, as reported locally or regionally.":
    "Suivre l’observation de la lune, telle qu’elle est rapportée localement ou dans la région.",
  "Some bodies accept astronomical calculation to fix the date in advance.":
    "Certaines instances acceptent le calcul astronomique pour fixer la date à l’avance.",
  "The most common beginner mistake is starting the prayer over. Almost nothing requires that, and restarting turns a small slip into a long one.":
    "L’erreur la plus courante du débutant est de recommencer la prière. Presque rien ne l’exige, et recommencer transforme un petit écart en un long.",
  "Doubt does not. Someone asked the Prophet ﷺ about feeling as though they had passed wind mid-prayer, and he said not to leave the prayer unless they heard a sound or smelled something. Uncertainty is not enough. Carry on.":
    "Le doute, non. Quelqu’un a interrogé le Prophète ﷺ sur l’impression d’avoir rompu son wudu en pleine prière, et il a répondu de ne pas quitter la prière à moins d’entendre un son ou de sentir une odeur. L’incertitude ne suffit pas. Continuez.",
  "This is the hadith to remember if you find yourself checking constantly. The rule is deliberately strict about certainty, because doubt would otherwise end every prayer.":
    "C’est le hadith à retenir si vous vous surprenez à vérifier sans cesse. La règle est volontairement stricte sur la certitude, car le doute mettrait sinon fin à chaque prière.",
  "How much has to be covered differs a little between men and women and is set out in the clothing guide. Ordinary loose clothes cover it for most people.":
    "La surface à couvrir diffère un peu entre les hommes et les femmes et figure dans le guide sur les vêtements. Des vêtements amples ordinaires suffisent pour la plupart des gens.",
  "The intention is a thought, not a sentence: knowing which prayer you are about to pray. You do not say it out loud, and you do not need a formula. If you are standing on a mat about to pray Maghrib, you have already intended it.":
    "L’intention est une pensée, non une phrase : savoir quelle prière vous allez faire. On ne la dit pas à voix haute et aucune formule n’est requise. Si vous êtes debout sur une natte pour prier le Maghrib, vous en avez déjà formé l’intention.",
  "Some people are taught to say the intention aloud. Scholars differ on whether that is recommended, and nobody holds that the prayer fails without it.":
    "On enseigne à certains de dire l’intention à voix haute. Les savants divergent sur son caractère recommandé, et aucun ne soutient que la prière échoue sans cela.",
  "The Prophet ﷺ described God as more pleased with a person’s repentance than someone would be who lost their camel in the desert and then found it. The image is not of a grudging pardon. It is relief and delight.":
    "Le Prophète ﷺ a décrit Dieu comme plus heureux du repentir d’une personne que ne le serait quelqu’un qui a perdu son chameau dans le désert et l’a retrouvé. L’image n’est pas celle d’un pardon consenti à contrecœur. C’est le soulagement et la joie.",
  "Nobody is owed an account of your sins. You do not have to tell an imam, a friend, or anyone at the mosque.":
    "Personne n’a droit au récit de vos fautes. Vous n’avez à en parler ni à un imam, ni à un ami, ni à personne à la mosquée.",
  "Washing before prayer":
    "L’ablution avant la prière",
  "The full wash, and when you need it":
    "L’ablution complète, et quand elle est nécessaire",
  "When you cannot use water":
    "Quand vous ne pouvez pas utiliser d’eau",
  "Becoming Muslim":
    "Devenir musulman",
  "What to say, and what it means":
    "Ce qu’il faut dire, et ce que cela signifie",
  "2 rakʿah · Dawn, before sunrise":
    "2 rakʿas · À l’aube, avant le lever du soleil",
  "4 rakʿah · After midday":
    "4 rakʿas · Après midi",
  "4 rakʿah · Late afternoon":
    "4 rakʿas · En fin d’après-midi",
  "3 rakʿah · Just after sunset":
    "3 rakʿas · Juste après le coucher du soleil",
  "4 rakʿah · Night":
    "4 rakʿas · La nuit",
  "Wudu":
    "Wudu",
  "Ghusl":
    "Ghusl",
  "Tayammum":
    "Tayammum",
  "After eating":
    "Après avoir mangé",
  "Two wordings are commonly said after a meal. This one carries the stronger grading; the other is below. Either is said, and many people know only one of them.":
    "Deux formules se disent couramment après un repas. Celle-ci porte la classification la plus forte ; l’autre est en dessous. On dit l’une ou l’autre, et beaucoup n’en connaissent qu’une.",
  "All praise is for Allah, who fed me this and provided it for me, with no strength or power of my own.":
    "Toute louange est à Allah, qui m’a nourri de ceci et me l’a accordé, sans force ni pouvoir de ma part.",
};
