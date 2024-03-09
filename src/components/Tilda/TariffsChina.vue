<template>
    <div class="custom-container">
        <div class="tariffs">
            <div class="tariffs__item">
                <div class="tariff">
                    <div class="tariff__header">
                        <div class="tariff__title">Тариф Standart</div>
                        <div class="tariff__price" data-current="">2 990</div>
                    </div>
                    <div class="tariff__body">
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Описание
                            </div>
                            <div class="tariff__point">Доступ к лекциям 3 месяца <span class="tariff__point--opacify">(6 месяцев)</span></div>
                            <div class="tariff__point">Контакты посредников</div>
                            <div class="tariff__point">Покупка на Taobao (розничный маркетплейс)</div>
                            <div class="tariff__point tariff__point--opacify">Покупка на 1688 (оптовый маркетплейс)</div>
                            <div class="tariff__point tariff__point--opacify">Покупка в POIZEN (магазин брендов)</div>
                            <div class="tariff__point tariff__point--opacify">Личное сопровождение 3 месяца</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">TAOBAO (РОЗНИЦА)</div>
                            <div class="tariff__point">Регистрация в приложении</div>
                            <div class="tariff__point">Создание пароля в личный кабинет</div>
                            <div class="tariff__point">Главная страница</div>
                            <div class="tariff__point">Магазины, рейтинг, отзывы</div>
                            <div class="tariff__point">Выбор размера</div>
                            <div class="tariff__point">Домашняя страница</div>
                            <div class="tariff__point">Корзина</div>
                            <div class="tariff__point">Страница товара</div>
                            <div class="tariff__point">Основные виды поиска в приложении</div>
                            <div class="tariff__point">Вход на площадку через браузер</div>
                            <div class="tariff__point">Общение с продавцами в приложении</div>
                            <div class="tariff__point">Основные виды поиска в браузере</div>
                            <div class="tariff__point">Общение с продавцами в браузере</div>
                        </div>
                    </div>
                    <div class="tariff__footer">
                        <a href="https://wa.me/79966439800" class="btn" target="_blank">Купить</a>
                    </div>
                </div>
            </div>

            <div class="tariffs__item">
                <div class="tariff tariff--red">
                    <div class="tariff__header">
                        <div class="tariff__title">Тафриф Pro</div>
                        <div class="tariff__price" data-current="">5 990</div>
                    </div>
                    <div class="tariff__body">
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Описание
                            </div>
                            <div class="tariff__point">Доступ к лекциям 3 месяца <span class="tariff__point--opacify">(6 месяцев)</span></div>
                            <div class="tariff__point">Контакты посредников</div>
                            <div class="tariff__point">Покупка на Taobao (розничный маркетплейс)</div>
                            <div class="tariff__point">Покупка на 1688 (оптовый маркетплейс)</div>
                            <div class="tariff__point tariff__point--opacify">Покупка в POIZEN (магазин брендов)</div>
                            <div class="tariff__point tariff__point--opacify">Личное сопровождение 3 месяца</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">TAOBAO (РОЗНИЦА)</div>
                            <div class="tariff__point">Регистрация в приложении</div>
                            <div class="tariff__point">Создание пароля в личный кабинет</div>
                            <div class="tariff__point">Главная страница</div>
                            <div class="tariff__point">Магазины, рейтинг, отзывы</div>
                            <div class="tariff__point">Выбор размера</div>
                            <div class="tariff__point">Домашняя страница</div>
                            <div class="tariff__point">Корзина</div>
                            <div class="tariff__point">Страница товара</div>
                            <div class="tariff__point">Основные виды поиска в приложении</div>
                            <div class="tariff__point">Вход на площадку через браузер</div>
                            <div class="tariff__point">Общение с продавцами в приложении</div>
                            <div class="tariff__point">Основные виды поиска в браузере</div>
                            <div class="tariff__point">Общение с продавцами в браузере</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">1688 (ОПТ)</div>
                            <div class="tariff__point">Регистрация в приложении</div>
                            <div class="tariff__point">Создание пароля в личный кабинет</div>
                            <div class="tariff__point">Главная страница</div>
                            <div class="tariff__point">Магазины, рейтинг, отзывы</div>
                            <div class="tariff__point">Выбор размера</div>
                            <div class="tariff__point">Домашняя страница</div>
                            <div class="tariff__point">Корзина</div>
                            <div class="tariff__point">Страница товара</div>
                            <div class="tariff__point">Основные виды поиска в приложении</div>
                            <div class="tariff__point">Вход на площадку через браузер</div>
                            <div class="tariff__point">Общение с фабриками в приложении</div>
                            <div class="tariff__point">Основные виды поиска в браузере</div>
                            <div class="tariff__point">Общение с фабриками в браузере</div>
                        </div>
                    </div>
                    <div class="tariff__footer">
                        <a href="https://wa.me/79966439800" class="btn btn--red" target="_blank">Купить</a>
                        <button class="btn btn--red" type="button" onclick="tinkoff.create(
                            {
                                sum: 5990,
                                items: [{ name: 'Курс Экономим с Китаем – Тариф Pro', price: 5990, quantity: 1 }],
                                shopId: '21d0b656-bd25-4da2-a3f8-91394606cce0',
                                showcaseId: '4498fdf2-f3f7-4a5e-91af-0ca6116a267a',
                                promoCode: 'installment_0_0_3_4',
                            },
                            { view: 'modal' }
                        )">Рассрочка на 3 месяца</button>
                    </div>
                </div>
            </div>

            <div class="tariffs__item">
                <div class="tariff tariff--yellow">
                    <div class="tariff__header">
                        <div class="tariff__title">Тариф VIP</div>
                        <div class="tariff__price" data-current="">9 990</div>
                    </div>
                    <div class="tariff__body">
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Описание
                            </div>
                            <div class="tariff__point">Доступ к лекциям 6 месяцев</div>
                            <div class="tariff__point">Контакты посредников</div>
                            <div class="tariff__point">Покупка на Taobao (розничный маркетплейс)</div>
                            <div class="tariff__point">Покупка на 1688 (оптовый маркетплейс)</div>
                            <div class="tariff__point">Покупка в POIZEN (магазин брендов)</div>
                            <div class="tariff__point">Личное сопровождение 3 месяца</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">TAOBAO (РОЗНИЦА)</div>
                            <div class="tariff__point">Регистрация в приложении</div>
                            <div class="tariff__point">Создание пароля в личный кабинет</div>
                            <div class="tariff__point">Главная страница</div>
                            <div class="tariff__point">Магазины, рейтинг, отзывы</div>
                            <div class="tariff__point">Выбор размера</div>
                            <div class="tariff__point">Домашняя страница</div>
                            <div class="tariff__point">Корзина</div>
                            <div class="tariff__point">Страница товара</div>
                            <div class="tariff__point">Основные виды поиска в приложении</div>
                            <div class="tariff__point">Вход на площадку через браузер</div>
                            <div class="tariff__point">Общение с продавцами в приложении</div>
                            <div class="tariff__point">Основные виды поиска в браузере</div>
                            <div class="tariff__point">Общение с продавцами в браузере</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">1688 (ОПТ)</div>
                            <div class="tariff__point">Регистрация в приложении</div>
                            <div class="tariff__point">Создание пароля в личный кабинет</div>
                            <div class="tariff__point">Главная страница</div>
                            <div class="tariff__point">Магазины, рейтинг, отзывы</div>
                            <div class="tariff__point">Выбор размера</div>
                            <div class="tariff__point">Домашняя страница</div>
                            <div class="tariff__point">Корзина</div>
                            <div class="tariff__point">Страница товара</div>
                            <div class="tariff__point">Основные виды поиска в приложении</div>
                            <div class="tariff__point">Вход на площадку через браузер</div>
                            <div class="tariff__point">Общение с фабриками в приложении</div>
                            <div class="tariff__point">Основные виды поиска в браузере</div>
                            <div class="tariff__point">Общение с фабриками в браузере</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">POIZON (БРЕНДЫ)</div>
                            <div class="tariff__point">Регистрация</div>
                            <div class="tariff__point">Создание пароля в личный кабинет</div>
                            <div class="tariff__point">Главная страница</div>
                            <div class="tariff__point">Магазины, рейтинг, отзывы</div>
                            <div class="tariff__point">Выбор размера</div>
                            <div class="tariff__point">Домашняя страница</div>
                            <div class="tariff__point">Корзина</div>
                            <div class="tariff__point">Страница товара</div>
                            <div class="tariff__point">Основные виды поиска</div>
                            <div class="tariff__point">Вход на площадку</div>
                            <div class="tariff__point">Общение с фабриками</div>
                        </div>
                    </div>
                    <div class="tariff__footer">
                        <a href="https://wa.me/79966439800" class="btn btn--yellow" target="_blank">Купить</a>
                        <button class="btn btn--yellow" type="button" onclick="tinkoff.create(
                            {
                                sum: 9990,
                                items: [{ name: 'Курс Экономим с Китаем – Тариф VIP', price: 9990, quantity: 1 }],
                                shopId: '21d0b656-bd25-4da2-a3f8-91394606cce0',
                                showcaseId: '4498fdf2-f3f7-4a5e-91af-0ca6116a267a',
                                promoCode: 'installment_0_0_3_4',
                            },
                            { view: 'modal' }
                        )">Рассрочка на 3 месяца</button>
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
        margin: 0 -8px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .tariffs__item {
        padding: 8px;
        width: calc(100% / 3);
        min-width: 304px;
    }

    @media (max-width: 432px) {
        .tariffs__item {
            min-width: auto;
            width: 100%;
        }
    }

    .tariff {
        border-radius: 32px;
        padding: 32px 24px 24px 24px;
        background-color: #215DF6;
        color: white;
    }
    .tariff--red {
        background-color: #AB1F39;
    }
    .tariff--yellow {
        background: linear-gradient(155.63deg, #C5B638 -2.83%, #94642C 25.67%, #9D6C21 46.51%, #A98528 75.21%, #E8D46B 102.42%);
    }
    .tariff--black {
        background: #000000;
    }
    .tariff__title {
        text-align: center;
        font-size: 18px;
    }
    .tariff__price {
        text-align: center;
        font-weight: bold;
        font-size: 40px;
        margin-top: 16px;
    }
    .tariff__price::after {
        content: attr(data-current);
        position: absolute;
        font-size: 16px;
        font-weight: 400;
        text-decoration: line-through;
        opacity: 0.6;
        transform: translate(4px, -4px);
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
    .btn--black {
        color: #000000 !important;
    }
    
    .btn:hover {
        opacity: 0.85;
    }
    .btn:active {
        position: relative;
        top: 2px;
    }

    .btn + .btn {
        margin-top: 12px;
    }
</style>