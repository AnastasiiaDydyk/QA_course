const { chromium } = require('playwright');
const expect = require('expect');
let browser;
let page;

const mainPage = require('./mainPage');
const mainpage = new mainPage();
const testdata = require('./testdata');

beforeAll(async () => {
  browser = await chromium.launch(/*{
  headless: false
}*/);
});
  afterAll(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    page = await browser.newPage();
  });
  afterEach(async () => {
    await page.close();
  });

  // Открытие страницы приставок и выбрать XBOX

  it ('open main page find article', async() => {
  //Go to https://rozetka.com.ua/
  await page.goto('https://rozetka.com.ua/');
  expect(await page.title()).toBe('Интернет-магазин ROZETKA™: официальный сайт самого популярного онлайн-гипермаркета в Украине');
  // Click Каталог
  await page.click(mainpage.Catalog);
  expect(await page.isVisible(mainpage.CatalogLeftMenu));
  // Click Товары для геймеров
  await Promise.all([
    page.waitForNavigation({ url: 'https://rozetka.com.ua/game-zone/c80261/' }),
    page.click(mainpage.GamersProducts)
  ]);
  expect (await page.url()).toBe('https://rozetka.com.ua/game-zone/c80261/') 
  // Click Игровые приставки
  await Promise.all([
    page.waitForNavigation({ url: 'https://rozetka.com.ua/consoles/c80020/' }),
    page.click(mainpage.GamingConsoles)
  ]);
  expect (await page.url()).toBe('https://rozetka.com.ua/consoles/c80020/')
  // Click Игровая консоль Microsoft Xbox Series X 1TB (RRT-00010)
  await Promise.all([
    page.waitForNavigation({ url: 'https://rozetka.com.ua/260325946/p260325946/' }),
    page.click(mainpage.ConsoleMicrosoft)]);
    expect (await page.url()).toBe('https://rozetka.com.ua/260325946/p260325946/', 3000)
  },12000)
  
// Найти Беспроводной геймпад PlayStation 5 Dualsense для PS5/PS 5 Digital Edition

  it ('find playstation5', async() => { 
    // Go to https://rozetka.com.ua/
    await page.goto('https://rozetka.com.ua/');
    expect(await page.title()).toBe('Интернет-магазин ROZETKA™: официальный сайт самого популярного онлайн-гипермаркета в Украине');
    // Click [placeholder="Я ищу..."]
    await page.click(mainpage.SearchField);
    expect (await page.isVisible(mainpage.SearchField));
    // Fill [placeholder="Я ищу..."]
    await page.fill(mainpage.SearchField, testdata.product1);
    // Press Enter
    await Promise.all([
     page.waitForNavigation({ url: 'https://rozetka.com.ua/search/?text=%D0%91%D0%B5%D1%81%D0%BF%D1%80%D0%BE%D0%B2%D0%BE%D0%B4%D0%BD%D0%BE%D0%B9+%D0%B3%D0%B5%D0%B9%D0%BC%D0%BF%D0%B0%D0%B4+PlayStation+5+Dualsense+White+%D0%B4%D0%BB%D1%8F+PS5%2FPS+5+Digital+Edition' }),
     page.press(mainpage.SearchField, 'Enter')
    ]);
    expect (await page.url()).toBe('https://rozetka.com.ua/search/?text=%D0%91%D0%B5%D1%81%D0%BF%D1%80%D0%BE%D0%B2%D0%BE%D0%B4%D0%BD%D0%BE%D0%B9+%D0%B3%D0%B5%D0%B9%D0%BC%D0%BF%D0%B0%D0%B4+PlayStation+5+Dualsense+White+%D0%B4%D0%BB%D1%8F+PS5%2FPS+5+Digital+Edition');
    // Click text=Беспроводной геймпад PlayStation 5 Dualsense для PS5/PS 5 Digital Edition
    await Promise.all([
     page.waitForNavigation({ url: 'https://rozetka.com.ua/sony_dualsense_for_ps_5_white/p223099897/'}),
     page.click(mainpage.GamepadPS5)
    ]);
    expect (await page.url()).toBe('https://rozetka.com.ua/sony_dualsense_for_ps_5_white/p223099897/');
    },11000)

// Добавить товар в корзину и удалить его

