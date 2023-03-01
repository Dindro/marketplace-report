import type { ReportActionType } from "@/entities/ReportAction";

const map: { [key: string]: ReportActionType } = {
    'Продажа': 'sale',
    'Корректная продажа': 'sale-correct',
    'Сторно продаж': 'reversal',
    'Возврат': 'return',
    'Логистика': 'delivery',
    'Оплата брака': 'marriage',
    'Оплата потерянного товара': 'lost-product',
    'Штрафы': 'fines',
};

export default map;