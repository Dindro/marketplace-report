import type { ReportActionType } from "@/entities/ReportAction";

const map: { [key: string]: ReportActionType } = {
    'Продажа': 'sale',
    'Корректная продажа': 'sale-correct',
    'Сторно продаж': 'reversal',
    'Возврат': 'return',
    'Логистика': 'delivery',
    'Логистика сторно': 'delivery-reversal',
    'Оплата брака': 'marriage',
    'Оплата потерянного товара': 'lost-product',
    'Штрафы': 'fines',
    'Корректный возврат': 'return-correct',
    'Сторно возвратов': 'reversal-return',
    'Авансовая оплата за товар без движения': 'without-movement',
    'Частичная компенсация брака': 'partial-marriage',
    'Возмещение издержек по перевозке': 'payment-shipping-cost',
};

export default map;