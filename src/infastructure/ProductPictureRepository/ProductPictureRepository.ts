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
        let p = Math.floor(code / 1e5),
            w = Math.floor(code / 1e3);

        const url = `//basket-${p >= 0 && p <= 143 ? "01" : p >= 144 && p <= 287 ? "02" : p >= 288 && p <= 431 ? "03" : p >= 432 && p <= 719 ? "04" : p >= 720 && p <= 1007 ? "05" : p >= 1008 && p <= 1061 ? "06" : p >= 1062 && p <= 1115 ? "07" : p >= 1116 && p <= 1169 ? "08" : p >= 1170 && p <= 1313 ? "09" : p >= 1314 && p <= 1601 ? "10" : p >= 1602 && p <= 1655 ? "11" : p >= 1656 && p <= 1919 ? "12" : p >= 1920 && p <= 2045 ? "13" : "14"}.wb.ru/vol${p}/part${w}/${code}/images/c246x328/1.jpg`
        return `https:${url}`;
    }
}