it ('buy and delete product', async() =>{
    // Go to https://rozetka.com.ua/
    await page.goto('https://rozetka.com.ua/');
    expect(await page.title()).toBe('Интернет-магазин ROZETKA™: официальный сайт самого популярного онлайн-гипермаркета в Украине');
    // Click [placeholder="Я ищу..."]
    await page.click(mainpage.SearchField);
    expect (await page.isVisible(mainpage.SearchField));
    // Fill [placeholder="Я ищу..."]
    await page.fill(mainpage.SearchField, testdata.product2);
    // Press Enter
    await Promise.all([
      page.waitForNavigation({ url: 'https://rozetka.com.ua/search/?text=%D0%BF%D0%B0%D1%82%D1%87%D0%B8+%D0%B4%D0%BB%D1%8F+%D0%B3%D0%BB%D0%B0%D0%B7&section_id=4657280' }),
      page.press(mainpage.SearchField, 'Enter')
    ]);
    expect (await page.url()).toBe('https://rozetka.com.ua/search/?text=%D0%BF%D0%B0%D1%82%D1%87%D0%B8+%D0%B4%D0%BB%D1%8F+%D0%B3%D0%BB%D0%B0%D0%B7&section_id=4657280');
    // Click text=Патчи под глаз Eruyn Nicotinamide Ice Crystal
    await Promise.all([
      page.waitForNavigation({ url: 'https://rozetka.com.ua/eruyn_6941349341185/p250239886/' }),
      page.click(mainpage.EyePatchesProduct)
    ]);
    expect (await page.url()).toBe('https://rozetka.com.ua/eruyn_6941349341185/p250239886/')
    // Click Купить
    await page.click(mainpage.BuyLabel);
    expect (await page.isVisible(mainpage.TextDeleteProduct));
    // Click options
    await page.click(mainpage.Options);
    expect (await page.isVisible(mainpage.DeleteProductIcon));
    // Click Удалить
    await page.click(mainpage.DeleteProductIcon);
    expect (await page.isVisible(mainpage.DeleteMessage))
    }, 12000)

// Открыть FAQ и найти тему

  it ('open FAQ and find spesific topic', async() =>{
        // Open new page
  // Go to https://rozetka.com.ua/
  await page.goto('https://rozetka.com.ua/');
  expect(await page.title()).toBe('Интернет-магазин ROZETKA™: официальный сайт самого популярного онлайн-гипермаркета в Украине');
  // Click Справочный центр
  await page.click(mainpage.FAQ);
  expect (await page.url()).toBe('https://help.rozetka.com.ua/hc/ru');
  // Click Оплата
  await page.click(mainpage.Payment);
  expect (await page.url()).toBe('https://help.rozetka.com.ua/hc/ru/categories/360005767832/');
  // Click [placeholder="Поиск"]
  await page.click(mainpage.Search);
  expect (await page.isVisible(mainpage.Search));
  // Fill [placeholder="Поиск"]
  await page.fill(mainpage.Search, testdata.FAQtopic);
  // Click text=Поиск
  await page.click(mainpage.SearchButton);
  expect (await page.isVisible('text=Как оплатить заказ картой?'))
  } )

// Изменить язык и город

  it ('Change language and sity', async() => { 
    // Go to https://rozetka.com.ua/
    await page.goto('https://rozetka.com.ua/');
    expect(await page.title()).toBe('Интернет-магазин ROZETKA™: официальный сайт самого популярного онлайн-гипермаркета в Украине');
    // Click text=UA
    await Promise.all([
      page.waitForNavigation({ url: 'https://rozetka.com.ua/ua/' }),
      page.click('text=UA')
    ]);
    expect(await page.title()).toBe('Інтернет-магазин ROZETKA™: офіційний сайт найпопулярнішого онлайн-гіпермаркету в Україні');
    // Click [aria-label="Відкрити меню"]
    await page.click('[aria-label="Відкрити меню"]');
    expect (await page.isVisible('ul.ng-tns-c5-0 > li:nth-child(3)'));
    // Click button:has-text("Київ")
    await page.click('button:has-text("Київ")');
    expect (await page.isVisible('single-modal-window div.modal__content'));
    // Click text=Одеса
    await page.click('text=Одеса');
    // Click text=Застосувати
    await page.click('text=Застосувати');
    // Click [aria-label="Відкрити меню"]
    await page.click('[aria-label="Відкрити меню"]');
    expect (await page.isVisible('ul.ng-tns-c5-0 > li:nth-child(3)'));
    expect (await page.isVisible('button:has-text("Одеса")'));
  })