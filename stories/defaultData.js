const article = {
  size: 'xl',
  title: 'Як прыгатаваць мову ВКЛ?',
  backgroundColor: '#1a2e48',
  isDarkTheme: false,
  author: 'Марыя Бадзей, Марына Анісімава',
  description:
    'Мноства баталій, якія з зайздроснай рэгулярнасцю разгараюцца вакол беларускай мовы, тычацца не толькі яе сучаснага стану. Мовазнаўцы і гісторыкі і па сёння не могуць пагадзіцца наконт таго, на якую мову Скарына пераклаў Біблію, што можна лічыць моваю беларускай і з якіх часоў варта адсочваць яе развіццё. Паспрабуем прыгледзецца да мовы Вялікага Княства Літоўскага',
};

const collectionArticle = {
  size: 'xl',
  backgroundColor: '#f6d39d',
  isDarkTheme: true,
  partNumber: 1,
  collectionName: 'Міцкевіч: геаграфія паэта',
  author: 'Марыя Бадзей',
  title: 'Літва! Ты, як здароўе ў нас, мая Айчына!',
};

const video = {
  size: 'xl',
  isDarkTheme: false,
  title: 'Джэймс Джойс',
  author: 'Наталля Ламека',
};

const brandArticle = {
  size: 'xl',
  backgroundColor: '#d5d4d9',
  isDarkTheme: true,
  isBrandArticle: true,
  title: 'Вітальд Бялыніцкі-Біруля',
  author: 'А.П.Харак',
  description:
    'Мноства баталій, якія з зайздроснай рэгулярнасцю разгараюцца вакол беларускай мовы, тычацца не толькі яе сучаснага стану. Мовазнаўцы і гісторыкі і па сёння не могуць пагадзіцца наконт таго, на якую мову Скарына пераклаў Біблію, што можна лічыць моваю беларускай і з якіх часоў варта адсочваць яе развіццё.',
};

const person = {
  className: '',
  size: 'l',
  backgroundColor: '#686868',
  isDarkTheme: false,
  years: '1947—2016',
  title: 'Дэвід Боўі',
  description: 'Брытанскі рок-музыка, аўтар песень, прадзюсар, гукарэжысёр, мастак і акцёр',
  image: 'https://babajka.github.io/babajka-markup/static/images/mock/covers/person.png',
};

const locations = [
  {
    size: 'l',
    title: "Міжзем'e",
    backgroundImage: 'location.png',
    isDarkTheme: true,
  },
  {
    size: 'l',
    title: 'ВКЛ',
    backgroundImage: 'location.png',
    isDarkTheme: true,
  },
  {
    size: 'l',
    title: 'Галактыка Андрамеды',
    backgroundImage: 'location-galaxy.jpg',
  },
];

module.exports = { article, collectionArticle, video, brandArticle, person, locations };
