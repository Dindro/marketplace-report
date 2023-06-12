import ProductPicture from '@/entities/ProductPicture';
import type IProductPictureRepository from '@/use-cases/IProductPictureRepository';

export default class ProductPictureRepository implements IProductPictureRepository {
    get(code: number): Promise<ProductPicture> {
        const preview = this.getPreview(code);
        const picture = new ProductPicture(preview);
        
        return Promise.resolve(picture);
    }

    private getPreview(code: number): string {
        // Функционал позаимствован с wildberries/main.js
        let oe = Math.floor(code / 1e5),
            xe = oe >= 0 && oe <= 143 ? "//basket-01.wb.ru/" : oe >= 144 && oe <= 287 ? "//basket-02.wb.ru/" : oe >= 288 && oe <= 431 ? "//basket-03.wb.ru/" : oe >= 432 && oe <= 719 ? "//basket-04.wb.ru/" : oe >= 720 && oe <= 1007 ? "//basket-05.wb.ru/" : oe >= 1008 && oe <= 1061 ? "//basket-06.wb.ru/" : oe >= 1062 && oe <= 1115 ? "//basket-07.wb.ru/" : oe >= 1116 && oe <= 1169 ? "//basket-08.wb.ru/" : oe >= 1170 && oe <= 1313 ? "//basket-09.wb.ru/" : oe >= 1314 && oe <= 1601 ? "//basket-10.wb.ru/" : oe >= 1602 && oe <= 1655 ? "//basket-11.wb.ru/" : oe >= 1656 && oe <= 1919 ? "//basket-12.wb.ru/" : "//basket-13.wb.ru/",
            de = `vol${Math.floor(code / 1e5)}/part${Math.floor(code / 1e3)}/${code}/images/c246x328/1.jpg`;

        return `https:${xe}${de}`;
    }
}