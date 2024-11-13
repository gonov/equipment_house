const products = [
  {
    id: 1,
    categoryId: 1,
    name: '1 pp9u',
    price: 1000,
    img1: '/images/123.png',
    img2: '/images/plate.png',
    type: 'Хит',
    availability: false,
    businessSolutionsId: 1,
    code: '1235545',
    description:
      'usdhfsudhfusdhfuihsdf iodfjhsoidfhjoisdh osdhfo isdhf oisdhfoishfoisdh fiohdfoi hsdoifh sdiofh oisdhfoi shdfoihsoifhsod ifhoidsf hoisdfhoidsh foisdhfoi shfiosd hoishfoishd fiosdhfi osdiohfiod',
    characteristics:
      ' 3274983275435 435 34856 34659783465634 9875983 7849357893475 8943 78573489 758943758934 789579834 789347589 34789 57983457 8937589347589734 58973489579384759834758943759834 7983475 893475 98347598 34',
  },
  {
    id: 2,
    categoryId: 1,
    name: '1 1',
    price: 1000,
    img1: '/images/123.png',
    type: 'Хит',
    availability: true,
    businessSolutionsId: 1,
    code: '1235545',
  },
  {
    id: 3,
    categoryId: 2,
    name: '2123123',
    price: 1000,
    img1: '/images/123.png',
    type: 'Новинка',
    availability: true,
    businessSolutionsId: 2,
    code: '1235545',
  },
  {
    id: 4,
    categoryId: 3,
    name: '3',
    price: 1000,
    img1: '/images/123.png',
    type: 'Новинка',
    availability: true,
    businessSolutionsId: 3,
    code: '1235545',
  },
  {
    id: 5,
    categoryId: 2,
    name: '2',
    price: 1000,
    img1: '/images/123.png',
    type: 'Хит',
    availability: true,
    businessSolutionsId: 1,
    code: '1235545',
  },
  {
    id: 6,
    categoryId: 4,
    name: '4',
    price: 1000,
    img1: '/images/123.png',
    businessSolutionsId: 3,
    type: 'Новинка',
    availability: false,
    code: '1235545',
  },
  {
    id: 7,
    categoryId: 2,
    name: '2',
    price: 1000,
    img1: '/images/123.png',
    businessSolutionsId: 3,
    type: 'Хит',
    availability: true,
    code: '1235545',
  },
  {
    id: 8,
    categoryId: 1,
    name: '1',
    price: 1000,
    img1: '/images/123.png',
    businessSolutionsId: 2,
    type: 'Новинка',
    availability: false,
    code: '1235545',
  },
  {
    id: 9,
    categoryId: 3,
    name: '3',
    price: 1000,
    img1: '/images/123.png',
    type: 'Хит',
    availability: false,
    code: '1235545',
  },
  {
    id: 10,
    categoryId: 1,
    name: '4',
    price: 1000,
    img1: '/images/123.png',
    type: 'Новинка',
    availability: true,
    code: '1235545',
  },
  {
    id: 11,
    categoryId: 1,
    name: '5',
    price: 1200,
    img1: '/images/123.png',
    type: 'Новинка',
    availability: true,
    code: '1235546',
  },
  {
    id: 12,
    categoryId: 1,
    name: '6',
    price: 1100,
    img1: '/images/123.png',
    type: 'Хит продаж',
    availability: true,
    code: '1235547',
  },
  {
    id: 13,
    categoryId: 1,
    name: '7',
    price: 1300,
    img1: '/images/123.png',
    type: 'Новинка',
    availability: false,
    code: '1235548',
  },
  {
    id: 14,
    categoryId: 1,
    name: '8',
    price: 1400,
    img1: '/images/123.png',
    type: 'Новинка',
    availability: true,
    code: '1235549',
  },
  {
    id: 15,
    categoryId: 1,
    name: '9',
    price: 1500,
    img1: '/images/123.png',
    type: 'Распродажа',
    availability: true,
    code: '1235550',
  },
  {
    id: 16,
    categoryId: 1,
    name: '10',
    price: 1600,
    img1: '/images/123.png',
    type: 'Хит продаж',
    availability: true,
    code: '1235551',
  },
  {
    id: 17,
    categoryId: 1,
    name: '11',
    price: 1700,
    img1: '/images/123.png',
    type: 'Новинка',
    availability: true,
    code: '1235552',
  },
  {
    id: 18,
    categoryId: 1,
    name: '12',
    price: 1800,
    img1: '/images/123.png',
    type: 'Новинка',
    availability: false,
    code: '1235553',
  },
  {
    id: 19,
    categoryId: 1,
    name: '13',
    price: 1900,
    img1: '/images/123.png',
    type: 'Хит продаж',
    availability: true,
    code: '1235554',
  },
  {
    id: 20,
    categoryId: 1,
    name: '14',
    price: 2000,
    img1: '/images/123.png',
    type: 'Распродажа',
    availability: true,
    code: '1235555',
  },
];

const getProductsByCategory = (categoryId) => {
  return products.filter((product) => product.categoryId === categoryId);
};

const getProductsByBusinessSolutions = (businessSolutionsId) => {
  return products.filter(
    (product) => product.businessSolutionsId === businessSolutionsId
  );
};

