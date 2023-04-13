<template>
    <div class="custom-container">
        <div class="tariffs">
            <div class="tariffs__item">
                <div class="tariff">
                    <div class="tariff__header">
                        <div class="tariff__title">Wildberries</div>
                        <div class="tariff__price">29 990 ₽</div>
                    </div>
                    <div class="tariff__body">
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Описание
                            </div>
                            <div class="tariff__point">Предусмотрено - 1 сем. <span class="tariff__hidden">(5 семинаров)</span></div>
                            <div class="tariff__point">25 лекций <span class="tariff__hidden">(31 лекция)</span></div>
                            <div class="tariff__point">Имеется личное сопровождение после обучения - 3 месяца <span class="tariff__hidden">(6 месяцев)</span></div>
                            <div class="tariff__point">Добавление в группу общения</div>
                            <div class="tariff__point tariff__point--opacify">Помощь в регистрации сайта Таобао и 1688</div>
                            <div class="tariff__point tariff__point--opacify">Бонусный урок по подготовке инфографики в фотошоп</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 1. Юридические и экономические аспекты
                            </div>
                            <div class="tariff__point">1.1 Предварительные расчеты на старте</div>
                            <div class="tariff__point">1.2 Документация на товар, подтверждающая качество</div>
                            <div class="tariff__point">1.3 Регистрация ИП</div>
                            <div class="tariff__point">1.4 Особенности налогообложения</div>
                            <div class="tariff__point">1.5 Оферта ВБ - важные особенности</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 2. Подбор ниши
                            </div>
                            <div class="tariff__point">2.1 Аналитические сервисы для подбора ниши</div>
                            <div class="tariff__point">2.2 Подбор прибыльной ниш</div>
                            <div class="tariff__point">2.2 Подбор прибыльной ниш</div>
                            <div class="tariff__point">2.4 Юнит - экономика</div>
                        </div>
                        <div class="tariff__block tariff__block--opacify">
                            <div class="tariff__block-title">
                                Модуль 3. Поставщики
                            </div>
                            <div class="tariff__point">3.1 Виды поставщиков и особенности работы</div>
                            <div class="tariff__point">3.2 Китайские площадки и схемы работы</div>
                            <div class="tariff__point">3.4 Особенности и способы общения с китайцами</div>
                            <div class="tariff__point">3.5 Правила расчета стоимости доставки</div>
                            <div class="tariff__point">3.6 Способы ввоза товара: контакты</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 4. Карточка товара
                            </div>
                            <div class="tariff__point">4.1 Карточка товара артикул и штрих - код</div>
                            <div class="tariff__point">4.2 Карточка особенности и правила</div>
                            <div class="tariff__point">4.3 SEO оптимизация карточки</div>
                            <div class="tariff__point">4.4 Оформление фото карточки</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 5. Поставки
                            </div>
                            <div class="tariff__point">5.1 Виды поставок на ВБ, какую выбрать</div>
                            <div class="tariff__point">5.2 Особенности работы со склада Wildberries</div>
                            <div class="tariff__point">5.3 Особенности работы со своего склада</div>
                            <div class="tariff__point">5.4 Региональные склады и выбор склада</div>
                            <div class="tariff__point">5.5 Упаковка и маркировка товара</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 6. Особенности продаж
                            </div>
                            <div class="tariff__point">6.1 Основы стабильных продаж и роста</div>
                            <div class="tariff__point">6.2 Стратегии продвижения</div>
                            <div class="tariff__point">6.3 Внутренняя реклама на Wildberries</div>
                            <div class="tariff__point">6.4 Внешняя реклама на товар</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 7. Финансы и цены
                            </div>
                            <div class="tariff__point">7.1 Цены и участие в акциях</div>
                            <div class="tariff__point">7.2 Аналитика Wildberries</div>
                            <div class="tariff__point">7.3 Финансы - финанcовые отчеты Wildberries</div>
                        </div>
                    </div>
                    <div class="tariff__footer">
                        <a href="https://wa.me/79966439800" class="btn" target="_blank">Купить</a>
                        <button class="btn" type="button" onclick="tinkoff.create(
                            {
                                sum: 29900,
                                items: [{ name: 'Курс по обучению Wildberries', price: 29900, quantity: 1 }],
                                shopId: '21d0b656-bd25-4da2-a3f8-91394606cce0',
                                showcaseId: '4498fdf2-f3f7-4a5e-91af-0ca6116a267a',
                            },
                            { view: 'modal' }
                        )">Купить в расрочку</button>
                    </div>
                </div>
            </div>

            <div class="tariffs__item">
                <div class="tariff tariff--red">
                    <div class="tariff__header">
                        <div class="tariff__title">Wildberries и Китай</div>
                        <div class="tariff__price">39 990 ₽</div>
                    </div>
                    <div class="tariff__body">
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Описание
                            </div>
                            <div class="tariff__point">Предусмотрено - 2 сем. <span class="tariff__hidden">(5 семинаров)</span></div>
                            <div class="tariff__point">31 лекция</div>
                            <div class="tariff__point">Имеется личное сопровождение после обучения - 3 месяца <span class="tariff__hidden">(6 месяцев)</span></div>
                            <div class="tariff__point">Добавление в группу общения</div>
                            <div class="tariff__point tariff__point--opacify">Помощь в регистрации сайта Таобао и 1688</div>
                            <div class="tariff__point tariff__point--opacify">Бонусный урок по подготовке инфографики в фотошоп</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 1. Юридические и экономические аспекты
                            </div>
                            <div class="tariff__point">1.1 Предварительные расчеты на старте</div>
                            <div class="tariff__point">1.2 Документация на товар, подтверждающая качество</div>
                            <div class="tariff__point">1.3 Регистрация ИП</div>
                            <div class="tariff__point">1.4 Особенности налогообложения</div>
                            <div class="tariff__point">1.5 Оферта ВБ - важные особенности</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 2. Подбор ниши
                            </div>
                            <div class="tariff__point">2.1 Аналитические сервисы для подбора ниши</div>
                            <div class="tariff__point">2.2 Подбор прибыльной ниш</div>
                            <div class="tariff__point">2.2 Подбор прибыльной ниш</div>
                            <div class="tariff__point">2.4 Юнит - экономика</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 3. Поставщики
                            </div>
                            <div class="tariff__point">3.1 Виды поставщиков и особенности работы</div>
                            <div class="tariff__point">3.2 Китайские площадки и схемы работы</div>
                            <div class="tariff__point">3.4 Особенности и способы общения с китайцами</div>
                            <div class="tariff__point">3.5 Правила расчета стоимости доставки</div>
                            <div class="tariff__point">3.6 Способы ввоза товара: контакты</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 4. Карточка товара
                            </div>
                            <div class="tariff__point">4.1 Карточка товара артикул и штрих - код</div>
                            <div class="tariff__point">4.2 Карточка особенности и правила</div>
                            <div class="tariff__point">4.3 SEO оптимизация карточки</div>
                            <div class="tariff__point">4.4 Оформление фото карточки</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 5. Поставки
                            </div>
                            <div class="tariff__point">5.1 Виды поставок на ВБ, какую выбрать</div>
                            <div class="tariff__point">5.2 Особенности работы со склада Wildberries</div>
                            <div class="tariff__point">5.3 Особенности работы со своего склада</div>
                            <div class="tariff__point">5.4 Региональные склады и выбор склада</div>
                            <div class="tariff__point">5.5 Упаковка и маркировка товара</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 6. Особенности продаж
                            </div>
                            <div class="tariff__point">6.1 Основы стабильных продаж и роста</div>
                            <div class="tariff__point">6.2 Стратегии продвижения</div>
                            <div class="tariff__point">6.3 Внутренняя реклама на Wildberries</div>
                            <div class="tariff__point">6.4 Внешняя реклама на товар</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 7. Финансы и цены
                            </div>
                            <div class="tariff__point">7.1 Цены и участие в акциях</div>
                            <div class="tariff__point">7.2 Аналитика Wildberries</div>
                            <div class="tariff__point">7.3 Финансы - финанcовые отчеты Wildberries</div>
                        </div>
                    </div>
                    <div class="tariff__footer">
                        <a href="https://wa.me/79966439800" class="btn btn--red" target="_blank">Купить</a>
                        <button class="btn btn--red" type="button" onclick="tinkoff.create(
                            {
                                sum: 39900,
                                items: [{ name: 'Курс по обучению Wildberries и Китай', price: 39900, quantity: 1 }],
                                shopId: '21d0b656-bd25-4da2-a3f8-91394606cce0',
                                showcaseId: '4498fdf2-f3f7-4a5e-91af-0ca6116a267a',
                            },
                            { view: 'modal' }
                        )">Купить в расрочку</button>
                    </div>
                </div>
            </div>

            <div class="tariffs__item">
                <div class="tariff tariff--yellow">
                    <div class="tariff__header">
                        <div class="tariff__title">Wildberries и Китай с натавником</div>
                        <div class="tariff__price">45 990 ₽</div>
                    </div>
                    <div class="tariff__body">
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Описание
                            </div>
                            <div class="tariff__point">Предусмотрено - 5 семинаров</div>
                            <div class="tariff__point">31 лекция</div>
                            <div class="tariff__point">Имеется личное сопровождение после обучения - 6 месяцев</div>
                            <div class="tariff__point">Добавление в группу общения</div>
                            <div class="tariff__point">Помощь в регистрации сайта Таобао и 1688</div>
                            <div class="tariff__point">Бонусный урок по подготовке инфографики в фотошоп</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 1. Юридические и экономические аспекты
                            </div>
                            <div class="tariff__point">1.1 Предварительные расчеты на старте</div>
                            <div class="tariff__point">1.2 Документация на товар, подтверждающая качество</div>
                            <div class="tariff__point">1.3 Регистрация ИП</div>
                            <div class="tariff__point">1.4 Особенности налогообложения</div>
                            <div class="tariff__point">1.5 Оферта ВБ - важные особенности</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 2. Подбор ниши
                            </div>
                            <div class="tariff__point">2.1 Аналитические сервисы для подбора ниши</div>
                            <div class="tariff__point">2.2 Подбор прибыльной ниш</div>
                            <div class="tariff__point">2.2 Подбор прибыльной ниш</div>
                            <div class="tariff__point">2.4 Юнит - экономика</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 3. Поставщики
                            </div>
                            <div class="tariff__point">3.1 Виды поставщиков и особенности работы</div>
                            <div class="tariff__point">3.2 Китайские площадки и схемы работы</div>
                            <div class="tariff__point">3.4 Особенности и способы общения с китайцами</div>
                            <div class="tariff__point">3.5 Правила расчета стоимости доставки</div>
                            <div class="tariff__point">3.6 Способы ввоза товара: контакты</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 4. Карточка товара
                            </div>
                            <div class="tariff__point">4.1 Карточка товара артикул и штрих - код</div>
                            <div class="tariff__point">4.2 Карточка особенности и правила</div>
                            <div class="tariff__point">4.3 SEO оптимизация карточки</div>
                            <div class="tariff__point">4.4 Оформление фото карточки</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 5. Поставки
                            </div>
                            <div class="tariff__point">5.1 Виды поставок на ВБ, какую выбрать</div>
                            <div class="tariff__point">5.2 Особенности работы со склада Wildberries</div>
                            <div class="tariff__point">5.3 Особенности работы со своего склада</div>
                            <div class="tariff__point">5.4 Региональные склады и выбор склада</div>
                            <div class="tariff__point">5.5 Упаковка и маркировка товара</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 6. Особенности продаж
                            </div>
                            <div class="tariff__point">6.1 Основы стабильных продаж и роста</div>
                            <div class="tariff__point">6.2 Стратегии продвижения</div>
                            <div class="tariff__point">6.3 Внутренняя реклама на Wildberries</div>
                            <div class="tariff__point">6.4 Внешняя реклама на товар</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Модуль 7. Финансы и цены
                            </div>
                            <div class="tariff__point">7.1 Цены и участие в акциях</div>
                            <div class="tariff__point">7.2 Аналитика Wildberries</div>
                            <div class="tariff__point">7.3 Финансы - финанcовые отчеты Wildberries</div>
                        </div>
                    </div>
                    <div class="tariff__footer">
                        <a href="https://wa.me/79966439800" class="btn btn--yellow" target="_blank">Купить</a>
                        <button class="btn btn--yellow" type="button" onclick="tinkoff.create(
                            {
                                sum: 45990,
                                items: [{ name: 'Курс по обучению Wildberries и Китай с наставником', price: 45990, quantity: 1 }],
                                shopId: '21d0b656-bd25-4da2-a3f8-91394606cce0',
                                showcaseId: '4498fdf2-f3f7-4a5e-91af-0ca6116a267a',
                            },
                            { view: 'modal' }
                        )">Купить в расрочку</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .custom-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .custom-container * {
        box-sizing: border-box;
        font-family: 'TildaSans', Arial, sans-serif;
    }

    .tariffs {
        margin: -16px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .tariffs__item {
        padding: 16px;
        width: calc(100% / 3);
        min-width: 390px;
    }

    @media (max-width: 432px) {
        .tariffs__item {
            min-width: auto;
            width: 100%;
        }
    }

    .tariff {
        border-radius: 32px;
        padding: 24px;
        background-color: #215DF6;
        color: white;
    }
    .tariff--red {
        background-color: #AB1F39;
    }
    .tariff--yellow {
        background: linear-gradient(155.63deg, #C5B638 -2.83%, #94642C 25.67%, #9D6C21 46.51%, #A98528 75.21%, #E8D46B 102.42%);
    }
    .tariff__title {
        text-align: center;
        font-size: 18px;
    }
    .tariff__price {
        text-align: center;
        font-weight: bold;
        font-size: 36px;
        margin-top: 16px;
    }
    .tariff__body {
        margin-top: 24px;
    }
    .tariff__block-title {
        font-weight: bold;
        margin-bottom: 8px;
        font-size: 16px;
    }
    .tariff__block--opacify {
        opacity: 0.4;
    }
    .tariff__point--opacify {
        opacity: 0.4;
    }
    .tariff__point + .tariff__point {
        margin-top: 5px;
    }
    .tariff__block {
        font-size: 15px;
    }
    .tariff__block + .tariff__block {
        margin-top: 16px;
    }
    .tariff__footer {
        margin-top: 40px;
    }
    .tariff__hidden {
        opacity: 0.4;
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        border-radius: 30px;
        border: none;
        height: 50px;
        cursor: pointer;
        background-color: white;
        transition: opacity 0.2s ease;
        font-size: 15px !important;
        font-weight: bolder;
        color: #215DF6 !important;
        text-decoration: none;
        font-family: 'TildaSans', Arial, sans-serif;
    }
    .btn--red {
        color: #AB1F39 !important;
    }
    .btn--yellow {
        color: #A27524 !important;
    }
    
    .btn:hover {
        opacity: 0.85;
    }
    .btn:active {
        position: relative;
        top: 2px;
    }

    .btn + .btn {
        margin-top: 16px;
    }
</style>