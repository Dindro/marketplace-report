import type { ReportActionType } from "@/entities/ReportAction";

const map: { [key: string]: ReportActionType } = {
    'продажа': 'sale',
    'корректная продажа': 'sale-correct',
    'сторно продаж': 'reversal',
    'возврат': 'return',
    'логистика': 'delivery',
    'логистика сторно': 'delivery-reversal',
    'оплата брака': 'marriage',
    'оплата потерянного товара': 'lost-product',
    'штрафы': 'fines',
    'штраф': 'organization-fines',
    'корректный возврат': 'return-correct',
    'сторно возвратов': 'reversal-return',
    'авансовая оплата за товар без движения': 'without-movement',
    'частичная компенсация брака': 'partial-marriage',
    'возмещение издержек по перевозке': 'payment-shipping-cost',
    'компенсация подмененного товара': 'compensation-replacement',
    'хранение': 'storage',
    'удержание': 'retention',
};

export default map;