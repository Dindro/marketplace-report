import type { ReportActionType } from "@/entities/ReportAction";

const map: { [key: string]: ReportActionType } = {
    'Продажа': 'buy',
    'Корректная продажа': 'buy-correct',
    'Сторно продаж': 'reversal',
    'Возврат': 'return',
    'Логистика': 'delivery',
    'Оплата брака': 'marriage',
    'Оплата потерянного товара': 'lost-product',
    'Штрафы': 'fines',
};

export default map;