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
 * Anything absent falls back to English, so partial delivery is safe to ship.
 */
export const FR: ContentDict = {
  "For men":
    "Pour les hommes",
  "Cover at least from the navel to the knee, keep clothing loose enough not to be revealing, and avoid pure silk and gold jewellery, which the Prophet ﷺ restricted for men. In ordinary Western dress this changes very little in practice.":
    "Couvrez au moins du nombril au genou, portez des vêtements assez amples pour ne rien révéler, et évitez la soie pure et les bijoux en or, que le Prophète ﷺ a interdits aux hommes. Avec des vêtements occidentaux ordinaires, cela change très peu de choses en pratique.",
  "For women":
    "Pour les femmes",
  "The Qur’an instructs believing women to guard their modesty, to draw their head-coverings over the chest, and to draw their outer garments about them. The commonly taught result is loose clothing covering the body, with the head covered, in front of men outside the immediate family.":
    "Le Coran ordonne aux femmes croyantes de préserver leur pudeur, de rabattre leur voile sur leur poitrine et de se couvrir de leurs grands vêtements. Ce que l’on enseigne habituellement : des vêtements amples couvrant le corps, la tête couverte, devant les hommes extérieurs à la famille proche.",
  "Whether the face and hands must also be covered is a long-standing point of scholarly difference, not a settled question.":
    "Savoir si le visage et les mains doivent aussi être couverts est un point de divergence ancien entre les savants, non une question tranchée.",
  "Nobody has the right to pressure you, and starting is often gradual. If covering would put you in danger or out you before you are ready, that is a real circumstance to discuss with someone knowledgeable rather than a rule you are breaking.":
    "Personne n’a le droit de vous faire pression, et cela se fait souvent progressivement. Si vous couvrir vous mettait en danger ou vous exposait avant que vous soyez prête, c’est une situation réelle à discuter avec quelqu’un de compétent, non une règle que vous enfreignez.",
  "It starts with everyone":
    "Cela commence par tout le monde",
  "The instruction to lower the gaze and guard modesty is given to men first and then to women, in consecutive verses. That order is worth noticing: modesty in Islam is not a set of rules aimed only at women, and men have their own covering to observe.":
    "L’ordre de baisser le regard et de préserver la pudeur s’adresse d’abord aux hommes, puis aux femmes, dans des versets qui se suivent. Cet ordre mérite d’être remarqué : la pudeur en islam n’est pas un ensemble de règles visant uniquement les femmes, et les hommes ont leur propre part à couvrir.",
  "The idea behind it":
    "L’idée de fond",
  "The Qur’an speaks about clothing as something given for covering and for adornment — both, not one at the expense of the other. Islam is not against looking good. The instructions that follow are about modesty in public, not about drabness.":
    "Le Coran parle du vêtement comme d’une chose donnée pour couvrir et pour parer — les deux, non l’une aux dépens de l’autre. L’islam n’est pas contre le fait d’avoir bonne allure. Ce qui suit concerne la pudeur en public, non l’austérité.",
  "Anger":
    "La colère",
  "The Prophet ﷺ said the strong person is not the one who overpowers others, but the one who controls himself when angry. It is a redefinition rather than a rule, and it comes up more often than most of the rules do.":
    "Le Prophète ﷺ a dit que le fort n’est pas celui qui terrasse les autres, mais celui qui se maîtrise dans la colère. C’est une redéfinition plus qu’une règle, et elle se présente plus souvent que la plupart des règles.",
  "How you talk about people":
    "Comment vous parlez des autres",
  "The Qur’an forbids mocking others, assuming the worst, spying, and talking about people behind their backs — in two consecutive verses. Backbiting is treated as a serious wrong, not a small one, and it is the habit most people find hardest to drop.":
    "Le Coran interdit de se moquer d’autrui, de soupçonner, d’espionner et de parler des gens dans leur dos — dans deux versets qui se suivent. La médisance est traitée comme une faute grave, non légère, et c’est l’habitude que la plupart des gens ont le plus de mal à abandonner.",
  "Not a side subject":
    "Pas un sujet secondaire",
  "Character sits at the centre rather than the edge. The Prophet ﷺ, described in the Qur’an as being of great character, taught that the best of people are those with the best manners — and the people who lived with him said he never used foul or crude language.":
    "Le caractère est au centre, non en marge. Le Prophète ﷺ, décrit dans le Coran comme doté d’un caractère éminent, a enseigné que les meilleurs sont ceux qui ont le meilleur comportement — et ceux qui ont vécu avec lui ont dit qu’il n’a jamais tenu de propos grossiers ni obscènes.",
  "Three things in one sentence":
    "Trois choses en une seule phrase",
  "The Prophet ﷺ tied belief directly to behaviour: whoever believes in God and the Last Day should not harm their neighbour, should be generous to their guest, and should say something good or stay quiet. Neighbours, guests, and how you speak — that is a large share of daily life.":
    "Le Prophète ﷺ a lié la foi directement au comportement : que celui qui croit en Dieu et au Jour dernier ne nuise pas à son voisin, qu’il soit généreux envers son hôte, et qu’il dise du bien ou se taise. Les voisins, les hôtes et la façon de parler — cela représente une grande part du quotidien.",
  "Wanting for others what you want for yourself":
    "Vouloir pour autrui ce que vous voulez pour vous",
  "One of the shortest things the Prophet ﷺ said and one of the hardest: none of you truly believes until he wants for his brother what he wants for himself. It is the test to apply when a situation is not covered by anything you have learned yet.":
    "L’une des paroles les plus brèves du Prophète ﷺ et l’une des plus exigeantes : nul d’entre vous ne croit vraiment tant qu’il n’aime pas pour son frère ce qu’il aime pour lui-même. C’est le test à appliquer quand une situation n’est couverte par rien de ce que vous avez appris.",
  "You will get things wrong, in front of people, for a while. Everyone did. Being embarrassed about it is not a sign you are doing badly.":
    "Vous vous tromperez, devant des gens, pendant un temps. Tout le monde est passé par là. En être gêné n’est pas le signe que vous vous en sortez mal.",
  "If your parents are not Muslim":
    "Si vos parents ne sont pas musulmans",
  "This changes nothing about how you treat them. The Qur’an addresses exactly this: even where parents press their child to abandon belief in God alone, the instruction is not to obey them in that — and in the same breath, to keep their company in this world with kindness. Both halves are the instruction.":
    "Cela ne change rien à la façon dont vous les traitez. Le Coran aborde exactement ce cas : même lorsque des parents pressent leur enfant d’abandonner la croyance en Dieu seul, la consigne est de ne pas leur obéir en cela — et, dans la même phrase, de les accompagner en ce monde avec bonté. Les deux moitiés forment la consigne.",
  "Becoming Muslim does not cancel a family. Converts are sometimes told to distance themselves from non-Muslim relatives; that is not what the text says.":
    "Devenir musulman n’annule pas une famille. On dit parfois aux convertis de s’éloigner de leurs proches non musulmans ; ce n’est pas ce que dit le texte.",
  "Marriage and your own household":
    "Le mariage et votre propre foyer",
  "Who you may marry, and what a valid marriage requires, has real detail to it and depends on your circumstances. Scholars have discussed this in more detail — this is a question to take to someone locally rather than settle from a page.":
    "Qui vous pouvez épouser et ce qu’exige un mariage valide comportent de vrais détails et dépendent de votre situation. Les savants ont traité cela plus en détail — c’est une question à poser à quelqu’un près de chez vous, non à régler depuis une page.",
  "Parents come very high":
    "Les parents viennent très haut",
  "The Qur’an places kindness to parents immediately after worshipping God alone, in the same sentence. When a man asked the Prophet ﷺ who most deserved his good company, the answer was \"your mother\", three times, before \"your father\".":
    "Le Coran place la bonté envers les parents immédiatement après l’adoration de Dieu seul, dans la même phrase. Quand un homme demanda au Prophète ﷺ qui méritait le plus sa bonne compagnie, la réponse fut « ta mère », trois fois, avant « ton père ».",
  "Telling them, or not yet":
    "Le leur dire, ou pas encore",
  "There is no requirement to announce it, and no deadline. Some people tell everyone the same week; others wait months, or years, because the cost at home would be serious. Nothing in your prayer or your standing with God depends on who knows.":
    "Rien ne vous oblige à l’annoncer, et il n’y a aucun délai. Certains le disent à tout le monde la même semaine ; d’autres attendent des mois, ou des années, parce que le coût à la maison serait lourd. Ni votre prière ni votre situation devant Dieu ne dépendent de qui le sait.",
  "If it is not safe to tell your family, that is a real situation many converts are in and not a failure of courage. Find one person who knows before you tell anyone who might react badly.":
    "S’il n’est pas sûr de le dire à votre famille, c’est une situation réelle que vivent beaucoup de convertis et non un manque de courage. Trouvez une personne qui le sache avant d’en parler à quelqu’un qui pourrait mal réagir.",
  "Eating with your family":
    "Manger avec votre famille",
  "You do not have to stop eating with people who are not Muslim, and you do not have to make a scene. Eat what you can, quietly leave what you cannot, and answer questions if they come. Most families adjust faster when the change is undramatic.":
    "Vous n’avez pas à cesser de manger avec des personnes non musulmanes, ni à en faire toute une histoire. Mangez ce que vous pouvez, laissez discrètement ce que vous ne pouvez pas, et répondez si on vous questionne. La plupart des familles s’adaptent plus vite quand le changement est discret.",
  "Utensils that touched pork, or a shared roasting tin, worry converts far more than they worry most scholars. Wash it and move on.":
    "Les ustensiles qui ont touché du porc, ou un plat à four partagé, inquiètent les convertis bien plus que la plupart des savants. Lavez-les et passez à autre chose.",
  "Meat is the part people argue about":
    "La viande est le point de discorde",
  "The Qur’an explicitly permits the food of the People of the Book — Jews and Christians. What contemporary scholars disagree about is whether meat from modern industrial slaughterhouses in a non-Muslim country falls under that permission, given how the animals are killed and that God’s name is not pronounced over them.":
    "Le Coran permet expressément la nourriture des Gens du Livre — juifs et chrétiens. Ce dont débattent les savants contemporains, c’est de savoir si la viande des abattoirs industriels modernes dans un pays non musulman relève de cette permission, vu la manière dont les animaux sont abattus et le fait que le nom de Dieu n’est pas prononcé sur eux.",
  "Muslims in Western countries genuinely differ on supermarket meat, and you will be told opposite things with equal confidence.":
    "Les musulmans des pays occidentaux divergent réellement sur la viande de supermarché, et on vous dira des choses opposées avec la même assurance.",
  "The short list":
    "La courte liste",
  "The Qur’an names what is forbidden: pork, blood, animals that died without being slaughtered, and anything dedicated to something other than God. Alcohol and other intoxicants are forbidden separately. That is the core of it — everything else on the shelf is fine.":
    "Le Coran nomme ce qui est interdit : le porc, le sang, les animaux morts sans avoir été égorgés, et ce qui a été consacré à autre que Dieu. L’alcool et les autres substances enivrantes sont interdits séparément. C’est l’essentiel — tout le reste dans le rayon convient.",
  "What this looks like in practice":
    "Ce que cela donne en pratique",
  "Mostly it means reading ingredients for a few weeks until you know the usual suspects: gelatine, lard, some animal fats, alcohol in sauces and extracts. It gets automatic quickly. Vegetables, grains, fish, dairy, eggs and fruit were never in question.":
    "Cela veut surtout dire lire les étiquettes pendant quelques semaines, le temps de repérer les habituels : gélatine, saindoux, certaines graisses animales, alcool dans les sauces et les extraits. Cela devient vite automatique. Les légumes, les céréales, le poisson, les produits laitiers, les œufs et les fruits n’ont jamais posé question.",
  "And a space in between":
    "Et un espace entre les deux",
  "The Prophet ﷺ said the lawful is clear and the unlawful is clear, and between them are matters that are unclear, which many people do not know about. Someone who stays away from what is doubtful protects their faith and their honour. That middle ground is where most real questions live.":
    "Le Prophète ﷺ a dit que le licite est clair et l’illicite est clair, et qu’entre les deux se trouvent des questions ambiguës que beaucoup ignorent. Celui qui s’écarte du douteux préserve sa religion et son honneur. C’est dans cet entre-deux que vivent la plupart des vraies questions.",
  "This is guidance for your own choices, not a licence to police anyone else’s. Being cautious about a doubtful thing for yourself is careful; declaring it forbidden for other people is a different act entirely.":
    "Ceci oriente vos propres choix ; ce n’est pas un permis de surveiller ceux des autres. Être prudent pour soi face à une chose douteuse relève du soin ; la déclarer interdite aux autres est tout autre chose.",
  "The default is yes":
    "Par défaut, c’est oui",
  "This is the part people get backwards. Things are permitted unless there is a clear reason otherwise, and the Qur’an describes the Prophet’s ﷺ message as making good things lawful rather than piling on prohibitions. You do not need to find permission for ordinary life.":
    "C’est la partie que l’on comprend à l’envers. Les choses sont permises sauf raison claire du contraire, et le Coran décrit le message du Prophète ﷺ comme rendant licites les bonnes choses plutôt que comme un empilement d’interdits. Vous n’avez pas à chercher une permission pour la vie ordinaire.",
  "Two words you will hear constantly":
    "Deux mots que vous entendrez sans cesse",
  "Halal means permitted. Haram means forbidden. They apply to everything, not just food — how you earn money, how you speak about people, what you wear. Most of life is halal and always was; the forbidden list is short.":
    "Halal veut dire permis. Haram veut dire interdit. Cela vaut pour tout, pas seulement la nourriture — comment vous gagnez votre vie, comment vous parlez des gens, comment vous vous habillez. L’essentiel de la vie est halal et l’a toujours été ; la liste des interdits est courte.",
  "When you are not sure":
    "Quand vous n’êtes pas sûr",
  "Ask someone qualified, and ask about your actual situation rather than the general case — circumstances change answers. You will also meet Muslims who are certain of opposite answers on the same question. That usually means it is a genuine point of scholarly difference rather than that one of them is lying to you.":
    "Demandez à quelqu’un de qualifié, et posez la question sur votre situation réelle plutôt que sur le cas général — les circonstances changent les réponses. Vous rencontrerez aussi des musulmans sûrs de réponses opposées à la même question. Cela signifie généralement qu’il s’agit d’une véritable divergence entre savants, non que l’un d’eux vous ment.",
  "Eid al-Fitr":
    "Aïd el-Fitr",
  "Suhoor and iftar":
    "Souhour et iftar",
  "Suhoor is the meal before dawn — the Prophet ﷺ said to take it, because there is blessing in it, and skipping it makes a long day much harder. Iftar is breaking the fast at sunset, traditionally with dates and water, and he taught not to delay it once the sun is down.":
    "Le souhour est le repas d’avant l’aube — le Prophète ﷺ a dit de le prendre, car il y a une bénédiction dedans, et le sauter rend une longue journée bien plus dure. L’iftar est la rupture du jeûne au coucher du soleil, traditionnellement avec des dattes et de l’eau, et il a enseigné à ne pas la retarder une fois le soleil couché.",
  "The fast itself":
    "Le jeûne lui-même",
  "The rest of the month":
    "Le reste du mois",
  "Mosques fill up for taraweeh, a long optional night prayer, and many people read far more Qur’an than usual — Jibril would go through the Qur’an with the Prophet ﷺ each night of Ramadan. There is also more giving: he was described as at his most generous this month.":
    "Les mosquées se remplissent pour les tarawih, une longue prière nocturne facultative, et beaucoup lisent bien plus de Coran que d’ordinaire — Jibril révisait le Coran avec le Prophète ﷺ chaque nuit de Ramadan. On donne aussi davantage : on l’a décrit comme au sommet de sa générosité durant ce mois.",
  "What it is":
    "Ce que c’est",
  "The ninth month of the Islamic lunar calendar, and the month in which the Qur’an began to be revealed. Because the calendar is lunar, it moves about eleven days earlier each year — so it passes through every season over a lifetime.":
    "Le neuvième mois du calendrier lunaire islamique, et le mois où la révélation du Coran a commencé. Comme le calendrier est lunaire, il avance d’environ onze jours chaque année — il traverse donc toutes les saisons au cours d’une vie.",
  "Who does not fast":
    "Qui ne jeûne pas",
  "Not fasting when you are exempt is not a failure and not something to feel guilty about. The exemption is part of the instruction, not a loophole in it.":
    "Ne pas jeûner quand vous en êtes dispensé n’est pas un échec et n’a pas à vous culpabiliser. La dispense fait partie de la consigne, ce n’est pas une faille dedans.",
  "Why":
    "Pourquoi",
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
  "Believing and doing are two halves":
    "Croire et agir sont deux moitiés",
  "When the angel Jibril asked the Prophet ﷺ about this in front of his companions, the answer came in two parts: what you believe, and what you do. Neither stands alone. That is why this app teaches the prayer and the belief side by side rather than one first and one later.":
    "Quand l’ange Jibril interrogea le Prophète ﷺ à ce sujet devant ses compagnons, la réponse vint en deux parties : ce que l’on croit, et ce que l’on fait. Ni l’une ni l’autre ne tient seule. C’est pourquoi cette application enseigne la prière et la croyance côte à côte, plutôt que l’une d’abord et l’autre ensuite.",
  "It is meant to be manageable":
    "C’est fait pour être tenable",
  "You are not behind. The Prophet ﷺ said the religion is easy, and that whoever overburdens themselves in it will not keep it up — so take the next thing, not all of it. The Qur’an says God does not ask of anyone more than they can bear.":
    "Vous n’êtes pas en retard. Le Prophète ﷺ a dit que la religion est facile, et que celui qui s’y surcharge ne pourra pas tenir — prenez donc la chose suivante, pas tout à la fois. Le Coran dit que Dieu ne demande à personne plus qu’il ne peut porter.",
  "It stands on five things":
    "Il repose sur cinq choses",
  "The testimony of faith, the five daily prayers, zakat — a yearly share of savings given to those entitled to it — fasting in Ramadan, and the pilgrimage to Mecca once in a lifetime for anyone able to make it. The Prophet ﷺ described Islam as built on these five.":
    "L’attestation de foi, les cinq prières quotidiennes, la zakat — une part annuelle de l’épargne remise à ceux qui y ont droit —, le jeûne du Ramadan, et le pèlerinage à La Mecque une fois dans la vie pour qui en a les moyens. Le Prophète ﷺ a décrit l’islam comme bâti sur ces cinq choses.",
  "One God, worshipped alone":
    "Un seul Dieu, adoré seul",
  "Everything else rests on this. Islam teaches that there is one God — Allah, the Arabic word for God, used by Arabic-speaking Christians and Jews too — and that worship belongs to Him alone, with nothing and no one sharing it. Saying and meaning that is what makes a person Muslim.":
    "Tout le reste repose là-dessus. L’islam enseigne qu’il y a un seul Dieu — Allah, le mot arabe pour Dieu, employé aussi par les chrétiens et les juifs arabophones — et que l’adoration ne revient qu’à Lui, sans que rien ni personne y soit associé. Le dire en le pensant est ce qui fait de quelqu’un un musulman.",
  "Nobody can be forced into this. The Qur’an says plainly that there is no compulsion in religion.":
    "Nul ne peut y être contraint. Le Coran dit clairement qu’il n’y a pas de contrainte en religion.",
  "Islam is an Arabic word meaning submission — giving yourself over to God. A Muslim is someone who does that. It comes from the same root as salam, peace, and the two ideas sit together: peace through no longer being pulled in every direction at once.":
    "Islam est un mot arabe qui signifie soumission — se remettre à Dieu. Un musulman est celui qui le fait. Il vient de la même racine que salam, la paix, et les deux idées vont ensemble : la paix qui vient de ne plus être tiré dans tous les sens à la fois.",
  "What the word means":
    "Ce que le mot signifie",
  "How it is arranged":
    "Comment il est organisé",
  "It has 114 chapters, called surahs, made of verses called ayahs. They are not in the order they were revealed, and it is not a story told front to back — so reading it cover to cover like a novel is not how most people start, and struggling with that is not a failure of yours.":
    "Il compte 114 chapitres, appelés sourates, faits de versets appelés ayats. Ils ne sont pas dans l’ordre de leur révélation, et ce n’est pas un récit qui se lit du début à la fin — lire d’une traite comme un roman n’est donc pas la façon dont la plupart commencent, et peiner là-dessus n’est pas un échec de votre part.",
  "What Muslims believe it is":
    "Ce que les musulmans croient qu’il est",
  "Not a book about God, but the speech of God — revealed in Arabic to Muhammad ﷺ through the angel Jibril over about twenty-three years, and preserved unchanged since. That is the claim, and it is why the Arabic itself matters so much: a translation is understood as an explanation of the Qur’an rather than the Qur’an.":
    "Non pas un livre sur Dieu, mais la parole de Dieu — révélée en arabe à Muhammad ﷺ par l’ange Jibril sur environ vingt-trois ans, et conservée inchangée depuis. C’est ce qui est affirmé, et c’est pourquoi l’arabe lui-même compte tant : une traduction est comprise comme une explication du Coran, non comme le Coran.",
  "Where to begin":
    "Par où commencer",
  "Start small and start with sound. Learn Al-Fatihah, then a few of the short chapters at the end, listening and repeating rather than reading silently. The Prophet ﷺ said the best of people are those who learn the Qur’an and teach it — learning it is the point, and it is slow for everyone.":
    "Commencez petit et commencez par le son. Apprenez Al-Fatiha, puis quelques-uns des courts chapitres de la fin, en écoutant et en répétant plutôt qu’en lisant en silence. Le Prophète ﷺ a dit que les meilleurs sont ceux qui apprennent le Coran et l’enseignent — l’apprendre est le but, et c’est lent pour tout le monde.",
  "You already use it every day":
    "Vous vous en servez déjà chaque jour",
  "The Qur’an is not only read, it is recited — in every prayer, out loud or quietly. Al-Fatihah, its opening chapter of seven short verses, is said in every unit of every prayer for the rest of your life. Learning it is the single most useful thing a new Muslim can memorise.":
    "Le Coran ne se lit pas seulement, il se récite — dans chaque prière, à voix haute ou à voix basse. Al-Fatiha, son chapitre d’ouverture de sept courts versets, se dit dans chaque unité de chaque prière, tout le reste de votre vie. L’apprendre est la chose la plus utile qu’un nouveau musulman puisse mémoriser.",
  "Until you know it, say what you can and keep learning. Nobody starts fluent, and the Practice screen exists to take it a line at a time.":
    "En attendant de la savoir, dites ce que vous pouvez et continuez d’apprendre. Personne ne commence à l’aise, et l’écran de pratique existe pour l’aborder ligne par ligne.",
  "Not every report is equal":
    "Tous les rapports ne se valent pas",
  "Because hadith were transmitted by people, scholars spent centuries grading them — examining every chain and every narrator. Some are sound, some are weak, and some are forgeries. This is why the app names its sources: so you can check, rather than take its word.":
    "Comme les hadiths ont été transmis par des personnes, les savants ont passé des siècles à les classer — en examinant chaque chaîne et chaque transmetteur. Certains sont solides, d’autres faibles, et certains sont des faux. C’est pourquoi l’application nomme ses sources : pour que vous puissiez vérifier plutôt que la croire sur parole.",
  "Sahih al-Bukhari and Sahih Muslim are the two collections Sunni scholars regard as the most rigorously authenticated. Other collections contain both strong and weak reports, which is why a grading matters there and not in these two.":
    "Sahih al-Bukhari et Sahih Muslim sont les deux recueils que les savants sunnites tiennent pour les plus rigoureusement authentifiés. D’autres recueils contiennent des rapports forts et faibles, et c’est pourquoi la classification y compte, alors qu’elle ne s’impose pas dans ces deux-là.",
  "What it looks like day to day":
    "À quoi cela ressemble au quotidien",
  "Sunnah means a way or a path — specifically the way the Prophet ﷺ lived: what he said, what he did, and what he approved of in others. It reaches us through hadith, which are reports of those things recorded with the chain of people who passed each one down.":
    "Sunna signifie voie ou chemin — précisément la manière dont le Prophète ﷺ a vécu : ce qu’il a dit, ce qu’il a fait, et ce qu’il a approuvé chez les autres. Elle nous parvient par les hadiths, des rapports de ces choses consignés avec la chaîne des personnes qui les ont transmis.",
  "Why it sits beside the Qur’an":
    "Pourquoi elle accompagne le Coran",
  "The Qur’an gives the command and the Sunnah usually gives the method. \"Establish the prayer\" appears again and again; how many units, when, and what to say in them comes from watching him. The Qur’an itself instructs Muslims to take what the Messenger gives them.":
    "Le Coran donne l’ordre et la Sunna donne généralement la méthode. « Accomplissez la prière » revient sans cesse ; combien d’unités, à quel moment et que dire dedans vient de l’avoir observé. Le Coran lui-même ordonne aux musulmans de prendre ce que le Messager leur donne.",
  "Four lines that answer the question":
    "Quatre lignes qui répondent à la question",
  "When the Prophet ﷺ was asked to describe God, the answer given was a short chapter of the Qur’an: that He is One; that He is the One everything turns to and needs; that He was not born and had no children; and that there is nothing at all comparable to Him. Four lines, and Muslims have taken them as the definition ever since.":
    "Quand on demanda au Prophète ﷺ de décrire Dieu, la réponse fut un court chapitre du Coran : qu’Il est Un ; qu’Il est Celui vers qui tout se tourne et dont tout dépend ; qu’Il n’a pas été enfanté et n’a pas eu d’enfants ; et qu’il n’y a absolument rien de comparable à Lui. Quatre lignes, et les musulmans les tiennent pour la définition depuis.",
  "Known by what He does":
    "Connu par ce qu’Il fait",
  "The Qur’an teaches about God through names — the Merciful, the Forgiving, the Hearing, the One who provides. You will meet them constantly: every chapter but one opens by naming Him as the Most Merciful, and the prayer is full of them. Learning a few is a gentler way in than trying to think about God in the abstract.":
    "Le Coran enseigne au sujet de Dieu par des noms — le Miséricordieux, le Pardonneur, Celui qui entend, Celui qui pourvoit. Vous les rencontrerez sans cesse : tous les chapitres sauf un s’ouvrent en Le nommant le Tout Miséricordieux, et la prière en est remplie. En apprendre quelques-uns est une entrée plus douce que d’essayer de penser Dieu dans l’abstrait.",
  "Nothing like Him":
    "Rien qui Lui ressemble",
  "This is the sentence to hold on to when your mind starts trying to picture God. The Qur’an says there is nothing like Him — so any picture you form is wrong by definition, and you are not expected to form one. Muslims do not depict God, and that is why you will not find images of Him anywhere in Islam.":
    "C’est la phrase à laquelle se tenir quand l’esprit se met à vouloir se représenter Dieu. Le Coran dit qu’il n’y a rien qui Lui ressemble — toute image que vous formez est donc fausse par définition, et on n’attend pas de vous que vous en formiez une. Les musulmans ne représentent pas Dieu, et c’est pourquoi vous n’en trouverez nulle image dans l’islam.",
  "The name":
    "Le nom",
  "Allah is simply the Arabic word for God. It is not a different god with a different name — Arabic-speaking Christians and Jews use the same word when they pray. It has no plural and no gender, which is part of why Muslims keep it rather than translating it.":
    "Allah est simplement le mot arabe pour Dieu. Ce n’est pas un autre dieu portant un autre nom — les chrétiens et les juifs arabophones emploient le même mot quand ils prient. Il n’a ni pluriel ni genre, ce qui explique en partie pourquoi les musulmans le gardent au lieu de le traduire.",
  "A man, and a messenger":
    "Un homme, et un messager",
  "Muhammad ﷺ was born in Mecca around 570 CE and received the Qur’an over roughly twenty-three years. Muslims believe he is the last of a long line of prophets that includes Ibrahim, Musa and ʿIsa — Abraham, Moses and Jesus. He is not divine and is not worshipped. He delivered the message; the message is from God.":
    "Muhammad ﷺ est né à La Mecque vers 570 et a reçu le Coran sur environ vingt-trois ans. Les musulmans croient qu’il est le dernier d’une longue lignée de prophètes qui comprend Ibrahim, Moussa et ʿIsa — Abraham, Moïse et Jésus. Il n’est pas divin et n’est pas adoré. Il a transmis le message ; le message vient de Dieu.",
  "The symbol after his name":
    "Le symbole après son nom",
  "You will see ﷺ written after his name throughout this app and everywhere else. It stands for an Arabic phrase asking God to bless him and grant him peace. Muslims say it aloud out of respect whenever he is mentioned. Nobody will mind if you forget at first.":
    "Vous verrez ﷺ écrit après son nom dans toute cette application et partout ailleurs. Cela représente une formule arabe demandant à Dieu de le bénir et de lui accorder la paix. Les musulmans la prononcent par respect chaque fois qu’il est mentionné. Personne ne vous en voudra si vous l’oubliez au début.",
  "What he was like":
    "Comment il était",
  "The Qur’an describes him as being of great character, and the people who lived with him described someone who never used foul or crude language and who taught that the best people are those with the best manners. Much of what Muslims try to imitate is not ritual at all — it is how he treated people.":
    "Le Coran le décrit comme doté d’un caractère éminent, et ceux qui ont vécu avec lui ont décrit quelqu’un qui n’a jamais tenu de propos grossiers ni obscènes et qui enseignait que les meilleures personnes sont celles au meilleur comportement. Une grande part de ce que les musulmans cherchent à imiter n’est pas du rituel — c’est sa façon de traiter les gens.",
  "Why Muslims follow him":
    "Pourquoi les musulmans le suivent",
  "Because the Qur’an tells them to. It calls him an excellent example, and says that obeying him is obeying God. In practice this is very concrete: the Qur’an commands prayer without describing how, and the answer to \"how\" is that he said, \"Pray as you have seen me praying.\"":
    "Parce que le Coran le leur dit. Il l’appelle un excellent modèle et dit que lui obéir, c’est obéir à Dieu. En pratique, c’est très concret : le Coran ordonne la prière sans en décrire la forme, et la réponse au « comment » est qu’il a dit : « Priez comme vous m’avez vu prier ».",
  "Loving and following him is not the same as worshipping him. The distinction matters to Muslims and is worth being clear about early.":
    "L’aimer et le suivre n’est pas la même chose que l’adorer. La distinction compte pour les musulmans et il vaut mieux la clarifier tôt.",
  "If your job touches something forbidden":
    "Si votre travail touche à quelque chose d’interdit",
  "Scholars differ on how much distance from a prohibited thing is enough, so answers vary by how central it is to the job.":
    "Les savants divergent sur la distance suffisante par rapport à une chose interdite, si bien que les réponses varient selon la place qu’elle occupe dans le travail.",
  "Do not quit your job the week you become Muslim. Find out what your options are first.":
    "Ne quittez pas votre emploi la semaine où vous devenez musulman. Renseignez-vous d’abord sur vos options.",
  "Interest":
    "L’intérêt",
  "Riba — usually translated as interest or usury — is prohibited in the Qur’an in strong terms, and the Prophet ﷺ listed consuming it among the gravest sins. In practice this is what makes conventional mortgages, interest-bearing savings and most credit cards a live question for Muslims.":
    "La riba — que l’on traduit d’ordinaire par intérêt ou usure — est interdite dans le Coran en termes forts, et le Prophète ﷺ a compté le fait d’en consommer parmi les péchés les plus graves. En pratique, c’est ce qui fait des prêts immobiliers classiques, de l’épargne rémunérée et de la plupart des cartes de crédit une question vive pour les musulmans.",
  "If you already have a mortgage or a loan, you have not ruined anything and you do not have to solve it this month. Islamic finance options exist in many countries and vary a great deal. Scholars have discussed this in more detail — get advice on your actual situation.":
    "Si vous avez déjà un prêt immobilier ou un crédit, vous n’avez rien gâché et vous n’avez pas à régler cela ce mois-ci. Des solutions de finance islamique existent dans de nombreux pays et varient beaucoup. Les savants ont traité cela plus en détail — faites-vous conseiller sur votre situation réelle.",
  "Working is honoured, not tolerated":
    "Le travail est honoré, non toléré",
  "There is no ideal of poverty here. The Prophet ﷺ said nobody has eaten better food than what he earned by his own hands, and noted that the Prophet Dawud ate from his own labour. The Qur’an tells people to disperse and seek God’s bounty as soon as the Friday prayer ends.":
    "Il n’y a pas ici d’idéal de pauvreté. Le Prophète ﷺ a dit que personne n’a mangé meilleure nourriture que celle gagnée de ses propres mains, et a rappelé que le prophète Dawud mangeait du fruit de son travail. Le Coran dit aux gens de se disperser et de rechercher la faveur de Dieu dès que la prière du vendredi s’achève.",
  "Learning it":
    "L’apprendre",
  "Take one verse at a time, listening and repeating rather than reading. The Practice screen has all seven with a recording against each, and a repeat button — play a line, say it with the reciter, and move on when it holds. Most people need days, not minutes.":
    "Prenez un verset à la fois, en écoutant et en répétant plutôt qu’en lisant. L’écran de pratique contient les sept avec un enregistrement pour chacun et un bouton de répétition : lancez une ligne, dites-la avec le récitant, et passez à la suivante quand elle tient. La plupart ont besoin de jours, pas de minutes.",
  "Until you have it, say what you know and keep going. Nobody expects a first-week Muslim to have memorised it, and the prayer you pray while learning is still your prayer.":
    "En attendant de la savoir, dites ce que vous connaissez et continuez. Personne n’attend d’un musulman de sa première semaine qu’il l’ait mémorisée, et la prière que vous faites en apprenant reste votre prière.",
  "The opening chapter of the Qur’an — seven short verses. Its name means \"The Opening\". It is the most repeated passage in the world: every Muslim says it in every unit of every prayer, which for most people is seventeen times a day.":
    "Le chapitre qui ouvre le Coran — sept courts versets. Son nom signifie « L’Ouverture ». C’est le passage le plus répété au monde : chaque musulman le dit dans chaque unité de chaque prière, ce qui fait dix-sept fois par jour pour la plupart.",
  "What you are saying":
    "Ce que vous dites",
  "It opens by praising God as the Lord of everything and the source of mercy, then turns and speaks to Him directly: You alone we worship, and You alone we ask for help. The rest is a request — guide us along the straight path. It is a prayer for guidance, said before anything else is asked for.":
    "Il commence par louer Dieu comme Seigneur de tout et source de la miséricorde, puis s’adresse à Lui directement : c’est Toi seul que nous adorons et Toi seul dont nous implorons l’aide. Le reste est une demande — guide-nous sur le droit chemin. C’est une prière pour la guidance, dite avant toute autre demande.",
  "Why it comes first":
    "Pourquoi il vient en premier",
  "Because without it there is no prayer. The Prophet ﷺ said that whoever does not recite Al-Fatihah in their prayer, their prayer is invalid. Of everything a new Muslim could memorise, this is the one that changes what they are able to do today.":
    "Parce que sans elle il n’y a pas de prière. Le Prophète ﷺ a dit que celui qui ne récite pas Al-Fatiha dans sa prière, sa prière est invalide. De tout ce qu’un nouveau musulman pourrait mémoriser, c’est elle qui change ce qu’il peut faire aujourd’hui.",
  "Dhikr is remembering":
    "Le dhikr, c’est se souvenir",
  "Dhikr means remembrance — short phrases repeated through the day. Subḥān Allāh (glory be to God), al-ḥamdu li-llāh (all praise is God’s), Allāhu akbar (God is greatest). The Qur’an says hearts settle by the remembrance of God, and that is closer to what it does than anything a description manages.":
    "Dhikr signifie souvenir — de courtes formules répétées au fil de la journée. Subḥān Allāh (gloire à Dieu), al-ḥamdu li-llāh (toute louange est à Dieu), Allāhu akbar (Dieu est le plus grand). Le Coran dit que les cœurs s’apaisent par le souvenir de Dieu, et cela approche mieux ce qu’il fait que n’importe quelle description.",
  "Duʿa is asking":
    "La duʿa, c’est demander",
  "Duʿa is simply asking God for something. It has no set form, no required language and no appointed time — the Qur’an says He is near and answers the one who calls. You can make duʿa in English, in your own words, in the car, and it is the same duʿa.":
    "La duʿa, c’est simplement demander quelque chose à Dieu. Elle n’a pas de forme fixe, pas de langue obligatoire et pas d’heure fixée — le Coran dit qu’Il est proche et répond à celui qui L’appelle. Vous pouvez faire duʿa en français, avec vos propres mots, en voiture, et c’est la même duʿa.",
  "You do not need Arabic for this. The memorised duʿas are worth learning because they are the Prophet’s ﷺ wording, not because your own words would be rejected.":
    "Vous n’avez pas besoin d’arabe pour cela. Les duʿas mémorisées valent la peine d’être apprises parce que ce sont les mots du Prophète ﷺ, non parce que les vôtres seraient rejetés.",
  "Where to start":
    "Par où commencer",
  "Pick one phrase and one moment — waking, or the walk to work. The Everyday duʿas screen has short ones with the Arabic, how it sounds and what it means. The shortest is a single word, which is a deliberate place to begin rather than a compromise.":
    "Choisissez une formule et un moment — au réveil, ou sur le trajet du travail. L’écran des invocations du quotidien en propose de courtes avec l’arabe, la prononciation et le sens. La plus brève tient en un mot, ce qui est un point de départ voulu et non un pis-aller.",
  "Why it is given so much weight":
    "Pourquoi on y accorde tant de poids",
  "The Prophet ﷺ compared the person who remembers their Lord to the living, and the one who does not to the dead. He also said that whoever says subḥān Allāhi wa bi-ḥamdih a hundred times in a day has their sins forgiven though they were like the foam of the sea.":
    "Le Prophète ﷺ a comparé celui qui se souvient de son Seigneur aux vivants, et celui qui ne le fait pas aux morts. Il a aussi dit que celui qui dit subḥān Allāhi wa bi-ḥamdih cent fois par jour voit ses fautes pardonnées, seraient-elles comme l’écume de la mer.",
  "For someone new":
    "Pour quelqu’un qui débute",
  "The first year often costs something real — family who do not understand, friends who drift, a life that has to be rearranged. That difficulty is not a sign you chose wrongly, and it is exactly the situation the word sabr is for.":
    "La première année coûte souvent quelque chose de réel — une famille qui ne comprend pas, des amis qui s’éloignent, une vie à réorganiser. Cette difficulté n’est pas le signe d’un mauvais choix, et c’est précisément la situation pour laquelle le mot sabr existe.",
  "Gratitude is noticing":
    "La gratitude, c’est remarquer",
  "The Qur’an says that if you are grateful, He will increase you. Much of gratitude in practice is simply naming things — which is why al-ḥamdu li-llāh is said constantly, over small things, out loud. It is a habit of attention rather than a feeling you wait for.":
    "Le Coran dit que si vous êtes reconnaissant, Il vous donnera davantage. En pratique, la gratitude consiste beaucoup à nommer les choses — c’est pourquoi on dit al-ḥamdu li-llāh sans cesse, pour de petites choses, à voix haute. C’est une habitude d’attention plus qu’un sentiment que l’on attend.",
  "Patience is not passivity":
    "La patience n’est pas la passivité",
  "Sabr means holding steady — carrying on doing the right thing while something is hard, rather than accepting whatever happens. The Qur’an pairs it with prayer as the two things to seek help through, which is a practical instruction more than a moral one: when it is bad, pray.":
    "Sabr signifie tenir bon — continuer à faire ce qui est juste pendant que c’est difficile, non pas accepter n’importe quoi. Le Coran l’associe à la prière comme les deux moyens de chercher secours, ce qui est une consigne pratique plus que morale : quand ça va mal, priez.",
  "Two responses, one attitude":
    "Deux réponses, une seule attitude",
  "The Prophet ﷺ said the believer’s situation is remarkable, because everything that happens to them is good: when something pleasant comes they are grateful and that is good for them, and when something painful comes they are patient and that is good for them. Nobody else, he said, is in that position.":
    "Le Prophète ﷺ a dit que la situation du croyant est remarquable, car tout ce qui lui arrive est un bien : quand vient une chose agréable il remercie, et c’est un bien pour lui ; quand vient une chose douloureuse il patiente, et c’est un bien pour lui. Personne d’autre, a-t-il dit, n’est dans cette situation.",
  "The night in the last ten":
    "La nuit dans les dix derniers jours",
  "One night in Ramadan is called Laylat al-Qadr, the Night of Decree — the night the Qur’an began to be revealed, which the Qur’an says is better than a thousand months. Nobody is told which night it is. The Prophet ﷺ said to look for it in the odd nights of the last ten, which is why mosques fill up at the end of the month.":
    "Une nuit du Ramadan s’appelle Laylat al-Qadr, la Nuit du Destin — la nuit où la révélation du Coran a commencé, et dont le Coran dit qu’elle vaut mieux que mille mois. Nul ne sait de quelle nuit il s’agit. Le Prophète ﷺ a dit de la chercher dans les nuits impaires des dix derniers jours, et c’est pourquoi les mosquées se remplissent en fin de mois.",
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
  "Four sacred months":
    "Quatre mois sacrés",
  "The Qur’an says four of the twelve are sacred, and the Prophet ﷺ named them in his farewell sermon: three consecutive — Dhul-Qaʿdah, Dhul-Hijjah and Muharram — and Rajab. Fighting is prohibited in them, and wrongdoing in them is treated as more serious.":
    "Le Coran dit que quatre des douze sont sacrés, et le Prophète ﷺ les a nommés dans son sermon d’adieu : trois consécutifs — Dhoul-Qaʿda, Dhoul-Hijja et Mouharram — et Rajab. Le combat y est interdit, et le mal qu’on y commet est tenu pour plus grave.",
  "In practice":
    "En pratique",
  "You will find out when Ramadan starts from the people around you rather than from a calculation, because the start of a month is announced locally and mosques in the same city can differ by a day. That is normal and not worth worrying about.":
    "Vous saurez quand commence le Ramadan par les gens autour de vous plutôt que par un calcul, car le début du mois est annoncé localement et des mosquées d’une même ville peuvent différer d’un jour. C’est normal et cela ne mérite pas d’inquiétude.",
  "Whether a month begins by sighting the moon locally or by astronomical calculation is a live question, and communities in the same country sometimes start Ramadan on different days.":
    "Savoir si un mois commence par l’observation locale de la lune ou par le calcul astronomique est une question vive, et des communautés d’un même pays commencent parfois le Ramadan à des jours différents.",
  "Both approaches are argued from evidence and neither community is being careless. As a beginner the practical answer is to follow the mosque or community you pray with. Scholars have discussed this in more detail.":
    "Les deux approches s’argumentent par des preuves et aucune communauté n’est négligente. Pour un débutant, la réponse pratique est de suivre la mosquée ou la communauté avec laquelle il prie. Les savants ont traité cela plus en détail.",
  "Follow the sighting of the moon, as reported locally or regionally.":
    "Suivre l’observation de la lune, telle qu’elle est rapportée localement ou dans la région.",
  "Some bodies accept astronomical calculation to fix the date in advance.":
    "Certaines instances acceptent le calcul astronomique pour fixer la date à l’avance.",
  "It follows the moon":
    "Elle suit la lune",
  "Twelve months, each beginning with a new moon, making a year about eleven days shorter than the solar one. That is why Ramadan and the two Eids move earlier every year rather than falling on fixed dates — over a lifetime they pass through every season.":
    "Douze mois, chacun débutant avec une nouvelle lune, ce qui fait une année d’environ onze jours plus courte que l’année solaire. C’est pourquoi le Ramadan et les deux Aïds avancent chaque année au lieu de tomber à dates fixes — au cours d’une vie, ils traversent toutes les saisons.",
  "What to have in your head":
    "Ce qu’il faut avoir en tête",
  "Ramadan is the month of fasting and ends with Eid al-Fitr. Dhul-Hijjah is the month of Hajj, and its tenth day is Eid al-Adha, the second of the two Eids — marked by those not on pilgrimage as well. Muharram opens the year.":
    "Le Ramadan est le mois du jeûne et se termine par l’Aïd el-Fitr. Dhoul-Hijja est le mois du Hajj, et son dixième jour est l’Aïd el-Adha, la seconde des deux fêtes — marquée aussi par ceux qui ne sont pas en pèlerinage. Mouharram ouvre l’année.",
  "Ordinary mistakes":
    "Erreurs ordinaires",
  "Losing count, forgetting a sitting, adding a movement, saying something in the wrong place — none of these break the prayer. They are fixed with two extra prostrations at the end, which the app covers separately. A beginner will do all of these, and none of them is a disaster.":
    "Perdre le compte, oublier une position assise, ajouter un mouvement, dire quelque chose au mauvais endroit — rien de tout cela ne rompt la prière. Cela se corrige par deux prosternations supplémentaires à la fin, que l’application traite à part. Un débutant fera tout cela, et rien n’est un désastre.",
  "The most common beginner mistake is starting the prayer over. Almost nothing requires that, and restarting turns a small slip into a long one.":
    "L’erreur la plus courante du débutant est de recommencer la prière. Presque rien ne l’exige, et recommencer transforme un petit écart en un long.",
  "Speaking":
    "Parler",
  "What does break it":
    "Ce qui la rompt",
  "What does not break it":
    "Ce qui ne la rompt pas",
  "Doubt does not. Someone asked the Prophet ﷺ about feeling as though they had passed wind mid-prayer, and he said not to leave the prayer unless they heard a sound or smelled something. Uncertainty is not enough. Carry on.":
    "Le doute, non. Quelqu’un a interrogé le Prophète ﷺ sur l’impression d’avoir rompu son wudu en pleine prière, et il a répondu de ne pas quitter la prière à moins d’entendre un son ou de sentir une odeur. L’incertitude ne suffit pas. Continuez.",
  "This is the hadith to remember if you find yourself checking constantly. The rule is deliberately strict about certainty, because doubt would otherwise end every prayer.":
    "C’est le hadith à retenir si vous vous surprenez à vérifier sans cesse. La règle est volontairement stricte sur la certitude, car le doute mettrait sinon fin à chaque prière.",
  "The time has come in":
    "L’heure est entrée",
  "Each prayer has a window, and you pray inside it rather than whenever you like — the Qur’an calls prayer a decree of specified times. The Pray tab works the times out from where you are, on the phone, so you do not have to calculate anything.":
    "Chaque prière a une fenêtre, et on prie dedans plutôt que quand on veut — le Coran appelle la prière un décret aux temps fixés. L’onglet Prier calcule les heures depuis l’endroit où vous êtes, sur le téléphone, pour que vous n’ayez rien à calculer.",
  "You are covered, and so is the place":
    "Vous êtes couvert, et l’endroit aussi",
  "The Qur’an tells people to take their adornment at every place of prayer — dress as you would to meet someone you respect. Your clothes and the ground you pray on should be clean. A carpet, a towel or a mat is fine; a prayer mat is convenient, not required.":
    "Le Coran dit aux gens de prendre leur parure en tout lieu de prière — habillez-vous comme pour rencontrer quelqu’un que vous respectez. Vos vêtements et le sol sur lequel vous priez doivent être propres. Un tapis, une serviette ou une natte conviennent ; un tapis de prière est pratique, non obligatoire.",
  "How much has to be covered differs a little between men and women and is set out in the clothing guide. Ordinary loose clothes cover it for most people.":
    "La surface à couvrir diffère un peu entre les hommes et les femmes et figure dans le guide sur les vêtements. Des vêtements amples ordinaires suffisent pour la plupart des gens.",
  "You are facing the qibla":
    "Vous êtes tourné vers la qibla",
  "Muslims face the Kaʿbah in Mecca, and the Qur’an gives that instruction directly. The Qibla screen in this app points the way from where you are. If you cannot work it out — on a plane, in an unfamiliar place — face your best guess and pray; that is accepted.":
    "Les musulmans se tournent vers la Kaʿba à La Mecque, et le Coran donne cette consigne directement. L’écran Qibla de cette application indique la direction depuis l’endroit où vous êtes. Si vous ne pouvez pas la déterminer — en avion, dans un lieu inconnu — tournez-vous selon votre meilleure estimation et priez ; cela est accepté.",
  "You are in wudu":
    "Vous êtes en état de wudu",
  "You intend it":
    "Vous en formez l’intention",
  "The intention is a thought, not a sentence: knowing which prayer you are about to pray. You do not say it out loud, and you do not need a formula. If you are standing on a mat about to pray Maghrib, you have already intended it.":
    "L’intention est une pensée, non une phrase : savoir quelle prière vous allez faire. On ne la dit pas à voix haute et aucune formule n’est requise. Si vous êtes debout sur une natte pour prier le Maghrib, vous en avez déjà formé l’intention.",
  "Some people are taught to say the intention aloud. Scholars differ on whether that is recommended, and nobody holds that the prayer fails without it.":
    "On enseigne à certains de dire l’intention à voix haute. Les savants divergent sur son caractère recommandé, et aucun ne soutient que la prière échoue sans cela.",
  "How it is received":
    "Comment il est reçu",
  "The Prophet ﷺ described God as more pleased with a person’s repentance than someone would be who lost their camel in the desert and then found it. The image is not of a grudging pardon. It is relief and delight.":
    "Le Prophète ﷺ a décrit Dieu comme plus heureux du repentir d’une personne que ne le serait quelqu’un qui a perdu son chameau dans le désert et l’a retrouvé. L’image n’est pas celle d’un pardon consenti à contrecœur. C’est le soulagement et la joie.",
  "If it happens again":
    "Si cela se reproduit",
  "You repent again. People expect to fail once and be finished; that is not how it works, and a habit that takes a year to break took a year for everybody else too. Keep praying while you work on it — stopping the prayer because you feel unworthy of it is the one move that makes things worse.":
    "Vous vous repentez de nouveau. On s’attend à échouer une fois et à en être fini ; ce n’est pas ainsi que cela marche, et une habitude qui prend un an à rompre a pris un an à tout le monde. Continuez à prier pendant que vous y travaillez — quitter la prière parce que vous vous en sentez indigne est le seul geste qui aggrave les choses.",
  "Nobody is owed an account of your sins. You do not have to tell an imam, a friend, or anyone at the mosque.":
    "Personne n’a droit au récit de vos fautes. Vous n’avez à en parler ni à un imam, ni à un ami, ni à personne à la mosquée.",
  "The door does not close":
    "La porte ne se ferme pas",
  "The Qur’an addresses people who have wronged themselves and tells them not to despair of God’s mercy, because He forgives all sins. That verse is worth knowing early, because the thing most likely to end someone’s practice is not a sin — it is deciding afterwards that they are past helping.":
    "Le Coran s’adresse à ceux qui se sont fait tort à eux-mêmes et leur dit de ne pas désespérer de la miséricorde de Dieu, car Il pardonne tous les péchés. Ce verset vaut d’être connu tôt, car ce qui met le plus souvent fin à la pratique de quelqu’un n’est pas une faute — c’est de décider ensuite qu’il est irrécupérable.",
  "What repentance actually is":
    "Ce qu’est réellement le repentir",
  "Stopping, meaning it, and asking. There is no ritual, no witness, and nobody to confess to — you turn to God directly. The Qur’an calls it turning to Him with sincere repentance, and that is the whole procedure.":
    "S’arrêter, le vouloir vraiment, et demander. Il n’y a pas de rite, pas de témoin, et personne à qui se confesser — vous vous tournez vers Dieu directement. Le Coran appelle cela revenir à Lui avec un repentir sincère, et c’est toute la procédure.",
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