{
  /*  данные для готовых решений для бизнеса */
}

const busSolutions = [
  {
    id: 1,
    name: 'для столовых',
    price: 45000,
    img: '/images/123.png',
    availability: true,
  },
  {
    id: 2,
    name: 'для кафе',
    price: 45000,
    img: '/images/123.png',
    availability: false,
  },
  {
    id: 3,
    name: 'для ресторанов',
    price: 45000,
    img: '/images/123.png',
    availability: true,
  },
  {
    id: 4,
    name: 'для столовых',
    price: 45000,
    img: '/images/123.png',
    availability: false,
  },
  {
    id: 5,
    name: 'для кафе',
    price: 45000,
    img: '/images/123.png',
    availability: false,
  },
  {
    id: 6,
    name: 'для ресторанов',
    price: 45000,
    img: '/images/123.png',
    availability: true,
  },
  //   {
  //     id: 4,
  //     name: 'для пекарни',
  //     price: 45000,
  //     img: '/images/123.png',
  //     availability: false,
  //   },
];

const news = [
  {
    id: 1,
    title: 'для столовых',
    date: '21.03.2111',
    img: '/images/123.png',
    description: 'sdyfgysdgfyusdgfygsdfugsdif',
  },
  {
    id: 2,
    title: 'для кафе',
    date: '21.03.2111',
    img: '/images/123.png',
    description: 'ohoifhsdufhuoisfoisdf',
  },
  {
    id: 3,
    title: 'для ресторанов',
    date: '21.03.2111',
    img: '/images/123.png',
    description: 'isudfiuhsdifudfddfh4535435345ejjdf',
  },
  {
    id: 4,
    title: 'для столовых',
    date: '21.03.2111',
    img: '/images/123.png',
    description: 'sdyfgysdgfyusdgfygsdfugsdif',
  },
  {
    id: 5,
    title: 'для кафе',
    date: '21.03.2111',
    img: '/images/123.png',
    description: 'ohoifhsdufhuoisfoisdf',
  },
  {
    id: 6,
    title: 'для ресторанов',
    date: '21.03.2111',
    img: '/images/123.png',
    description: 'isudfiuhsdifudfddfh4535435345ejjdf',
  },
];

const swipeBlock1 = [
  {
    id: 1,
    title: '9f9weuf09uw09e',
    description: 'uehfw09ufuwr09fujhf',
    img: '/images/plate.png',
    backgroundImg: '/images/Rectangle22.png',
  },
  {
    id: 2,
    title: '9f9weuf09uw09e',
    description: 'uehfw09ufuwr09fujhf',
    img: '/images/plate.png',
    backgroundImg: '/images/Rectangle22.png',
  },
  {
    id: 3,
    title: '9f9weuf123109uw09e',
    description: 'uehfw09ufuwr09fujhf',
    img: '/images/plate.png',
    backgroundImg: '/images/Rectangle22.png',
  },
];

const user = {
  id: 1,
  name: 'Иванов Иван Иванович',
  phone: '892849857435',
  email: 'asdasd@asasd.ass',
  company: '',
  city: 'Черкесск',
  address: 'wwfdfs home1',
  type: 'Розница',
  payment: 'безнал',
};

const userOrder = [
  {
    id: 1,
    user_id: 1,
    product_id: 1,
  },
  {
    id: 2,
    user_id: 1,
    product_id: 3,
  },
];

const characteristics = {
  id: 1,
  productId: 1,
  article: '6565667356',
  series: '84ibcu',
  installation: 'напольная',
  connection: 'electric',
};

const categories = [
  {
    id: 1,
    title: 'Оборудование шоковой',
    img: '/images/Group12.png',
  },
  {
    id: 2,
    title: 'Услуги для кафе',
    img: '/images/Group13.png',
  },
  {
    id: 3,
    title: 'Кухонное оборудование',
    img: '/images/Group11.png',
  },
  {
    id: 4,
    title: 'Профессиональные мясорубки',
    img: '/images/Group8.png',
  },
  {
    id: 5,
    title: 'Пекарское оборудование',
    img: '/images/Group12.png',
  },
  {
    id: 6,
    title: 'Оборудование для ресторанов',
    img: '/images/Group12.png',
  },
  {
    id: 7,
    title: 'Общепитовское оборудование',
    img: '/images/Group12.png',
  },
  {
    id: 8,
    title: 'Специальные предложения',
    img: '/images/Group12.png',
  },
];

const businessSolutions = [
  {
    id: 1,
    title: 'Готовые решения для ресторанного бизнеса',
    img: '/images/solutions.png',
    type: true,
  },
  {
    id: 2,
    title: 'Готовые решения для гостинничного бизнеса',
    img: '/images/solutions.png',
  },
  {
    id: 3,
    title: 'Готовые решения для пекарниа',
    img: '/images/solutions.png',
  },
  {
    id: 4,
    title: 'Готовые решения для шиномонтажки ',
    img: '/images/solutions.png',
  },
];

export {
  products,
  busSolutions,
  news,
  swipeBlock1,
  user,
  userOrder,
  characteristics,
  categories,
  businessSolutions,
  getProductsByCategory,
  getProductsByBusinessSolutions,
};
