<template>
    <div class="custom-container">
        <div class="tariffs">
            <div class="tariffs__item">
                <div class="tariff">
                    <div class="tariff__header">
                        <div class="tariff__title">Базовый</div>
                        <div class="tariff__price">3 990 ₽</div>
                    </div>
                    <div class="tariff__body">
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Описание
                            </div>
                            <div class="tariff__point">Сопровождение в чате телеграмм</div>
                            <div class="tariff__point">Хочу покупать на таобао</div>
                            <div class="tariff__point tariff__point--opacify">Хочу покупать на 1688</div>
                            <div class="tariff__point tariff__point--opacify">Личное сопровождение 6 мес</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Лекции
                            </div>
                            <div class="tariff__point">1. Научимся покупать товары в розницу с Таобао через посредника</div>
                            <div class="tariff__point">2. Пройдем вместе регистрацию на taobao.com с мобильного устройства</div>
                            <div class="tariff__point">3. Научимся выбирать лучшие магазины</div>
                            <div class="tariff__point">4. Найдем самые выгодные предложения на товары</div>
                            <div class="tariff__point">5. Разберем роль посредника и научимся с ними работать</div>
                            <div class="tariff__point">6. Совершим ваши первые покупки</div>
                            <div class="tariff__point">7. Организуем доставку Китай - Россия</div>
                            <div class="tariff__point">8. Получите все контакты и ссылки посредников</div>
                            <div class="tariff__point">9. Материалы, контакты и ссылки будут доступны 3 месяца <span class="tariff__hidden">6 месяцев</span></div>
                        </div>
                    </div>
                    <div class="tariff__footer">
                        <a href="#" class="btn" type="button">Купить</a>
                        <button class="btn" type="button" onclick="tinkoff.create(
                            {
                                sum: 3990,
                                items: [{ name: 'Курс по обучению Wildberries - Базовый', price: 3990, quantity: 1 }],
                                shopId: '',
                                showcaseId: '',
                            },
                            { view: 'modal' }
                        )">Купить в расрочку</button>
                    </div>
                </div>
            </div>

            <div class="tariffs__item">
                <div class="tariff tariff--red">
                    <div class="tariff__header">
                        <div class="tariff__title">Продвинутый</div>
                        <div class="tariff__price">6 990 ₽</div>
                    </div>
                    <div class="tariff__body">
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Описание
                            </div>
                            <div class="tariff__point">Сопровождение в чате телеграмм</div>
                            <div class="tariff__point">Хочу покупать на таобао</div>
                            <div class="tariff__point">Хочу покупать на 1688</div>
                            <div class="tariff__point tariff__point--opacify">Личное сопровождение 6 мес</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Лекции
                            </div>
                            <div class="tariff__point">1. Научимся покупать товары в розницу с Таобао через посредника</div>
                            <div class="tariff__point">2. Пройдем вместе регистрацию на taobao.com с мобильного устройства</div>
                            <div class="tariff__point">3. Научимся выбирать лучшие магазины</div>
                            <div class="tariff__point">4. Найдем самые выгодные предложения на товары</div>
                            <div class="tariff__point">5. Разберем роль посредника и научимся с ними работать</div>
                            <div class="tariff__point">6. Совершим ваши первые покупки</div>
                            <div class="tariff__point">7. Организуем доставку Китай - Россия</div>
                            <div class="tariff__point">8. Получите все контакты и ссылки посредников</div>
                            <div class="tariff__point">9. Материалы, контакты и ссылки будут доступны 3 месяца <span class="tariff__hidden">6 месяцев</span></div>
                        </div>
                    </div>
                    <div class="tariff__footer">
                        <a href="#" class="btn btn--red" type="button">Купить</a>
                        <button class="btn btn--red" type="button" onclick="tinkoff.create(
                            {
                                sum: 3990,
                                items: [{ name: 'Курс по обучению Wildberries - Базовый', price: 3990, quantity: 1 }],
                                shopId: '',
                                showcaseId: '',
                            },
                            { view: 'modal' }
                        )">Купить в расрочку</button>
                    </div>
                </div>
            </div>

            <div class="tariffs__item">
                <div class="tariff tariff--yellow">
                    <div class="tariff__header">
                        <div class="tariff__title">Комфортный</div>
                        <div class="tariff__price">8 990 ₽</div>
                    </div>
                    <div class="tariff__body">
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Описание
                            </div>
                            <div class="tariff__point">Сопровождение в чате телеграмм</div>
                            <div class="tariff__point">Хочу покупать на таобао</div>
                            <div class="tariff__point">Хочу покупать на 1688</div>
                            <div class="tariff__point">Личное сопровождение 6 мес</div>
                        </div>
                        <div class="tariff__block">
                            <div class="tariff__block-title">
                                Лекции
                            </div>
                            <div class="tariff__point">1. Научимся покупать товары в розницу с Таобао через посредника</div>
                            <div class="tariff__point">2. Пройдем вместе регистрацию на taobao.com с мобильного устройства</div>
                            <div class="tariff__point">3. Научимся выбирать лучшие магазины</div>
                            <div class="tariff__point">4. Найдем самые выгодные предложения на товары</div>
                            <div class="tariff__point">5. Разберем роль посредника и научимся с ними работать</div>
                            <div class="tariff__point">6. Совершим ваши первые покупки</div>
                            <div class="tariff__point">7. Организуем доставку Китай - Россия</div>
                            <div class="tariff__point">8. Получите все контакты и ссылки посредников</div>
                            <div class="tariff__point">9. Материалы, контакты и ссылки будут доступны 6 месяцев</div>
                        </div>
                    </div>
                    <div class="tariff__footer">
                        <a href="#" class="btn btn--yellow" type="button">Купить</a>
                        <button class="btn btn--yellow" type="button" onclick="tinkoff.create(
                            {
                                sum: 3990,
                                items: [{ name: 'Курс по обучению Wildberries - Базовый', price: 3990, quantity: 1 }],
                                shopId: '',
                                showcaseId: '',
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
        text-decoration: line-through;
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